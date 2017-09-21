#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

//GLOBAL_START
#include "../lib/starSDF.glsl"
#include "../lib/fill.glsl"
//GLOBAL_END

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));
    //START
    color += fill(starSDF(st, 9, .375), .75);
    //END
    gl_FragColor = vec4(color,1.);
}