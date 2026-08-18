"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { places } from "@/lib/data";

// ícone customizado (brasa âmbar) — sem depender dos ícones padrão do Leaflet
const emberIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:9999px;background:#C6541D;box-shadow:0 0 10px 4px rgba(198,84,29,0.6);border:2px solid #F6ECDD;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

export default function LeafletMap() {
  // centro aproximado entre os pontos (Santos/São Vicente)
  const center: [number, number] = [-23.968, -46.345];

  return (
    <div className="leaflet-map-dark h-[460px] w-full overflow-hidden border border-cream/10">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#241713" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker
            key={place.label}
            position={[place.lat, place.lng]}
            icon={emberIcon}
          >
            <Popup>
              <strong>{place.label}</strong>
              <br />
              {place.note}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
