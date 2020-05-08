import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks";
import { useDomains } from "../eligibility-hooks";
// import Input from 'react-phone-number-input/input';
import Form from "react-formal"
import { object, string, number } from "yup";

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
// import { isValidPhoneNumber } from "react-phone-number-input";

const Screening = props => {
  const firebase = useFirebase();
  const { pubDomain, devDomain } = useDomains();
  // const { selected } = props.location.state;
  const { selected, setShowRecommendation } = props;

  // const [address, setAddress] = useState("")
  // const [isInvalid, setIsInvalid] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [exists, setExists] = useState(false)

  /**
   * Model Schema
   * Used for validating form fields.
   */
  const modelSchema = object({
    name: object({
      fullName: string().required('*required'),
    }),
    email: object({
      email: string().required('*required').email('Email address must be in correct format.')
    }),
    phone: object({
      phone: string().required('*required')
    }),
  })

  /**
   * Hides original mfs containers
   */
  useEffect(() => {
    let hideSurrounding = window.location.href === pubDomain || window.location.href === devDomain;
    if (hideSurrounding) {
      hideSiteContainers();
    }

    let isAddressSelected = typeof selected !== "undefined" || selected !== null;
  }, [name, email, phone]);

  /**
   * Adds the screening data to firebase.
   */
  const addNffUser = async (collection, setObj) => {
    await firebase.doFirestoreAdd(collection, setObj).then(res => {
      firebase.doSendEmailNotification();
      setShowRecommendation(true);
      // Ideally, send email notifcation here.
    })
  };

  /**
   * Handle form submit
   */
  const handleOnSubmit = (e) => {
    console.log('event: ', e)
    const { name, email, phone } = e
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
              <div>
                <FormLabel>Name</FormLabel>
                <Form.Message
                  autocomplete="off"
                  for={['name.fullName']}
                  className="validation-error"
                  style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }}
                />
                <Form.Field
                  name="name.fullName"
                  placeholder="Name"
                  onChange={e => setName(e.target.value)}
                  style={formFieldStyles}
                />
                <br />

                <FormLabel>Email</FormLabel>
                <Form.Message
                  for={['email.email']}
                  className="validation-error"
                  style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }}
                />
                <Form.Field
                  autocomplete="off"
                  name="email.email"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                  style={formFieldStyles}
                />
                <br />

                <FormLabel>Phone</FormLabel>
                <Form.Message
                  for={['phone.phone']}
                  className="validation-error"
                  style={{ fontSize: "12px", fontWeight: "500", color: "#FF0000" }}
                />
                <Form.Field
                  autocomplete="off"
                  name="phone.phone"
                  placeholder="Phone"
                  onChange={e => setPhone(e.target.value)}
                  style={formFieldStyles}
                />
              </div>

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