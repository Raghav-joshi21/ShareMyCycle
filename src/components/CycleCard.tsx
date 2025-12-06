// components/CycleCard.tsx
import type { Cycle } from "../types";

const imageByType: Record<string, string> = {
  city: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800",
  mtb: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
  road: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const fallbackImage =
  "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800";

export function CycleCard({ cycle }: { cycle: Cycle }) {
  const imgSrc = imageByType[cycle.type] ?? fallbackImage;

  return (
    <div className="h-full flex flex-col rounded-3xl overflow-hidden">
      {/* IMAGE AREA */}
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={cycle.name}
          className="h-full w-full object-cover"
        />

        {/* Type pill */}
        <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {cycle.type.toUpperCase()}
        </div>

        {/* Rating pill */}
        {typeof cycle.rating === "number" && (
          <div className="absolute top-2 right-2 inline-flex items-center rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            ★ {cycle.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex-1 px-3 pb-3 pt-2 text-xs md:text-sm">
        <p className="font-semibold text-slate-900 truncate">{cycle.name}</p>
        <p className="text-[11px] text-slate-600 truncate">
          {cycle.locationName}
        </p>

        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-[#364FAB]">
            €{cycle.pricePerHour.toFixed(2)}/hr
          </span>
          <span className="text-slate-600">
            {cycle.gear ? "With gears" : "Single speed"}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
          <span>
            {cycle.isAvailableNow ? (
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93BC25]" />
                Available now
              </span>
            ) : (
              "Not available"
            )}
          </span>
          <span>Tap to see more (mock)</span>
        </div>
      </div>
    </div>
  );
}
