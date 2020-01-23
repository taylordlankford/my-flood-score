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
          <Link to={props.routePath}>
            <span className="active-icon">{<props.sidebarIcon />}</span>
            <span className="active-link">{props.sidebarLink}</span>
          </Link>
          :
          <Link to={props.routePath}>
            <span className="inactive-icon">{<props.sidebarIcon />}</span>
            <span className="inactive-link">{props.sidebarLink}</span>
          </Link>
      }
    </ListGroupItem>
  )
}

export default SidebarItem 