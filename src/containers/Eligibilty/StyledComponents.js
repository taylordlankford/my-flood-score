import styled from 'styled-components'

export const ParallaxWrapper = styled.div`
`

export const ParallaxContainer = styled.div`
  /* min-height: 100vh; */
  min-height: 640px;
  padding-top: 60px;
  padding-bottom: 50px;
  margin: 0 auto;
  margin-top: 80px;
  max-width: 1080px;
  overflow: auto;
`

export const MainTitle = styled.div`
  color: #ffffff;
  font-family: 'Helvetica', sans-serif;
  font-size: 54px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 1.2em;
  text-align: center;
  margin: 0 auto;
  max-width: 920px;
`

export const Subtitle = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  padding-top: 40px;
  margin: 0 auto;
  max-width: 820px;
  padding-bottom: 60px;
`

/* AutoSuggest Styles */

export const AutoSuggestWrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  padding-left: 50px;
  padding-right: 50px;
  margin: 0 auto;
  max-width: 920px;
`

export const AutoSuggestContainer = styled.div`
  position: relative;
  z-index: 999;
`

export const IframeSearchBtn = styled.button`
  &,
  &:link,
  &:visited {
    height: 48px;
    text-align: center !important;
    color: white !important;
    cursor: pointer;
    background-color: #55b96a;
    font-size: 0.94rem;
    font-weight: 700;
    border: 1px solid #55b96a;
    border: none;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
    z-index: 999;
  }

  &:hover {
    background-color: #4ca25e;
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

/* Auto Suggest Theme Styles */
export const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  zIndex: '999',
}

export const autosuggestTheme = {
  container: {
    width: '100%',
    color: '#666666',
    fontWeight: '500',
    position: 'relative',
  },

  containerOpen: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: '999',
    position: 'relative',
  },

  input: {
    fontWeight: '500',
    color: "#666666",
    width: '100%',
    padding: '10px 40px 10px 40px',
    height: '3rem',
    border: 'none',
  },

  inputOpen: {
    fontWeight: '500',
    color: "#666666",
    padding: '10px 40px 10px 40px',
    border: 'none',
  },

  inputFocused: {
    outline: 'none',
  },

  suggestionsContainer: {
    maxHeight: '300px',
    margin: '0',
    padding: '0',
    /* overflow: 'scroll', */
    zIndex: '999',
  },

  /**
   * Position absolute here will not push the containers underneath down.
   */
  suggestionsContainerOpen: {
    width: '100%',
    /* overflow: 'scroll', */
    zIndex: '999',
    backgroundColor: '#fff',
    position: 'absolute'
  },

  suggestionsList: {
    listStyleType: 'none',
    borderTop: '1px solid #eee',
    paddingRight: '40px',
    /* overflow: 'scroll', */
    paddingBottom: '10px',
    marginBottom: '0'
  },

  suggestion: {
    paddingTop: '4px',
    paddingBottom: '4px',
    cursor: 'pointer',
  },

  suggestionHighlighted: {
    backgroundColor: '#eeeeee',
    fontWeight: '600',
  },

  suggestionFirst: {},
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {},
}