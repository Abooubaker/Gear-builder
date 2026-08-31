# Original attached app findings

The original distribution is a Vite-style static app whose HTML loads `/assets/vendor-B1ATuZue.js`, `/assets/config-CwMOTuF9.js`, `/assets/firebase-C0p_lJcS.js`, `/assets/utils-DkhgICtg.js`, `/assets/ErrorBoundary-DNt6f2SH.js`, `/assets/main-B1esbHSD.js`, and `/assets/config-DbnoEXe5.css`.

The real application loads an interactive editor with a gear list, clear-all, driver gear and RPM, Spur/Int/Rack add controls, metric/imperial units, zoom, grid/guides/labels, measurement, simulation stop/reset/reverse, speed controls, undo/redo, Basic/Position/Features/Export tabs, calculated dimensions, and DXF/SVG downloads.

The original bundle describes standard involute gear profiles, internal ring gears, rack-and-pinion systems, parent-child gear relationships, real-time animation, backlash, spoke cutouts, and DXF/SVG/PDF export. The current themed implementation approximated these behaviors with custom SVGs, which is why it does not match the attached app’s real interaction model.

The user’s visual requirements remain: blue blueprint background and lines, handwritten presentation, Gearbuilder naming, transparent Abo Baker logo, centered working sheet, and removal of theme toggles, Buy Me Coffee, and profile/auth controls.

The original app successfully loads when served over HTTP with its modules under `/assets`. Its live root is a full-viewport flex layout with a left 18rem gear list/settings column, a central drawing area, and a right properties/export column. The DOM uses Tailwind utility classes and inline component styles. The original controls include real Spur, Int, and Rack creation, metric/imperial units, zoom, grid/guides/labels, measure distance, simulation stop/reset/reverse, RPM, undo/redo, multi-tab properties, calculated dimensions, and DXF/SVG download buttons. Theme toggles, Buy Me a Coffee, and account controls are present and will need to be removed or hidden in the themed integration.

The original engine now loads successfully inside the themed WebDev preview. The live app exposes buttons with title hooks `Add Spur Gear`, `Add Internal Gear`, `Add Rack Gear`, `Measure Distance`, `Stop`, `Reset Position`, `Reverse Direction`, `Download Gear DXF`, and `Download Gear SVG`; it also has actual editable inputs for teeth, module, pressure angle, backlash, RPM, units, and display settings. The theme adapter successfully renames the visible top brand to Gearbuilder, inserts the transparent Abo Baker logo, and hides Light/Dark, Buy Me a Coffee, and account controls.

Functional validation: clicking the original engine’s real add controls increased the removable gear-card count from 1 to 4 and produced `Spur Gear 2`, `Internal Gear 3`, and `Rack Gear 4` with their respective types and parameters. The editor’s actual drawing surface is an SVG with `aria-label="Interactive gear designer canvas"`, currently rendered at approximately 510×1026 CSS pixels in the centered working area.

Further validation: after adding the three component types, the original engine entered its actual `CENTER-TO-CENTER TOOL` mode and showed the instruction `Click the 2nd gear to measure from "Rack Gear 4"`. The real SVG displayed all four components, including the internal ring and rack, and the inspector showed live total ratio/selection state. This confirms the attached engine provides the intended functional workflow; the remaining work is cleanup of branded copy and final validation, not another geometry approximation.

Contrast revision preview: the original editor now renders the gear artwork in a light cyan fill with pale edge strokes and readable pale text labels. The Clear all gears control is now a prominent yellow warning button with dark blue ink, making it visible against the cobalt panel. The active measurement status still shows the original center-to-center instruction underneath, so the custom arbitrary-point overlay is the next behavior to verify in the live DOM.

The internal restart screenshot rendered the cleaned editor correctly, but a fresh browser navigation with a query string later showed only the brand overlay and no original editor content; the browser console reported no output. This indicates a preview load/timing or route-specific startup issue that must be resolved before final delivery.

The dedicated freehand tool now accepted two arbitrary blank-sheet coordinates and returned `811.32 units` with two point markers and a line, without using gear centers. Feedback content was not visible. A remaining check found About This Tool text still present in the DOM, so its parent-card removal needs to be made stricter before delivery.

Final validation passed: the freehand control measured two arbitrary workspace points and returned `739.65 units` with two markers and a line. The legacy center-to-center button was hidden, About This Tool text was absent, and feedback text was absent. The workspace rendered fully after the canvas-ancestor cleanup.

Runtime duplicate declaration fix validation: the `/` preview and `/?from_webdev=1` now render the full Gearbuilder editor after separating the original prebuilt editor module from the Vite main import graph. The browser console returned no output/errors on the reported route, and the duplicate `__vite__mapDeps` SyntaxError did not recur.

Stability inspection: the live editor uses an SVG viewBox matching its rendered dimensions (currently 510 x 1026 in the narrow browser viewport). The native DXF and SVG export buttons are enabled even when selection state may be absent, which is a likely crash path. The visible hero copy still reads `CREATE PRECISION SPUR GEARS & EXPORT TO DXF/SVG FOR FREE` and needs replacement.

Stability enhancement validation: arbitrary workspace points now return a precise millimetre value (`345.58 mm`) and blank-sheet pointerdown completed without a captured runtime error. The revised hero copy is no longer present as the old `CREATE PRECISION...` text in the live DOM.

Final stability validation: both DXF and SVG export buttons were clicked with no captured errors, and the SVG workspace remained mounted afterward. The millimetre measurement overlay remained active and the blank-space guard did not crash the editor.

Calibration inspection: the live canvas viewBox is `0 0 510 1026`. The selected gear group is transformed with `scale(1.5,-1.5)`; its rendered bounds are about 264.71 px while its local geometry bounds are about 176.47 SVG units. The current calibration must account for the group transform and use the editor’s known diameter metadata rather than mixing screen bounds and root units.

Visual cleanup inspection: the oversized heading is an original `H1` with text `GEARBUILDER` above the Clear all gears button. The workspace watermark is a div with class `font-black tracking-tight text-center text-slate-900 opacity-[0.04]` and text `GEARBUILDER / DRAFTING BENCH`. The canvas includes a transformed gear group, so measurement conversion must use the group transform scale rather than relying on screen bounds alone.

Calibration and cleanup validation: a 200-SVG-unit horizontal span now reports `133.33 mm`, matching the selected 20-tooth module-6 gear’s 132 mm outer diameter scale within the drawing geometry. The oversized left `GEARBUILDER` heading and the `GEARBUILDER / DRAFTING BENCH` workspace watermark are both not visible in the live DOM. 

Free movement validation: after correcting nested SVG group resolution, dragging the visible gear shape by approximately 90 screen pixels changed the real top-level transform from `translate(255, 513)` to `translate(345, 531)`. The gear released cleanly with no runtime error.
