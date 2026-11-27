import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import Button from './Button';

describe('Button', () => {
    it("calls onClick when clicked", async () => {
        const onClick = vi.fn();

        render(<Button onClick={onClick}>Next Step</Button>); 

        await userEvent.click(screen.getByRole("button", { name: "Next Step" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe("Button accessibility", () => {
    it("is exposed as a button with its text as the accessible name", () => {
        render(<Button>Next Step</Button>);

        expect(screen.getByRole("button", { name: "Next Step" })).toBeInTheDocument();
    });

    it('defaults to type="button" so it never submits a form by accident', () => {
        render(<Button>Go Back</Button>);

        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("can be activated with Enter and Space", async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Next Step</Button>);

        await userEvent.tab();
        expect(screen.getByRole("button")).toHaveFocus();

        await userEvent.keyboard("{Enter}");
        await userEvent.keyboard(" ");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("does not respond when disabled", async () => {
        const onClick = vi.fn();
        render(<Button disabled onClick={onClick}>Confirm</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it.each(["primary", "secondary", "additional"])("has no detectable accessibility violations (variant: %s)", async (variant) => {
        const { container } = render(<Button variant={variant}>Label</Button>);

        expect(await axe(container)).toHaveNoViolations();
    });
});