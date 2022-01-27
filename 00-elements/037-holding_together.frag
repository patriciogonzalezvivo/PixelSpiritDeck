// Title: Holding Together
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) 2017-2022 Patricio Gonzalez Vivo - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work, the PixelSpirit Deck and all of its code and derivations.

// You cannot host, display, distribute or share this Work in any form,
// including physical and/or digital. You cannot use this Work in any
// commercial or non-commercial product, website, or project. You cannot
// sell this Work and you cannot mint any NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through a URL, with proper attribution and an unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me.  

uniform vec2 u_resolution;

#include "../lib/rectSDF.glsl"
#include "../lib/rotate.glsl"
#include "../lib/bridge.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    };
    st = (st-.5)*.7+.5;
    //START
    st.x = mix(1.-st.x,st.x,step(.5,st.y));
    vec2 o = vec2(.05,.0);
    vec2 s = vec2(1.);
    float a = radians(45.);
    float l = rectSDF(rotate(st+o,a),s);
    float r = rectSDF(rotate(st-o,-a),s);
    color += stroke(l,.145,.098);
    color = bridge(color,r,.145,.098);
    //END
    gl_FragColor = vec4(color,1.);
}