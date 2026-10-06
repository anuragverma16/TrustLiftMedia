/**
 * Mask-based text splitting helpers. Each line / word sits inside an
 * overflow-hidden mask; GSAP slides the inner span up (see textAnimations.maskReveal).
 *
 * <Lines lines={['WE DESIGN', 'THE MOMENT']} attr="data-hero-line" />
 * <Words text="We make brands people stop for." attr="data-word" />
 */
export function Lines({ lines, attr = 'data-line', className = '' }) {
  return lines.map((line) => (
    <span key={line} className={`mask ${className}`}>
      <span {...{ [attr]: '' }}>{line}</span>
    </span>
  ))
}

export function Words({ text, attr = 'data-word' }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span key={`${word}-${i}`}>
      <span className="mask-inline">
        <span {...{ [attr]: '' }}>{word}</span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </span>
  ))
}
