/**
 * Modular D3 imports for tree-shaking optimization.
 * Instead of importing all of d3 (~868KB), we only import what we need (~50-80KB).
 */

// Selection module - DOM manipulation
export { select, selectAll } from 'd3-selection';
export type { Selection, BaseType } from 'd3-selection';

// Zoom module - pan and zoom behavior
export { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
export type { ZoomBehavior, ZoomedElementBaseType } from 'd3-zoom';

// Force simulation module - graph layout
export {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from 'd3-force';
export type { Simulation, SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

// Drag module - drag behavior for nodes
export { drag } from 'd3-drag';
export type { DragBehavior, SubjectPosition } from 'd3-drag';
