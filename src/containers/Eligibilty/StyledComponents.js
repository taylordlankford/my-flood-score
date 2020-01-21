import styled from 'styled-components'

export const ParallaxWrapper = styled.div`
`

export const ParallaxContainer = styled.div`
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 50px;
  margin: 0 auto;
  max-width: 1080px;
  overflow: scroll;
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

export const AutoSuggestWrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  padding-left: 50px;
  padding-right: 50px;
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
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    /* border-radius: 5px; */
    /* display: inline-block; */
    border: none;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
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
  overflow: 'auto',
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
    position: 'relative',
  },

  input: {
    margin: '0 auto',
    width: '100%',
    padding: '10px 10px 10px 10px',
  },

  inputOpen: {
    padding: '10px 10px 10px 10px',
  },

  inputFocused: {
    outline: 'none',
  },

  suggestionsContainer: {
    margin: '0',
    padding: '0',
    overflow: 'scroll',
    zIndex: '999',
  },

  suggestionsContainerOpen: {
    width: '100%',
    overflow: 'scroll',
    zIndex: '999',
  },

  suggestionsList: {
    listStyleType: 'none',
  },

  suggestion: {
    paddingTop: '4px',
    paddingBottom: '4px',
    cursor: 'pointer',
  },

  suggestionHighlighted: {
    backgroundColor: '#eeeeee',
  },

  suggestionFirst: {},
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {},
}