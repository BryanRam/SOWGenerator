import { TEMPLATE_MAPPING_ROWS, TEMPLATE_NAME, getProjectById, getTemplateConfigPreview } from "@/app/data/mockData";

function PreviewSegment({ text, state }: { text: string; state: "text" | "mapped" | "missing" }) {
  if (state === "mapped") {
    return <span className="rounded bg-blue-50 px-1 text-blue-700">{text}</span>;
  }

  if (state === "missing") {
    return <span className="rounded bg-rose-50 px-1 text-rose-600">{text}</span>;
  }

  return <span>{text}</span>;
}

export function TemplateConfigView({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);
  const segments = getTemplateConfigPreview();

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_380px]">
      <div className="space-y-8">
        <div>
          <div className="text-sm text-slate-500">
            Projects &gt; <span className="font-medium text-slate-700">{project.name} ({project.id})</span> &gt; Configure Statement of Work
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Configure Statement of Work</h1>
          <p className="mt-2 text-sm text-slate-500">Review template selection and SharePoint mappings for {project.name}.</p>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Section 1</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Select Template</h2>
            </div>
            <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-primary">
              <option>{TEMPLATE_NAME}</option>
            </select>
          </div>
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold">{TEMPLATE_NAME}</p>
            <p className="mt-2 text-blue-700">Enterprise software delivery template with mapped commercial, commencement, and phase detail placeholders.</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Section 2</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">SharePoint Data Mapping</h2>
            </div>
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              1 Missing Field
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-4 font-medium">SharePoint Field</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Template Placeholder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEMPLATE_MAPPING_ROWS.map((row) => (
                  <tr key={row.field} className="align-top">
                    <td className="py-4 pr-4 font-medium text-slate-800">{row.field}</td>
                    <td className="py-4 pr-4">
                      {row.missing ? (
                        <div className="space-y-1 text-rose-600">
                          <div className="flex items-center gap-2 font-semibold">
                            <span aria-hidden="true">⚠</span>
                            <span>{row.value}</span>
                          </div>
                          <p className="text-xs">{row.error}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 font-semibold text-emerald-600">
                          <span aria-hidden="true">✓</span>
                          <span>Mapped</span>
                        </div>
                      )}
                    </td>
                    <td className={`py-4 font-mono ${row.missing ? "text-rose-600" : "text-slate-700"}`}>
                      → {row.placeholder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary">
            Save Draft
          </button>
          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
            Preview Document
          </button>
        </div>
      </div>

      <aside className="rounded-3xl bg-white p-6 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Live Preview</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">SOW document</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Preview</span>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
          {segments.map((segment, index) => (
            <PreviewSegment key={`${segment.state}-${index}`} text={segment.text} state={segment.state} />
          ))}
        </div>
      </aside>
    </div>
  );
}
