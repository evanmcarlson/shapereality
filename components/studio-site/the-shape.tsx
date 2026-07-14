"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Shape — the brand signature, live. A dependency-free WebGL raymarcher:
 * one form morphing sphere → cube → torus → octahedron forever, surfaced in
 * the house material (real per-channel refraction + chrome reflection +
 * fresnel — no gradients faking any of it).
 *
 * Two variants:
 *  - "glass"  (hero): transmission-first. If `refractTargetId` is set, that
 *    element's text is rasterized into a texture and sampled through the
 *    refracted rays — the page's own type visibly bends inside the glass.
 *  - "chrome" (closer): reflection-first, with the ground hemisphere tinted
 *    by the slab behind it (cobalt), so the object reads as sitting IN the
 *    section, not pasted on it.
 *
 * Behavior: idle it breathes; scroll velocity feeds the morph speed; drag
 * spins it with inertia (horizontal-only on touch so the page still
 * scrolls). Pauses offscreen and on hidden tabs. prefers-reduced-motion
 * gets a static frame that still responds to drag. No WebGL → the poster
 * label in `fallback` shows instead.
 */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uMorph;
uniform vec2 uRot;
uniform float uDark;
uniform float uChrome;
uniform vec3 uObjPos;
uniform float uScale;
uniform float uTint;
uniform vec3 uTintColor;
uniform vec3 uInk;
uniform float uHasText;
uniform sampler2D uText;

const float CAM_Z = 2.7;
const float FOV = 0.72;
const float TEXT_Z = -1.1;

mat3 rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }

float sdSphere(vec3 p, float r){ return length(p)-r; }
float sdBox(vec3 p, vec3 b, float r){ vec3 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r; }
float sdTorus(vec3 p, vec2 t){ vec2 q=vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }
float sdOcta(vec3 p, float s){ p=abs(p); return (p.x+p.y+p.z-s)*0.57735; }

float shape(vec3 p){
  float k = mod(uMorph, 4.0);
  float t = fract(k);
  float s = smoothstep(0.25, 0.75, t);
  float i = floor(k);
  float dS = sdSphere(p, 0.78);
  float dB = sdBox(p, vec3(0.55), 0.12);
  float dT = sdTorus(p, vec2(0.6, 0.28));
  float dO = sdOcta(p, 1.02);
  float d0; float d1;
  if (i < 0.5)      { d0 = dS; d1 = dB; }
  else if (i < 1.5) { d0 = dB; d1 = dT; }
  else if (i < 2.5) { d0 = dT; d1 = dO; }
  else              { d0 = dO; d1 = dS; }
  float d = mix(d0, d1, s);
  d += 0.028 * sin(5.0*p.x + uTime*1.1) * sin(5.0*p.y + uTime*0.9) * sin(5.0*p.z + uTime*1.3);
  return d;
}

float map(vec3 p){
  vec3 q = (p - uObjPos) / uScale;
  q = rotX(uRot.y) * rotY(uRot.x) * q;
  q.y += 0.05 * sin(uTime * 0.6);
  return shape(q) * uScale;
}

vec3 calcN(vec3 p){
  vec2 e = vec2(0.0028, 0.0);
  return normalize(vec3(
    map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy),
    map(p+e.yyx)-map(p-e.yyx)));
}

vec3 env(vec3 d){
  float v = smoothstep(-0.5, 0.8, d.y);
  vec3 skyL = mix(vec3(0.30, 0.31, 0.36), vec3(1.04, 1.04, 1.06), v);
  vec3 skyD = mix(vec3(0.02, 0.02, 0.03), vec3(0.34, 0.36, 0.44), v);
  vec3 sky = mix(skyL, skyD, uDark);
  // tint the lower hemisphere with the slab behind the object (closer)
  sky = mix(sky, uTintColor * (0.35 + 0.65 * v), uTint * (1.0 - v) * 0.85);
  float band1 = pow(max(dot(d, normalize(vec3(0.6, 0.8, 0.3))), 0.0), 24.0);
  float band2 = pow(max(dot(d, normalize(vec3(-0.7, 0.4, -0.4))), 0.0), 32.0);
  float band3 = pow(max(dot(d, normalize(vec3(0.1, -0.6, 0.8))), 0.0), 40.0);
  sky += vec3(1.0) * band1 * 1.6;
  sky += vec3(0.85, 0.9, 1.0) * band2 * 1.1;
  sky += vec3(0.95, 0.85, 1.0) * band3 * 0.7;
  return sky;
}

/* Where does a ray leaving the surface land on the page plane? Sample the
   rasterized headline there — this is the type actually refracting. */
float textAlpha(vec3 p, vec3 v){
  if (uHasText < 0.5 || v.z >= -0.02) return 0.0;
  float t = (TEXT_Z - p.z) / v.z;
  if (t < 0.0) return 0.0;
  vec3 q = p + v * t;
  vec2 sc = q.xy / (FOV * (CAM_Z - TEXT_Z));
  vec2 px = (sc * min(uRes.x, uRes.y) + uRes) * 0.5;
  vec2 uv = px / uRes;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
  return texture2D(uText, vec2(uv.x, 1.0 - uv.y)).a;
}

void main(){
  vec2 sc = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  vec3 ro = vec3(0.0, 0.0, CAM_Z);
  vec3 rd = normalize(vec3(sc * FOV, -1.0));

  // bounding-sphere early out: most fragments never march
  vec3 oc = ro - uObjPos;
  float b = dot(oc, rd);
  float bound = 1.45 * uScale;
  float c = dot(oc, oc) - bound * bound;
  if (b > 0.0 && c > 0.0) { gl_FragColor = vec4(0.0); return; }
  if (b * b - c < 0.0) { gl_FragColor = vec4(0.0); return; }

  float t = max(0.0, -b - sqrt(b * b - c));
  bool hit = false;
  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.0024 * uScale) { hit = true; break; }
    t += d * 0.9;
    if (t > CAM_Z + bound + 1.0) break;
  }
  if (!hit) { gl_FragColor = vec4(0.0); return; }

  vec3 p = ro + rd * t;
  vec3 n = calcN(p);
  float fres = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
  vec3 refl = env(reflect(rd, n));

  // glass: per-channel refraction (real dispersion, not a gradient)
  vec3 vr = refract(rd, n, 0.735);
  vec3 vg = refract(rd, n, 0.75);
  vec3 vb = refract(rd, n, 0.765);
  vec3 rfr;
  rfr.r = env(vr).r;
  rfr.g = env(vg).g;
  rfr.b = env(vb).b;
  float aR = textAlpha(p, vr);
  float aG = textAlpha(p, vg);
  float aB = textAlpha(p, vb);
  rfr.r = mix(rfr.r, uInk.r, aR);
  rfr.g = mix(rfr.g, uInk.g, aG);
  rfr.b = mix(rfr.b, uInk.b, aB);

  vec3 glass = mix(rfr, refl, 0.35 + 0.6 * fres);
  vec3 chrome = refl * (0.82 + 0.18 * fres);
  vec3 col = mix(glass, chrome, uChrome);
  col += vec3(1.0) * fres * 0.22;

  float a = 0.97;
  gl_FragColor = vec4(col * a, a);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
  if (!m) return [0, 0, 0];
  return [
    parseInt(m[1]!, 16) / 255,
    parseInt(m[2]!, 16) / 255,
    parseInt(m[3]!, 16) / 255,
  ];
}

function cssColorToRgb(color: string): [number, number, number] {
  const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(color);
  if (m) return [+m[1]! / 255, +m[2]! / 255, +m[3]! / 255];
  if (color.startsWith("#")) return hexToRgb(color);
  return [0, 0, 0];
}

export function TheShape({
  variant = "glass",
  anchorId,
  refractTargetId,
  interactive = false,
  tintColor,
  className,
  label = "A morphing liquid-glass form — the Shape Reality signature",
}: {
  variant?: "glass" | "chrome";
  /** Element whose rect positions/sizes the object inside the canvas. */
  anchorId?: string;
  /** Element whose text is rasterized and refracted through the glass. */
  refractTargetId?: string;
  /** Attach drag directly to the canvas (closer) vs. the anchor (hero). */
  interactive?: boolean;
  /** Hemisphere tint behind the object, e.g. the cobalt slab. */
  tintColor?: string;
  className?: string;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      });
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }
    const ctx = gl;

    function compile(type: number, src: string) {
      const s = ctx.createShader(type);
      if (!s) return null;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      if (!ctx.getShaderParameter(s, ctx.COMPILE_STATUS)) return null;
      return s;
    }
    const vs = compile(ctx.VERTEX_SHADER, VERT);
    const fs = compile(ctx.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = ctx.createProgram();
    if (!prog) {
      setFailed(true);
      return;
    }
    ctx.attachShader(prog, vs);
    ctx.attachShader(prog, fs);
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    ctx.useProgram(prog);

    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      ctx.STATIC_DRAW,
    );
    const loc = ctx.getAttribLocation(prog, "aPos");
    ctx.enableVertexAttribArray(loc);
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);

    const U = (name: string) => ctx.getUniformLocation(prog, name);
    const uRes = U("uRes");
    const uTime = U("uTime");
    const uMorph = U("uMorph");
    const uRot = U("uRot");
    const uDark = U("uDark");
    const uChrome = U("uChrome");
    const uObjPos = U("uObjPos");
    const uScale = U("uScale");
    const uTint = U("uTint");
    const uTintColor = U("uTintColor");
    const uInk = U("uInk");
    const uHasText = U("uHasText");
    const uText = U("uText");

    // ── text texture: the page's own headline, rasterized ──
    const textTex = ctx.createTexture();
    ctx.activeTexture(ctx.TEXTURE0);
    ctx.bindTexture(ctx.TEXTURE_2D, textTex);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
    ctx.texImage2D(
      ctx.TEXTURE_2D,
      0,
      ctx.RGBA,
      1,
      1,
      0,
      ctx.RGBA,
      ctx.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );
    let hasText = 0;
    let ink: [number, number, number] = [0, 0, 0];

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    const maxDpr = coarse ? 1.5 : 2;

    function drawTextTexture() {
      hasText = 0;
      if (!refractTargetId) return;
      const target = document.getElementById(refractTargetId);
      if (!target || !canvas) return;
      const cRect = canvas.getBoundingClientRect();
      if (cRect.width < 2 || cRect.height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const off = document.createElement("canvas");
      off.width = Math.round(cRect.width * dpr);
      off.height = Math.round(cRect.height * dpr);
      const c2d = off.getContext("2d");
      if (!c2d) return;
      const cs = getComputedStyle(target);
      ink = cssColorToRgb(cs.color);
      const fontSize = parseFloat(cs.fontSize);
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.1;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      c2d.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
      const anyCtx = c2d as CanvasRenderingContext2D & {
        letterSpacing?: string;
      };
      if ("letterSpacing" in anyCtx && cs.letterSpacing !== "normal") {
        anyCtx.letterSpacing = cs.letterSpacing;
      }
      c2d.fillStyle = cs.color;
      c2d.textBaseline = "alphabetic";
      const tRect = target.getBoundingClientRect();
      const x = tRect.left - cRect.left;
      const y0 = tRect.top - cRect.top;
      const lines = target.innerText.split("\n").filter((l) => l.trim());
      const metrics = c2d.measureText("H");
      const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.72;
      const halfLeading = (lineHeight - fontSize) / 2;
      lines.forEach((line, i) => {
        const text =
          cs.textTransform === "uppercase" ? line.toUpperCase() : line;
        c2d.fillText(text, x, y0 + lineHeight * i + halfLeading + ascent);
      });
      ctx.activeTexture(ctx.TEXTURE0);
      ctx.bindTexture(ctx.TEXTURE_2D, textTex);
      ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      ctx.texImage2D(
        ctx.TEXTURE_2D,
        0,
        ctx.RGBA,
        ctx.RGBA,
        ctx.UNSIGNED_BYTE,
        off,
      );
      hasText = 1;
    }

    // ── state ──
    let rx = 0.3;
    let ry = -0.55;
    let vx = 0;
    let vy = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let morph = Math.random() * 4;
    let scrollEnergy = 0;
    let lastScroll = window.scrollY || 0;
    let visible = true;
    let raf: number | null = null;
    const t0 = performance.now();
    const tint: [number, number, number] = tintColor
      ? hexToRgb(tintColor)
      : [0, 0, 0];

    function isDark() {
      const dt = document.documentElement.getAttribute("data-theme");
      if (dt === "dark") return 1;
      if (dt === "light") return 0;
      return darkMq.matches ? 1 : 0;
    }

    function resize() {
      if (!canvas) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.viewport(0, 0, w, h);
        return true;
      }
      return false;
    }

    function objectPlacement(): { pos: [number, number, number]; s: number } {
      if (!canvas) return { pos: [0, 0, 0], s: 1 };
      const cRect = canvas.getBoundingClientRect();
      const minDim = Math.min(cRect.width, cRect.height) || 1;
      let cx = cRect.width / 2;
      let cy = cRect.height / 2;
      let rPx = minDim * 0.36;
      if (anchorId) {
        const a = document.getElementById(anchorId);
        if (a) {
          const aRect = a.getBoundingClientRect();
          cx = aRect.left + aRect.width / 2 - cRect.left;
          cy = aRect.top + aRect.height / 2 - cRect.top;
          rPx = Math.min(aRect.width, aRect.height) * 0.46;
        }
      }
      // screen px → aspect-normalized NDC → world at z=0 (camera 2.7, fov 0.72)
      const nx = (cx * 2 - cRect.width) / minDim;
      const ny = -(cy * 2 - cRect.height) / minDim;
      const world = 0.72 * 2.7;
      const rNdc = (rPx * 2) / minDim;
      const worldR = rNdc * world;
      return { pos: [nx * world, ny * world, 0], s: worldR / 0.8 };
    }

    function draw(now: number) {
      raf = null;
      if (!canvas) return;
      if (resize()) drawTextTexture();
      const t = (now - t0) / 1000;
      const reduced = reducedMq.matches;
      if (!dragging) {
        ry += vx;
        rx += vy;
        vx *= 0.94;
        vy *= 0.94;
      }
      if (!reduced) {
        if (!dragging) ry += 0.0026;
        morph += 0.0022 + scrollEnergy * 0.02 + (dragging ? 0.003 : 0);
        scrollEnergy *= 0.94;
      }
      rx = Math.max(-1.3, Math.min(1.3, rx));
      const { pos, s } = objectPlacement();
      ctx.clearColor(0, 0, 0, 0);
      ctx.clear(ctx.COLOR_BUFFER_BIT);
      ctx.uniform2f(uRes, canvas.width, canvas.height);
      ctx.uniform1f(uTime, reduced ? 1.7 : t);
      ctx.uniform1f(uMorph, reduced ? 0.5 : morph);
      ctx.uniform2f(uRot, ry, rx);
      ctx.uniform1f(uDark, isDark());
      ctx.uniform1f(uChrome, variant === "chrome" ? 1 : 0);
      ctx.uniform3f(uObjPos, pos[0], pos[1], pos[2]);
      ctx.uniform1f(uScale, s);
      ctx.uniform1f(uTint, tintColor ? 1 : 0);
      ctx.uniform3f(uTintColor, tint[0], tint[1], tint[2]);
      ctx.uniform3f(uInk, ink[0], ink[1], ink[2]);
      ctx.uniform1f(uHasText, hasText);
      ctx.uniform1i(uText, 0);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
      if (visible && !document.hidden && !reduced) schedule();
    }

    function schedule() {
      if (raf === null) raf = requestAnimationFrame(draw);
    }

    // ── drag: on the anchor (hero, canvas is pointer-transparent) or the
    //    canvas itself (closer). Horizontal-only on touch keeps scrolling. ──
    const dragEl =
      (!interactive && anchorId && document.getElementById(anchorId)) ||
      canvas;
    dragEl.style.touchAction = "pan-y";
    dragEl.style.cursor = "grab";

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      dragEl.style.cursor = "grabbing";
      try {
        dragEl.setPointerCapture(e.pointerId);
      } catch {
        /* older Safari */
      }
      schedule();
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = (e.clientX - lastX) * 0.008;
      const dy = e.pointerType === "touch" ? 0 : (e.clientY - lastY) * 0.008;
      ry += dx;
      rx += dy;
      vx = dx;
      vy = dy;
      lastX = e.clientX;
      lastY = e.clientY;
      schedule();
    }
    function onUp() {
      dragging = false;
      dragEl.style.cursor = "grab";
    }
    dragEl.addEventListener("pointerdown", onDown);
    dragEl.addEventListener("pointermove", onMove);
    dragEl.addEventListener("pointerup", onUp);
    dragEl.addEventListener("pointercancel", onUp);

    function onScroll() {
      const y = window.scrollY || 0;
      scrollEnergy = Math.min(
        1.6,
        scrollEnergy + Math.abs(y - lastScroll) * 0.004,
      );
      lastScroll = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) schedule();
    });
    io.observe(canvas);

    function onVis() {
      if (!document.hidden && visible) schedule();
    }
    document.addEventListener("visibilitychange", onVis);

    function onResize() {
      schedule();
    }
    window.addEventListener("resize", onResize);

    const mo = new MutationObserver(() => {
      drawTextTexture();
      schedule();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    function onTheme() {
      drawTextTexture();
      schedule();
    }
    darkMq.addEventListener("change", onTheme);
    reducedMq.addEventListener("change", onTheme);

    function onLost(e: Event) {
      e.preventDefault();
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    }
    function onRestored() {
      setFailed(true); // simplest safe recovery: show the poster
    }
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    // fonts affect the rasterized headline — redraw once they're ready
    document.fonts?.ready.then(() => {
      drawTextTexture();
      schedule();
    });

    resize();
    drawTextTexture();
    schedule();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      dragEl.removeEventListener("pointerdown", onDown);
      dragEl.removeEventListener("pointermove", onMove);
      dragEl.removeEventListener("pointerup", onUp);
      dragEl.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      darkMq.removeEventListener("change", onTheme);
      reducedMq.removeEventListener("change", onTheme);
      mo.disconnect();
      io.disconnect();
      ctx.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant, anchorId, refractTargetId, interactive, tintColor]);

  if (failed) {
    return (
      <div
        className={className}
        role="img"
        aria-label={label}
        style={{ display: "grid", placeItems: "center" }}
      >
        <span className="bk font-mono text-[10px] uppercase tracking-[0.14em] opacity-50">
          The Shape — needs WebGL
        </span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={label}
      style={interactive ? undefined : { pointerEvents: "none" }}
    />
  );
}
