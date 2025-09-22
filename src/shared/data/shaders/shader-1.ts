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

// Ether by nimitz 2014 (twitter: @stormoid)
// https://www.shadertoy.com/view/MsjSW3
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

#define t iTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
    p.xz*= m(t*0.4);p.xy*= m(t*0.3);
    vec3 q = p*2.+t;
    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
\tvec2 p = fragCoord.xy/iResolution.y - vec2(.6,.5);
    vec3 cl = vec3(0.);
    float d = 2.5;
    for(int i=0; i<=5; i++)\t{
\t\tvec3 p = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p);
\t\tfloat f =  clamp((rz - map(p+.1))*0.5, -.1, 1. );
        vec3 l = vec3(mainColor.x,mainColor.y,mainColor.z) + vec3(5., 2.5, 3.)*f;
        cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
\t\td += min(rz, 1.);
\t}
    fragColor = vec4(cl, 1.);
}

void main() {
    vec2 fragCoord = vTextureCoord * iResolution;

    vec4 color;
    mainImage(color, fragCoord);
    gl_FragColor = color;
}
`;
