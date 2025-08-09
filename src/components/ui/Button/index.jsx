/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, success)
 * @param {string} props.size - Button size (sm, base, lg)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
export default function Button({
  children,
  variant = "secondary",
  size = "base",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  const classes = ["btn", variant, size !== "base" ? size : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
