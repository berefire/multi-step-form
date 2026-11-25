import { useState } from "react";
import { PLANS } from "@/data/plans";
import { validatePersonalInfo } from "@/utils/validation";

const INITIAL_DATA = {
    name: "",
    email: "",
    phone: "",
    plan: PLANS[0].id,
    billing: "monthly",
    addOns: [ "online-service", "larger-storage"],
};

const LAST_STEP = 3;
const THANK_YOU_STEP = 4;

export function useMultiStepForm(){
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState({});
    const [direction, setDirection] = useState("forward");

    function updateField(field, value){
        setFormData( (prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    function toggleAddOn(id) {
        setFormData((prev) => ({
            ...prev,
            addOns: prev.addOns.includes(id)
                ? prev.addOns.filter((addOn) => addOn !== id)
                : [...prev.addOns, id],
        }));
    }

    function goBack() {
        setDirection("back");
        setStep((prev) => Math.max(prev - 1, 0));
    }

    function goTo(target){
        setDirection(target < step ? "back" : "forward");
        setStep(target);
    }

    function next() {
        if ( step === 0 ) {
            const newErros = validatePersonalInfo(formData);
            setErrors(newErros);
            const firstInvalid = Object.keys(newErros)[0];
            if (firstInvalid) return firstInvalid;
        }
        setDirection("forward");
        setStep((prev) => Math.min(prev + 1, THANK_YOU_STEP));
        return null;
    }

    return {
        step,
        formData,
        errors,
        direction,
        isFirstStep: step === 0,
        isLastStep: step === LAST_STEP,
        isComplete: step === THANK_YOU_STEP,
        goBack,
        goTo,
        next,
        updateField,
        toggleAddOn
    }
}