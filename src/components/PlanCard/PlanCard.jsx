import { formatPrice } from "@/utils/pricing";
import { getAssetUrl } from "@/utils/getAssetUrl";

function PlanCard({ plan, billing, checked, onChange, name = "plan" }) {
    const isYearly = billing === "yearly";

  return (
    <label className="flex cursor-pointer gap-4 rounded-lg border border-purple-200 p-4 bg-white hover:border-purple-600 has-checked:border-purple-600 has-checked:bg-blue-50 focus-ring-within focus-ring-within-purple-600 flex-1 lg:flex-col lg:gap-12 lg:w-34.5">
      <input
        type="radio"
        name={name}
        value={plan.id}
        checked={checked}
        onChange={() => onChange(plan.id)}
        className="sr-only"
      />
      <img
        src={getAssetUrl(`assets/icons/${plan.icon}`)}
        alt=""
        className="size-10"
      />

      <span className="flex flex-col gap-1">
        <span className="text-base leading-[1.2] font-medium text-blue-950">
          {plan.name}
        </span>
        <span className="text-sm leading-[1.2] text-grey-500">
          {formatPrice(plan.price[billing])}
        </span>
        {isYearly && (
          <span className="text-xs leading-[1.2] text-blue-950 md:hidden lg:inline">
            2 months free
          </span>
        )}
      </span>
      {/* Tablet only: on the right */}
      {isYearly && (
        <span className="ml-auto my-auto hidden text-xs leading-[1.2] text-blue-950 md:inline lg:hidden">
          2 months free
        </span>
      )}
    </label>
  );
}

export default PlanCard;
