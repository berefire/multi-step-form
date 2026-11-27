import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { PLANS } from "@/data/plans";
import PlanCard from "./PlanCard";

const arcade = PLANS[0];

function renderPlanCard(props = {}) {
    const onChange = vi.fn();
    render(
        <PlanCard
            plan={arcade}
            billing="monthly"
            checked={false}
            onChange={onChange}
            {...props}
        />
    )
    return { onChange };
}

describe("PlanCard", () => {
    it("shows the plan name and monthly price", () => {
        renderPlanCard();

        expect(screen.getByText(arcade.name)).toBeInTheDocument();
        expect(screen.getByText("+$9/mo")).toBeInTheDocument();
    });

    it("shows the yearly price and the promo when billing is yearly", () => {
        renderPlanCard({ billing: "yearly" });

        expect(screen.getByText("+$90/yr")).toBeInTheDocument();
        expect(screen.getAllByText("2 months free").length).toBeGreaterThan(0);
    });

    it("does not show the promo when billing is monthly", () => {
        renderPlanCard();

        expect(screen.queryByText("2 months free")).not.toBeInTheDocument();
    });

    it("reflects the checked property", () => {
        renderPlanCard({ checked: true });

        expect(screen.getByRole("radio", { name: /arcade/i })).toBeChecked();
    });

    it("calls onChange with the plan id when clicked", async () => {
        const { onChange } = renderPlanCard();

        await userEvent.click(screen.getByRole("radio", { name: /arcade/i }));
        expect(onChange).toHaveBeenCalledWith(arcade.id);
    });
});

describe("PlanCard accessibility", () => {
    it("includes the price in the radio's accessible name", () => {
        renderPlanCard();

        expect(screen.getByRole("radio", { name: /arcade/i })).toHaveAccessibleName(/\+\$9\/mo/);
    });

    it("hides the decorative icon from assistive technology", () => {
        renderPlanCard();

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("has no automatically detectable accesibility violations", async () => {
        const onChange = vi.fn();
        const { container } = render(
            <PlanCard plan={arcade} billing="yearly" checked={false} onChange={onChange} />
        );

        expect(await axe(container)).toHaveNoViolations();
    });
});