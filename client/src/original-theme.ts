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
  #root svg[aria-label="Interactive gear designer canvas"] g > polygon { fill: #79d8f1 !important; stroke: #d9f8ff !important; stroke-width: 1.25 !important; filter: drop-shadow(0 0 2px rgba(214,241,251,.22)); }
  #root svg[aria-label="Interactive gear designer canvas"] text { fill: #effcff !important; stroke: none !important; paint-order: stroke; font-weight: 700; }
  #root .gb-measure-button { position:absolute; top:16px; left:50%; transform:translateX(-50%); z-index:13; padding:10px 16px; border:1px solid rgba(214,241,251,.7); background:#0b4f9c; color:#effcff; font:700 14px/1 var(--gb-hand); letter-spacing:.04em; cursor:pointer; box-shadow:0 3px 0 rgba(4,47,104,.25); }
  #root .gb-measure-button:hover, #root .gb-measure-button.is-active { background:#ffd166; color:#073a76; }
  #root .gb-measure-status { position:absolute; top:58px; left:50%; transform:translateX(-50%); z-index:12; padding:9px 14px; border:1px solid rgba(214,241,251,.6); background:rgba(4,47,104,.88); color:#effcff; font:12px/1 var(--gb-hand); letter-spacing:.04em; pointer-events:none; box-shadow:0 3px 0 rgba(4,47,104,.2); }
  #root .gb-measure-status strong { color:#ffd166; }
  #root .gb-measure-status strong { color:#ffd166; }
  #root .gb-measure-overlay line { stroke:#ffd166; stroke-width:2.5; stroke-dasharray:8 5; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay circle { fill:#ffd166; stroke:#effcff; stroke-width:2; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay rect { fill:#042f68; stroke:#ffd166; stroke-width:1; rx:3; vector-effect:non-scaling-stroke; }
  #root .gb-measure-overlay text { fill:#effcff !important; font:700 13px var(--gb-mono); letter-spacing:.02em; }
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
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  if (!svgRect.width || !viewBox.width) return 1;
  const gear = Array.from(svg.querySelectorAll(":scope > g:not(.gb-measure-overlay)")).find((candidate) => /M\s*[-+]?\d+(?:\.\d+)?\s*N\s*\d+\s*D\s*[-+]?\d+(?:\.\d+)?/i.test(candidate.textContent || ""));
  if (!gear) return 1;
  const match = (gear.textContent || "").match(/M\s*([-+]?\d+(?:\.\d+)?)\s*N\s*(\d+)\s*D\s*([-+]?\d+(?:\.\d+)?)/i);
  if (!match) return 1;
  const module = Number(match[1]);
  const teeth = Number(match[2]);
  const outerDiameterMm = module * (teeth + 2);
  const renderedGearWidth = gear.getBoundingClientRect().width;
  const rootUnitsPerPixel = viewBox.width / svgRect.width;
  const gearWidthInRootUnits = renderedGearWidth * rootUnitsPerPixel;
  return gearWidthInRootUnits > 0 ? outerDiameterMm / gearWidthInRootUnits : 1;
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
  measureButton.title = "Measure any two points on the workspace";
  measureButton.textContent = "Measure any two points";
  if (host) host.appendChild(measureButton);
  const status = document.createElement("div");
  status.className = "gb-measure-status";
  status.hidden = true;
  status.innerHTML = "<strong>MEASURE ANYTHING</strong> · click any two points on the sheet";
  if (host) host.appendChild(status);

  const render = () => {
    overlay.replaceChildren();
    if (!state.active) { status.hidden = true; return; }
    status.hidden = false;
    if (state.points[0]) overlay.appendChild(addSvgElement("circle", { cx: String(state.points[0].x), cy: String(state.points[0].y), r: "5" }));
    if (state.points[1]) {
      const first = state.points[0]; const second = state.points[1];
      const dx = second.x - first.x; const dy = second.y - first.y; const distance = Math.sqrt(dx * dx + dy * dy); const distanceMm = distance * estimateMillimetresPerSvgUnit(svg);
      overlay.appendChild(addSvgElement("line", { x1: String(first.x), y1: String(first.y), x2: String(second.x), y2: String(second.y) }));
      overlay.appendChild(addSvgElement("circle", { cx: String(second.x), cy: String(second.y), r: "5" }));
      const labelX = (first.x + second.x) / 2; const labelY = (first.y + second.y) / 2 - 12;
      overlay.appendChild(addSvgElement("rect", { x: String(labelX - 58), y: String(labelY - 15), width: "116", height: "22" }));
      const label = addSvgElement("text", { x: String(labelX), y: String(labelY), "text-anchor": "middle" });
      label.textContent = `${distanceMm.toFixed(2)} mm`;
      overlay.appendChild(label);
      status.innerHTML = `<strong>${distanceMm.toFixed(2)} mm</strong> · click another point to start a new measure`;
    }
  };
  const setActive = (active: boolean) => { state.active = active; state.points = []; measureButton.classList.toggle("is-active", active); render(); };
  measureButton.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); setActive(!state.active); }, true);
  const captureWorkspacePoint = (event: Event) => {
    if (!state.active) {
      const target = event.target as Element | null;
      if (target === svg || !target?.closest("g")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    const pointer = event as PointerEvent;
    if ("button" in pointer && pointer.button !== 0) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const point = svgPoint(svg, pointer); if (!point) return;
    state.points = state.points.length >= 2 ? [point] : [...state.points, point];
    render();
  };
  svg.addEventListener("pointerdown", captureWorkspacePoint, true);
  svg.addEventListener("mousedown", captureWorkspacePoint, true);
  svg.addEventListener("click", (event) => { if (state.active) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.active) setActive(false); });
  render();
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
    node.style.setProperty("fill", "#79d8f1", "important");
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
  root.querySelectorAll("#quick-download-dxf, #quick-download-svg").forEach((button) => {
    button.addEventListener("click", guard, true);
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
  normalizeBrandText(root);
  addBrand(root);
  installArbitraryMeasurement(root);
  installExportSafety(root);
  brightenGearArtwork(root);
}

const observer = new MutationObserver(applyTheme);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", applyTheme);
window.setTimeout(applyTheme, 50);
window.setTimeout(applyTheme, 500);
