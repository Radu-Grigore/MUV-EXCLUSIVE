import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/scroll';

type Props = {
    /** Four colours from darkest to lightest, as hex. */
    colors: [string, string, string, string];
    className?: string;
    /** Render scale relative to CSS pixels; clouds are soft, so low values stay sharp enough. */
    scale?: number;
    speed?: number;
};

const vertex = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Domain-warped fbm noise → soft drifting clouds, tinted with a four-stop palette.
const fragment = `
precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.02;a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
p+=m*.15;
vec2 q=vec2(fbm(p+t*.05),fbm(p+vec2(5.2,1.3)-t*.04));
vec2 w=vec2(fbm(p+2.*q+vec2(1.7,9.2)+t*.03),fbm(p+2.*q+vec2(8.3,2.8)-t*.02));
float f=fbm(p+2.2*w);
vec3 col=mix(c0,c1,smoothstep(.15,.55,f));
col=mix(col,c2,smoothstep(.45,.8,length(w)*.9));
col=mix(col,c3,smoothstep(.55,.95,f*f*1.6+uv.y*.25));
gl_FragColor=vec4(col,1.);}
`;

function rgb(hex: string) {
    const v = parseInt(hex.slice(1), 16);
    return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

/**
 * Lightweight Vanta-style clouds in raw WebGL (no three.js). Renders at reduced resolution,
 * pauses off-screen and when the tab is hidden, and stays still for reduced-motion users.
 * If WebGL is unavailable the canvas never fades in and the CSS background shows instead.
 */
export function ShaderClouds({ colors, className = '', scale = 0.45, speed = 1 }: Props) {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const el = canvas.current;
        const gl = el?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
        if (!el || !gl) return;

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertex));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragment));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
        gl.useProgram(prog);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const u = (name: string) => gl.getUniformLocation(prog, name);
        const [uRes, uTime, uMouse] = [u('r'), u('t'), u('m')];
        colors.forEach((c, i) => gl.uniform3fv(u(`c${i}`), rgb(c)));

        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const resize = () => {
            const w = Math.max(1, Math.round(el.clientWidth * scale));
            const h = Math.max(1, Math.round(el.clientHeight * scale));
            if (el.width !== w || el.height !== h) {
                el.width = w;
                el.height = h;
                gl.viewport(0, 0, w, h);
                gl.uniform2f(uRes, w, h);
            }
        };

        const still = prefersReducedMotion();
        let visible = true;
        let raf = 0;
        let shown = false;
        const start = performance.now();

        const frame = (now: number) => {
            resize();
            mouse.x += (mouse.tx - mouse.x) * 0.04;
            mouse.y += (mouse.ty - mouse.y) * 0.04;
            gl.uniform1f(uTime, ((now - start) / 1000) * speed + 20);
            gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            if (!shown) {
                shown = true;
                el.style.opacity = '1';
            }
            if (!still && visible && !document.hidden) raf = requestAnimationFrame(frame);
        };
        const play = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(frame);
        };

        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) play();
        });
        io.observe(el);
        const onVisibility = () => !document.hidden && visible && play();
        const onMove = (e: PointerEvent) => {
            mouse.tx = e.clientX / window.innerWidth - 0.5;
            mouse.ty = 0.5 - e.clientY / window.innerHeight;
        };
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('resize', play);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('resize', play);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [colors, scale, speed]);

    return (
        <canvas
            ref={canvas}
            aria-hidden="true"
            className={`pointer-events-none h-full w-full opacity-0 transition-opacity duration-[1500ms] ${className}`}
        />
    );
}
