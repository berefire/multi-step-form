import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import userEvent from "@testing-library/user-event";
import { ADD_ONS } from "@/data/plans";
import AddOnOption from "./AddOnOption";

const onlineService = ADD_ONS[0];

function renderAddOn(props = {}) {
    const onChange = vi.fn();
    render(
        <AddOnOption
            addOn={onlineService}
            billing="monthly"
            checked={false}
            onChange={onChange}
        {...props}
        />
    );
    return { onChange };
}

describe("AddOnOption", () => {
    it("shows the name, description, and monthly price", () => {
        renderAddOn();

        expect(screen.getByText(onlineService.name)).toBeInTheDocument();
        expect(screen.getByText(onlineService.description)).toBeInTheDocument();
        expect(screen.getByText("+$1/mo")).toBeInTheDocument();
    });

    it("shows the yearly price when billing is yearly", () => {
        renderAddOn({ billing: "yearly"});

        expect(screen.getByText("+$10/yr")).toBeInTheDocument();
    });

    it("reflects the checked prop", () => {
        renderAddOn({ checked: true });

        expect(screen.getByRole("checkbox", { name: /online service/i })).toBeChecked();
    });

    it("calls onChange with the add-on id when clicked", async () => {
        const { onChange } = renderAddOn();

        await userEvent.click(screen.getByRole("checkbox", { name: /online service/i }));

        expect(onChange).toHaveBeenCalledWith(onlineService.id);
    });

    it("can be toggled with the keyboard", async () => {
        const { onChange } = renderAddOn();

        await userEvent.tab();
        expect(screen.getByRole("checkbox", { name: /online service/i })).toHaveFocus();

        await userEvent.keyboard(" ");
        expect(onChange).toHaveBeenCalledWith(onlineService.id);
    });
});

describe("AddOnOption accessibility", () => {
    it("includes the description and price in the checkbox's accessible name", () => { 
        renderAddOn();

        const checkbox = screen.getByRole("checkbox", { name: /online service/i });
        expect(checkbox).toHaveAccessibleName(/multiplayer games/i);
        expect(checkbox).toHaveAccessibleName(/\+\$1\/mo/i);
    });

    it("hides the decorative checkmark from assistive technology", () => {
        renderAddOn({ checked:true });

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it.each([false, true])(
        "has no detectable accessibility violations (checked: %s)",
       async(checked) => {
        const { container } = render(
            <AddOnOption addOn={onlineService} billing="monthly" checked={checked} onChange={vi.fn()} />
        );
        
        expect(await axe(container)).toHaveNoViolations();

       }
    );
});

