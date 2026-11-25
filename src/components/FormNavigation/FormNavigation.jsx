import Button from "@/components/Button/Button";

function FormNavigation({ isFirstStep, isLastStep, onBack, footer }) {
  return (
    <div className="fixed inset-x-0 bottom-0 md:static md:mt-auto">
      <div className="flex items-center bg-white p-4 md:bg-transparent md:p-0">
        {!isFirstStep && (
          <Button variant="additional" onClick={onBack}>Go Back</Button>
        )}
        <Button
          type="submit"
          variant={isLastStep ? "secondary" : "primary"}
          className="ml-auto"
        >
          {isLastStep ? "Confirm" : "Next Step"}
        </Button>
      </div>

      {footer && (
        <div className="bg-blue-100 py-1 md:hidden">
          {footer}
        </div>
      )}
    </div>
  );
}

export default FormNavigation;
