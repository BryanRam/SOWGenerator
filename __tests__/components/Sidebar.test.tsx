import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/app/components/Sidebar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Sidebar", () => {
  it("renders nav items and new document button", () => {
    render(<Sidebar />);

    expect(screen.getByText("SoW Generator")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /new document/i })).toBeInTheDocument();
    expect(screen.getByText("Recent Documents")).toBeInTheDocument();
    expect(screen.getByText("Template Library")).toBeInTheDocument();
    expect(screen.getByText("Project Context")).toBeInTheDocument();
  });
});
