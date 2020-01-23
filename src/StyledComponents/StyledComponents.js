// Global StyledComponents
// For components that are commonly used throughout the application.
import styled from "styled-components";

export const HeaderLink = styled.span`
  padding-top: 10px;
  margin: 18px;
  text-decoration: none;
  color: #666666;
  font-size: 18px;

  &:link {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: #0d238e;
    transition: 0.5s !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  &:active {
    text-decoration: underline;
  }
`

export const SubscriptionNotice = styled.div`
  margin-top: 20px;
  padding: 20px;
  font-weight: 600;
  background-color: #eeeeee;
  color: #666666;
`

// Structures that can contain more than one element.
export const Container = styled.div.attrs(props => ({
  padding: props.padding || "0",
  borderBottom: props.borderBottom
}))`
  padding: ${props => props.padding};
  border-bottom: ${props => props.borderBottom};
`;

// A wrapper, on the other hand, is something that wraps around a single object
// to provide more functionality and interface to it.
export const Wrapper = styled.div.attrs(props => ({
  padding: props.padding || "0"
}))`
  padding: ${props => props.padding};
`;

// A tag
export const LinkDefault = styled.span.attrs(props => ({
  fontColor: props.fontColor || "#666666",
  fontWeight: props.fontWeight || "500",
  fontSize: props.fontSize
}))`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};

  &:hover {
    color: #0d238e;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const LinkSecondary = styled.span.attrs(props => ({
  fontWeight: props.fontWeight || "500",
  fontSize: props.fontSize
}))`
  color: #007bff;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};

  &:hover {
    color: #0d238e;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const LinkPrimary = styled.span.attrs(props => ({
  fontWeight: props.fontWeight || "500",
  fontSize: props.fontSize
}))`
  color: #66de80;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};

  &:hover {
    color: #55b96a;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const LinkDanger = styled.span.attrs(props => ({
  fontWeight: props.fontWeight || "500",
  fontSize: props.fontSize
}))`
  color: #c82333;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};

  &:hover {
    color: #bd2130;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const MutedText = styled.p`
  color: #666666;
`;

export const Title = styled.div`
  color: #0d238e;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0em;
`;

export const StyledDropdownMenuItem = styled.div`
  padding: 10px;

  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const InfoBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #8560a8;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
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
`;

export const PrimaryBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
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
    border-radius: 5px;
    border: none;
    display: inline-block;
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
`;

export const SecondaryBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #d4d4d4;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
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
`;

export const TransitionBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #d4d4d4;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
    background-position: 100%;
    color: white;
    background-color: #66de80;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }
`;

export const DangerTransitionBtn = styled.button`
  &,
  &:link,
  &:visited {
    margin: 5px 5px;
    width: 100%;
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #d4d4d4;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(189, 33, 48, 1) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
    background-position: 100%;
    color: white;
    background-color: #bd2130;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }
`;

export const DefaultPaymentMethodTag = styled.div`
  background-color: #8560a8;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 50%
  );
  text-align: center;
  color: white !important;
  font-size: 0.94rem;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  display: inline-block;
  padding: 0.74rem 1.45rem;
  text-decoration: none;
  text-transform: uppercase;
  background-size: 230%;
  transition: all 0.4s;
`;