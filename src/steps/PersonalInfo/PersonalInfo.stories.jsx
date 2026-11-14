import { fn } from "storybook/test";
import PersonalInfo from "./PersonalInfo";

export default {
    title: 'Steps/PersonalInfo',
    component: PersonalInfo,
    args: {
        data: { name: '', email: '', phone: '' },
        errors: {},
        onChange: fn,
    }
};

export const Empty = {};

export const Filled = {
    args: {
        data: { name: 'Stephen King', email: 'stephen.king@lorem.com', phone: '+1 234 567 890' }
    }
};

export const WithErrors = {
    args: {
        errors: {
            name: 'This field is required',
            email: 'This field is required',
            phone: 'This field is required'
        },
    },
};