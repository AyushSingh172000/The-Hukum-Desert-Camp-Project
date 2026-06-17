export default function Input({ label, id, error, as = 'input', className = '', ...rest }) {
  const Tag = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <Tag
        id={id}
        className={`form-input${error ? ' form-input--error' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} className="error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
