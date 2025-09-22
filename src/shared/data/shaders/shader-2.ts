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

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

  // Calculate distance from center for dimming the center
  vec2 center = iResolution.xy * 0.5;
  float dist = distance(fragCoord, center);
  float radius = min(iResolution.x, iResolution.y) * 0.5;

  // Create a dimming factor for the center area (30% of the radius)
  float centerDim = disableCenterDimming ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);

  for(float i = 1.0; i < 10.0; i++){
    uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime);
    uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
  }

  // Determine color based on reminder state
  float k = abs(sin(iTime - uv.y - uv.x));
  fragColor = vec4(mainColor / k, 1.0);

  // Apply center dimming only if not disabled
  if (!disableCenterDimming) {
    fragColor.rgb = mix(fragColor.rgb * 0.3, fragColor.rgb, centerDim);
  }
}

void main() {
  vec2 fragCoord = vTextureCoord * iResolution;

  vec4 color;
  mainImage(color, fragCoord);
  gl_FragColor = color;
}
`;
