import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certify from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import Discover from '../../assets/images/Discover.svg'

const SecondRow = () => (
  <div className='headerBottom'>
    <Link to={ROUTES.DISCOVER} className="links2">
        Discover
        <img src={Discover} className={'links2logo'} alt="" />
    </Link>
    <Link to={ROUTES.COMPARE} className="links2">
      Compare
      <img src={Compare} className={'links2logo'} alt="" />
    </Link>
    <Link to={ROUTES.EXAMINE} className="links2">
      Examine
      <img src={Examine} className={'links2logo'} alt="" />
    </Link>
    <Link to={ROUTES.CERTIFY} className="links2">
      Certify
      <img src={Certify} className={'links2logo'} alt="" />
    </Link>
    <Link to={ROUTES.REDUCE} className="links2">
      Reduce or Eliminate
      <img src={Reduce_Eliminate} className={'links2logo'} alt="" />
    </Link>
  </div>
)

export default SecondRow
