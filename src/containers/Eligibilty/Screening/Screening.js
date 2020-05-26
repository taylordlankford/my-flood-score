import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks";
import { useDomains } from "../eligibility-hooks";
import Form from "react-formal"
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import "./screening-styles.css";
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
import { hideSiteContainers } from "../helpers";

const Screening = props => {
  const firebase = useFirebase();
  const { pubDomain, devDomain } = useDomains();
  const { selected, setShowRecommendation } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [exists] = useState(false)

  /**
   * Model Schema
   * Used for validating form fields.
   */
  const modelSchema = Yup.object({
    name: Yup.string().required('Required').min(2, 'Too short'),
    email: Yup.string().required('Required').email('Wrong format, example: name@mail.com'),
    phoneNumber: Yup.string().required('Required').length(10, '10-digit phone number required (no dashes) example: 8132130641')
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
   * Check if cache exist in the session storage. If it exists, we don't need
   * them to refill out the form. Set setShowRecommendation to true skip to
   * proceed to recommendations.
   */
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
   * Handle form submit
   */
  const handleOnSubmit = async e => {
    const { phoneNumber, email, name } = e

    let phone = phoneNumber
    let timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    let screeningFormData = { name, email, phone, timestamp };
    console.log('phone: ', phone)

    const screeningFormMessageObj = {
      to: 'info@nofloodflorida.com',
      // to: 'kylekaplan50@gmail.com',
      template: {
        name: 'screeningFormTemplate',
        data: {
          address: selected,
          ...screeningFormData,
        }
      }
    }

    await firebase.doFirestoreAdd('screeningForm', screeningFormMessageObj).then(() => {
      window.sessionStorage.setItem("name", `${name}`)
      window.sessionStorage.setItem("email", `${email}`)
      window.sessionStorage.setItem("phone", `${phone}`)
      setShowRecommendation(true)
    })
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
              <FormLabel style={{ fontWeight: "600" }}>Name *</FormLabel>
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

              <FormLabel style={{ fontWeight: "600" }}>Email *</FormLabel>

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

              <FormLabel style={{ fontWeight: "600" }}>Phone *</FormLabel>
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

// const isNumericInput = (event) => {
//   const key = event.keyCode;
//   return ((key >= 48 && key <= 57) || // Allow number line
//     (key >= 96 && key <= 105) // Allow number pad
//   );
// };
// 
// const isModifierKey = (event) => {
//   const key = event.keyCode;
//   return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
//     (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
//     (key > 36 && key < 41) || // Allow left, up, right, down
//     (
//       // Allow Ctrl/Command + A,C,V,X,Z
//       (event.ctrlKey === true || event.metaKey === true) &&
//       (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
//     )
// };
// 
// const enforceFormat = (event) => {
//   // Input must be of a valid number format or a modifier key, and not longer than ten digits
//   if (!isNumericInput(event) && !isModifierKey(event)) {
//     event.preventDefault();
//   }
// };
// 
// const formatToPhone = (event) => {
//   if (isModifierKey(event)) { return; }
// 
//   // I am lazy and don't like to type things more than once
//   const target = event.target;
//   const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
//   const zip = input.substring(0, 3);
//   const middle = input.substring(3, 6);
//   const last = input.substring(6, 10);
// 
//   if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
//   else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
//   else if (input.length > 0) { target.value = `(${zip}`; }
// };
// 
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
