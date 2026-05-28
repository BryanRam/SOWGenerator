"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Recent Documents", href: "/" },
  { label: "Template Library", href: "/templates/PRJ-2024-001" },
  { label: "Project Context", href: "/projects" },
  { label: "Shared with Me", href: "/shared" },
  { label: "Archived", href: "/projects?view=archived" },
];

const footerItems = ["Support", "Storage"];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="no-print flex w-72 flex-col border-r border-slate-200 bg-white p-6">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white">
          SoW
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">SoW Generator</h1>
        <p className="mt-2 text-sm text-slate-500">Project Control / Enterprise SoW Engine</p>
      </div>

      <button className="mt-8 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-panel transition hover:bg-blue-800">
        + New Document
      </button>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => {
          const selected =
            item.label === "Recent Documents"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                selected
                  ? "bg-blue-50 text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-200 pt-6">
        {footerItems.map((item) => (
          <button
            key={item}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <span>{item}</span>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
