import type { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export function Input(props: FormInputProps) {

    const {
        register
    } = useFormContext();

    return (
        <input 
            {...props}
            {...register(props.name)}
            className={`border border-zinc-200 shadow-sm rounded h-10 px-3 
                            required:border-red-600 ${props.className}`}
        />
    )
}