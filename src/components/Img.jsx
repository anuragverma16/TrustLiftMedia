import { useState } from 'react'

/**
 * Photo that can never end up blank:
 *  - the local `fallback` artwork is painted behind the <img> while it loads,
 *  - and if the remote photo fails (offline, blocked, 404) the fallback is shown instead.
 * Pass remote photo URLs as `src` and a bundled image as `fallback`.
 */
export default function Img({ src, fallback, alt = '', className = '', style, ...rest }) {
  const [failed, setFailed] = useState(false)
  const shown = failed || !src ? fallback : src

  return (
    <img
      src={shown}
      alt={alt}
      onError={() => {
        if (!failed && fallback) setFailed(true)
      }}
      referrerPolicy="no-referrer"
      className={className}
      style={{
        backgroundImage: fallback ? `url(${fallback})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
      {...rest}
    />
  )
}
