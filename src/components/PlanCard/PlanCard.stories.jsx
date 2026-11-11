import { fn } from "storybook/test";
import { useArgs } from "storybook/preview-api";
import { useState } from "react";
import { PLANS } from "@/data/plans";
import PlanCard from "./PlanCard";

export default {
  title: "Components/PlanCard",
  component: PlanCard,
  args: {
    plan: PLANS[0],
    billing: "monthly",
    checked: false,
    onChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <PlanCard
        {...args}
        onChange={(id) => {
          args.onChange(id);
          updateArgs({ checked: true });
        }}
      />
    );
  },
};

export const Monthly = {};

export const Yearly = {
  args: { billing: "yearly" },
};

export const Selected = {
  args: {
    checked: true,
  },
};

export const Group = {
  render: function Render(args) {
    const [selected, setSelected] = useState("arcade");
    return (
      <fieldset>
      <legend className="sr-only">Select your plan</legend>
        <div className="flex flex-col gap-4 lg:flex-row">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={args.billing}
              checked={selected === plan.id}
              onChange={(id) => {
                setSelected(id);
                args.onChange(id);
              }}
            />
          ))}
        </div>
      </fieldset>
    );
  },
};
