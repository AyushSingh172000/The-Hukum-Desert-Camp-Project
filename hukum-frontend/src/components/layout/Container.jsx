export default function Container({ children, className = '', narrow = false, wide = false }) {
  const cls = [
    'container',
    narrow ? 'container--narrow' : '',
    wide ? 'container--wide' : '',
    className,
  ].filter(Boolean).join(' ')

  return <div className={cls}>{children}</div>
}
