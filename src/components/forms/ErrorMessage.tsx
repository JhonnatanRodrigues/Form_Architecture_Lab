import { useFormContext } from "react-hook-form";

interface FormErrorMessageProps {
    field: string;
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  
  return result
};

export function ErrorMessage({field} :FormErrorMessageProps) {
    const { formState: { errors } } = useFormContext()
    const fieldError = get(errors, field)

    return (
        <span className="text-red-600 text-xs font-semibold">
            {fieldError?.message?.toString()}
        </span>
    )
}