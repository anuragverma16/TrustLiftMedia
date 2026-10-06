import { forwardRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { transitionTo } from '../animations/pageTransitions'
import { lenisStore } from '../hooks/useLenis'

/**
 * Internal link that plays the page transition instead of an instant route swap.
 * Renders a real <a href>, so middle-click / open-in-new-tab / keyboard all work.
 */
const TransitionLink = forwardRef(function TransitionLink({ to, onClick, children, ...rest }, ref) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()

    if (to === pathname) {
      if (lenisStore.instance) lenisStore.instance.scrollTo(0)
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    transitionTo(navigate, to)
  }

  return (
    <a ref={ref} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
})

export default TransitionLink
