import TextInput from "@/components/TextInput/TextInput";

function PersonalInfo({ data, errors, onChange }) {
  return (
    <section
      aria-labelledby="personal-info-title"
      className="font-body flex flex-col gap-6 md:gap-10"
    >
      <header className="flex flex-col gap-2 md:gap-3">
        <h2
          id="personal-info-title"
          className="text-2xl md:text-[2rem] leading-[1.2] font-bold text-blue-950"
        >
          Personal info
        </h2>
        <p className="text-base leading-normal text-grey-500">
          Please provide your name, email address, and phone number.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:gap-6">
        <TextInput
          id="name"
          name="name"
          label="Name"
          placeholder="e.g. Stephen King"
          autoComplete="name"
          value={data.name}
          error={errors.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="e.g. stephenking@lorem.com"
          autoComplete="email"
          value={data.email}
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        <TextInput
          id="phone"
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="e.g. +1 234 567 890"
          autoComplete="tel"
          value={data.phone}
          error={errors.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </section>
  );
}

export default PersonalInfo;
