import Button from './Button';

export default {
    title: "Components/Button",
    component: Button,
};

export const PrimaryButton = {
    args: {
        children: "Next Step"
    }
};

export const SecondaryButton = {
    args: {
        variant: "secondary",
        children: "Confirm"
    }
};

export const AdditionalButton = {
    args: {
        variant: "additional",
        children: "Go Back"
    }
};