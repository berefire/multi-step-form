import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import TextInput from "./TextInput";

function renderInput(props = {}) {
  return render(<TextInput id="name" label="Name" placeholder="e.g. Stephen King" {...props} />);
}

describe("TextInput", () => {
  it("renders the input with its placeholder", () => {
    renderInput();

    expect(screen.getByPlaceholderText("e.g. Stephen King")).toBeInTheDocument();
  });

  it("lets the user type", async () => {
    renderInput();
    const input = screen.getByRole("textbox", { name: "Name" });

    await userEvent.type(input, "Stephen");

    expect(input).toHaveValue("Stephen");
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    renderInput({ onChange });

    await userEvent.type(screen.getByRole("textbox", { name: "Name" }), "S");

    expect(onChange).toHaveBeenCalled();
  });

  it("accepts a different input type", () => {
    renderInput({ id: "email", label: "Email Address", type: "email" });

    expect(screen.getByRole("textbox", { name: "Email Address" })).toHaveAttribute("type", "email");
  });
});

describe("TextInput accessibility", () => {
  it("connects the label to the input", () => {
    renderInput();

    expect(screen.getByLabelText("Name")).toHaveAttribute("id", "name");
  });

  it("is not marked invalid when there is no error", () => {
    renderInput();
    const input = screen.getByRole("textbox", { name: "Name" });

    expect(input).not.toBeInvalid();
    expect(input).not.toHaveAccessibleDescription();
  });

  it("marks the input invalid and describes the error", () => {
    renderInput({ error: "This field is required" });
    const input = screen.getByRole("textbox", { name: "Name" });

    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("This field is required");
  });

  it.each([
    ["without error", {}],
    ["with error", { error: "This field is required" }],
  ])("has no detectable accessibility violations (%s)", async (_, props) => {
    const { container } = renderInput(props);

    expect(await axe(container)).toHaveNoViolations();
  });
});