
interface BaseInput<T extends string | number | boolean> {
    label: React.ReactNode;
    name: string;
    onChange: (value: T) => void;
    value?: T;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
    hasError?: boolean;
}

export interface TextInputProps extends BaseInput<string> {
    type?: string;
}

export interface NumericInputProps extends BaseInput<number> {
    min?: number;
    max?: number;
    decimalPlaces?: number;
}

export interface MaskedInputProps extends BaseInput<number> {
    mask: string;
    maskPlaceholder?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectInputProps extends BaseInput<string> {
    options: SelectOption[];
}

export interface CheckboxInputProps extends BaseInput<boolean> {
    checked?: boolean;
    accent?: string;
}