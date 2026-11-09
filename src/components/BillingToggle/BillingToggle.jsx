function BillingToggle({ billing, onChange }) {
  const isYearly = billing === "yearly";
  const toggle = () => onChange(isYearly ? "monthly" : "yearly");

  return (
    <div className="flex items-center justify-center gap-6 rounded-lg bg-blue-50 py-3.5 text-sm font-medium font-body leading-normal">
      <span className={isYearly ? "text-grey-500" : "text-blue-950"}>
        Monthly
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label="Yearly billing"
        onClick={toggle}
        className="relative h-5 w-9.5 rounded-full bg-blue-950 focus-ring focus-ring-blue-950"
      >
        <span
          className={`absolute top-1 left-1 size-3 rounded-full bg-white transition-transform ${
            isYearly ? "translate-x-4.5" : ""
          }`}
        />
      </button>

      <span className={isYearly ? "text-blue-950" : "text-grey-500"}>
        Yearly
      </span>
    </div>
  );
}

export default BillingToggle;
