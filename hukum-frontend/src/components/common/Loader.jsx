import './Loader.css'

export default function Loader({ fullPage = false, text = 'Loading…' }) {
  if (fullPage) {
    return (
      <div className="loader-fullpage" role="status" aria-live="polite">
        <div className="loader-camel" aria-hidden="true">🐪</div>
        <div className="spinner" />
        <p className="loader-text">{text}</p>
      </div>
    )
  }

  return (
    <div className="loader-inline" role="status">
      <div className="spinner" />
      <span className="sr-only">{text}</span>
    </div>
  )
}
