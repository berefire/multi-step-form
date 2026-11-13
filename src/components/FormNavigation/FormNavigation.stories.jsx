import { fn } from 'storybook/test';
import FormNavigation from './FormNavigation';

export default {
    title: 'Components/FormNavigation',
    component: FormNavigation,
    args: {
        isFirstStep: false,
        isLastStep: false,
        onBack: fn(),
    },
};

export const FirstStep = {
    args: {
        isFirstStep: true,
    },
};

export const MiddleStep = {};

export const LastStep = {
    args: {
        isLastStep: true,
    },
};