import { render, screen } from "@testing-library/react";
import ProjectViewPage from "@/app/projects/[id]/page";

describe("Project view page", () => {
  it("renders the statement of work view", () => {
    render(<ProjectViewPage params={{ id: "PRJ-2024-001" }} />);

    expect(screen.getByText("Statement of Work: Project Alpha Implementation")).toBeInTheDocument();
    expect(screen.getByText("Last auto-saved: Just now")).toBeInTheDocument();
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
    expect(screen.getByText("Fields populated: 24/24")).toBeInTheDocument();
  });
});
