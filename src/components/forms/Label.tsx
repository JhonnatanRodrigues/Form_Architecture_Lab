import type { LabelHTMLAttributes } from "react";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: FormLabelProps) {
    return (
        <label {...props} />
    )
}