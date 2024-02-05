precision mediump float;

varying vec2 vUv;
varying float vWave;
uniform sampler2D uTexture;

void main() {
  float wave = vWave * 0.25;
  
  // Appliquer l'effet de "vague" aux coordonnées de texture
  vec2 texCoord = vUv + wave;

  // Échantillonner les couleurs de la texture avec les coordonnées modifiées
  float r = texture2D(uTexture, texCoord).r;
  float g = texture2D(uTexture, texCoord).g;
  float b = texture2D(uTexture, texCoord).b;
  
  // Appliquer l'effet de "vague" aux couleurs RGB
  vec3 texture = vec3(r, g, b);
  
  gl_FragColor = vec4(texture, 1.0);
}