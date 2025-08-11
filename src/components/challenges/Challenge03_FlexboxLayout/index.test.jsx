import React from "react";
import { render, screen } from "@testing-library/react";
import Challenge03_FlexboxLayout from "./index";

describe("Challenge03_FlexboxLayout", () => {
  test("renders all layout elements correctly", () => {
    render(<Challenge03_FlexboxLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByText("Extra Content")).toBeInTheDocument();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Related Images")).toBeInTheDocument();
    expect(screen.getByText("Related Posts")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  test("renders the challenge title and description", () => {
    render(<Challenge03_FlexboxLayout />);

    expect(screen.getByText("📐 Flexbox Layout")).toBeInTheDocument();
    expect(
      screen.getByText(
        "React code for generating the below figure (using flex)"
      )
    ).toBeInTheDocument();
  });
});
