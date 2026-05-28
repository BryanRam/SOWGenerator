"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PAGE_SIZE, PROJECT_TOTAL_COUNT, formatDate, type ProjectStatus, type ProjectSummary } from "@/app/data/mockData";

export function getStatusBadgeClasses(status: ProjectStatus) {
  if (status === "Drafting") {
    return "border border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "Missing Data") {
    return "border border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border border-slate-300 bg-white text-slate-700";
}

export function ProjectTable({
  projects,
  totalCount = PROJECT_TOTAL_COUNT,
}: {
  projects: ProjectSummary[];
  totalCount?: number;
}) {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    const query = filter.toLowerCase();
    return projects.filter((project) =>
      [project.id, project.name, project.customer, project.projectManager.name, project.status]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [filter, projects]);

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pagedProjects = filteredProjects.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const resultTotal = filter ? filteredProjects.length : totalCount;
  const showingStart = filteredProjects.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const showingEnd = filteredProjects.length === 0 ? 0 : Math.min(safePage * PAGE_SIZE, resultTotal);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Project pipeline</h2>
          <p className="text-sm text-slate-500">Filter active records and open draft statements of work.</p>
        </div>
        <input
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setPage(1);
          }}
          placeholder="Filter projects"
          aria-label="Filter projects"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-primary"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="pb-4 font-medium">Project ID</th>
              <th className="pb-4 font-medium">Project Name</th>
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Project Manager</th>
              <th className="pb-4 font-medium">Target Date</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {pagedProjects.map((project) => (
              <tr key={project.id} className="align-middle">
                <td className="py-4 pr-4">
                  <Link href={`/projects/${project.id}`} className="font-semibold text-primary hover:underline">
                    {project.id}
                  </Link>
                </td>
                <td className="py-4 pr-4">{project.name}</td>
                <td className="py-4 pr-4">{project.customer}</td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
                      {project.projectManager.initials}
                    </span>
                    <span>{project.projectManager.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4">{formatDate(project.targetDate)}</td>
                <td className="py-4 pr-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4">
                  <Link
                    href={`/templates/${project.id}`}
                    className="inline-flex rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
        <span>{`Showing ${showingStart}-${showingEnd} of ${resultTotal} projects`}</span>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(3, pageCount) }, (_, index) => {
            const pageNumber = index + 1;
            const selected = safePage === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
