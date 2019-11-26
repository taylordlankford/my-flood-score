import React from 'react'
import {
  Link
} from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const SidebarItem = (props) => {
  const activeIconStyle = {
    color: '#666666'
  }

  const activeLinkStyle = {
    fontWeight: '600',
    color: '#666666'
  }

  const inactiveIconStyle = {
    color: '#c4c4c4'
  }

  const inactiveLinkStyle = {
    fontWeight: '500',
    color: '#55B96A'
  }

  return (
    <ListGroupItem>
      {
        (window.location.pathname === props.routePath) ?
          <Link to={props.routePath}>
            <span style={activeIconStyle}>{<props.sidebarIcon />}</span>
            <span style={activeLinkStyle}>{props.sidebarLink}</span>
          </Link>
          :
          <Link to={props.routePath}>
            <span style={inactiveIconStyle}>{<props.sidebarIcon />}</span>
            <span style={inactiveLinkStyle}>{props.sidebarLink}</span>
          </Link>
      }
    </ListGroupItem>
  )
}

export default SidebarItem 