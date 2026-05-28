import Link from "next/link";

const topLinks = [
  { label: "SoW Generator", href: "/" },
  { label: "Dashboard", href: "/" },
  { label: "Templates", href: "/templates/PRJ-2024-001" },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

export function TopNavbar() {
  return (
    <header className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-5">
      <div className="flex flex-wrap items-center gap-6">
        {topLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-primary">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
          <span aria-hidden="true">⌕</span>
          <input
            className="w-48 bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Search projects"
            aria-label="Search projects"
          />
        </label>
        {[
          { label: "Notifications", icon: "🔔" },
          { label: "Help", icon: "?" },
          { label: "Settings", icon: "⚙" },
        ].map((item) => (
          <button
            key={item.label}
            aria-label={item.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
          >
            {item.icon}
          </button>
        ))}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          BR
        </div>
      </div>
    </header>
  );
}
