export default `

precision mediump float;
uniform vec3 mainColor;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform bool hasActiveReminders;
uniform bool hasUpcomingReminders;
uniform bool disableCenterDimming;
varying vec2 vTextureCoord;


// Смешивание цветов
vec3 colorA = vec3(0.1, 0.0, 0.3);
vec3 colorB = vec3(0.6, 1.3, 1.0);

void main() {
  vec2 fragCoord = vTextureCoord * iResolution;
  vec2 uv = fragCoord.xy / iResolution.xy;
  uv.x *= iResolution.x / iResolution.y; // Коррекция соотношения сторон

  // Центр ведёт себя как мышь или середина
  vec2 center = iMouse;

  float dist = distance(uv, center);

  // Анимированная волна
  float pulse = sin(dist * 15.0 - iTime * 2.0) * 0.5 + 0.5;
  float wave = smoothstep(0.8, 0.2, pulse);
  
  // Пульсация радиуса
  float radius = 0.4 + 0.1 * sin(iTime * 0.5);
  float falloff = smoothstep(radius, 0.0, dist);

  // Интерполяция цветов
  vec3 color = mix(colorA, colorB, falloff * wave);
  color = mainColor * falloff * wave;

  // Лёгкое свечение в центре
  float glow = 0.05 / (dist * dist * 5.0 + 0.01);
  color += glow * vec3(1.0, 0.6, 1.0);

  gl_FragColor = vec4(color, 1.0);
}

`;
