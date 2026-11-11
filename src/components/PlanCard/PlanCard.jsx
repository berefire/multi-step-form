import { formatPrice } from '@/utils/pricing';
import { getAssetUrl } from '@/utils/getAssetUrl';

function PlanCard({ plan, billing, checked, onChange, name = 'plan'}) {
    return (
        <label
         className="font-body flex cursor-pointer gap-4 rounded-lg border border-purple-200 p-4 bg-white hover:border-purple-600 has-checked:border-purple-600 has-checked:bg-blue-50 focus-ring-within focus-ring-within-purple-600 flex-1 lg:flex-col lg:gap-12">

         <input
            type="radio"
            name={name}
            value={plan.id}
            checked={checked}
            onChange={() => onChange(plan.id)}
            className="sr-only"
        />
        <img  src={getAssetUrl(`assets/icons/${plan.icon}`)} alt="" className="size-10"/>
        
        <span className="flex flex-col gap-1">
            <span className="text-base leading-[1.2] font-medium text-blue-950">{plan.name}</span>
        <span className="text-sm leading-[1.2] text-grey-500">${formatPrice(plan.price[billing])}</span>

        </span>

        </label>
    );
}

export default PlanCard;