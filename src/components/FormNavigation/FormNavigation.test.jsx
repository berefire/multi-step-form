import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import FormNavigation from "./FormNavigation";

function renderNav(props = {}) {
  const onBack = vi.fn();
  const onSubmit = vi.fn((event) => event.preventDefault());

  const utils = render(
    <form onSubmit={onSubmit}>
      <FormNavigation
        isFirstStep={false}
        isLastStep={false}
        onBack={onBack}
        {...props}
      />
    </form>,
  );

  return { onBack, onSubmit, ...utils };
}

describe("FormNavigation", () => {
  it('hides "Go Back" on the first step', () => {
    renderNav({ isFirstStep: true });

    expect(
      screen.queryByRole("button", { name: /go back/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next step/i }),
    ).toBeInTheDocument();
  });

  it('shows "Go Back" and "Next Step" on a middle step', () => {
    renderNav();

    expect(
      screen.getByRole("button", { name: /go back/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next step/i }),
    ).toBeInTheDocument();
  });

  it('shows "Confirm" instead of "Next Step" on the last step', () => {
    renderNav({ isLastStep: true });

    expect(
      screen.getByRole("button", { name: /confirm/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /next step/i }),
    ).not.toBeInTheDocument();
  });

  it('calls onBack when "Go Back" is clicked, without submitting the form', async () => {
    const { onBack, onSubmit } = renderNav();

    await userEvent.click(screen.getByRole("button", { name: /go back/i }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it.each([
    ["Next Step", { isLastStep: false }],
    ["Confirm", { isLastStep: true }],
  ])('submits the form when "%s" is clicked', async (label, props) => {
    const { onSubmit } = renderNav(props);

    await userEvent.click(screen.getByRole("button", { name: label }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders the footer when provided", () => {
    renderNav({ footer: <p>Footer content</p> });

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});

describe("FormNavigation accessibility", () => {
  it('reaches "Go Back" before "Next Step" with the keyboard', async () => {
    renderNav();

    await userEvent.tab();
    expect(screen.getByRole("button", { name: /go back/i })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole("button", { name: /next step/i })).toHaveFocus();
  });

  it.each([
    ["first step", { isFirstStep: true }],
    ["middle step", {}],
    ["last step", { isLastStep: true }],
  ])("has no detectable accessibility violations (%s)", async (_, props) => {
    const { container } = renderNav(props);

    expect(await axe(container)).toHaveNoViolations();
  });
});
