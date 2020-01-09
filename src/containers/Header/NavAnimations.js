const TRANSITION_TIME   = 0.3
const TIMING_FUNCTION   = 'ease-in-out'

/**
 * Shrink the Header
 */
export const shrinkHeader = () => {
  let nav = document.getElementById("nav")
  let navItems = document.getElementById("nav-items")
  let mobileNavItems = document.getElementById("mobile-nav-items")
  let logo = document.getElementById("logo")

  if (nav != null) {
    nav.style.height = "60px"
    nav.style.transition = `all ${TRANSITION_TIME}s`
    nav.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
  }

  if (navItems != null) {
    navItems.style.paddingTop = "15px";
    navItems.style.transition = `all ${TRANSITION_TIME}s`
    navItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`
  }

  if (logo != null) {
    logo.style.top = "-10px";
    logo.style.transition = `all ${TRANSITION_TIME}s`
    logo.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
  }

  if (mobileNavItems != null) {
    mobileNavItems.style.paddingTop = "5px"
    mobileNavItems.style.transition = `all ${TRANSITION_TIME}s`
    mobileNavItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
  }
}

/**
 * Normalize the Header Nav style
 */
export const normalizeHeader = () => {
  let nav = document.getElementById("nav")
  let navItems = document.getElementById("nav-items")
  let mobileNavItems = document.getElementById("mobile-nav-items")
  let logo = document.getElementById("logo")

  if (nav != null) {
    nav.style.height = "80px";
    nav.style.transition = `all ${TRANSITION_TIME}s`
    nav.style.transitionTimingFunction = `${TIMING_FUNCTION}`
  }

  if (navItems != null) {
    navItems.style.paddingTop = "26px";
    navItems.style.transition = `all ${TRANSITION_TIME}s`
    navItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
  }

  if (logo != null) {
    logo.style.top = "0";
    logo.style.transition = `all ${TRANSITION_TIME}s`;
    logo.style.transitionTimingFunction = `${TIMING_FUNCTION}`
  }

  if (mobileNavItems != null) {
    mobileNavItems.style.paddingTop = "16px"
    mobileNavItems.style.transition = `all ${TRANSITION_TIME}s`;
    mobileNavItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
  }
}