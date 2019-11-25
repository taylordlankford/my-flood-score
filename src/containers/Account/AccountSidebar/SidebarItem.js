import React from 'react'
import {
  Link
} from 'react-router-dom'

const SidebarItem = (props) => {
  return (
    <Link to={props.routePath}>
      <span>{props.sidebarIcon}</span>
      <span>{props.sidebarLink}</span>
    </Link>
  )
}

export default SidebarItem 