import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { shake } from "@/utils/shake";

import StepIndicator from "@/components/StepIndicator/StepIndicator";
import FormNavigation from "@/components/FormNavigation/FormNavigation";
import Attribution from "@/components/Attribution/Attribution";
import PersonalInfo from "@/steps/PersonalInfo/PersonalInfo";
import SelectPlan from "@/steps/SelectPlan/SelectPlan";
import AddOns from "@/steps/AddOns/AddOns";
import Summary from "@/steps/Summary/Summary";
import ThankYou from "@/steps/ThankYou/ThankYou";

function App() {
  const form = useMultiStepForm();

  function handleSubmit(event) {
    event.preventDefault();
    const invalidFields = form.next();

    if (invalidFields?.length > 0) {
      const { elements } = event.currentTarget;
      invalidFields.forEach((name) => shake(elements[name]));
      elements[invalidFields[0]]?.focus();
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-blue-100">
      <div
        className={`flex-1 md:grid md:place-items-center md:p-6 ${
          form.isComplete ? "" : "pb-32 md:pb-6"
        }`}
      >
        <div className="md:flex md:gap-24 md:rounded-2xl md:bg-white md:p-3 md:pr-20 md:shadow-xl">
          <StepIndicator currentStep={Math.min(form.step, 3)} />
          <form
            noValidate
            onSubmit={handleSubmit}
            className="relative mx-4 -mt-18 flex flex-col rounded-xl bg-white px-6 py-8 shadow-xl md:shadow-none md:m-0 md:p-0 md:pt-10 md:pb-4"
          >
            <div
              key={form.step}
              className="flex flex-1 flex-col motion-safe:animate-fade-in"
              style={{
                "--step-offset":
                  form.direction === "forward" ? "1rem" : "-1rem",
              }}
            >
              {form.step === 0 && (
                <PersonalInfo
                  data={form.formData}
                  errors={form.errors}
                  onChange={form.updateField}
                />
              )}

              {form.step === 1 && (
                <SelectPlan
                  plan={form.formData.plan}
                  billing={form.formData.billing}
                  onPlanChange={(id) => form.updateField("plan", id)}
                  onBillingChange={(value) =>
                    form.updateField("billing", value)
                  }
                />
              )}

              {form.step === 2 && (
                <AddOns
                  selectedAddOns={form.formData.addOns}
                  billing={form.formData.billing}
                  onToggle={form.toggleAddOn}
                />
              )}

              {form.step === 3 && (
                <Summary
                  plan={form.formData.plan}
                  billing={form.formData.billing}
                  selectedAddOns={form.formData.addOns}
                  onChangePlan={() => form.goTo(1)}
                />
              )}

              {form.step === 4 && <ThankYou />}
            </div>
            {!form.isComplete && (
              <FormNavigation
                isFirstStep={form.isFirstStep}
                isLastStep={form.isLastStep}
                onBack={form.goBack}
                footer={<Attribution />}
              />
            )}
          </form>
        </div>
      </div>
      <div
        className={`px-2 md:block md:pb-0 ${form.isComplete ? "" : "hidden"}`}
      >
        <Attribution />
      </div>
    </main>
  );
}

export default App;
