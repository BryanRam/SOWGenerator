import { render, screen } from "@testing-library/react";
import { SOWPreview } from "@/app/components/SOWPreview";

describe("SOWPreview", () => {
  it("renders document content and export controls", () => {
    render(<SOWPreview projectId="PRJ-2024-001" />);

    expect(screen.getByText("Statement of Work: Project Alpha Implementation")).toBeInTheDocument();
    expect(screen.getByText("Download as Word (.docx)")).toBeInTheDocument();
    expect(screen.getByText("Download as PDF")).toBeInTheDocument();
    expect(screen.getByText("Save to SharePoint")).toBeInTheDocument();
    expect(screen.getByText("100% Mapped")).toBeInTheDocument();
  });
});
