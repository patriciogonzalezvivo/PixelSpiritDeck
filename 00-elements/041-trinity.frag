// Title: Trinity
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

#include "../lib/math.glsl"
#include "../lib/stroke.glsl"
#include "../lib/rotate.glsl"
#include "../lib/polySDF.glsl"
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
    }
    st = (st-.5)*1.2+.5;
    //START
    st.y = 1.-st.y;
    float s = .25;
    float t1 = polySDF(st+vec2(.0,.175),3);
    float t2 = polySDF(st+vec2(.1,.0),3);
    float t3 = polySDF(st-vec2(.1,.0),3);
    color += stroke(t1, s, .08) + 
             stroke(t2, s, .08) +
             stroke(t3, s, .08);
    float bridges = mix(mix(t1,t2,step(.5,st.y)),
                        mix(t3,t2,step(.5,st.y)),
                        step(.5,st.x));
    color = bridge(color, bridges, s, .08);
    //END
    gl_FragColor = vec4(color,1.);
}