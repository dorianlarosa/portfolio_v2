uniform sampler2D tDiffuse;
uniform float gammaFactor; // Facteur gamma, typiquement 2.2 pour le gamma inverse
varying vec2 vUv;

void main() {
    vec4 texel = texture2D(tDiffuse, vUv);
    // Appliquer la correction gamma
    gl_FragColor = vec4(pow(texel.rgb, vec3(1.0 / gammaFactor)), texel.w);
}