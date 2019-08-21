import React from 'react'
import Home from './pages/Home'
import Header from '/Users/Kulow/React/myflood-score/src/components/Header/Header.js'
import {Row, Col} from 'react-bootstrap'

function App () {
  return (
    
    <Row>
        <Header/>
        <Home/>
    </Row>
      

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>
  )
}

export default App