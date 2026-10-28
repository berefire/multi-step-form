function TextInput({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2 font-body">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-xs md:text-sm leading-[1.2] font-normal text-blue-950"
        >
          {label}
        </label>
        {error && (
          <p
            id={errorId}
            className="text-red-500 md:text-sm text-xs font-bold leading-[1.2] tracking-[0.0625em]"
          >
            {error}
          </p>
        )}
      </div>
      <div
        className={`group flex w-full items-stretch rounded-md border overflow-hidden hover:border-purple-600 focus-within:border-purple-600 ${
          error ? "border-red-500" : "border-purple-200"
        }`}
      >
        <input
          id={id}
          type="text"
          required
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full min-w-0 rounded-md border px-4 py-2 text-sm font-medium text-blue-950 outline-none
                    placeholder:text-gray-500 md:text-base
                    ${
                      error
                        ? "border-red-500"
                        : "border-purple-200 hover:border-purple-600 focus:border-purple-600"
                    }`}
          {...inputProps}
        />
      </div>
    </div>
  );
}

export default TextInput;
