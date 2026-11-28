import { render, screen } from '@testing-library/react';
import { axe } from "vitest-axe";
import StepIndicator from './StepIndicator';

const LABELS = [ "Your Info", "Select Plan", "Add-Ons", "Summary"];

describe("StepIndicator", ()  => {
    it("renders the four steps in order", () => {
        render(<StepIndicator currentStep={0} />);

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(4);
        items.forEach((item, index) => {
            expect(item).toHaveTextContent(LABELS[index]);
        });
    });
});

describe("StepIndicator accessibility", () => {
    it("is exposed as a labelled navigation landmark", () => {
        render(<StepIndicator currentStep={0} />);

        expect(screen.getByRole("navigation", { name: /form progress/i })).toBeInTheDocument();
    });

    it.each([0, 1, 2, 3])('marks only step %i with aria-current="step"', (currentStep) => {
        render(<StepIndicator currentStep={currentStep} />);

        const items = screen.getAllByRole("listitem");
        items.forEach((item, index) => {
            if (index === currentStep) {
                expect(item).toHaveAttribute("aria-current", "step");
            } else {
                expect(item).not.toHaveAttribute("aria-current");
            }
        });
    });

    it.each([0, 3])("has no detectable accessibility violations (step %i)", async (currentStep) => {
        const { container } = render(<StepIndicator currentStep={currentStep} />);

        expect(await axe(container)).toHaveNoViolations();
    });
});