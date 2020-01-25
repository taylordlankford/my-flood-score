export const hideSiteContainers = () => {
  const globalWrapper = document.getElementById('global-wrapper')
  globalWrapper.style.paddingTop = '0px'
  globalWrapper.style.minHeight = 'auto'

  const nav = document.getElementById('nav')
  nav.style.display = 'none'

  const footer = document.getElementById('footer')
  footer.style.display = 'none'

  const copyrightSection = document.getElementById('copyright-section')
  copyrightSection.style.display = 'none'
}