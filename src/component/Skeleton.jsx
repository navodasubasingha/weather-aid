function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer rounded-xl ${className}`}
    />
  )
}

export default Skeleton
