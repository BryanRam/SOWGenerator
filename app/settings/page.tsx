export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Workspace Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Manage notification preferences, export defaults, and SharePoint save targets.</p>
      </div>
      <section className="rounded-3xl bg-white p-6 shadow-panel">
        <h2 className="text-lg font-semibold text-slate-900">Default configuration</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-700">Notification digest</p>
            <p className="mt-2 text-sm text-slate-500">Immediate alerts for mapping issues and nightly summaries for generated drafts.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-700">SharePoint destination</p>
            <p className="mt-2 text-sm text-slate-500">Save generated SoWs to the controlled delivery library with template audit metadata.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
