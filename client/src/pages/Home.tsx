// Design philosophy: Drafting Room Blue — Gearbuilder keeps the working sheet centered and treats every gear as a movable inked component.
// Geometry is intentionally component-aware: spur teeth, inward-facing internal teeth, and rack teeth each render differently.
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowDownToLine,
  CircleDot,
  Crosshair,
  Eraser,
  Hand,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Ruler,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

const LOGO_URL = "/manus-storage/abobakernobg_69e3509e.png";
const HERO_URL = "/manus-storage/geardxf-blueprint-hero_c7d6a881.png";
const DETAIL_URL = "/manus-storage/geardxf-tooth-detail_4d0d44d2.png";
const VIEWBOX = { width: 1200, height: 760 };
const MM_PER_CANVAS_UNIT = 0.1;

type GearKind = "spur" | "internal" | "rack";
type ToolName = "select" | "measure" | "pan";
type Point = { x: number; y: number };
type GearNode = {
  id: string;
  kind: GearKind;
  teeth: number;
  module: number;
  x: number;
  y: number;
  rotation: number;
  length: number;
};

const INITIAL_GEARS: GearNode[] = [
  { id: "spur-1", kind: "spur", teeth: 24, module: 2.5, x: 370, y: 320, rotation: 0, length: 360 },
  { id: "internal-1", kind: "internal", teeth: 44, module: 2.5, x: 805, y: 320, rotation: 0, length: 360 },
  { id: "rack-1", kind: "rack", teeth: 22, module: 2.5, x: 580, y: 616, rotation: 0, length: 430 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number, digits = 2) {
  return value.toFixed(digits).replace(/\.00$/, "");
}

function pointToMm(point: Point) {
  return {
    x: (point.x - VIEWBOX.width / 2) * MM_PER_CANVAS_UNIT,
    y: (VIEWBOX.height / 2 - point.y) * MM_PER_CANVAS_UNIT,
  };
}

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function gearRadius(gear: GearNode) {
  return Math.max(78, gear.teeth * gear.module * 1.98);
}

function spurPath(teeth: number, outerRadius: number, rootRadius: number) {
  const step = (Math.PI * 2) / teeth;
  const profile = [
    [0, rootRadius], [0.1, rootRadius], [0.16, rootRadius + (outerRadius - rootRadius) * 0.42],
    [0.24, outerRadius], [0.38, outerRadius], [0.44, rootRadius + (outerRadius - rootRadius) * 0.45],
    [0.56, rootRadius + (outerRadius - rootRadius) * 0.45], [0.62, outerRadius], [0.76, outerRadius],
    [0.84, rootRadius + (outerRadius - rootRadius) * 0.42], [0.9, rootRadius], [1, rootRadius],
  ];
  const commands: string[] = [];
  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const base = tooth * step - Math.PI / 2;
    profile.forEach(([fraction, radius], pointIndex) => {
      const angle = base + fraction * step;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      commands.push(`${tooth === 0 && pointIndex === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    });
  }
  return `${commands.join(" ")} Z`;
}

function internalToothPath(teeth: number, innerRadius: number, rootRadius: number) {
  const step = (Math.PI * 2) / teeth;
  const profile = [
    [0, rootRadius], [0.12, rootRadius], [0.2, innerRadius], [0.38, innerRadius],
    [0.45, rootRadius], [0.55, rootRadius], [0.62, innerRadius], [0.8, innerRadius],
    [0.88, rootRadius], [1, rootRadius],
  ];
  const commands: string[] = [];
  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const base = tooth * step - Math.PI / 2;
    profile.forEach(([fraction, radius], pointIndex) => {
      const angle = base + fraction * step;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      commands.push(`${tooth === 0 && pointIndex === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    });
  }
  return `${commands.join(" ")} Z`;
}

function rackPath(teeth: number, length: number, toothHeight: number) {
  const left = -length / 2;
  const pitch = length / teeth;
  const commands = [`M ${left} 22`, `L ${left} -12`];
  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const start = left + tooth * pitch;
    commands.push(`L ${start + pitch * 0.2} -12`, `L ${start + pitch * 0.5} ${-12 - toothHeight}`, `L ${start + pitch * 0.8} -12`);
  }
  commands.push(`L ${left + length} -12`, `L ${left + length} 22`, "Z");
  return commands.join(" ");
}

function gearLabel(kind: GearKind) {
  if (kind === "internal") return "Internal gear";
  if (kind === "rack") return "Gear rack";
  return "Spur gear";
}

function gearShortLabel(kind: GearKind) {
  if (kind === "internal") return "INTERNAL";
  if (kind === "rack") return "RACK";
  return "SPUR";
}

function localPointFromClient(event: { clientX: number; clientY: number }, canvas: SVGSVGElement) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * VIEWBOX.width,
    y: ((event.clientY - bounds.top) / bounds.height) * VIEWBOX.height,
  };
}

function buildAssemblySvg(gears: GearNode[]) {
  const shapes = gears.map((gear) => {
    if (gear.kind === "rack") {
      return `<g transform="translate(${gear.x} ${gear.y}) rotate(${gear.rotation})"><path d="${rackPath(gear.teeth, gear.length, 30)}" fill="#0b4f9c" fill-opacity=".25" stroke="#d6f1fb" stroke-width="3"/><path d="M ${-gear.length / 2} 22 H ${gear.length / 2}" stroke="#d6f1fb" stroke-width="2"/></g>`;
    }
    const radius = gearRadius(gear);
    const root = radius * (gear.kind === "internal" ? 0.88 : 0.78);
    const shape = gear.kind === "internal" ? internalToothPath(gear.teeth, radius * 0.72, root) : spurPath(gear.teeth, radius, root);
    return `<g transform="translate(${gear.x} ${gear.y}) rotate(${gear.rotation})"><circle r="${radius}" fill="none" stroke="#83c9e5" stroke-width="2"/><path d="${shape}" fill="#0b4f9c" fill-opacity=".24" stroke="#d6f1fb" stroke-width="3"/><circle r="${Math.max(10, gear.module * 3.5)}" fill="#0b4f9c" stroke="#d6f1fb" stroke-width="2"/></g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="#0b4f9c"/><g fill="none" stroke="#8acfe9" stroke-opacity=".35" stroke-width="1"><path d="M 0 380 H 1200 M 600 0 V 760" stroke-dasharray="9 8"/></g>${shapes}<g fill="#d6f1fb" font-family="monospace" font-size="16"><text x="36" y="44">GEARBUILDER / DXF DRAFT 001</text><text x="36" y="70">SPUR · INTERNAL · RACK / LIVE MOTION STUDY</text></g></svg>`;
}

type GearGraphicProps = {
  gear: GearNode;
  angle: number;
  rackOffset: number;
  selected: boolean;
  running: boolean;
  onPointerDown: (event: ReactPointerEvent<SVGGElement>, id: string) => void;
};

function GearGraphic({ gear, angle, rackOffset, selected, running, onPointerDown }: GearGraphicProps) {
  const radius = gearRadius(gear);
  const rootRadius = radius * 0.78;
  const transform = gear.kind === "rack"
    ? `translate(${gear.x + rackOffset} ${gear.y}) rotate(${gear.rotation})`
    : `translate(${gear.x} ${gear.y}) rotate(${angle})`;
  return (
    <g
      className={`gear-graphic ${gear.kind} ${selected ? "is-selected" : ""} ${running ? "is-moving" : ""}`}
      transform={transform}
      role="button"
      tabIndex={0}
      aria-label={`${gearLabel(gear.kind)} component`}
      onPointerDown={(event) => onPointerDown(event, gear.id)}
    >
      {gear.kind === "rack" ? (
        <>
          <path d={rackPath(gear.teeth, gear.length, 30)} />
          <path className="rack-baseline" d={`M ${-gear.length / 2} 22 H ${gear.length / 2}`} />
          <line className="rack-centerline" x1={-gear.length / 2} y1="5" x2={gear.length / 2} y2="5" />
        </>
      ) : (
        <>
          <circle className="gear-envelope" r={radius + 13} />
          <circle className="gear-pitch" r={radius * 0.9} />
          {gear.kind === "internal" ? <circle className="internal-wall" r={radius} /> : null}
          <path d={gear.kind === "internal" ? internalToothPath(gear.teeth, radius * 0.72, radius * 0.88) : spurPath(gear.teeth, radius, rootRadius)} />
          <circle className="gear-bore" r={Math.max(13, gear.module * 3.5)} />
          <circle className="gear-center" r="6" />
          <line className="gear-crosshair" x1={-radius - 25} y1="0" x2={radius + 25} y2="0" />
          <line className="gear-crosshair" x1="0" y1={-radius - 25} x2="0" y2={radius + 25} />
        </>
      )}
      <text className="component-id" x={gear.kind === "rack" ? -gear.length / 2 : -radius} y={gear.kind === "rack" ? 55 : -radius - 28}>{gearShortLabel(gear.kind)} / {gear.id.split("-")[1]}</text>
    </g>
  );
}

export default function Home() {
  const [tool, setTool] = useState<ToolName>("select");
  const [gears, setGears] = useState<GearNode[]>(INITIAL_GEARS);
  const [selectedId, setSelectedId] = useState("spur-1");
  const [points, setPoints] = useState<Point[]>([]);
  const [running, setRunning] = useState(false);
  const [motionPhase, setMotionPhase] = useState(0);
  const [dragging, setDragging] = useState<{ id: string; offset: Point } | null>(null);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  const selectedGear = gears.find((gear) => gear.id === selectedId) ?? gears[0];
  const driveGear = gears.find((gear) => gear.kind === "spur") ?? gears[0];
  const measuredDistance = points.length === 2 ? distance(points[0], points[1]) * MM_PER_CANVAS_UNIT : null;
  const firstMm = points[0] ? pointToMm(points[0]) : null;
  const secondMm = points[1] ? pointToMm(points[1]) : null;

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const tick = (time: number) => {
      setMotionPhase(time / 1000);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [running]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") setTool("measure");
      if (event.key === "Escape") {
        setPoints([]);
        setDragging(null);
        setTool("select");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const updateSelected = (patch: Partial<GearNode>) => {
    if (!selectedGear) return;
    setGears((current) => current.map((gear) => gear.id === selectedGear.id ? { ...gear, ...patch } : gear));
  };

  const addGear = (kind: GearKind) => {
    const count = gears.filter((gear) => gear.kind === kind).length + 1;
    const defaults: Record<GearKind, Omit<GearNode, "id">> = {
      spur: { kind, teeth: 18, module: 2.1, x: 290 + count * 42, y: 155 + count * 34, rotation: 0, length: 360 },
      internal: { kind, teeth: 36, module: 2.1, x: 855 - count * 32, y: 195 + count * 28, rotation: 0, length: 360 },
      rack: { kind, teeth: 18, module: 2.1, x: 590, y: 670 - count * 28, rotation: 0, length: 340 },
    };
    const next = { id: `${kind}-${Date.now()}`, ...defaults[kind] };
    setGears((current) => [...current, next]);
    setSelectedId(next.id);
  };

  const removeSelected = () => {
    if (!selectedGear || gears.length <= 1) return;
    const remaining = gears.filter((gear) => gear.id !== selectedGear.id);
    setGears(remaining);
    setSelectedId(remaining[0].id);
  };

  const clearSheet = () => {
    setGears(INITIAL_GEARS);
    setSelectedId("spur-1");
    setPoints([]);
    setRunning(false);
    setTool("select");
  };

  const pointFromEvent = (event: { clientX: number; clientY: number }) => canvasRef.current ? localPointFromClient(event, canvasRef.current) : { x: 0, y: 0 };

  const handleGearPointerDown = (event: ReactPointerEvent<SVGGElement>, id: string) => {
    event.stopPropagation();
    const point = pointFromEvent(event);
    if (tool === "measure") {
      setPoints((current) => current.length >= 2 ? [point] : [...current, point]);
      return;
    }
    const gear = gears.find((item) => item.id === id);
    if (!gear) return;
    setSelectedId(id);
    if (gear.kind === "rack") {
      setDragging({ id, offset: { x: point.x - gear.x, y: point.y - gear.y } });
    } else {
      setDragging({ id, offset: { x: point.x - gear.x, y: point.y - gear.y } });
    }
    canvasRef.current?.setPointerCapture(event.pointerId);
  };

  const handleSheetPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (tool !== "measure") return;
    const point = pointFromEvent(event);
    setPoints((current) => current.length >= 2 ? [point] : [...current, point]);
  };

  const handleSheetPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const point = pointFromEvent(event);
    setGears((current) => current.map((gear) => gear.id === dragging.id ? {
      ...gear,
      x: clamp(point.x - dragging.offset.x, gear.kind === "rack" ? 190 : 95, VIEWBOX.width - (gear.kind === "rack" ? 190 : 95)),
      y: clamp(point.y - dragging.offset.y, gear.kind === "rack" ? 525 : 120, VIEWBOX.height - (gear.kind === "rack" ? 45 : 120)),
    } : gear));
  };

  const handleSheetPointerUp = () => setDragging(null);

  const exportAssembly = () => {
    const blob = new Blob([buildAssemblySvg(gears)], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "gearbuilder-assembly.svg";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const gearAngle = (gear: GearNode) => {
    if (!running || gear.kind === "rack") return gear.rotation;
    const ratio = driveGear.teeth / Math.max(1, gear.teeth);
    const direction = gear.id === driveGear.id ? 1 : -1;
    return gear.rotation + motionPhase * 32 * ratio * direction;
  };

  const rackOffset = (gear: GearNode) => gear.kind === "rack" && running ? Math.sin(motionPhase * 1.35) * 68 : 0;

  return (
    <main className="blueprint-app">
      <header className="top-rail">
        <div className="brand-lockup">
          <div className="brand-stamp" aria-label="Abo Baker logo"><img src={LOGO_URL} alt="Abo Baker logo" /></div>
          <div>
            <p className="eyebrow">FIELD NOTE 02 / DXF ASSEMBLY DRAFTING</p>
            <h1>Gearbuilder</h1>
            <p className="brand-subline">drafting bench · draft it · cut it</p>
          </div>
        </div>
        <div className="rail-note"><span className={`rail-dot ${running ? "is-running" : ""}`} /><span>{running ? "MOTION STUDY / RUNNING" : "DXF DRAFT / READY"}</span><span className="rail-divider" /><span>MM</span></div>
      </header>

      <div className="workspace">
        <aside className="tool-column">
          <section className="note-block intro-note">
            <div className="note-index">B—02</div>
            <p className="note-kicker">THE DXF ASSEMBLY TABLE</p>
            <h2>Draft the mesh.</h2>
            <p className="note-copy">Place more than one component, drag them into contact, and check the draft before the cut.</p>
          </section>

          <section className="tool-panel" aria-labelledby="tool-heading">
            <div className="section-label" id="tool-heading"><span>01</span> TABLE TOOLS</div>
            <div className="tool-list">
              <button className={`tool-button ${tool === "select" ? "is-active" : ""}`} type="button" onClick={() => setTool("select")}><CircleDot size={18} /><span><strong>Move components</strong><small>Drag any part on the sheet</small></span></button>
              <button className={`tool-button ${tool === "measure" ? "is-active" : ""}`} type="button" onClick={() => setTool("measure")}><Ruler size={18} /><span><strong>Measure distance</strong><small>Click any two points</small></span><kbd>M</kbd></button>
              <button className={`tool-button ${tool === "pan" ? "is-active" : ""}`} type="button" onClick={() => setTool("pan")}><Hand size={18} /><span><strong>Pan sheet</strong><small>Keep the plan in view</small></span></button>
            </div>
          </section>

          <section className="tool-panel add-panel" aria-labelledby="add-heading">
            <div className="section-label" id="add-heading"><span>02</span> ADD A COMPONENT</div>
            <div className="add-grid">
              <button type="button" onClick={() => addGear("spur")}><Plus size={14} /><span>Spur gear</span></button>
              <button type="button" onClick={() => addGear("internal")}><Plus size={14} /><span>Internal gear</span></button>
              <button type="button" onClick={() => addGear("rack")}><Plus size={14} /><span>Gear rack</span></button>
            </div>
          </section>

          <figure className="detail-card">
            <img src={DETAIL_URL} alt="Hand-drawn gear tooth detail" />
            <figcaption><span>REFERENCE PLATE</span><strong>Teeth meet on pitch.</strong></figcaption>
          </figure>
        </aside>

        <section className="drawing-column">
          <div className="canvas-heading">
            <div><div className="section-label"><span>03</span> CENTER WORKING SHEET / DXF</div><p className="canvas-caption">{tool === "measure" ? "MEASURE MODE / ANY TWO LOCATIONS" : running ? "MOTION STUDY / COMPONENTS IN SYNC" : "DXF-READY / DRAG TO POSITION"}</p></div>
            <div className="canvas-actions"><button type="button" className="small-icon-button" aria-label="Clear measurement" onClick={() => setPoints([])} title="Clear measurement"><Eraser size={16} /></button><button type="button" className="ink-button export-button" onClick={exportAssembly}><ArrowDownToLine size={16} /> Export SVG draft</button></div>
          </div>

          <div className={`drawing-surface ${tool === "measure" ? "measure-ready" : ""}`} style={{ backgroundImage: `url(${HERO_URL})` }}>
            <div className="surface-wash" />
            <div className="corner-mark top-left">ASSEMBLY / 001</div><div className="corner-mark top-right">N ↑</div>
            <svg ref={canvasRef} className="gear-canvas" viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} role="img" aria-label="Interactive Gearbuilder assembly working sheet" onPointerDown={handleSheetPointerDown} onPointerMove={handleSheetPointerMove} onPointerUp={handleSheetPointerUp} onPointerCancel={handleSheetPointerUp}>
              <defs><filter id="roughen" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="4" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" /></filter></defs>
              <g className="sheet-guides"><line x1="54" y1="380" x2="1146" y2="380" /><line x1="600" y1="54" x2="600" y2="706" /><circle cx="600" cy="380" r="250" /><path d="M 76 650 H 1124" strokeDasharray="8 10" /></g>
              <g className={`mesh-links ${running ? "is-running" : ""}`}><path d="M 370 320 L 805 320" /><path d="M 370 320 L 580 616" /></g>
              {gears.map((gear) => <GearGraphic key={gear.id} gear={gear} angle={gearAngle(gear)} rackOffset={rackOffset(gear)} selected={gear.id === selectedId} running={running} onPointerDown={handleGearPointerDown} />)}
              <g className="sheet-annotations"><text x="74" y="698">DRAG COMPONENTS TO TEST CLEARANCE</text><text x="930" y="698">SHEET 001 / A4</text></g>
              {points.map((point, index) => <g key={`${point.x}-${point.y}`} className="measure-point"><circle cx={point.x} cy={point.y} r="9" /><circle cx={point.x} cy={point.y} r="3" /><line x1={point.x - 18} y1={point.y} x2={point.x + 18} y2={point.y} /><line x1={point.x} y1={point.y - 18} x2={point.x} y2={point.y + 18} /><text x={point.x + 14} y={point.y - 14}>P{index + 1}</text></g>)}
              {points.length === 2 ? <g className="measure-line"><line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} /><line x1={points[0].x} y1={points[0].y - 14} x2={points[0].x} y2={points[0].y + 14} /><line x1={points[1].x} y1={points[1].y - 14} x2={points[1].x} y2={points[1].y + 14} /></g> : null}
            </svg>
            <div className="surface-footer-note"><Crosshair size={15} /> {tool === "measure" ? "Any point on the sheet is fair game." : "Select a component to edit its note."}</div>
            {measuredDistance !== null && firstMm && secondMm ? <aside className="measurement-card" aria-live="polite"><div className="measurement-card-head"><span>FIELD MEASUREMENT</span><button type="button" aria-label="Clear measurement" onClick={() => setPoints([])}><X size={15} /></button></div><strong>{formatNumber(measuredDistance)} <small>mm</small></strong><div className="measurement-coordinates"><span>P1 <b>{formatNumber(firstMm.x)}, {formatNumber(firstMm.y)}</b></span><span>P2 <b>{formatNumber(secondMm.x)}, {formatNumber(secondMm.y)}</b></span></div><p>Click anywhere to start a new measure.</p></aside> : tool === "measure" ? <aside className="measurement-card waiting-card"><div className="measurement-card-head"><span>FIELD MEASUREMENT</span><Ruler size={15} /></div><strong>{points.length === 1 ? "Pick P2" : "Pick P1"}</strong><p>Two points, anywhere on the center sheet.</p></aside> : null}
          </div>
        </section>

        <aside className="inspector-column">
          <section className="note-block inspector-intro"><div className="note-index">C—03</div><p className="note-kicker">INSPECTOR</p><h2>Shape the part.</h2><p className="note-copy">Edit the selected component, then drag it into the assembly.</p></section>
          <section className="tool-panel parameter-panel" aria-labelledby="selected-heading"><div className="section-label" id="selected-heading"><span>04</span> SELECTED PART</div>{selectedGear ? <><div className="selected-part-title"><span className="part-swatch" /> <div><strong>{gearLabel(selectedGear.kind)}</strong><small>{selectedGear.id}</small></div></div><label className="field-row"><span>Type</span><select value={selectedGear.kind} onChange={(event) => updateSelected({ kind: event.target.value as GearKind })}><option value="spur">Spur gear</option><option value="internal">Internal gear</option><option value="rack">Gear rack</option></select></label><label className="field-row"><span>Teeth</span><input type="number" min="6" max="120" value={selectedGear.teeth} onChange={(event) => updateSelected({ teeth: Number(event.target.value) || 6 })} /></label><label className="field-row"><span>Module</span><input type="number" min="0.5" max="12" step="0.1" value={selectedGear.module} onChange={(event) => updateSelected({ module: Number(event.target.value) || 0.5 })} /></label><label className="field-row"><span>Rotation</span><span className="field-with-unit"><input type="number" min="-360" max="360" value={Math.round(selectedGear.rotation)} onChange={(event) => updateSelected({ rotation: Number(event.target.value) || 0 })} /><em>°</em></span></label>{selectedGear.kind === "rack" ? <label className="field-row"><span>Rack length</span><span className="field-with-unit"><input type="number" min="120" max="900" step="10" value={selectedGear.length} onChange={(event) => updateSelected({ length: Number(event.target.value) || 120 })} /><em>px</em></span></label> : null}<div className="parameter-readout"><span>Pitch dia.</span><strong>{selectedGear.kind === "rack" ? `${formatNumber(selectedGear.length * MM_PER_CANVAS_UNIT)} mm` : `${formatNumber(gearRadius(selectedGear) * 2 * MM_PER_CANVAS_UNIT)} mm`}</strong></div><button className="remove-part" type="button" onClick={removeSelected} disabled={gears.length <= 1}><Trash2 size={14} /> Remove selected</button></> : null}</section>

          <section className="tool-panel motion-panel" aria-labelledby="motion-heading"><div className="section-label" id="motion-heading"><span>05</span> MOTION STUDY</div><button className={`motion-button ${running ? "is-running" : ""}`} type="button" onClick={() => setRunning((value) => !value)}>{running ? <Pause size={16} /> : <Play size={16} />}<span>{running ? "Pause assembly" : "Run meshing"}</span><small>{running ? "All components are moving" : "Spur drives the study"}</small></button><div className="motion-readout"><span><i className={running ? "live-dot" : ""} /> {running ? "LIVE" : "STANDBY"}</span><span>{gears.length} parts</span></div></section>

          <section className="tool-panel assembly-panel" aria-labelledby="assembly-heading"><div className="section-label" id="assembly-heading"><span>06</span> ASSEMBLY PARTS</div><div className="assembly-list">{gears.map((gear) => <button type="button" key={gear.id} className={`assembly-item ${gear.id === selectedId ? "is-active" : ""}`} onClick={() => setSelectedId(gear.id)}><span className="part-swatch" /><span><strong>{gearLabel(gear.kind)}</strong><small>{gear.id} · {gear.teeth} teeth</small></span></button>)}</div></section>

          <button className="ink-button secondary-button" type="button" onClick={clearSheet}><RotateCcw size={16} /> Reset assembly</button>
          <div className="inspector-note"><Settings2 size={15} /><span>Drag any part. Run motion to see the drive relationship.</span></div>
        </aside>
      </div>

      <footer className="bottom-rail"><div><Sparkles size={15} /> GEARBUILDER / FROM INK TO DXF</div><div><Settings2 size={15} /> {tool === "measure" ? "M MEASURE · ESC CLEAR" : "DRAG PARTS · PLAY MOTION · EXPORT DRAFT"}</div></footer>
    </main>
  );
}
