"use client";

import { useMemo, useState } from "react";
import { RECENT_ACTIVITY, SOW_TEMPLATE, TEMPLATE_VERSION, getProjectDocument, type ActivityItem } from "@/app/data/mockData";
import { replaceTemplatePlaceholders } from "@/app/utils/templateEngine";

function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="mt-4 space-y-4 text-sm text-slate-600">
      {items.map((item) => (
        <li key={`${item.timestamp}-${item.action}`} className="flex gap-3">
          <span className="w-14 font-semibold text-slate-500">{item.timestamp}</span>
          <span>{item.action}</span>
        </li>
      ))}
    </ul>
  );
}

export function SOWPreview({ projectId }: { projectId: string }) {
  const documentData = useMemo(() => getProjectDocument(projectId), [projectId]);
  const [zoom, setZoom] = useState(100);
  const [lastSaved, setLastSaved] = useState("Just now");
  const [draftLabel, setDraftLabel] = useState("Draft");

  const finalizedDocument = useMemo(
    () => replaceTemplatePlaceholders(SOW_TEMPLATE, documentData.data),
    [documentData.data],
  );

  const handleFinalize = () => {
    setDraftLabel("Finalized Draft");
    setLastSaved("Just now");
  };

  const handleWordExport = async () => {
    const [{ Document, Packer, Paragraph, TextRun }, { saveAs }] = await Promise.all([
      import("docx"),
      import("file-saver"),
    ]);

    const sections = finalizedDocument.split("\n").map(
      (line) =>
        new Paragraph({
          children: [new TextRun({ text: line || " ", size: 24 })],
          spacing: { after: 200 },
        }),
    );

    const doc = new Document({
      sections: [{ properties: {}, children: sections }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${documentData.project.id}-statement-of-work.docx`);
  };

  const handlePdfExport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleSave = () => {
    setLastSaved("Saved to SharePoint mirror");
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700">
              {draftLabel}
            </span>
            <span className="text-slate-500">Last auto-saved: {lastSaved}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary">
              Edit Data
            </button>
            <button
              onClick={handleFinalize}
              className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Finalize &amp; Generate
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{documentData.title}</h1>
              <p className="mt-2 text-sm text-slate-500">Template: {TEMPLATE_VERSION}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <button
                onClick={() => setZoom((value) => Math.max(80, value - 10))}
                className="rounded-full border border-slate-200 px-3 py-2 text-slate-600 hover:border-primary hover:text-primary"
              >
                −
              </button>
              <span>{zoom}%</span>
              <button
                onClick={() => setZoom((value) => Math.min(140, value + 10))}
                className="rounded-full border border-slate-200 px-3 py-2 text-slate-600 hover:border-primary hover:text-primary"
              >
                +
              </button>
              <span className="rounded-full bg-slate-100 px-3 py-2">Page 1 of 5</span>
              <button className="rounded-full border border-slate-200 px-3 py-2">←</button>
              <button className="rounded-full border border-slate-200 px-3 py-2">→</button>
            </div>
          </div>

          <div className="print-surface mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm" style={{ fontSize: `${zoom}%` }}>
            {documentData.segments.map((segment, index) => {
              if (segment.state === "mapped") {
                return (
                  <span key={`${segment.placeholder}-${index}`} className="font-medium text-primary underline decoration-2 underline-offset-4">
                    {segment.text}
                  </span>
                );
              }

              return <span key={`${segment.state}-${index}`}>{segment.text}</span>;
            })}
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Export &amp; Save</h2>
          <div className="mt-4 space-y-3">
            <button
              onClick={handleWordExport}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              <span>Download as Word (.docx)</span>
              <span aria-hidden="true">↓</span>
            </button>
            <button
              onClick={handlePdfExport}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              <span>Download as PDF</span>
              <span aria-hidden="true">↓</span>
            </button>
            <button
              onClick={handleSave}
              className="flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <span>Save to SharePoint</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Data Validation</h2>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              100% Mapped
            </span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Fields populated: 24/24</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-panel">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          <ActivityList items={RECENT_ACTIVITY} />
        </section>
      </aside>
    </div>
  );
}
