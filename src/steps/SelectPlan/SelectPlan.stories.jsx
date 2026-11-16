import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { PLANS } from "@/data/plans";
import SelectPlan from "./SelectPlan";

export default {
    title: 'Steps/SelectPlan',
    component: SelectPlan,
    args: {
        plan: PLANS[0].id,
        billing: 'monthly',
        onPlanChange: fn(),
        onBillingChange: fn(),
    }, 
    render: function Render(args){
        const [, updateArgs] = useArgs();
        return (
            <SelectPlan
                {...args}
                onPlanChange={(id) => {
                    args.onPlanChange(id);
                    updateArgs({ plan: id });
                }}
                onBillingChange={(value) => {
                    args.onBillingChange(value);
                    updateArgs({ billing: value });
                }}
            />
        )
    }
};

export const Default = {};

export const Yearly = {
    args: {
        billing: 'yearly'
    }
};