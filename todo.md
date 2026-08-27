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
