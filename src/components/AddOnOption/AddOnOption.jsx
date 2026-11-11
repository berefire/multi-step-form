import { formatPrice } from '@/utils/pricing';
import { getAssetUrl } from '@/utils/getAssetUrl';

function AddOnOption({ addOn, billing, checked, onChange, name = 'addOns' }) {
  return (
    <label className="font-body flex cursor-pointer items-center gap-4 rounded-lg border border-purple-200 bg-white p-4 hover:border-purple-600 has-checked:border-purple-600 has-checked:bg-blue-50 focus-ring-within focus-ring-within-purple-600 md:gap-6 md:px-6">
      <input
        type="checkbox"
        name={name}
        value={addOn.id}
        checked={checked}
        onChange={() => onChange(addOn.id)}
        className="sr-only"
      />

      <span
        aria-hidden="true"
        className={`grid size-5 shrink-0 place-items-center rounded border ${
          checked ? 'border-purple-600 bg-purple-600' : 'border-purple-200'
        }`}
      >
        {checked && <img src={getAssetUrl('assets/icons/icon-checkmark.svg')} alt="" />}
      </span>

      <span className="flex flex-col">
        <span className="text-sm font-medium leading-normal text-blue-950 md:text-base">{addOn.name}</span>
        <span className="text-xs leading-[1.2] text-gray-500 md:text-sm">{addOn.description}</span>
      </span>

      <span className="ml-auto text-xs leading-[1.2] text-purple-600 md:text-sm">
        {formatPrice(addOn.price[billing], billing, { sign: true })}
      </span>
    </label>
  );
}

export default AddOnOption;