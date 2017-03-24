import React, { Component } from 'react';
import './App.js';

export class Display extends React.Component{
  constructor(props) {
    super(props);
  }

  getInitialState() {
    console.log(arguments);
  }

  render() {
    return( 
      <div>

        <ButtonFetchPrice />        
      </div>
    )
  }
}

class ButtonFetchPrice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ethPrice: null,
      divStyle: {
        width: 100,
        height: 50
      }
    }

     this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch('https://poloniex.com/public?command=returnTicker', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Key': 'UBCYRORF-Y5EVNXIJ-90IXSP1X-AWQRCL0W',
        'Sign': '169175e9298894d4da1138d127eac9cf8785c8625ac984b730ea03d6758e6440cd990fea8ff4937a908da6d7b222140b4fee41768b35bdc646987e87227e3b8c'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ethPrice: responseJson["BTC_ETH"].last});
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="ButtonContainer">
        <p id="ethTitle">ETH Current Price: {this.state.ethPrice}</p>        
        <button id="buttonFetch" style={this.state.divStyle} onClick={this.handleClick}>Fetch ETH</button>
      </div>
    )
  }
};

export default Display;