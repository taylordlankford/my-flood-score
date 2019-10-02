import React from 'react'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certify from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import Discover from '../../assets/images/Discover.svg'

const SecondRow = () => (
  <div className='headerBottom'>
    <a className="links2" href="https://reactjs.org" >
        Discover
        <img src={Discover} className={'links2logo'} alt={''} />
    </a>
    <a className="links2" href="https://reactjs.org" >
      Compare
      <img src={Compare} className={'links2logo'} alt={''} />
    </a>
    <a className="links2" href="https://reactjs.org" >
      Examine
      <img src={Examine} className={'links2logo'} alt={''} />
    </a>
    <a className="links2" href="https://reactjs.org" >
      Certify
      <img src={Certify} className={'links2logo'} alt={''} />
    </a>
    <a className="links2" href="https://reactjs.org" >
      Reduce or Eliminate
      <img src={Reduce_Eliminate} className={'links2logo'} alt={''} />
    </a>
  </div>
)

export default SecondRow
