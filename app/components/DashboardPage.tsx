import { DASHBOARD_STATS, PROJECTS, PROJECT_TOTAL_COUNT } from "@/app/data/mockData";
import { ProjectTable } from "@/app/components/ProjectTable";

function StatCard({ title, value, detail, cta }: { title: string; value: string; detail: string; cta?: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-panel">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{value}</h2>
          <p className="mt-2 text-sm text-slate-500">{detail}</p>
        </div>
        {cta ? (
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
            {cta}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function DashboardPage({ title }: { title: string }) {
  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Active Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Monitor active project contexts, manage draft documents, and generate new SoWs.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary">
            Filter View
          </button>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
            + New Project Record
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            detail={stat.detail}
            cta={"cta" in stat ? stat.cta : undefined}
          />
        ))}
      </section>

      <ProjectTable projects={PROJECTS} totalCount={PROJECT_TOTAL_COUNT} />
    </div>
  );
}
