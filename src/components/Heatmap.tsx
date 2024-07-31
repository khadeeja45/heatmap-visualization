import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

const Heatmap: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  useEffect(() => {
    if (data.length > 0 && mapRef.current) {
      const map = mapRef.current;
      const heatLayer = (L as any).heatLayer(data, { radius: 25 });
      heatLayer.addTo(map);
    }
  }, [data]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100vh' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Heatmap;
