import TextInput from './TextInput';

export default {
    title: 'Components/TextInput',
    component: TextInput
};

export const Default = {
    args: {
        id: 'name',
        label: 'Name',
        placeHolder: 'e.g. Stephen King',   
        value: '',
    }
}

export const WithValue = {
    args: {
        id: 'name',
        label: 'Name',
        placeHolder: 'e.g. Stephen King',   
        value: 'Stephen King',
    }
}

export const WithError = {
    args: {
        id: 'name-error',
        label: 'Name',
        placeHolder: 'e.g. Stephen King',
        error: 'This field is required',
        value: '',
    }
}