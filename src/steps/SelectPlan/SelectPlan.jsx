import { PLANS } from "@/data/plans";
import BillingToggle from "@/components/BillingToggle/BillingToggle";
import PlanCard from "@/components/PlanCard/PlanCard";


function SelectPlan({ plan, billing, onPlanChange, onBillingChange }) {

  return (
    <section
      aria-labelledby="select-plan-title"
      className="flex flex-col gap-6 md:gap-8"
    >
      <header className="flex flex-col gap-2">
        <h2
          id="select-plan-title"
          className="text-2xl md:text-[2rem] leading-[1.2] font-bold text-blue-950"
        >
          Select your plan
        </h2>

        <p className="text-base leading-normal text-grey-500"> You have the option of monthly or yearly billing.</p>
      </header>

      <fieldset>
        <legend className="sr-only">Select a plan</legend>
        <div className="flex flex-col gap-4 lg:flex-row">
          {PLANS.map((item) => (
            <PlanCard
              key={item.id}
              plan={item}
              billing={billing}
              checked={plan === item.id}
              onChange={onPlanChange}
            />
          ))}

        </div>
      </fieldset>
      <BillingToggle billing={billing} onChange={onBillingChange} />
    </section>
  );
}

export default SelectPlan;
