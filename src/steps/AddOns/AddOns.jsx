import { ADD_ONS } from "@/data/plans";
import AddOnOption from "@/components/AddOnOption/AddOnOption";

function AddOns({ selectedAddOns, billing, onToggle }) {
  return (
    <section
      aria-labelledby="add-ons-title"
      className="font-body flex flex-col gap-6 md:gap-8"
    >
      <header className="flex flex-col gap-2">
        <h2
          id="add-ons-title"
          className="text-2xl md:text-[2rem] leading-[1.2] font-bold text-blue-950"
        >
          Pick add-ons
        </h2>

        <p className="text-base leading-normal text-grey-500" >Add-ons help enhance your gaming experience.</p>
      </header>

      <fieldset>
        <legend className="sr-only">
          Pick add-ons
        </legend>
        <div className="flex flex-col gap-4">
          {ADD_ONS.map((option) => (
            <AddOnOption
              key={option.id}
              addOn={option}
              billing={billing}
              checked={selectedAddOns.includes(option.id)}
              onChange={onToggle}
            />
          ))}
        </div>
      </fieldset>
    </section>
  );
}

export default AddOns;
