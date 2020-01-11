import React from 'react'
import useReactRouter from "use-react-router";
import { useSelector } from 'react-redux'
import * as ROUTES from '../../routes/constants/routes'
import styled from 'styled-components'

const UserDisplayName = (props) => {
  const { displayName } = props.authUser
  const { history } = useReactRouter()

  return (
    <A onClick={() => history.push(ROUTES.ACCOUNT_DASHBOARD)}>
      {`Hi, ${displayName}`}
    </A>
  )
}

const A = styled.span`
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

export default UserDisplayName;