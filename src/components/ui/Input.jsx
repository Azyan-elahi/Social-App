import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, type = 'text', placeholder, ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded-lg outline-none transition-colors focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
});

export default Input;