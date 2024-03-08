import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom'; // Assurez-vous d'importer useLocation si vous utilisez react-router


const globalU_time = { value: 0 };

export const BlobSphere = ({ isLoading }) => {
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
    const sphereGeometry = new THREE.IcosahedronGeometry(.4, 10);



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
                <InnerGeometry geometry={sphereGeometry} isLoading={isLoading}/>
            </group>
        </group>
    );
};

// ========================================================
const InnerGeometry = ({geometry, isLoading}) => {
    const location = useLocation();

    const scale = 2.2;
    const lastUpdateTime = useRef(performance.now());
    const updateInterval = 1000 / 60; // 1000ms / 60 fps = ~16.67ms par frame
    const meshRef = useRef<THREE.Mesh>(null);


    // Initialiser la position en fonction de isLoading
    const initialPosition = isLoading || location.pathname !== '/' ? [1.6,1.2, 0] : [0.8, 0.4, 0];
    const position = useRef(initialPosition).current;

    useEffect(() => {
        // Condition pour animer la position lors du changement de isLoading
        if (meshRef.current) {
            const newPosition = isLoading || location.pathname !== '/' ? [1.6,1.2, 0] : [0.8, 0.4, 0];

            gsap.to(meshRef.current.position, {
                x: newPosition[0],
                y: newPosition[1],
                z: newPosition[2],
                duration: 3, // Durée de l'animation en secondes
                ease: "power3.InOut", // Type d'accélération, pour un effet plus doux

            });
        }

        // gsap.to(shader.uniforms.opacity, {
        //     value: isLoading ? 0 : 1.0, // Ajustez selon votre logique
        //     duration: 2,
        //     ease: "power3.out",
        // });

        
    }, [isLoading, location.pathname]); // Dépendance à isLoading pour réagir à ses changements

    const { cubeRenderTarget, cubeCamera } = useMemo(() => {
        // create cube render target
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(64, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipMapLinearFilter,
            colorSpace: 'srgb'
        });
        // create cube camera
        const cubeCamera = new THREE.CubeCamera(0.1, 2, cubeRenderTarget);
        return { cubeRenderTarget, cubeCamera };
    }, []);

    const shader = {
        uniforms: {
            opacity: { value: 1 }, // Ajoutez un uniform pour contrôler l'opacité

            tCube: { value: cubeRenderTarget.texture },
            u_RefractionRatio: { value: 1 },
            u_FresnelBias: { value: .1 },
            u_FresnelScale: { value: 2 },
            u_FresnelPower: { value: 1 },
            u_time: globalU_time
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true, // Activez la transparence pour ce matériau

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
uniform float opacity;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
    vec4 reflectedColor = textureCube(tCube, vec3(-vReflect.x, vReflect.yz));
    vec4 refractedColor = vec4(1.0);

    refractedColor.r = textureCube(tCube, vec3(-vRefract[0].x, vRefract[0].yz)).r;
    refractedColor.g = textureCube(tCube, vec3(-vRefract[1].x, vRefract[1].yz)).g;
    refractedColor.b = textureCube(tCube, vec3(-vRefract[2].x, vRefract[2].yz)).b;

    vec4 color = mix(refractedColor, reflectedColor, clamp(vReflectionFactor, 0.0, 1.0));
    gl_FragColor = vec4(color.rgb, opacity); // Utilise l'uniform opacity pour la composante alpha
}
`
