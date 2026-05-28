import { render, screen } from "@testing-library/react";
import { ProjectTable, getStatusBadgeClasses } from "@/app/components/ProjectTable";
import { PROJECTS } from "@/app/data/mockData";

describe("ProjectTable", () => {
  it("renders project rows and pagination", () => {
    render(<ProjectTable projects={PROJECTS} totalCount={24} />);

    expect(screen.getByText("PRJ-2024-001")).toBeInTheDocument();
    expect(screen.getByText("Network Infrastructure Upgrade")).toBeInTheDocument();
    expect(screen.getByText("Showing 1-3 of 24 projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("returns expected badge classes", () => {
    expect(getStatusBadgeClasses("Drafting")).toContain("bg-blue-50");
    expect(getStatusBadgeClasses("Missing Data")).toContain("bg-rose-50");
    expect(getStatusBadgeClasses("Active")).toContain("border-slate-300");
  });
});
