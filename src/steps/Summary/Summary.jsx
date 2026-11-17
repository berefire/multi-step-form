import { PLANS, ADD_ONS } from "@/data/plans";
import { calculateTotal, formatPrice } from "@/utils/pricing";

function Summary({ plan, billing, selectedAddOns, onChangePlan }) {
  const selectedPlan = PLANS.find((item) => item.id === plan);
  const chosenAddOns = ADD_ONS.filter((item) => selectedAddOns.includes(item.id));
  const total = calculateTotal({ plan, billing, addOns: selectedAddOns });
  const period = billing === "monthly" ? "Monthly" : "Yearly";

  return (
    <section aria-labelledby="summary-title" className="flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col gap-2">
        <h2 id="summary-title" className="text-2xl font-bold leading-[1.2] text-blue-950 md:text-[2rem]">
          Finishing up
        </h2>
        <p className="text-base leading-normal text-gray-500">
          Double-check everything looks OK before confirming.
        </p>
      </header>

      <div className="rounded-lg bg-blue-50 p-4 md:px-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3 md:pb-6">
          <div className="flex flex-col items-start gap-1">
            <p className="text-sm font-medium text-blue-950 md:text-base">
              {selectedPlan.name} ({period})
            </p>
            <button
              type="button"
              onClick={onChangePlan}
              className="cursor-pointer text-sm text-gray-500 underline hover:text-purple-600 focus-ring"
            >
              Change<span className="sr-only"> plan</span>
            </button>
          </div>
          <p className="text-sm font-bold text-blue-950 md:text-base">
            {formatPrice(selectedPlan.price[billing], billing)}
          </p>
        </div>

        {chosenAddOns.length > 0 && (
          <ul className="flex flex-col gap-3 pt-3 md:gap-4 md:pt-4">
            {chosenAddOns.map((addOn) => (
              <li key={addOn.id} className="flex justify-between text-sm">
                <span className="text-gray-500">{addOn.name}</span>
                <span className="text-blue-950">
                  {formatPrice(addOn.price[billing], billing, { sign: true })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between px-4 md:px-6">
        <p className="text-sm text-gray-500">
          Total (per {billing === "monthly" ? "month" : "year"})
        </p>
        <p className="text-base font-bold text-purple-600 md:text-xl">
          {formatPrice(total, billing, { sign: true })}
        </p>
      </div>
    </section>
  );
}

export default Summary;
