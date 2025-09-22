precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform bool hasActiveReminders;
uniform bool hasUpcomingReminders;
uniform bool disableCenterDimming;
varying vec2 vTextureCoord;

// Ether by nimitz 2014 (twitter: @stormoid)
// https://www.shadertoy.com/view/MsjSW3
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

#define t iTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p, bool isActive, bool isUpcoming){
    p.xz*= m(t*0.4);p.xy*= m(t*0.3);
    vec3 q = p*2.+t;
    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}
  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Calculate aspect-corrected UV coordinates
    vec2 p = fragCoord.xy/min(iResolution.x, iResolution.y) - vec2(.9, .5);
    // Shift center for our circular viewport
    p.x += 0.4;

    vec3 cl = vec3(0.);
    float d = 2.5;

    // Ray marching loop
    for(int i=0; i<=5; i++) {
        vec3 p3d = vec3(0,0,5.) + normalize(vec3(p.x, p.y, -1.0))*d;
        float rz = map(p3d, hasActiveReminders, hasUpcomingReminders);
        float f = clamp((rz - map(p3d+.1, hasActiveReminders, hasUpcomingReminders))*0.5, -.1, 1.);

        // Adjust colors based on reminder states
        vec3 baseColor;
        if(hasActiveReminders) {
            // Blue palette for active reminders
            baseColor = vec3(0.05, 0.2, 0.5) + vec3(4.0, 2.0, 5.0)*f;
        } else if(hasUpcomingReminders) {
            // Green palette for upcoming reminders
            baseColor = vec3(0.05, 0.3, 0.1) + vec3(2.0, 5.0, 1.0)*f;
        } else {
            // Original purple-blue palette
            baseColor = vec3(0.0, 0.3, 0.2) + vec3(3.0, 5.5, 6.0)*f;
        }

        cl = cl*baseColor + smoothstep(2.5, .0, rz)*.7*baseColor;
        d += min(rz, 1.);
    }

    // Calculate distance from center for dimming the center
    vec2 center = iResolution.xy * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;

    // Create a dimming factor for the center area (30% of the radius)
    float centerDim = disableCenterDimming ? 1.0 : smoothstep(radius * 0.0, radius * 0.5, dist);

    fragColor = vec4(cl, 1.0);

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