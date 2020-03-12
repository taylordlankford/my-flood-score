export const hideSiteContainers = () => {
  const globalWrapper = document.getElementById("global-wrapper");
  globalWrapper.style.paddingTop = "0px";
  globalWrapper.style.marginTop = "0px";
  globalWrapper.style.minHeight = "100vh";

  const nav = document.getElementById("nav");
  nav.style.display = "none";
  nav.style.clear = "both"

  const footer = document.getElementById("footer");
  footer.style.display = "none";

  const copyrightSection = document.getElementById("copyright-section");
  copyrightSection.style.display = "none";

  const body = document.getElementsByTagName("body");
  body[0].style.backgroundColor = "#EDEDED";
};
