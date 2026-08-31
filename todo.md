# GearDXF update checklist

- [x] Restore the uploaded geardxf.com frontend into the active WebDev project.
- [x] Apply the committed blueprint visual system: blue background, blue drafting lines, handwritten-style UI.
- [x] Use the uploaded `abobaker.webp` logo in the header and favicon treatment.
- [x] Remove dark theme and light theme controls.
- [x] Remove the Buy Me Coffee control.
- [x] Remove profile and login/logout controls.
- [x] Make distance measurement accept any two points and calculate their actual distance.
- [x] Verify the app builds and key interactions work.
- [ ] Save a final checkpoint for delivery.

## Style Decisions

- Ground-truth direction: monochrome blue technical blueprint with hand-drawn drafting marks and handwritten typography.
- Avoid theme switching; the blueprint visual is the single permanent presentation mode.
- Keep the logo mark recognizable and high-contrast against the blueprint canvas.

## Gearbuilder revision

- [x] Rename the product and visible brand from GearDXF to Gearbuilder.
- [x] Replace the header asset with the new transparent `abobakernobg.png` logo.
- [x] Recompose the interface so the working sheet is centered, with tools and settings arranged around it.
- [x] Support adding multiple Spur Gears, Internal Gears, and Gear Racks.
- [x] Improve gear outlines to use more credible tooth shapes and component-specific geometry.
- [x] Make placed components movable and animate meshing/interaction when the user runs the motion control.
- [x] Revalidate measurement, export, responsive layout, and build output.
- [x] Save a new checkpoint for delivery.

## Functional restoration revision

- [x] Compare the original attached bundle structure with the current simplified Gearbuilder implementation.
- [x] Restore or adapt the original gear-generation, assembly, and export logic rather than relying on the simplified renderer.
- [x] Preserve the blueprint theme, centered working sheet, Gearbuilder branding, and requested control removals.
- [x] Verify real workflows for Spur Gears, Internal Gears, Gear Racks, component interaction, and arbitrary distance measurement.
- [x] Run build/runtime checks and save a new checkpoint.

## Measurement and contrast revision

- [x] Replace center-to-center-only measurement with arbitrary-point measurement on the original SVG working sheet.
- [x] Keep measurement readable with point markers, a line, coordinates, and a distance label.
- [x] Brighten gear fills/strokes and their text labels against the blueprint field.
- [x] Restyle Clear all gears with a visible warm warning treatment instead of a white button.
- [x] Validate the interaction, build, and final preview, then save a new checkpoint.

## Freehand measurement cleanup

- [x] Replace all center-to-center measurement behavior with two arbitrary workspace points, even when clicking on empty sheet space or over a gear.
- [x] Ensure the custom measurement handler wins over the original center-to-center handler and remains usable after rerenders.
- [x] Remove every feedback box, feedback prompt, feedback link, and feedback modal from the visible app.
- [x] Remove the entire About This Tool section and its remaining explanatory card.
- [x] Validate the clean workspace, arbitrary-point measurement, build, and final preview, then save a new checkpoint.

## Standalone HTML export

- [x] Inspect the current production bundle and identify external asset/runtime dependencies.
- [x] Generate a single self-contained HTML file with inline CSS, JavaScript, and required image assets.
- [x] Validate that the standalone file loads without the Vite/WebDev runtime and that measurement and gear controls still work.
- [x] Deliver the standalone HTML file to the user.

## Runtime duplicate declaration fix

- [x] Inspect the active WebDev entrypoint and built scripts for duplicate `__vite__mapDeps` declarations.
- [x] Remove the conflicting Vite/runtime inclusion without breaking the original editor bundle.
- [x] Rebuild and verify `/` and `/?from_webdev=1` load without syntax or console errors.
- [x] Save a fixed checkpoint for delivery.

## Stability and measurement enhancement

- [x] Remove the awkward hero sentence about creating precision spur gears and free DXF/SVG export.
- [x] Show arbitrary-point measurements precisely in millimetres, with predictable SVG coordinate conversion.
- [x] Prevent blank-space clicks from reaching handlers that expect a selected gear.
- [x] Prevent DXF/SVG export failures from crashing the page and provide safe error handling.
- [x] Improve any related editor states, status messaging, and interaction affordances discovered during testing.
- [x] Build, test, and save a new checkpoint.

## Measurement calibration and visual cleanup

- [x] Recalibrate arbitrary-point distances against the original SVG’s true millimetre geometry, not screen or transformed bounds.
- [x] Remove the Gearbuilder/DRAFTING BENCH watermark text from inside the working sheet.
- [x] Remove the oversized Gearbuilder heading above the Clear all gears button.
- [x] Validate accurate measurements and visual cleanup without breaking the original editor.
- [x] Build and save a new checkpoint.

## Latest standalone HTML export

- [x] Rebuild the latest Gearbuilder source with the corrected millimetre calibration and branding cleanup.
- [x] Regenerate one self-contained HTML file with inline CSS, JavaScript, and embedded image assets.
- [x] Validate direct file loading and core editor interactions without the WebDev server.
- [x] Deliver the refreshed standalone HTML artifact.

## Free movement enhancement

- [x] Let every placed gear move freely by dragging on the workspace.
- [x] Keep gear selection, transforms, labels, measurement, and simulation state synchronized while dragging.
- [x] Preserve export correctness after moving components.
- [x] Validate Spur, Internal, and Rack movement and save a new checkpoint.
