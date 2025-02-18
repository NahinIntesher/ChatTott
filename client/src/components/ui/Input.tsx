import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Inputt = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-800 mb-1">
          {label}
        </label>
        <input
          className={`py-2 px-2 border rounded-lg w-full focus:ring-1 focus:outline-none focus:border-button-hover-light ${
            error ? "border-red-600" : "border-gray-500"
          } ${className}`}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Inputt.displayName = "Input";

export default Inputt;
