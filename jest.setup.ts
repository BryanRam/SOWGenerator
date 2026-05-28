import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children);
});
