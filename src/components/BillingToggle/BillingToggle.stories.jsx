import { fn } from "storybook/test"
import { useArgs }  from 'storybook/preview-api';
import BillingToggle from './BillingToggle';

export default {
  title: 'Components/BillingToggle',
  component: BillingToggle,
  args: {
    onChange: fn(),   // shared by all stories
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
        <BillingToggle
            {...args}
            onChange={(value) => {
                args.onChange(value);
                updateArgs({billing: value});
            }}
        />
    );
  },
};

export const Monthly = { args: { billing: 'monthly' } };
export const Yearly = { args: { billing: 'yearly' } };
