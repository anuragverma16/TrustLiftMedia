// Tiny "app ready" signal. The preloader flips it once; intro animations wait for it.
let ready = false
let transitions = 0
const callbacks = new Set()

export const isReady = () => ready

export const setReady = () => {
  if (ready) return
  ready = true
  callbacks.forEach((cb) => cb())
  callbacks.clear()
}

// Runs cb as soon as the app is ready. Returns an unsubscribe function.
export const whenReady = (cb) => {
  if (ready) {
    cb()
    return () => {}
  }
  callbacks.add(cb)
  return () => callbacks.delete(cb)
}

// After a page transition the overlay is still lifting, so intros start a touch later.
export const markTransition = () => {
  transitions += 1
}
export const introDelay = () => (transitions > 0 ? 0.5 : 0.2)
