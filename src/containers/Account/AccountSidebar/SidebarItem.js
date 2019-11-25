import React from 'react'
import {
  Link
} from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const SidebarItem = (props) => {
  return (
    <ListGroupItem>
      <Link to={props.routePath}>
        <span>{props.sidebarIcon}</span>
        <span>{props.sidebarLink}</span>
      </Link>
    </ListGroupItem>
  )
}

export default SidebarItem 