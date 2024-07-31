import * as L from 'leaflet';

declare module 'leaflet' {
  function heatLayer(latlngs: L.LatLngExpression[], options?: HeatMapOptions): L.Layer;

  interface HeatMapOptions {
    minOpacity?: number;
    maxZoom?: number;
    max?: number;
    radius?: number;
    blur?: number;
    gradient?: { [key: number]: string };
  }
}
