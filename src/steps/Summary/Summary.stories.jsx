import{ fn } from "storybook/test";
import { ADD_ONS } from "@/data/plans";
import Summary from "./Summary";

export default {
  title: "Steps/Summary",
  component: Summary,
  args: {
    plan: "arcade",
    billing: "monthly",
    selectedAddOns: [ADD_ONS[0].id, ADD_ONS[1].id],
    onChangePlan: fn(),
  },
};

export const Monthly = {};
export const Yearly = { args: { billing: "yearly" } };
export const NoAddOns = { args: { selectedAddOns: [] } };