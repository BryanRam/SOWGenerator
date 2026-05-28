import { render, screen } from "@testing-library/react";
import { TemplateConfigView } from "@/app/components/TemplateConfigView";

describe("TemplateConfigView", () => {
  it("renders mapping rows and validation errors", () => {
    render(<TemplateConfigView projectId="PRJ-2024-001" />);

    expect(screen.getByText("SharePoint Data Mapping")).toBeInTheDocument();
    expect(screen.getByText("Project Name")).toBeInTheDocument();
    expect(screen.getByText(/\{\{Project_Name\}\}/)).toBeInTheDocument();
    expect(screen.getAllByText("Mandatory field empty in SharePoint.")[0]).toBeInTheDocument();
    expect(screen.getByText("1 Missing Field")).toBeInTheDocument();
  });
});
