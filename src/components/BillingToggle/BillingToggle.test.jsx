import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import BillingToggle from "./BillingToggle";

function renderToggle(props = {}) {
  const onChange = vi.fn();
  const utils = render(
    <BillingToggle billing="monthly" onChange={onChange} {...props} />,
  );
  return { ...utils, onChange };
}

function getSwitch() {
  return screen.getByRole("switch", { name: /yearly billing/i });
}

describe("BillingToggle", () => {
  it("shows both billing options", () => {
    renderToggle();

    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("switches to yearly when clicked in monthly mode", async () => {
    const { onChange } = renderToggle();

    await userEvent.click(getSwitch());

    expect(onChange).toHaveBeenCalledWith("yearly");
  });

  it("switches to monthly when clicked in yearly mode", async () => {
    const { onChange } = renderToggle({ billing: "yearly" });

    await userEvent.click(getSwitch());

    expect(onChange).toHaveBeenCalledWith("monthly");
  });
});

describe("BillingToggle accessibility", () => {
  it("exposes the current state through aria-checked", () => {
    const { rerender } = renderToggle();
    expect(getSwitch()).not.toBeChecked();

    rerender(<BillingToggle billing="yearly" onChange={vi.fn()} />);
    expect(getSwitch()).toBeChecked();
  });

  it("can be toggled with Space and Enter", async () => {
    const { onChange } = renderToggle();

    await userEvent.tab();
    expect(getSwitch()).toHaveFocus();

    await userEvent.keyboard(" ");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('uses type="button" so it never submits the form', () => {
    renderToggle();

    expect(getSwitch()).toHaveAttribute("type", "button");
  });

  it.each(["monthly", "yearly"])(
    "has no detectable accessibility violations (billing: %s)",
    async (billing) => {
      const { container } = renderToggle({ billing });

      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
