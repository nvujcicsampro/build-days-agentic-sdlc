import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Sidequest itinerary form", () => {
  it("submits from the keyboard and focuses the source-attributed results", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.tab();
    expect(screen.getByRole("combobox", { name: "City" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("spinbutton", { name: "Time available" })).toHaveFocus();

    const submit = screen.getByRole("button", { name: /find my sidequest/i });
    submit.focus();
    await user.keyboard("{Enter}");

    const results = await screen.findByRole("region", { name: /your london edit/i });
    await waitFor(() => expect(results).toHaveFocus());
    expect(within(results).getByRole("heading", { name: "Explore Tate Modern" }))
      .toBeInTheDocument();
    expect(
      within(results).getByRole("link", {
        name: "Source: Tate Modern visitor information",
      }),
    ).toHaveAttribute("href", "https://www.tate.org.uk/visit/tate-modern");
    expect(within(results).getAllByText(/^Checked/)[0]?.closest("time")).toHaveAttribute(
      "datetime",
      "2026-09-30",
    );
  });

  it("associates invalid time with its field", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.clear(screen.getByRole("spinbutton", { name: "Time available" }));
    await user.type(screen.getByRole("spinbutton", { name: "Time available" }), "0");
    await user.click(screen.getByRole("button", { name: /find my sidequest/i }));

    const hours = screen.getByRole("spinbutton", { name: "Time available" });
    expect(hours).toHaveAttribute("aria-invalid", "true");
    expect(hours).toHaveAccessibleDescription(
      "Enter a whole number of hours from 1 to 24.",
    );
    expect(
      screen.queryByRole("region", { name: /your london edit/i }),
    ).not.toBeInTheDocument();
  });

  it("labels city ideas when no exact match exists", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole("combobox", { name: "City" }), "Mexico City");
    await user.click(screen.getByRole("checkbox", { name: "Nature" }));
    await user.click(screen.getByRole("button", { name: /find my sidequest/i }));

    const results = await screen.findByRole("region", {
      name: /your mexico city edit/i,
    });
    expect(within(results).getByRole("status")).toHaveTextContent(
      "No exact fit for every filter",
    );
    expect(within(results).getByText(/may fall outside your chosen time or budget/i))
      .toBeInTheDocument();
    expect(
      within(results).getByRole("heading", {
        name: "Walk along Paseo de la Reforma",
      }),
    ).toBeInTheDocument();
    expect(
      within(results).getByRole("link", {
        name: "Source: Mexico City official visitor guide: Getting around",
      }),
    ).toHaveAttribute(
      "href",
      "https://mexicocity.cdmx.gob.mx/e/getting-around/",
    );
  });

  it("requires at least one interest and keeps preferences local", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("checkbox", { name: "Art" }));
    await user.click(screen.getByRole("button", { name: /find my sidequest/i }));

    expect(screen.getByText("Choose at least one listed interest.")).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: /your london edit/i }),
    ).not.toBeInTheDocument();
  });
});
