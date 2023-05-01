import { TextInput } from "flowbite-react";
import { ErrorMessage, useField } from "formik";

export const Input = ({ name, label, ...props }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium" htmlFor={field.name}>
          {label}
        </label>
        <TextInput
          className={meta.error && meta.touched ? "border-red-400" : ""}
          {...field}
          {...props}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-500 text-xs"
        />
      </div>
    );
};
