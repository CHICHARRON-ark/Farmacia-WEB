export default function Input({
  label,
  id,
  error,
  className = '',
  ...props
}) {
  const inputId = id || props.name;
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="form-field__label">
          {label}
        </label>
      )}
      <input id={inputId} className="form-field__input" aria-invalid={!!error} {...props} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
