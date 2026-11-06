const base = "inline-flex items-center justify-center rounded-lg cursor-pointer transition-opacity px-6 py-4 font-body font-medium text-base leading-[1.2] disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
const variants = {
    primary: "bg-blue-950 hover:bg-blue-700 text-white focus-ring-blue-950",
    secondary: "bg-purple-600 hover:bg-purple-400 text-white focus-ring-purple-600",
    additional: "bg-transparent text-grey-500 hover:text-blue-950"
}

function Button({
    variant = "primary",
    fullWidth = false,
    className = "",
    type = "button",
    children,
    ...props
}) {

    const classes = [ base, variants[variant], fullWidth ? "w-full" : "", className].filter(Boolean).join(" ");

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    )
}

export default Button;