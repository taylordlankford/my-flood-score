import styled from "styled-components";

 /**
  * Normal navigation
  */
export const Nav = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  font-weight: 500;
  z-index: 999;
`;

export const NavContainer = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: right;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export const NavBrand = styled.div`
  text-align: left;
`

export const NavMenuItems = styled.div`
  text-align: right;
`;

 /**
  * Mobile navigation
  * Need these attributes in order for mobile nav to be scrollable
  * height: 100%;
  * position: fixed;
  * overflow: scroll !important;
  */
export const MobileNav = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  z-index: 999;
  width: 100%;
  height: 100% !important;
  position: fixed !important;
  overflow: auto !important;
`;

export const MobileNavContainer = styled.div`
  padding-top: 200px;
  z-index: 999;
  text-align: center;
`;

export const MobileNavItems = styled.div`
  /* padding-top: 18px; */
`

export const MobileNavList = styled.ul`
  list-style-type: none;
`;

export const MobileNavListItem = styled.li`
  font-size: 28px;
  font-weight: 600;
  color: #666666;
  padding-bottom: 50px;

  &:hover {
    cursor: pointer;
  }
`;

export const MobileNavToggler = styled.span`
  color: #666666;

  &:hover {
    cursor: pointer;
    color: #0d238e;
  }
`;