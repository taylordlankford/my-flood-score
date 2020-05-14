import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks";
import { useDomains } from "../eligibility-hooks";
// import Input from 'react-phone-number-input/input';
import Form from "react-formal"
import * as Yup from "yup";

import "react-phone-number-input/style.css";
// import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import "./screening-styles.css";

/* Styles */
import styled from "styled-components";
import "../styles.css";
import { Parallax } from "react-parallax";
import {
  ScreeningTitle,
  ScreeningWrapper,
  ParallaxContainer,
  H3,
  FormWrapper
} from "./styled-screening";

/* Components */
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { hideSiteContainers } from "../helpers";
// import nodemailer from "nodemailer";
import { ROW_SELECT_MULTIPLE } from "react-bootstrap-table-next";
// import { isValidPhoneNumber } from "react-phone-number-input";

const Screening = props => {
  const firebase = useFirebase();
  const { pubDomain, devDomain } = useDomains();
  // const { selected } = props.location.state;
  const { selected, setShowRecommendation } = props;

  // const [address, setAddress] = useState("")
  const [nffUserData, setNffUserData] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [exists, setExists] = useState(false)

  /**
   * Model Schema
   * Used for validating form fields.
   */
  const modelSchema = Yup.object({
    name: Yup.string().required('Required').min(2, 'Too short'),
    email: Yup.string().required('Required').email('Wrong format'),
    phoneNumber: Yup.string().required('Required').length(16, '10 digit phone number required')
  })

  /**
   * Hides original mfs containers
   */
  useEffect(() => {
    let hideSurrounding = window.location.href === pubDomain || window.location.href === devDomain;
    if (hideSurrounding) {
      hideSiteContainers();
    }
    // let isAddressSelected = typeof selected !== "undefined" || selected !== null;
  }, [name, email, phoneNumber]);

  /**
   * Skip the screening form if their data is stored in the session.
   */
  useEffect(() => {
    const phoneInputElement = document.getElementById('phoneNumber');
    phoneInputElement.addEventListener('keydown', enforceFormat);
    phoneInputElement.addEventListener('keyup', formatToPhone);
  }, [phoneNumber])

  useEffect(() => {
    const name = window.sessionStorage.getItem('name')
    const email = window.sessionStorage.getItem('email')
    const phone = window.sessionStorage.getItem('phone')
    const cacheExists = name !== null || email !== null || phone !== null
    if (cacheExists) {
      setShowRecommendation(true)
    }
  })

  /**
   * Adds the screening data to firebase.
   * Sends email notifcation when new nffuser entry is added to firebase.
   */
  const addNffUser = async (collection, setObj) => {
    const { name, email, phone } = setObj
    await firebase.doFirestoreAdd(collection, setObj).then(() => {
      setShowRecommendation(true);
      // Temporary store the screening entries with the session.
      window.sessionStorage.setItem("name", `${name}`)
      window.sessionStorage.setItem("email", `${email}`)
      window.sessionStorage.setItem("phone", `${phone}`)
      // firebase.doSendEmailNotification(setObj);
    })
  };

  /**
   * Handle form submit
   */
  const handleOnSubmit = e => {
    const { phoneNumber, email, name } = e
    console.log('length: ', phoneNumber.length)
    let phone = normalizePhoneNumber(phoneNumber)
    setNffUserData({ name, email, phone })
    const nffUser = { name, email, phone };
    addNffUser("nff_users", nffUser);
  }

  if (exists) {
    return "Loading recommendation.";
  }

  return (
    <ScreeningWrapper>
      <Parallax contentClassName="parallax-bg" strength={200}>
        <ParallaxContainer>
          <ScreeningTitle>
            <H3>
              You are one step away from getting your <b style={{ color: "#fff" }}>FREE</b> screening results!
            </H3>
          </ScreeningTitle>
          <FormWrapper>
            <Form schema={modelSchema} defaultValue={modelSchema.default()} onSubmit={e => handleOnSubmit(e)}>
              <FormLabel>Name</FormLabel>
              <Form.Message
                autocomplete="off"
                for={['name']}
                className="validation-error"
                style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }} />
              <Form.Field
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={formFieldStyles} />
              <br />

              <FormLabel>Email</FormLabel>
              <Form.Message
                for={['email']}
                className="validation-error"
                style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }} />
              <Form.Field
                autocomplete="off"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={formFieldStyles} />
              <br />

              <FormLabel>Phone</FormLabel>
              <Form.Message
                for={['phoneNumber']}
                className="validation-error"
                style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }}
              />
              <Form.Field
                id="phoneNumber"
                autocomplete="off"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                // onChange={e => handlePhoneNumber(e.target.value)}
                style={formFieldStyles}
              />

              <br />
              <br />
              <SubmitBtn
                type="submit"
              >
                Submit
              </SubmitBtn>
            </Form>
          </FormWrapper>
        </ParallaxContainer>
      </Parallax>
    </ScreeningWrapper>
  );
};

export default Screening;

const isNumericInput = (event) => {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
    (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    (
      // Allow Ctrl/Command + A,C,V,X,Z
      (event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
    )
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)){
    event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if (isModifierKey(event)) {return;}

  // I am lazy and don't like to type things more than once
  const target = event.target;
  const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
  const zip = input.substring(0,3);
  const middle = input.substring(3,6);
  const last = input.substring(6,10);

  if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
  else if (input.length > 3){target.value = `(${zip}) ${middle}`;}
  else if (input.length > 0){target.value = `(${zip}`;}
};

const normalizePhoneNumber = (phoneNumber) => {
  let normalizedPhoneNumber = phoneNumber.replace(/\(/g, "")
                                         .replace(/\)/g, "")
                                         .replace(/-/g, "")
                                         .replace(/ /g, "")

  return normalizedPhoneNumber
}


/**
 * Styles
 */
const formFieldStyles = {
  display: "block",
  width: "100%",
  height: "calc(1.5em + .75rem + 2px)",
  padding: ".375rem .75rem",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5",
  color: "#495057",
  backgroundColor: "#fff",
  border: "1px solid #ced4da",
  borderRadius: ".25rem",
  transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
}

const FormLabel = styled.label`
 display: inline-block;
 font-weight: 500;
 color: #fff;
 padding-right: 10px;
`

const SubmitBtn = styled.button`
  font-weight: 600;
  padding: .375rem .75rem;
  color: #000;
  background-color: #C7AE4A;
  width: 100%;
  border-radius: .25rem;
  border: 1px solid #C7AE4A;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

  &:hover {
    background-color: #b8a148;
    border: 1px solid #b8a148;
  }
`
