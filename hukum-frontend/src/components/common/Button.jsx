import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size    = 'md',
  as      = 'button',
  href,
  onClick,
  disabled,
  className = '',
  type = 'button',
  ...rest
}) {
  const Tag = as === 'a' ? 'a' : 'button'
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  return (
    <Tag
      className={classes}
      onClick={onClick}
      disabled={disabled}
      href={href}
      type={Tag === 'button' ? type : undefined}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Tag>
  )
}
