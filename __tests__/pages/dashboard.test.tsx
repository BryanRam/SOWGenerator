import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Dashboard page", () => {
  it("renders dashboard stats and project content", () => {
    render(<Home />);

    expect(screen.getAllByText("Active Projects")[0]).toBeInTheDocument();
    expect(screen.getByText("Total Active Contexts")).toBeInTheDocument();
    expect(screen.getByText("Pending Drafts")).toBeInTheDocument();
    expect(screen.getByText("Quick Generate")).toBeInTheDocument();
    expect(screen.getByText("Filter View")).toBeInTheDocument();
  });
});
