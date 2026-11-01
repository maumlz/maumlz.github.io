# Task: Improve loading performance and feedback

## Objective
Keep navigation and resume content usable immediately while decorative
3D scenes load in the background.

## Constraints
- Preserve Angular, Three.js, existing routes, and visual design.
- Do not add a blocking splash screen.
- Preserve model attribution and licenses.
- Avoid unrelated refactoring.
- Inspect existing loading and cleanup code before making changes.

## Phase 1 — Inspect and measure
- [x] Identify assets and JavaScript that delay initial rendering.
- [x] Record model sizes and current production bundle sizes.
- [x] Check homepage and resume loading separately.
- [x] Identify main-thread work during model parsing and preparation.

## Phase 2 — Immediate usable content
- [x] Render navigation and resume text without waiting for Three.js.
- [x] Defer loading scene components and their graphics dependencies.
- [x] Show a lightweight static background or simple planet while loading.
- [x] Reserve the scene’s dimensions to prevent layout shifts.
- [x] Keep the fallback visible if WebGL is unavailable.

Phase 1/2 audit and validation limits: `docs/loading-audit.md`. Browser timing and visual checks remain unverified.

## Phase 3 — Loading feedback
- [x] Add a discreet, non-blocking status near the scene.
- ~~ [ ] Distinguish downloading from preparing the scene.~~
- ~~ [ ] Show a percentage only when the download total is known.~~
- ~~ [ ] Otherwise use an indeterminate indicator.~~
- [ ] Remove the indicator after the detailed scene is rendered.
- ~~[ ] Avoid briefly flashing the indicator for fast loads.~~
- [x] Provide English and Spanish messages.
- [x] Make status updates accessible without announcing every percentage.
- [x] Respect reduced-motion preferences.

## Phase 4 — Failure and navigation handling
- [ ] Keep the fallback and navigation working after loading errors.
- [ ] Offer a Retry button without requiring a page refresh.
- [ ] Cancel outstanding downloads when leaving a route where supported.
- [ ] Prevent late callbacks from updating destroyed components.
- [ ] Dispose unused geometries, materials, textures, and renderers.
- [ ] Prevent duplicate downloads and animation loops.

## Phase 5 — Asset optimization (optional)
- [ ] Create web-optimized copies of the STL models.
- [ ] Reduce polygon counts while preserving recognizable silhouettes.
- [ ] Export GLB files with supported geometry compression.
- [ ] Precompute normals, texture coordinates, and materials where practical.
- [ ] Adapt the landscape mapping and attached ring lights to the new assets.
- [ ] Preserve the original source assets outside the deployed asset directory.
- [ ] Compare file sizes and appearance before switching to optimized models.
- [ ] Document the asset conversion workflow and attribution.

## Phase 6 — Mobile and repeat visits (optional)
- [ ] Add an “Enable 3D” option for visitors who prefer a static background.
- [ ] Consider a lower-detail model for constrained devices.
- [ ] Avoid preloading large assets for routes the visitor has not opened.
- [ ] Review browser caching and asset versioning.

## Phase 7 — Validation
- [ ] Run lint, automated tests, and the production build.
- [ ] Test a cold load with a throttled connection.
- [ ] Verify that navigation works before models finish loading.
- [ ] Test failed downloads, retry, and unavailable WebGL.
- [ ] Navigate away during loading and check for leaks or console errors.
- [ ] Check desktop, mobile, keyboard access, and reduced motion.
- [ ] Report browser checks that could not be performed.
- [ ] Summarize changed files, size improvements, and remaining limitations.

## Acceptance criteria
- Navigation and professional content never wait for decorative models.
- A usable fallback remains visible during loading and after errors.
- Loading feedback is truthful, accessible, and non-blocking.
- Leaving and revisiting routes does not cause resource leaks.
- Existing functionality and attribution remain intact.