import { cn } from "@/lib/utils";
import { converterDecimal, converterDecimalReturnNumber, stringParaNumber } from "@/utils/decimal";
import Decimal from "decimal.js";
import { FaPlus } from "react-icons/fa6";
import { MaskedInputProps, NumericInputProps, SelectInputProps, TextInputProps, SelectOption, CheckboxInputProps } from "./types";
import InputMask from "@mona-health/react-input-mask";
import Select from 'react-select'
import { useEffect, useState } from "react";

export function NumericInput({
    name,
    value,
    onChange,
    id,
    disabled,
    min,
    max,
    decimalPlaces = 2,
    placeholder,
    hasError,
    label
}: NumericInputProps) {
    function corrigeMinMax(value: number) {
        if (!!min && value < min)
            return min;
        else if (!!max && value > max)
            return max;
        else
            return value;
    }

    const handleValueChange = (newVal: number) => {
        const correctedValue = corrigeMinMax(newVal);
        onChange(correctedValue);
    };

    return (
        <div className="relative text-sm">
            <label className="bloc font-medium mb-1 ml-1">{label}</label>

            <input
                name={name}
                id={id ?? `id_${name}`}
                value={converterDecimalReturnNumber(converterDecimal(value ?? 0, decimalPlaces), decimalPlaces)}
                disabled={disabled}
                min={min}
                onChange={(e) => {
                    const numericValue = stringParaNumber(e.target.value, decimalPlaces);
                    handleValueChange(numericValue);
                }}
                placeholder={placeholder}
                className={cn(
                    "w-full mt-1 rounded-lg border px-3 py-2 placeholder-gray-400 text-gray-800 dark:text-gray-300 bg-white dark:bg-transparent",
                    "disabled:bg-gray-100 disabled:cursor-not-allowed",
                    !hasError ? "border-gray-300" : "border-red-500",
                    "focus:outline-none focus:ring-2 focus:ring-primary -600 focus:border-primary -600"
                )}
                autoComplete="off"
            />

            <div className="w-fit flex flex-row gap-2 absolute bottom-1.5 right-2 text-sm">
                <button
                    type="button"
                    disabled={min !== undefined && (value ?? 0) <= min}
                    onClick={() => {
                        const newVal = new Decimal(value ?? 0).minus(1);
                        if (min !== undefined && newVal.lessThan(min)) {
                            handleValueChange(min);
                        } else {
                            handleValueChange(newVal.toNumber());
                        }
                    }}
                    className={cn(
                        "text-gray-500 disabled:text-gray-500/40 outline-gray-200 cursor-pointer",
                        "enabled:hover:bg-gray-400/5 outline-1 rounded-md p-1 aspect-square size-6.5 flex justify-center items-center font-extrabold"
                    )}
                >
                    –
                </button>

                <button
                    type="button"
                    disabled={max !== undefined && (value ?? 0) >= max}
                    onClick={() => {
                        const newVal = new Decimal(value ?? 0).plus(1);
                        if (max !== undefined && newVal.greaterThan(max)) {
                            handleValueChange(max);
                        } else {
                            handleValueChange(newVal.toNumber());
                        }
                    }}
                    className={cn(
                        "text-gray-500 disabled:text-gray-500/40 outline-gray-200 cursor-pointer",
                        "hover:bg-gray-400/5 outline-1 rounded-md p-1 aspect-square size-6.5 flex justify-center items-center"
                    )}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
}

export function MaskedInput({
    name,
    value,
    onChange,
    mask,
    id,
    disabled,
    placeholder,
    maskPlaceholder,
    hasError,
    label
}: MaskedInputProps) {

    return (
        <div className="text-sm">
            <label className="bloc font-medium mb-1 ml-1">{label}</label>
            <div className="flex flex-row items-end">
                <InputMask
                    id={id ?? `id_${name}`}
                    name={name}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    disabled={disabled}
                    autoComplete="off"
                    mask={mask}
                    className={cn(
                        "w-full mt-1 border px-3 py-2 placeholder-gray-400 text-gray-800 dark:text-gray-300 bg-white dark:bg-transparent",
                        "disabled:bg-gray-100 disabled:cursor-not-allowed",
                        !hasError ? "border-gray-300" : "border-red-500",
                        "focus:outline-none focus:ring-2 focus:ring-primary -500 focus:border-primary -500 focus:mr-1",
                        "rounded-lg"
                    )}
                    placeholder={placeholder ?? maskPlaceholder ?? mask}
                    maskPlaceholder={null}
                    alwaysShowMask={false}
                />
            </div>
        </div>
    );
}

export function SelectInput({
    name,
    value,
    onChange,
    options,
    id,
    label,
    disabled,
    placeholder,
    hasError,
}: SelectInputProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <div className="text-sm w-full flex flex-col">
            <label className="font-medium mb-1 ml-1 text-gray-700 dark:text-gray-200">
                {label}
            </label>

            <Select
                instanceId={id ?? `id_${name}`}
                isSearchable={true}
                name={name}
                options={options}
                isDisabled={disabled}
                placeholder={placeholder}
                value={options.find(opt => opt.value === value) || null}
                onChange={(newValue: any) => onChange(newValue?.value)}
                menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                menuShouldScrollIntoView={true}
                unstyled
                classNames={{
                    control: ({ isFocused }) => cn(
                        "flex w-full rounded-lg border px-1 py-1 transition-all bg-white dark:bg-zinc-950",
                        !hasError
                            ? isFocused ? "border-primary-600 ring-2 ring-primary-600/20" : "border-gray-300 dark:border-zinc-800"
                            : "border-red-500 ring-2 ring-red-500/20",
                        disabled && "bg-gray-100 dark:bg-zinc-900 opacity-80 cursor-not-allowed"
                    ),
                    menuList: () => "p-1 max-h-[250px] overflow-y-auto custom-scrollbar overflow-hidden",
                    option: ({ isFocused, isSelected }) => cn(
                        "px-3 py-2 rounded-md cursor-pointer text-sm",
                        isFocused && "bg-gray-100 dark:bg-zinc-800",
                        isSelected && "bg-gray-200"
                    ),
                    placeholder: () => "text-gray-400 pl-2",
                    singleValue: () => "text-gray-800 dark:text-gray-200 pl-2",
                    input: () => "pl-2 text-gray-800 dark:text-gray-200",
                    dropdownIndicator: () => "p-2 text-gray-400 hover:text-gray-600",
                    clearIndicator: () => "p-2 text-gray-400",
                    noOptionsMessage: () => "p-4 text-gray-500"
                }}
                components={{
                    MenuList: (props) => (
                        <div
                            data-lenis-prevent
                            style={{ maxHeight: '250px', overflowY: 'auto', backgroundColor: 'white', borderRadius: '10px' }}
                        >
                            {props.children}
                        </div>
                    ),
                }}
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menuList: (base) => ({
                        ...base,
                        maxHeight: '250px',
                    }),
                }}
            />
        </div>
    );
}

export function TextInput({
    name,
    value,
    onChange,
    id,
    disabled,
    placeholder,
    hasError,
    label,
    type
}: TextInputProps) {

    return (
        <div className="text-sm">
            <label className="font-medium mb-1 ml-1">{label}</label>
            <div className="flex flex-row items-end">
                <input
                    id={id ?? `id_${name}`}
                    name={name}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    disabled={disabled}
                    autoComplete="off"
                    type={type ?? "text"}
                    className={cn(
                        "w-full mt-1 border px-3 py-2 placeholder-gray-400 text-gray-800 dark:text-gray-300 bg-white dark:bg-transparent",
                        "disabled:bg-gray-100 disabled:cursor-not-allowed",
                        !hasError ? "border-gray-300" : "border-red-500",
                        "focus:outline-none focus:ring-2 focus:ring-primary -500 focus:border-primary -500 focus:mr-1",
                        "rounded-lg"
                    )}
                    placeholder={placeholder ?? "Digite aqui..."}
                />
            </div>
        </div>
    );
}

export function CheckboxInput({
    name,
    checked,
    onChange,
    id,
    label,
    disabled,
    hasError,
    accent
}: CheckboxInputProps) {
    return (
        <div className="flex items-start text-sm m-1">
            <input
                type="checkbox"
                id={id ?? `id_${name}`}
                name={name}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={cn(
                    "mt-1 h-4 w-4 rounded border border-gray-500 text-primary-600 focus:ring-primary-600 cursor-pointer",
                    !hasError ? "border-gray-300" : "border-red-500",
                    disabled && "cursor-not-allowed opacity-70",
                    accent ?? "accent-white"
                )}
            />
            {label && (
                <label htmlFor={id ?? `id_${name}`} className="ml-2 text-gray-700 dark:text-gray-200 cursor-pointer">
                    {label}
                </label>
            )}
        </div>
    );
}