import { Button } from './button.component';
export default {
    title: 'Design System/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['contained', 'outlined', 'text'],
            control: { type: 'radio' },
        },
        color: {
            options: ['primary', 'secondary', 'error', 'info'],
            control: { type: 'radio' },
        },
    },
};

export const Default = {
    args: {
        label: 'button',
        color: "primary"
    },
};