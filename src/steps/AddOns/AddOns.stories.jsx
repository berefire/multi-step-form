import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { ADD_ONS } from "@/data/plans";
import AddOns from "./AddOns";

export default {
  title: "Steps/AddOns",
  component: AddOns,
  args: {
    selectedAddOns: [],
    billing: "monthly",
    onToggle: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <AddOns
        {...args}
        onToggle={(id) => {
          args.onToggle(id);
          updateArgs({
            selectedAddOns: args.selectedAddOns.includes(id)
              ? args.selectedAddOns.filter((item) => item !== id)
              : [...args.selectedAddOns, id],
          });
        }}
      />
    );
  },
};

export const Default = {};

export const Yearly = {
  args: {
    billing: "yearly",
  },
};

export const WithSelection = {
  args: { selectedAddOns: [ADD_ONS[0].id, ADD_ONS[1].id] },
};
