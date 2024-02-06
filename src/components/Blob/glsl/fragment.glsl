uniform float u_intensity;
uniform float u_time;
uniform float u_speed;

varying vec2 vUv;
varying float vDisplacement;

uniform vec3 u_color1;
uniform vec3 u_color2;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 gradient = mix(u_color1, u_color2, abs(vUv.y - 0.5) * 2.0);
    vec3 color = gradient * (1.0 - distort);
    gl_FragColor = vec4(color, 1.0);
}