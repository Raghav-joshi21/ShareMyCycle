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
    html: `<div class="cycle-marker-badge">\u20AC${cycle.pricePerHour.toFixed(1)}</div>`,
    iconSize: [44, 32],
    iconAnchor: [22, 30],
  });

const userIcon = new L.DivIcon({
  className: "user-location-icon",
  html: "<div class='user-location-badge'></div>",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
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
      <div className="pointer-events-auto m-3 flex items-center gap-3 rounded-lg bg-white/95 backdrop-blur-md px-3 py-2 text-xs text-text-primary shadow-md border border-border">
        <div className="hidden flex-col sm:inline-flex">
          <span className="font-semibold">{activeCount} bikes nearby</span>
          <span className="text-[10px] text-text-tertiary">
            Move around the map & tap a dot
          </span>
        </div>
        <button
          type="button"
          onClick={handleFlyToUser}
          disabled={!currentPos}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Focus on me
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

  const visibleCycles = cycles;

  return (
    <div
      className={`${
        fullScreen ? "h-[70vh]" : "h-80 sm:h-96 md:h-[26rem]"
      } w-full rounded-xl overflow-hidden border border-border bg-surface-sunken shadow-sm`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={fullScreen}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {currentPos && (
          <Marker position={currentPos} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {visibleCycles.map((cycle) => (
          <Marker
            key={cycle.id}
            position={[cycle.lat, cycle.lng]}
            icon={createCycleIcon(cycle)}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{cycle.name}</p>
                <p className="text-xs text-text-tertiary">{cycle.locationName}</p>
                <p className="text-sm font-semibold text-brand-green-dark">
                  {"\u20AC"}{cycle.pricePerHour.toFixed(2)}/hr
                </p>
                {!cycle.isAvailableNow && cycle.nextAvailableTime && (
                  <p className="text-[11px] text-warning">
                    Next available: {cycle.nextAvailableTime}
                  </p>
                )}
                <p className="text-[11px] text-text-tertiary">
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
