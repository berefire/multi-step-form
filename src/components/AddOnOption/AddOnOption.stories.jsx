import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { useState } from "react";
import { ADD_ONS } from "@/data/plans";
import AddOnOption from "./AddOnOption";

export default {
  title: "Components/AddOnOption",
  component: AddOnOption,
  args: {
    addOn: ADD_ONS[0],
    billing: "monthly",
    checked: false,
    onChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <AddOnOption
        {...args}
        onChange={(id) => {
          args.onChange(id);
          updateArgs({ checked: !args.checked });
        }}
      />
    );
  },
};

export const Monthly = {};

export const Yearly = {
  args: {
    billing: "yearly",
  },
};

export const Selected = {
  args: { checked: true },
};

export const Group = {
  render: function Render(args) {
    const [checkedItems, setCheckedItems] = useState([]);
    return (
      <fieldset>
        <legend className="sr-only">Pick add-ons</legend>
        <div className="flex flex-col gap-3 md:gap-4">
          {ADD_ONS.map((addOn) => (
            <AddOnOption
              key={addOn.id}
              addOn={addOn}
              billing={args.billing}
              checked={checkedItems.includes(addOn.id)}
              onChange={(id) => {
                args.onChange(id);
                setCheckedItems((prev) =>
                  prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id],
                );
              }}
            />
          ))}
        </div>
      </fieldset>
    );
  },
};
