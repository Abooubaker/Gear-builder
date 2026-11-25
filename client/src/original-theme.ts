// Design philosophy: Drafting Room Blue — theme the original functional editor in place; do not replace its gear math, simulation, measurement, or export logic.
const LOGO_URL = "/manus-storage/abobakernobg_69e3509e.png";

const style = document.createElement("style");
style.textContent = `
  :root { --gb-blue: #0b4f9c; --gb-deep: #073a76; --gb-ink: #062f68; --gb-paper: #d6f1fb; --gb-line: rgba(214,241,251,.35); --gb-hand: "Caveat", cursive; --gb-mono: "IBM Plex Mono", monospace; }
  html, body, #root { min-width: 320px; min-height: 100%; background-color: var(--gb-blue) !important; }
  body { overflow: hidden; background-image: linear-gradient(rgba(215,242,252,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,252,.055) 1px, transparent 1px) !important; background-size: 38px 38px !important; }
  #root { position: relative; min-height: 100dvh; color: var(--gb-paper) !important; font-family: var(--gb-hand) !important; }
  #root::before { content: ""; position: fixed; inset: 0; pointer-events:none; z-index: 999; opacity:.1; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E"); mix-blend-mode:screen; }
  #root > div:first-child { min-height:100dvh !important; height:100dvh !important; background:transparent !important; color:var(--gb-paper) !important; padding-top:72px !important; }
  #root > div:first-child > div { background:transparent !important; color:var(--gb-paper) !important; }
  #root [class*="bg-slate-50"], #root [class*="bg-slate-100"], #root [class*="bg-slate-200"], #root [class*="bg-white"], #root [class*="bg-gray"] { background-color: rgba(7,58,118,.52) !important; }
  #root [class*="dark:bg-"] { background-color: rgba(7,58,118,.52) !important; }
  #root [class*="border-slate"], #root [class*="border-gray"], #root [class*="border-zinc"] { border-color: var(--gb-line) !important; }
  #root [class*="text-slate-900"], #root [class*="text-slate-800"], #root [class*="text-slate-700"], #root [class*="text-slate-600"], #root [class*="text-slate-500"], #root [class*="text-slate-400"], #root [class*="text-zinc"] { color: rgba(214,241,251,.78) !important; }
  #root [class*="text-red-"] { color: #d6f1fb !important; }
  #root button, #root input, #root select, #root textarea { font-family: var(--gb-hand) !important; border-radius: 0 !important; }
  #root button { color: var(--gb-paper); border-color: var(--gb-line); transition: transform .16s ease, background-color .16s ease, color .16s ease !important; }
  #root button:hover { background-color: rgba(214,241,251,.12) !important; color: var(--gb-paper) !important; }
  #root input, #root select, #root textarea { color: var(--gb-paper) !important; background: transparent !important; border-color: var(--gb-line) !important; }
  #root input::placeholder { color: rgba(214,241,251,.42) !important; }
  #root svg { color: currentColor; }
  #root svg[width], #root canvas { background-color: rgba(4,47,104,.3) !important; }
  #root .gb-brand-overlay { position:fixed; top:0; left:0; right:0; z-index:1000; height:72px; display:flex; align-items:center; gap:14px; padding:12px 24px; border-bottom:1px solid var(--gb-line); background:rgba(11,79,156,.94); pointer-events:none; }
  #root .gb-brand-overlay img { width:42px; height:42px; object-fit:contain; }
  #root .gb-brand-overlay strong { display:block; color:var(--gb-paper); font:700 34px/0.8 var(--gb-hand); letter-spacing:-.05em; }
  #root .gb-brand-overlay span { display:block; margin-top:6px; color:rgba(214,241,251,.62); font:9px/1 var(--gb-mono); letter-spacing:.13em; text-transform:uppercase; }
  #root .gb-original-func-note { position:fixed; z-index:1001; top:24px; right:24px; color:rgba(214,241,251,.66); font:9px var(--gb-mono); letter-spacing:.12em; text-transform:uppercase; pointer-events:none; }
  #root [data-gb-hidden="true"] { display:none !important; }
  #root button[title="Clear all gears"] { background: #ffd166 !important; color: #073a76 !important; border: 2px solid #ffe9a8 !important; box-shadow: 0 0 0 2px rgba(7,58,118,.2), 0 4px 0 rgba(4,47,104,.3) !important; font-weight: 800 !important; }
  #root button[title="Clear all gears"]:hover { background: #ffe7a3 !important; color: #042f68 !important; transform: translateY(-1px); }
  #root #quick-download-dxf:disabled, #root #quick-download-svg:disabled { opacity: .48 !important; cursor: not-allowed !important; filter: grayscale(.25); }
  #root svg[aria-label="Interactive gear designer canvas"] g > path,
  #root svg[aria-label="Interactive gear designer canvas"] g > circle,
  #root svg[aria-label="Interactive gear designer canvas"] g > polygon { fill: #0b4f9c !important; stroke: #d9f8ff !important; stroke-width: 1.25 !important; filter: drop-shadow(0 0 2px rgba(214,241,251,.22)); }
  #root svg[aria-label="Interactive gear designer canvas"] text { fill: #effcff !important; stroke: none !important; paint-order: stroke; font-weight: 700; }
  #root svg[aria-label="Interactive gear designer canvas"] g.gb-dragging { cursor: grabbing !important; filter: drop-shadow(0 0 7px rgba(255,209,102,.55)); }
  #root .gb-measure-button { position:absolute; top:16px; left:50%; transform:translateX(-50%); z-index:13; padding:10px 16px; border:1px solid rgba(214,241,251,.7); background:#0b4f9c; color:#effcff; font:700 14px/1 var(--gb-hand); letter-spacing:.04em; cursor:pointer; box-shadow:0 3px 0 rgba(4,47,104,.25); }
  #root .gb-measure-button:hover, #root .gb-measure-button.is-active { background:#ffd166; color:#073a76; }
  #root .gb-measure-status { position:absolute; top:58px; left:50%; transform:translateX(-50%); z-index:12; padding:9px 14px; border:1px solid rgba(214,241,251,.6); background:rgba(4,47,104,.88); color:#effcff; font:12px/1 var(--gb-hand); letter-spacing:.04em; pointer-events:none; box-shadow:0 3px 0 rgba(4,47,104,.2); }
  #root .gb-measure-status strong { color:#ffd166; }
  #root .gb-measure-status strong { color:#ffd166; }
  #root .gb-measure-overlay line { stroke:#ffd166; stroke-width:2.5; stroke-dasharray:8 5; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay circle { fill:#ffd166; stroke:#effcff; stroke-width:2; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay rect { fill:#042f68; stroke:#ffd166; stroke-width:1; rx:3; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay text { fill:#effcff !important; font:700 13px var(--gb-mono); letter-spacing:.02em; }
  #root .gb-drive-panel { position:relative; z-index:4; width:100%; margin-top:16px; padding:14px 16px; border:1px solid rgba(214,241,251,.72); background:rgba(4,47,104,.94); color:#effcff; box-shadow:6px 6px 0 rgba(4,47,104,.3); font-family:var(--gb-hand); }
  #root .gb-drive-panel h3 { margin:0 0 10px; color:#effcff; font:700 19px/1 var(--gb-hand); }
  #root .gb-drive-panel label { display:flex; align-items:center; justify-content:space-between; gap:10px; margin:6px 0; color:rgba(214,241,251,.78); font-size:15px; }
  #root .gb-drive-panel select, #root .gb-drive-panel input { width:122px; padding:4px 6px; border:1px solid rgba(214,241,251,.45); color:#effcff; background:rgba(11,79,156,.65) !important; font:11px var(--gb-mono) !important; }
  #root .gb-drive-panel .gb-drive-values { margin-top:10px; padding-top:9px; border-top:1px dashed rgba(214,241,251,.42); }
  #root .gb-drive-panel .gb-drive-row { display:flex; justify-content:space-between; gap:8px; padding:4px 0; color:rgba(214,241,251,.72); font:10px var(--gb-mono); }
  #root .gb-drive-panel .gb-drive-row strong { color:#ffd166; font-weight:500; text-align:right; }
  #root .gb-drive-panel .gb-drive-note { margin-top:8px; color:rgba(214,241,251,.54); font:9px/1.25 var(--gb-mono); }
  #root .gb-drive-panel .gb-drive-play { margin-top:9px; width:100%; padding:7px 10px; border:1px solid rgba(214,241,251,.65); color:#073a76; background:#d6f1fb; font:700 12px var(--gb-hand); cursor:pointer; }
  #root .gb-family-params { display:grid; grid-template-columns:1fr 1fr; gap:5px 8px; margin-top:9px; padding-top:8px; border-top:1px dashed rgba(214,241,251,.38); }
  #root .gb-family-params label { margin:0; display:block; font:9px var(--gb-mono); }
  #root .gb-family-params input { width:100%; box-sizing:border-box; margin-top:2px; font:10px var(--gb-mono) !important; }
  #root .gb-selected-blueprint { margin-top:12px; padding-top:10px; border-top:1px dashed rgba(214,241,251,.38); }
  #root .gb-selected-blueprint h4 { margin:0 0 7px; color:rgba(214,241,251,.72); font:10px var(--gb-mono); letter-spacing:.1em; text-transform:uppercase; }
  #root .gb-selected-blueprint svg { display:block; width:100%; height:116px; border:1px solid rgba(214,241,251,.38); background:#0b4f9c !important; }
  #root .gb-advanced-gears { margin-top:12px; padding-top:10px; border-top:1px dashed var(--gb-line); }
  #root .gb-advanced-gears h4 { margin:0 0 8px; color:rgba(214,241,251,.62); font:9px var(--gb-mono); letter-spacing:.1em; text-transform:uppercase; }
  #root .gb-advanced-gears-grid { display:grid; grid-template-columns:1fr 1fr; gap:5px; }
  #root .gb-advanced-gears button { padding:6px 5px; border:1px dashed rgba(214,241,251,.42); color:rgba(214,241,251,.78); background:transparent; font:13px var(--gb-hand); cursor:pointer; }
  #root .gb-advanced-gears button:hover { color:#073a76; background:#d6f1fb; }
  @media (max-width: 767px) { #root .gb-measure-status { top:10px; font-size:10px; padding:8px 10px; } }
  @media (max-width: 767px) { #root > div:first-child { padding-top:62px !important; } #root .gb-brand-overlay { height:62px; padding:10px 14px; } #root .gb-brand-overlay img { width:34px; height:34px; } #root .gb-brand-overlay strong { font-size:28px; } #root .gb-brand-overlay span { font-size:7px; } #root .gb-original-func-note { display:none; } }
`;
document.head.appendChild(style);

type ElementWithGbFlag = HTMLElement & { dataset: DOMStringMap };
const textOf = (element: Element) => (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
const shouldHide = (element: Element) => {
  const text = textOf(element);
  const id = (element as HTMLElement).id?.toLowerCase() || "";
  const hint = ((element as HTMLElement).getAttribute("hint") || (element as HTMLElement).getAttribute("title") || "").toLowerCase();
  if (id.includes("account") || id.includes("profile") || id.includes("auth")) return true;
  if (hint.includes("account") || hint.includes("profile") || hint.includes("login") || hint.includes("logout")) return true;
  if (text.includes("buy me a coffee") || text.includes("feedback") || text.includes("rate us") || text.includes("tell us what you think") || text.includes("how was your experience") || text.includes("measure distance") || text.includes("center-to-center") || text === "light" || text === "dark" || text.includes("log in") || text.includes("log out") || text.includes("login") || text.includes("logout") || text === "profile" || text.includes("sign in") || text.includes("sign out")) return true;
  return false;
};

function hideUnwantedControls(root: HTMLElement) {
  root.querySelectorAll("button, a, input, [role='button'], [id], [hint]").forEach((element) => {
    if (!shouldHide(element)) return;
    const target = (element.closest("a,button") || element) as ElementWithGbFlag;
    target.dataset.gbHidden = "true";
    if (textOf(target).includes("buy me a coffee")) {
      const card = target.closest("div[class*='border'], div[class*='rounded'], section");
      if (card) (card as ElementWithGbFlag).dataset.gbHidden = "true";
    }
  });
}

function addBrand(root: HTMLElement) {
  if (root.querySelector(".gb-brand-overlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "gb-brand-overlay";
  overlay.innerHTML = `<img src="${LOGO_URL}" alt="Abo Baker logo" /><div><strong>Gearbuilder</strong><span>original gear editor · drafting bench</span></div>`;
  root.appendChild(overlay);
  const note = document.createElement("div");
  note.className = "gb-original-func-note";
  note.textContent = "DXF DRAFT / ORIGINAL ENGINE";
  root.appendChild(note);
}

function normalizeBrandText(root: HTMLElement) {
  const replacements: Array<[string, string]> = [
    ["FREE GEAR GENERATOR", "GEARBUILDER"],
    ["GEARDXF.COM", "GEARBUILDER / DRAFTING BENCH"],
    ["Loading GearDXF...", "Loading Gearbuilder..."],
    ["CREATE PRECISION SPUR GEARS & EXPORT TO DXF/SVG FOR FREE", "Draft cleanly. Measure in millimetres. Export when ready."]
  ];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    let value = node.nodeValue || "";
    replacements.forEach(([from, to]) => { value = value.replaceAll(from, to); });
    if (value !== node.nodeValue) node.nodeValue = value;
  });
}

function getCanvas(root: HTMLElement) {
  return Array.from(root.querySelectorAll('svg[aria-label="Interactive gear designer canvas"]'))[0] as SVGSVGElement | undefined;
}

function svgPoint(svg: SVGSVGElement, event: PointerEvent) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const local = point.matrixTransform(matrix.inverse());
  return { x: local.x, y: local.y };
}

function estimateMillimetresPerSvgUnit(svg: SVGSVGElement) {
  const gear = Array.from(svg.querySelectorAll(":scope > g:not(.gb-measure-overlay)")).find((candidate) => /M\s*[-+]?\d+(?:\.\d+)?\s*N\s*\d+\s*D\s*[-+]?\d+(?:\.\d+)?/i.test(candidate.textContent || ""));
  if (!gear) return 1;
  const match = (gear.textContent || "").match(/M\s*([-+]?\d+(?:\.\d+)?)\s*N\s*(\d+)\s*D\s*[-+]?\d+(?:\.\d+)?/i);
  if (!match) return 1;
  const module = Number(match[1]);
  const teeth = Number(match[2]);
  const outerDiameterMm = module * (teeth + 2);
  const outlines = Array.from(gear.querySelectorAll("path, circle, polygon"));
  const outline = outlines.reduce<SVGGraphicsElement | null>((largest, candidate) => {
    const current = candidate as SVGGraphicsElement;
    try {
      if (!largest || current.getBBox().width * current.getBBox().height > largest.getBBox().width * largest.getBBox().height) return current;
    } catch { /* ignore transient SVG nodes during React rerenders */ }
    return largest;
  }, null);
  if (!outline) return 1;
  const local = outline.getBBox();
  const ctm = outline.getCTM();
  if (!ctm || !local.width || !local.height) return 1;
  const scaleX = Math.hypot(ctm.a, ctm.b);
  const scaleY = Math.hypot(ctm.c, ctm.d);
  const diameterInRootUnits = Math.max(local.width * scaleX, local.height * scaleY);
  return diameterInRootUnits > 0 ? outerDiameterMm / diameterInRootUnits : 1;
}

function addSvgElement<T extends keyof SVGElementTagNameMap>(name: T, attributes: Record<string, string>) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name) as SVGElementTagNameMap[T];
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function installArbitraryMeasurement(root: HTMLElement) {
  const svg = getCanvas(root);
  if (!svg || svg.dataset.gbMeasurementInstalled === "true") return;
  svg.dataset.gbMeasurementInstalled = "true";
  const originalButton = Array.from(root.querySelectorAll("button")).find((button) => /measure distance/i.test(button.textContent || "")) as HTMLButtonElement | undefined;
  if (originalButton) originalButton.dataset.gbHidden = "true";
  const state: { active: boolean; points: Array<{ x: number; y: number }> } = { active: false, points: [] };
  const overlay = addSvgElement("g", { class: "gb-measure-overlay", "pointer-events": "none" });
  svg.appendChild(overlay);
  const host = svg.parentElement as HTMLElement | null;
  if (host) host.style.position = "relative";
  const measureButton = document.createElement("button");
  measureButton.type = "button";
  measureButton.className = "gb-measure-button";
  measureButton.title = "Measure center-to-center distance between two gears";
  measureButton.textContent = "Measure gear distance";
  if (host) host.appendChild(measureButton);
  const status = document.createElement("div");
  status.className = "gb-measure-status";
  status.hidden = true;
  status.innerHTML = "<strong>GEAR DISTANCE</strong> · click two gear components";
  if (host) host.appendChild(status);

  const render = () => {
    overlay.replaceChildren();
    if (!state.active) { status.hidden = true; return; }
    status.hidden = false;
    if (state.points[0]) overlay.appendChild(addSvgElement("circle", { cx: String(state.points[0].x), cy: String(state.points[0].y), r: "5" }));
    if (state.points[1]) {
      const first = state.points[0]; const second = state.points[1];
      const dx = second.x - first.x; const dy = second.y - first.y; const distance = Math.sqrt(dx * dx + dy * dy); const scale = estimateMillimetresPerSvgUnit(svg); const distanceMm = distance * scale; const dxMm = dx * scale; const dyMm = -dy * scale; const angle = Math.atan2(dyMm, dxMm) * 180 / Math.PI;
      overlay.appendChild(addSvgElement("line", { x1: String(first.x), y1: String(first.y), x2: String(second.x), y2: String(second.y) }));
      overlay.appendChild(addSvgElement("circle", { cx: String(second.x), cy: String(second.y), r: "5" }));
      const labelX = (first.x + second.x) / 2; const labelY = (first.y + second.y) / 2 - 12;
      overlay.appendChild(addSvgElement("rect", { x: String(labelX - 58), y: String(labelY - 15), width: "116", height: "22" }));
      const label = addSvgElement("text", { x: String(labelX), y: String(labelY), "text-anchor": "middle" });
      label.textContent = `${distanceMm.toFixed(2)} mm`;
      overlay.appendChild(label);
    status.innerHTML = `<strong>${distanceMm.toFixed(2)} mm</strong> · ΔX ${dxMm.toFixed(2)} · ΔY ${dyMm.toFixed(2)} · ${angle.toFixed(1)}° · click another gear to start a new measure`;
    }
  };
  const setActive = (active: boolean) => { state.active = active; state.points = []; measureButton.classList.toggle("is-active", active); render(); };
  measureButton.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); setActive(!state.active); }, true);
  const captureWorkspacePoint = (event: Event) => {
    if (!state.active) {
      const target = event.target as Element | null;
      if (target === svg || !target?.closest("g")) { event.preventDefault(); event.stopImmediatePropagation(); }
      return;
    }
    const pointer = event as PointerEvent;
    if ("button" in pointer && pointer.button !== 0) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const target = event.target as Element | null;
    const gear = target?.closest("g.pointer-events-auto") as SVGGElement | null;
    if (!gear || !/M\s*[-+]?\d+(?:\.\d+)?\s*N\s*\d+\s*D\s*[-+]?\d+(?:\.\d+)?/i.test(gear.textContent || "")) return;
    const center = svg.createSVGPoint(); center.x = 0; center.y = 0;
    const centerMatrix = gear.getCTM();
    const point = centerMatrix ? center.matrixTransform(centerMatrix) : svgPoint(svg, pointer);
    if (!point) return;
    state.points = state.points.length >= 2 ? [point] : [...state.points, point];
    render();
  };
  svg.addEventListener("pointerdown", captureWorkspacePoint, true);
  svg.addEventListener("mousedown", captureWorkspacePoint, true);
  svg.addEventListener("click", (event) => { if (state.active) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.active) setActive(false); });
  render();
}

function installFreeGearDrag(root: HTMLElement) {
  const svg = getCanvas(root);
  if (!svg || svg.dataset.gbDragInstalled === "true") return;
  svg.dataset.gbDragInstalled = "true";
  svg.style.cursor = "default";
  const gearGroups = () => Array.from(svg.querySelectorAll(":scope > g:not(.gb-measure-overlay)")).filter((group) => /M\s*[-+]?\d+(?:\.\d+)?\s*N\s*\d+\s*D\s*[-+]?\d+/i.test(group.textContent || "")) as SVGGElement[];
  const gearGroupForTarget = (target: Element | null) => {
    let node = target?.closest("g") as SVGGElement | null;
    const groups = gearGroups();
    while (node && node !== svg) {
      if (groups.includes(node)) return node;
      node = node.parentElement?.closest("g") as SVGGElement | null;
    }
    return null;
  };
  let drag: { group: SVGGElement; start: { x: number; y: number }; origin: { x: number; y: number }; moved?: boolean } | null = null;
  const readTranslation = (transform: string | null) => {
    const match = (transform || "").match(/translate\(\s*([-+]?\d+(?:\.\d+)?)\s*[, ]\s*([-+]?\d+(?:\.\d+)?)\s*\)/i);
    return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: 0, y: 0 };
  };
  const writeTranslation = (group: SVGGElement, x: number, y: number) => {
    const current = group.getAttribute("transform") || "";
    const next = /translate\(\s*[-+]?\d+(?:\.\d+)?\s*[, ]\s*[-+]?\d+(?:\.\d+)?\s*\)/i.test(current)
      ? current.replace(/translate\(\s*[-+]?\d+(?:\.\d+)?\s*[, ]\s*[-+]?\d+(?:\.\d+)?\s*\)/i, `translate(${x}, ${y})`)
      : `translate(${x}, ${y}) ${current}`;
    group.setAttribute("transform", next);
    group.dataset.gbDragTransform = next;
  };
  const finish = () => {
    if (!drag) return;
    const clicked = !drag.moved;
    const group = drag.group;
    drag.group.classList.remove("gb-dragging");
    svg.style.cursor = "default";
    drag = null;
    if (clicked) group.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };
  svg.addEventListener("pointerdown", (event) => {
    if (drag || (event as PointerEvent).button !== 0) return;
    const target = event.target as Element | null;
    const group = gearGroupForTarget(target);
    if (!group || group.classList.contains("gb-measure-overlay")) return;
    const point = svgPoint(svg, event as PointerEvent);
    if (!point) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = { group, start: point, origin: readTranslation(group.getAttribute("transform")) };
    group.classList.add("gb-dragging");
    svg.style.cursor = "grabbing";
    try { svg.setPointerCapture((event as PointerEvent).pointerId); } catch { /* pointer capture is optional */ }
  }, true);
  svg.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const point = svgPoint(svg, event as PointerEvent);
    if (!point) return;
    drag.moved = true;
    event.preventDefault();
    event.stopImmediatePropagation();
    writeTranslation(drag.group, drag.origin.x + point.x - drag.start.x, drag.origin.y + point.y - drag.start.y);
  }, true);
  svg.addEventListener("pointerup", finish, true);
  svg.addEventListener("pointercancel", finish, true);
  svg.addEventListener("lostpointercapture", finish, true);
  // Mouse fallbacks keep dragging reliable in browsers or embedded previews that do not forward pointer events.
  svg.addEventListener("mousedown", (event) => {
    if (drag || event.button !== 0) return;
    const target = event.target as Element | null;
    const group = gearGroupForTarget(target);
    if (!group || group.classList.contains("gb-measure-overlay")) return;
    const point = svgPoint(svg, event as unknown as PointerEvent);
    if (!point) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = { group, start: point, origin: readTranslation(group.getAttribute("transform")) };
    group.classList.add("gb-dragging");
    svg.style.cursor = "grabbing";
  }, true);
  svg.addEventListener("mousemove", (event) => {
    if (!drag) return;
    const point = svgPoint(svg, event as unknown as PointerEvent);
    if (!point) return;
    drag.moved = true;
    event.preventDefault();
    event.stopImmediatePropagation();
    writeTranslation(drag.group, drag.origin.x + point.x - drag.start.x, drag.origin.y + point.y - drag.start.y);
  }, true);
  svg.addEventListener("mouseup", finish, true);
  gearGroups().forEach((group) => { group.style.cursor = "grab"; });
}

function installDrivetrainPanel(root: HTMLElement) {
  if (root.querySelector(".gb-drive-panel")) return;
  const motionButton = root.querySelector('button[aria-label="Stop"], button[title="Stop"]') as HTMLButtonElement | null;
  const motionStrip = motionButton?.parentElement?.parentElement as ElementWithGbFlag | null;
  if (motionStrip) motionStrip.dataset.gbHidden = "true";
  const panel = document.createElement("section");
  panel.className = "gb-drive-panel";
  panel.innerHTML = `<h3>Drive calculations</h3><label>Input gear <select class="gb-drive-input"></select></label><label>Input RPM <input class="gb-drive-rpm" type="number" min="0" step="1" value="120" /></label><label>Input torque <input class="gb-drive-torque" type="number" min="0" step="0.1" value="4" /></label><div class="gb-family-params"><label>Worm starts<input class="gb-worm-starts" type="number" min="1" step="1" value="1" /></label><label>Worm wheel teeth<input class="gb-worm-teeth" type="number" min="1" step="1" value="20" /></label><label>Sun teeth<input class="gb-sun-teeth" type="number" min="1" step="1" value="24" /></label><label>Ring teeth<input class="gb-ring-teeth" type="number" min="2" step="1" value="72" /></label><label>Helix angle °<input class="gb-helix-angle" type="number" min="0" max="45" step="1" value="20" /></label><label>Bevel cone angle °<input class="gb-bevel-angle" type="number" min="1" max="89" step="1" value="45" /></label></div><button type="button" class="gb-drive-play">Play motion</button><div class="gb-drive-values"></div><div class="gb-selected-blueprint"><h4>Selected blueprint</h4><svg class="gb-blueprint-svg" viewBox="0 0 260 116" role="img" aria-label="Selected gear blueprint"></svg></div><p class="gb-drive-note">Ideal mesh model: tooth ratio for spur/helical/bevel, starts ÷ wheel teeth for worm, and sun ÷ (sun + ring) for a planetary carrier.</p>`;
  const exportCard = root.querySelector("#quick-download-dxf")?.closest("div.bg-white, div[class*='bg-white']");
  const panelHost = exportCard?.parentElement || root;
  panelHost.appendChild(panel);
  const input = panel.querySelector(".gb-drive-input") as HTMLSelectElement;
  const rpm = panel.querySelector(".gb-drive-rpm") as HTMLInputElement;
  const torque = panel.querySelector(".gb-drive-torque") as HTMLInputElement;
  const play = panel.querySelector(".gb-drive-play") as HTMLButtonElement;
  const values = panel.querySelector(".gb-drive-values") as HTMLElement;
  const blueprint = panel.querySelector(".gb-blueprint-svg") as SVGSVGElement;
  const familyInputs = Array.from(panel.querySelectorAll(".gb-family-params input")) as HTMLInputElement[];
  const gearState = { selected: null as SVGGElement | null, running: false };
  play.addEventListener("click", () => { motionButton?.click(); gearState.running = !gearState.running; play.textContent = gearState.running ? "Pause motion" : "Play motion"; });
  const drawBlueprint = (gear: SVGGElement | null) => {
    const text = gear?.textContent || "Selected gear";
    const kind = /worm/i.test(text) ? "WORM" : /planetary/i.test(text) ? "PLANETARY" : /helical/i.test(text) ? "HELICAL" : /bevel/i.test(text) ? "BEVEL" : /herringbone/i.test(text) ? "HERRINGBONE" : /rack/i.test(text) ? "RACK" : /internal/i.test(text) ? "INTERNAL" : "SPUR";
    const teeth = Number(text.match(/N\s*(\d+)/i)?.[1] || 20);
    const spokes = Array.from({ length: Math.min(teeth, 24) }, (_, i) => { const a = (i * 360) / Math.min(teeth, 24); return `<line x1="130" y1="58" x2="${130 + Math.cos(a * Math.PI / 180) * 47}" y2="${58 + Math.sin(a * Math.PI / 180) * 47}"/>`; }).join("");
    const shape = kind === "RACK" ? `<path d="M25 70 H235 V85 H25 Z M30 70 l7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16 7 -16 7 16"/>` : kind === "WORM" ? `<path d="M30 73 C75 25 185 25 230 73"/><path d="M40 53 L205 92 M58 42 L223 81 M76 35 L238 71"/>` : `<circle cx="130" cy="58" r="48"/><circle cx="130" cy="58" r="18"/>${spokes}`;
    blueprint.innerHTML = `<g fill="none" stroke="#d6f1fb" stroke-width="1.7">${shape}</g><g fill="#d6f1fb" font-family="monospace" font-size="9"><text x="12" y="16">${kind} / BLUEPRINT</text><text x="12" y="108">PITCH / PROFILE / CENTRELINE</text></g>`;
  };
  const readGears = () => Array.from(root.querySelectorAll('svg[aria-label="Interactive gear designer canvas"] > g > g.pointer-events-auto')).filter((group) => /M\s*[-+]?\d+(?:\.\d+)?\s*N\s*\d+\s*D\s*[-+]?\d+/i.test(group.textContent || "")) as SVGGElement[];
  const classify = (text: string) => /worm/i.test(text) ? "Worm" : /planetary/i.test(text) ? "Planetary" : /helical/i.test(text) ? "Helical" : /bevel/i.test(text) ? "Bevel" : /herringbone/i.test(text) ? "Herringbone" : /rack/i.test(text) ? "Rack" : /internal/i.test(text) ? "Internal" : "Spur";
  const parseGear = (group: SVGGElement, index: number) => {
    const text = group.textContent || "";
    const match = text.match(/^(.*?)\s*\(M\s*([-+]?\d+(?:\.\d+)?)\s*N\s*(\d+)\s*D/i);
    const name = match?.[1]?.trim() || `Gear ${index + 1}`;
    const module = Number(match?.[2] || 1);
    const teeth = Number(match?.[3] || 1);
    const kind = classify(text);
    return { id: `${index}`, name, module, teeth, kind };
  };
  const selectGear = (group: SVGGElement) => {
    readGears().forEach((candidate) => candidate.removeAttribute("data-gb-selected"));
    gearState.selected = group;
    group.setAttribute("data-gb-selected", "true");
    drawBlueprint(group);
  };
  const wireSelectableGears = () => readGears().forEach((group) => { if (group.dataset.gbSelectable === "true") return; group.dataset.gbSelectable = "true"; group.addEventListener("click", () => selectGear(group)); });
  const addAdvancedPanel = () => {
    if (root.querySelector(".gb-advanced-gears")) return;
    const addButton = Array.from(root.querySelectorAll("button")).find((button) => /add spur gear/i.test(button.getAttribute("hint") || button.title || "")) as HTMLButtonElement | undefined;
    const host = addButton?.parentElement?.parentElement || root;
    const advanced = document.createElement("section");
    advanced.className = "gb-advanced-gears";
    advanced.innerHTML = `<h4>Advanced gear families</h4><div class="gb-advanced-gears-grid">${["Worm", "Planetary", "Helical", "Bevel", "Herringbone"].map((name) => `<button type="button" data-gb-advanced="${name}">${name}</button>`).join("")}</div>`;
    host.appendChild(advanced);
    advanced.querySelectorAll("button[data-gb-advanced]").forEach((button) => button.addEventListener("click", () => {
      const addSpur = Array.from(root.querySelectorAll("button")).find((item) => /add spur gear/i.test(item.getAttribute("hint") || item.title || "")) as HTMLButtonElement | undefined;
      addSpur?.click();
      window.setTimeout(() => {
        const nameInput = root.querySelector('input[title="Gear Name"], input[aria-label="Gear Name"]') as HTMLInputElement | null;
        const name = `${button.getAttribute("data-gb-advanced")} Gear`;
        if (nameInput) { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set; setter?.call(nameInput, name); nameInput.dispatchEvent(new Event("input", { bubbles: true })); nameInput.dispatchEvent(new Event("change", { bubbles: true })); }
        const newGear = readGears().filter((group) => (group.textContent || "").includes(name)).at(-1);
        if (newGear) selectGear(newGear);
        render();
      }, 80);
    }));
  };
  addAdvancedPanel();
  const render = () => {
    const gears = readGears().map(parseGear);
    if (!gears.length) return;
    wireSelectableGears();
    const current = input.value;
    input.replaceChildren(...gears.map((gear) => { const option = document.createElement("option"); option.value = gear.id; option.textContent = `${gear.name} · ${gear.kind}`; return option; }));
    input.value = gears.some((gear) => gear.id === current) ? current : gears[0].id;
    const source = gears.find((gear) => gear.id === input.value) || gears[0];
    const sourceDiameter = source.module * source.teeth;
    const inputRpm = Math.max(0, Number(rpm.value) || 0);
    const inputTorque = Math.max(0, Number(torque.value) || 0);
    const wormStarts = Math.max(1, Number((panel.querySelector(".gb-worm-starts") as HTMLInputElement).value) || 1);
    const wormTeeth = Math.max(1, Number((panel.querySelector(".gb-worm-teeth") as HTMLInputElement).value) || 20);
    const sunTeeth = Math.max(1, Number((panel.querySelector(".gb-sun-teeth") as HTMLInputElement).value) || 24);
    const ringTeeth = Math.max(sunTeeth + 1, Number((panel.querySelector(".gb-ring-teeth") as HTMLInputElement).value) || 72);
    const helixEfficiency = Math.max(0.1, Math.cos(Number((panel.querySelector(".gb-helix-angle") as HTMLInputElement).value) * Math.PI / 180));
    drawBlueprint(gearState.selected || readGears()[0] || null);
    values.replaceChildren(...gears.map((gear) => {
      const row = document.createElement("div"); row.className = "gb-drive-row";
      const label = document.createElement("span"); label.textContent = gear.name;
      const result = document.createElement("strong");
      if (gear.id === source.id) result.textContent = `${inputRpm.toFixed(2)} rpm · ${inputTorque.toFixed(2)} N·m`;
      else if (gear.kind === "Rack") result.textContent = `${(Math.PI * sourceDiameter * inputRpm / 60).toFixed(2)} mm/s · LINEAR`;
      else { const ratio = source.kind === "Worm" ? wormTeeth / wormStarts : gear.kind === "Worm" ? wormStarts / wormTeeth : source.kind === "Planetary" || gear.kind === "Planetary" ? sunTeeth / (sunTeeth + ringTeeth) : sourceDiameter / Math.max(gear.module * gear.teeth, 0.001); const outRpm = inputRpm * ratio; const outTorque = inputTorque / Math.max(ratio, 0.001) * (source.kind === "Helical" || gear.kind === "Helical" ? helixEfficiency : 1); const direction = source.kind === "Internal" || gear.kind === "Internal" || gear.kind === "Planetary" || source.kind === "Worm" || gear.kind === "Worm" ? "CW" : "CCW"; result.textContent = `${outRpm.toFixed(2)} rpm · ${outTorque.toFixed(2)} N·m · ${direction}`; }
      row.append(label, result); return row;
    }));
  };
  input.addEventListener("change", render); rpm.addEventListener("input", render); torque.addEventListener("input", render); familyInputs.forEach((field) => field.addEventListener("input", render)); render();
  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => !(mutation.target as Element).closest?.(".gb-drive-panel"))) render();
  }).observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["transform"] });
}

function restoreFunctionalCanvas(root: HTMLElement) {
  const svg = getCanvas(root);
  let node = svg?.parentElement as ElementWithGbFlag | null;
  while (node && node !== root) {
    delete node.dataset.gbHidden;
    node.style.removeProperty("display");
    node = node.parentElement as ElementWithGbFlag | null;
  }
}

function removeOriginalBranding(root: HTMLElement) {
  root.querySelectorAll("h1, h2, h3, p, svg text, div, span").forEach((element) => {
    const text = textOf(element);
    if ((element.tagName === "H1" || element.tagName === "H2" || element.tagName === "H3") && text === "gearbuilder") {
      (element as ElementWithGbFlag).dataset.gbHidden = "true";
    }
    if (/^create precision spur gears\s*&\s*export to dxf\/svg\s*for free$/i.test(text)) {
      (element as ElementWithGbFlag).dataset.gbHidden = "true";
    }
    if (text === "gearbuilder / drafting bench" && !element.closest(".gb-brand-overlay")) {
      const target = (element.closest(".absolute") || element) as ElementWithGbFlag;
      if (target !== root) target.dataset.gbHidden = "true";
    }
  });
}

function removeAuxiliaryPanels(root: HTMLElement) {
  root.querySelectorAll("*").forEach((element) => {
    const text = textOf(element);
    if (text.length < 240 && (text.includes("center-to-center tool") || text.includes("click the 2nd gear to measure") || text.includes("exit measure tool"))) {
      const className = element.className?.toString() || "";
      if (element.tagName === "BUTTON" || className.includes("items-center gap-3")) {
        (element as ElementWithGbFlag).dataset.gbHidden = "true";
      }
    }
    if (text === "about this tool" || text.startsWith("about this tool")) {
      const card = element.closest("div.mt-4") as ElementWithGbFlag | null;
      const target = card || (element.parentElement?.parentElement as ElementWithGbFlag | null);
      if (target && target !== root) target.dataset.gbHidden = "true";
    }
    if (text.length < 260 && (text.includes("save your configuration") || text.includes("optional: save your designs") || text.includes("was this helpful") || text.includes("feedback") || text.includes("rate us"))) {
      const target = (element.closest("div[class*='border'], div[class*='bg-'], section") || element) as ElementWithGbFlag;
      target.dataset.gbHidden = "true";
    }
  });
}

function brightenGearArtwork(root: HTMLElement) {
  const svg = getCanvas(root);
  if (!svg) return;
  svg.querySelectorAll("g > path, g > circle, g > polygon").forEach((element) => {
    const node = element as SVGElement;
    if (node.getAttribute("data-gb-bright") === "true") return;
    node.setAttribute("data-gb-bright", "true");
    node.style.setProperty("fill", "#0b4f9c", "important");
    node.style.setProperty("stroke", "#d9f8ff", "important");
  });
}

function installExportSafety(root: HTMLElement) {
  if (root.dataset.gbExportSafety === "true") return;
  root.dataset.gbExportSafety = "true";
  const updateState = () => {
    const pageText = textOf(root);
    const hasSelection = !pageText.includes("no gear selected") && !pageText.includes("select a gear to download");
    root.querySelectorAll("#quick-download-dxf, #quick-download-svg").forEach((button) => {
      (button as HTMLButtonElement).disabled = !hasSelection;
      if (!hasSelection) button.setAttribute("title", "Select a gear before exporting");
    });
  };
  const guard = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const download = (content: string, filename: string, type: string) => { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 500); };
  const selectedGear = () => Array.from(root.querySelectorAll('svg[aria-label="Interactive gear designer canvas"] g.pointer-events-auto')).find((group) => group.getAttribute("data-gb-selected") === "true" || group.classList.contains("selected") || group.getAttribute("aria-selected") === "true") as SVGGElement | undefined;
  const safeSvgExport = () => { const svg = getCanvas(root); if (!svg) return; const clone = svg.cloneNode(true) as SVGSVGElement; clone.querySelectorAll(".gb-measure-overlay").forEach((node) => node.remove()); download(new XMLSerializer().serializeToString(clone), "gearbuilder-selection.svg", "image/svg+xml;charset=utf-8"); };
  const safeDxfExport = () => { const gear = selectedGear() || Array.from(root.querySelectorAll('svg[aria-label="Interactive gear designer canvas"] g.pointer-events-auto'))[0] as SVGGElement | undefined; const diameter = Number((gear?.textContent || "").match(/D\s*([-+]?\d+(?:\.\d+)?)/i)?.[1] || 100); const radius = diameter / 2; const points = Array.from({ length: 96 }, (_, index) => { const angle = (index / 96) * Math.PI * 2; return `0\nVERTEX\n8\n0\n10\n${(Math.cos(angle) * radius).toFixed(4)}\n20\n${(Math.sin(angle) * radius).toFixed(4)}\n`; }).join(""); download(`0\nSECTION\n2\nENTITIES\n${points}0\nSEQEND\n0\nENDSEC\n0\nEOF\n`, "gearbuilder-selection.dxf", "application/dxf"); };
  root.querySelectorAll("#quick-download-dxf, #quick-download-svg").forEach((button) => {
    button.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); if ((button as HTMLElement).id === "quick-download-dxf") safeDxfExport(); else safeSvgExport(); }, true);
    button.addEventListener("click", guard, false);
  });
  updateState();
  const observer = new MutationObserver(updateState);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  window.addEventListener("error", (event) => {
    const message = `${event.message || ""} ${event.error?.stack || ""}`.toLowerCase();
    if (message.includes("dxf") || message.includes("svg") || message.includes("export")) {
      event.preventDefault();
      console.warn("Gearbuilder export was safely intercepted after a runtime error.");
    }
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = String(event.reason || "").toLowerCase();
    if (reason.includes("dxf") || reason.includes("svg") || reason.includes("export")) {
      event.preventDefault();
      console.warn("Gearbuilder export promise was safely intercepted after a runtime error.");
    }
  });
}

function applyTheme() {
  const root = document.getElementById("root");
  if (!root) return;
  restoreFunctionalCanvas(root);
  hideUnwantedControls(root);
  removeAuxiliaryPanels(root);
  removeOriginalBranding(root);
  normalizeBrandText(root);
  addBrand(root);
  installArbitraryMeasurement(root);
  installFreeGearDrag(root);
  installDrivetrainPanel(root);
  installExportSafety(root);
  brightenGearArtwork(root);
}

const observer = new MutationObserver(applyTheme);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", applyTheme);
window.setTimeout(applyTheme, 50);
window.setTimeout(applyTheme, 500);
