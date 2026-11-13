import Button from "@/components/Button/Button";

function FormNavigation({ isFirstStep, isLastStep, onBack }) {
  return (
    <div className="fixed inset-x-0 bottom-0 flex items-center bg-white p-4 md:static md:mt-auto md:bg-transparent md:p-0">
      {!isFirstStep && (
        <Button variant="additional" onClick={onBack}>
          Go Back
        </Button>
      )}

      <Button
        type="submit"
        variant={isLastStep ? "primary" : "secondary"}
        className="ml-auto"
      >
        {isLastStep ? "Confirm" : "Next Step"}
      </Button>
    </div>
  );
}

export default FormNavigation;
