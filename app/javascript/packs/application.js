import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
  
})
