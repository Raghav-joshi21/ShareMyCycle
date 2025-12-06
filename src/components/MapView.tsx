import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, useMap, Marker } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Cycle } from "../types";

interface MapViewProps {
  cycles: Cycle[];
  fullScreen?: boolean;
}

const RIGA_CENTER: LatLngExpression = [56.9496, 24.1052];

const createCycleIcon = (cycle: Cycle) =>
  new L.DivIcon({
    className: `cycle-marker-icon ${cycle.isAvailableNow ? "" : "cycle-marker-icon--dim"}`,
    html: `<div class="cycle-marker-badge">€${cycle.pricePerHour.toFixed(1)}</div>`,
    iconSize: [44, 32],
    iconAnchor: [22, 30],
  });

const userIcon = new L.DivIcon({
  className: "user-location-icon",
  html: "<div class='user-location-badge'>📍</div>",
  iconSize: [32, 32],
  iconAnchor: [16, 30],
});

function MapControls({
  currentPos,
  activeCount,
  fullScreen,
}: {
  currentPos: LatLngExpression | null;
  activeCount: number;
  fullScreen: boolean;
}) {
  const map = useMap();

  const handleFlyToUser = () => {
    if (!currentPos) return;
    const targetZoom = Math.max(map.getZoom(), fullScreen ? 14 : 15);
    map.flyTo(currentPos, targetZoom, { duration: 0.8 });
  };

  return (
    <div className="leaflet-top leaflet-right pointer-events-none">
      <div className="pointer-events-auto m-3 flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 text-xs text-slate-800 shadow-md">
        <div className="hidden flex-col sm:inline-flex">
          <span className="font-semibold">{activeCount} bikes nearby</span>
          <span className="text-[10px] text-slate-500">
            Move around the map & tap a dot
          </span>
        </div>
        <button
          type="button"
          onClick={handleFlyToUser}
          disabled={!currentPos}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-900 px-3 py-1 text-[11px] font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Focus on me</span>
        </button>
      </div>
    </div>
  );
}

export function MapView({ cycles, fullScreen = false }: MapViewProps) {
  const [currentPos, setCurrentPos] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        // ignore error, keep default center
      }
    );
  }, []);

  const center = currentPos ?? RIGA_CENTER;
  const zoom = fullScreen ? 12 : 14;

  // show all cycles, but visually dim ones that are not currently available
  const visibleCycles = cycles;

  return (
    <div
      className={`${
        fullScreen ? "h-[70vh]" : "h-80 sm:h-96 md:h-[26rem]"
      } w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={fullScreen}
        style={{ width: "100%", height: "100%" }}
      >
        {/* modern light basemap */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* My location – subtle pin icon */}
        {currentPos && (
          <Marker position={currentPos} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Cycles – Airbnb-style price badges */}
        {visibleCycles.map((cycle) => (
          <Marker
            key={cycle.id}
            position={[cycle.lat, cycle.lng]}
            icon={createCycleIcon(cycle)}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{cycle.name}</p>
                <p className="text-xs text-slate-500">{cycle.locationName}</p>
                <p className="text-sm font-semibold text-green-700">
                  €{cycle.pricePerHour.toFixed(2)}/hr
                </p>
                {!cycle.isAvailableNow && cycle.nextAvailableTime && (
                  <p className="text-[11px] text-amber-600">
                    Next available: {cycle.nextAvailableTime}
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  Tap &quot;Browse&quot; to book this cycle.
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapControls
          currentPos={currentPos}
          activeCount={visibleCycles.filter((c) => c.isAvailableNow).length}
          fullScreen={fullScreen}
        />
      </MapContainer>
    </div>
  );
}
