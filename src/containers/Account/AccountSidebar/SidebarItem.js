import React from 'react'
import {
  Link
} from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const SidebarItem = (props) => {
  return (
    <ListGroupItem>
      {
        (window.location.pathname === props.routePath) ?
          <Link style={{ fontWeight: '600', color: '#666666' }} to={props.routePath}>
            <span>{props.sidebarIcon}</span>
            <span>{props.sidebarLink}</span>
          </Link>
        :
          <Link to={props.routePath}>
            <span>{props.sidebarIcon}</span>
            <span>{props.sidebarLink}</span>
          </Link>
      }
    </ListGroupItem>
  )
}

export default SidebarItem 