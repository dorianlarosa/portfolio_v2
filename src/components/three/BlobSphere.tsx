import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const globalU_time = { value: 0 };

export const BlobSphere = () => {
    const parentRef = useRef<THREE.Group | null>(null);


    // Écouter les changements de taille de la fenêtre
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Adapter la taille de la géométrie en fonction de la taille de la fenêtre
    const sphereGeometry = useMemo(() => {
        return new THREE.IcosahedronGeometry(.4, 20);
    }, [windowSize.width]);


    // frame loop
    const vec3 = new THREE.Vector3();
    useFrame(() => {
        if (parentRef.current instanceof THREE.Group) {
            parentRef.current.lookAt(vec3);
        }
    });

    return (
        <group ref={parentRef}>
            <group>
                <InnerGeometry geometry={sphereGeometry} />
            </group>
        </group>
    );
};

// ========================================================
const InnerGeometry = (props) => {
    const { geometry, scale = 2.2, position = [0.8, 0.4, 0] } = props
    const lastUpdateTime = useRef(performance.now());
    const updateInterval = 1000 / 80; // 1000ms / 60 fps = ~16.67ms par frame
    const meshRef = useRef<THREE.Mesh>(null);

    const { cubeRenderTarget, cubeCamera } = useMemo(() => {
        // create cube render target
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipMapLinearFilter,
            colorSpace: 'srgb'
        });
        // create cube camera
        const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
        return { cubeRenderTarget, cubeCamera };
    }, []);

    const shader = {
        uniforms: {
            tCube: { value: cubeRenderTarget.texture },
            u_RefractionRatio: { value: 1 },
            u_FresnelBias: { value: .1 },
            u_FresnelScale: { value: 2 },
            u_FresnelPower: { value: 1 },
            u_time: globalU_time
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    };

    useFrame(({ gl, scene }) => {
        const now = performance.now();
        const timeSinceLastUpdate = now - lastUpdateTime.current;
        if (timeSinceLastUpdate >= updateInterval) {
            if (meshRef.current) {
                meshRef.current.visible = false;
                cubeCamera.update(gl, scene);
                meshRef.current.visible = true;
                shader.uniforms.tCube.value = cubeRenderTarget.texture;
                // shader.uniforms.u_time.value += 0.01;
            }
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
            <shaderMaterial args={[shader]} side={THREE.DoubleSide} />
        </mesh>
    );
};


// ========================================================
// shader

const vertexShader = `
uniform float u_RefractionRatio;
uniform float u_FresnelBias;
uniform float u_FresnelScale;
uniform float u_FresnelPower;
uniform float u_time;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec3 pos = position;
  vec3 norm = normal;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * norm);

  vec3 I = worldPosition.xyz - cameraPosition;

  vReflect = reflect(I, worldNormal);
  vRefract[0] = refract(normalize(I), worldNormal, u_RefractionRatio);
  vRefract[1] = refract(normalize(I), worldNormal, u_RefractionRatio * 0.99);
  vRefract[2] = refract(normalize(I), worldNormal, u_RefractionRatio * 0.98);
  vReflectionFactor = u_FresnelBias + u_FresnelScale * pow(1.0 + dot(normalize(I), worldNormal), u_FresnelPower);

  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform samplerCube tCube;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  vec4 refractedColor = vec4( 1.0 );

  refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
}
`
