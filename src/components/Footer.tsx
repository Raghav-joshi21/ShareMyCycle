export function Footer() {
  return (
    <footer className="mt-10 border-t border-[#E4D6A8] bg-[#FCF6D9] text-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-[#DDBA7D]/30 text-[#DDBA7D] border border-[#DDBA7D]/60 text-[11px] font-semibold">
            SMC
          </span>
          <div className="space-y-0.5">
            <p className="font-medium text-slate-800 text-xs">
              ShareMyCycle RTU
            </p>
            <p>© {new Date().getFullYear()} · Built for Climathon, Riga</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
          <span>
            Cheaper than scooters · cleaner than cars · made for students
          </span>
        </div>
      </div>
    </footer>
  );
}
