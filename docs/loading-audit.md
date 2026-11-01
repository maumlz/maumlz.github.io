# Loading audit — phases 1 and 2

Measured on 2026-10-30 using `npm run build -- --stats-json` and a single local
Node.js CPU sample. Sizes below are decimal kB/MB, not compressed network captures.

## Assets and CPU work

| Asset | Bytes | Triangles |
| --- | ---: | ---: |
| Arrakis STL | 19,900,084 | 398,000 |
| Installation 04 STL | 31,788,084 | 635,760 |
| Landscape JPEG | 119,682 | — |
| Profile JPEG | 599,136 | — |

Both STL loads parse the binary file, compute bounds, center the geometry and
recompute normals synchronously. Home then computes desert vertex colors; resume
computes cylindrical UVs, reorders material groups, and intersects the geometry
to attach ring lights. GPU uploads/shader compilation add browser work not
included in this sample.

| Model | STL parse | Center/bounds/normals | Decoration | Total |
| --- | ---: | ---: | ---: | ---: |
| Arrakis | 21 ms | 78 ms | 118 ms | 217 ms |
| Ring | 137 ms | 116 ms | 529 ms | 782 ms |

These are one-run local CPU observations, not browser profiling, network timings,
or mobile performance guarantees. Preparation remains synchronous after loading;
worker processing and mesh optimization are outside these two phases.

## Production bundles

| Metric | Before | After |
| --- | ---: | ---: |
| Initial application bundles (includes CSS) | 503.13 kB | 514.78 kB |
| Home route file | 4.45 kB | 1.31 kB |
| Resume route file | 15.89 kB | 9.37 kB |
| Shared graphics bundle | 530.72 kB | 530.74 kB |
| Home scene, now deferred separately | included in route | 4.13 kB |
| Header scene, now deferred separately | included in route | 7.22 kB |
| Home route plus recursive static JS imports | 671.58 kB | 149.39 kB |
| Resume route plus recursive static JS imports | 695.89 kB | 170.31 kB |

Static-import totals include shared runtime dependencies but exclude dynamic
imports, CSS, application entry, polyfills, and assets. They are dependency-graph
comparisons, not total page transfer estimates. Both routes originally statically
imported Three.js. The after-build graph confirms neither does so now.

The Angular defer machinery increases initial-shell size by approximately 11.65 kB.
The 500 kB initial budget warning remains (14.78 kB over). No budget was increased.
Total graphics/model bytes have not been reduced; they are loaded later.

## Implemented behavior

- Home and resume use Angular `@defer (on idle)` for their standalone scenes.
  Their scene imports are compiled into dynamic imports, including Three.js.
- Home navigation stays in the application shell; resume text/contact links stay
  outside the deferred block. Translation loading is unchanged.
- Home has a permanent CSS star/planet background. Resume has a permanent CSS
  space background below its profile content. Neither requires images or WebGL.
- Fallbacks remain present during import loading and import errors. Scene canvases
  remain transparent until their first successful render, including on WebGL failure.
- The home backdrop occupies a fixed viewport. The resume backdrop is absolutely
  positioned inside the content-sized header. Scene insertion does not determine
  either region's layout dimensions. Print hiding and attribution are preserved.
- Home still provides its existing simple WebGL planet while the detailed STL loads.
- No blocking splash, progress indicator, retry controls, asset conversion, or new
  dependency was added. Those belong to later phases.

## Validation and limits

- `npm run lint`: passed.
- `npm test -- --watch=false`: 19 tests passed.
- `npm run build -- --stats-json`: passed with the budget warning above.
- Static import graph: no Three.js in either page's eager dependency chain.
- Tests cover initial deferred content, retained fallbacks on scene-import errors,
  resume contact availability, and transparent canvas on unavailable WebGL.
- Browser access host is unavailable in this session. Cold-network timing, visual
  responsive checks, measured layout shifts and GPU preparation are unverified.

Reference: https://angular.dev/guide/templates/defer
