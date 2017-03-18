import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Bitches!</h2>
        </div>
        <Display />
        <ButtonFetchPrice />
      </div>
    );
  }
}
var ethPrice;

var Display = React.createClass({
  render: function() {
    return (
      <div className="Display1Container">
        <p id="ethTitle">ETH Current Price: {ethPrice}</p>
      </div>
    );
  }
});

const divStyle = {
    width: 100,
    height: 50
  };

var ButtonFetchPrice = React.createClass({
  onClick: function() {
    console.log('sup');
  },
  render: function() {
    return (
      <div className="ButtonContainer">
        <button id="buttonFetch" style={divStyle}>Fetch ETH</button>
      </div>
    )
  }
});


function getMoviesFromApiAsync() {
  return fetch('https://poloniex.com/public?command=returnTicker')
    .then((response) => response.json())
    .then((responseJson) => {
      ethPrice = responseJson["BTC_ETH"].last;
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}

getMoviesFromApiAsync();

export default App;
