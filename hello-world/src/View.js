import React, { Component } from 'react';
import './App.js';
import jssha from 'jssha';

export class Display extends React.Component{
  constructor(props) {
    super(props);
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
      sign: '',//sha512('169175e9298894d4da1138d127eac9cf8785c8625ac984b730ea03d6758e6440cd990fea8ff4937a908da6d7b222140b4fee41768b35bdc646987e87227e3b8c', 'command=returnBalances'),
      ethPrice: null,
      queryParams: 'command=returnBalances',
      divStyle: {
        width: 100,
        height: 50
      },
      hmac: ''
    }

    var shaObj = new jssha("SHA-512", "TEXT");
    shaObj.setHMACKey("169175e9298894d4da1138d127eac9cf8785c8625ac984b730ea03d6758e6440cd990fea8ff4937a908da6d7b222140b4fee41768b35bdc646987e87227e3b8c", "TEXT");
    shaObj.update(this.state.queryParams);
    this.state.hmac = shaObj.getHMAC("HEX");


    //console.log(sha512('169175e9298894d4da1138d127eac9cf8785c8625ac984b730ea03d6758e6440cd990fea8ff4937a908da6d7b222140b4fee41768b35bdc646987e87227e3b8ccommand=returnBalances'));

     this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //this.setState({sign: this.state.sign + sha512(this.state.queryParams)});
  }

  handleClick() {
    console.log(this.state.hmac);
    fetch('https://poloniex.com/tradingApi?' + this.state.queryParams, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Key': 'UBCYRORF-Y5EVNXIJ-90IXSP1X-AWQRCL0W',
        'Sign': this.state.hmac
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