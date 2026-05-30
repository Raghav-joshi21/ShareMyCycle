// components/CycleCard.tsx
import { Star } from "lucide-react";
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
    <div className="group h-full flex flex-col rounded-xl overflow-hidden">
      {/* IMAGE AREA */}
      <div className="relative h-40 md:h-44 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={cycle.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type pill */}
        <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-surface-sunken text-text-secondary border border-border px-2.5 py-0.5 text-[11px] font-medium">
          {cycle.type.toUpperCase()}
        </div>

        {/* Rating pill */}
        {typeof cycle.rating === "number" && (
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-surface-sunken text-text-secondary border border-border px-2.5 py-0.5 text-[11px] font-medium">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {cycle.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="flex-1 px-4 pb-4 pt-3 text-xs md:text-sm">
        <p className="font-semibold text-text-primary truncate">{cycle.name}</p>
        <p className="text-xs text-text-tertiary truncate">{cycle.locationName}</p>

        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="font-serif font-semibold text-brand-blue text-sm">
            €{cycle.pricePerHour.toFixed(2)}/hr
          </span>
          <span className="text-text-secondary">
            {cycle.gear ? "With gears" : "Single speed"}
          </span>
        </div>

        <div className="mt-1 text-[11px] text-text-secondary">
          {cycle.isAvailableNow ? (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green-light" />
              Available now
            </span>
          ) : (
            "Not available"
          )}
        </div>
      </div>
    </div>
  );
}
