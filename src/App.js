import Main from './components/MainComponent';
import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
    );
  }
}
