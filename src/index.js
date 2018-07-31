
import ReactDOM from 'react-dom'
import React from 'react'

import App from './components/App.jsx'

var callback = function () {
    console.log('Done!!!!');
  };
   

ReactDOM.render(
    <App />,document.getElementById('root')
)