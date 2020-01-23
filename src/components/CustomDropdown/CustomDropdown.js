import React, { useState } from "react";
import { LinkSecondary, SecondaryBtn } from "../../StyledComponents/StyledComponents";
import { FaPencilAlt } from "react-icons/fa";
import { MdMoreVert, MdExpandMore } from "react-icons/md";


// &#x25bc;
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <LinkSecondary
    style={{ textAlign: "center" }}
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <MdMoreVert size={30} style={{ marginLeft: "16px", fill: "#666666" }} />
  </LinkSecondary>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
export const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);
