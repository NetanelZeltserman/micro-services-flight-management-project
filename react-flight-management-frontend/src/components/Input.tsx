import { TextInput } from "flowbite-react";
import { ErrorMessage, useField } from "formik";

export const Input = ({ name, label, hint, ...props }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className={`${!hint && 'mb-4'}`}>
        <label className="block text-sm font-medium text-gray-600" htmlFor={field.name}>
          {label}
        </label>
        <TextInput
          className={meta.error && meta.touched ? "border-red-400" : ""}
          {...field}
          {...props}
        />
        {
          hint &&
          <span className="text-xs italic text-gray-500">{hint}</span>
        }
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-xs text-red-500"
        />
      </div>
    );
};
