import React, { useRef } from 'react';
import * as THREE from 'three';
import { Icosahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const globalU_time = { value: 0 };
export const BackgroundSphere = () => {
  const parentRef = useRef<THREE.Group | null>(null);

  const shader = {
    uniforms: {
      u_time: globalU_time,
      u_patternScale: { value: .18 },
      u_patternBias1: { value: .5 },
      u_patternBias2: { value: .1 },
      u_firstColor: { value: new THREE.Color("#3d3f40") },
      u_secondColor: { value: new THREE.Color("#1c1c1c") },
      u_accentColor: { value: new THREE.Color("#0a0a0a") }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  }

  const lastUpdateTime = useRef(performance.now());
  const updateInterval = 1000 / 80; // 1000ms / 60 fps = ~16.67ms par frame

  useFrame(() => {
    const now = performance.now();
    const timeSinceLastUpdate = now - lastUpdateTime.current;

    if (timeSinceLastUpdate >= updateInterval) {
      shader.uniforms.u_time.value += 0.01;
      lastUpdateTime.current = now;
    }
  });

  return (
    <Icosahedron args={[2, 20]}>
      <shaderMaterial args={[shader]} side={THREE.DoubleSide} />
    </Icosahedron>
  );
};

// ========================================================
// shader

const vertexShader = `
varying vec3 v_pos;

void main() {
  v_pos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform float u_time;
uniform float u_patternScale;
uniform float u_patternBias1;
uniform float u_patternBias2;
uniform vec3 u_firstColor;
uniform vec3 u_secondColor;
uniform vec3 u_accentColor;
varying vec3 v_pos;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise31(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset) {
  float val = abs(0.5 * (sin(uv.x * 30.0) + offset * 2.0));
  return smoothstep(0.0, 0.5 + offset * 0.5, val);
}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

void main() {
  float n = noise31(v_pos + u_time);

  vec2 baseUV = rotate2D(n) * v_pos.xy * u_patternScale;
  float basePattern = lines(baseUV, u_patternBias1);
  float secondPattern = lines(baseUV, u_patternBias2);

  vec3 baseColor = mix(u_secondColor, u_firstColor, basePattern);
  vec3 secondBaseColor = mix(baseColor, u_accentColor, secondPattern);

  gl_FragColor = vec4(secondBaseColor, 1.0);
}
`
