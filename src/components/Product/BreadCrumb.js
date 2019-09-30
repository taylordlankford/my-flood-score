import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = (props) => {
  const { data } = props
  return (
    <div className="breadcrumb-container">
      {data.map(crumb => (
        <Link to={crumb.link} key={crumb.link} >{crumb.name} <span style={{ color: 'gray' }}> / </span></Link>
      ))}
      {/* <Link to={link}>Home</Link>&nbsp; / &nbsp;<Link to={ROUTES.DISCOVER}>Discover - Homeowner</Link> */}
    </div>
  )
}

export default BreadCrumb
