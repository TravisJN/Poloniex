import React, { Component } from 'react';
import './App.js';
import jssha from 'jssha';

export class Display extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
        api: "",
        secret: ''
    }
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
      sign: '',//sha512('', 'command=returnBalances'),
      ethPrice: null,
      queryParams: 'command=returnBalances',
      divStyle: {
        width: 100,
        height: 50
      },
      hmac: '',
      keys: {
          api: "",
          secret: ''
      }
    }

    


    //console.log(sha512('command=returnBalances'));

     this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //this.setState({sign: this.state.sign + sha512(this.state.queryParams)});
  }

  handleClick() {
    var headersObj = {
        'Key': this.state.keys.api,
        'Sign': this.state.hmac,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        
      }


    var shaObj = new jssha("SHA-512", "TEXT");
    //shaObj.setHMACKey(this.state.keys.secret, "TEXT");
    shaObj.update(this.state.secret + this.state.queryParams);
    //this.state.hmac = shaObj.getHMAC("HEX");
    this.state.hmac = shaObj.getHash("HEX");

    console.log(this.state.hmac);
    fetch('https://poloniex.com/tradingApi?' + this.state.queryParams, {
      mode: 'no-cors',
      method: 'POST',
      headers: headersObj
    })
    .then((response) => console.log(response.json()))
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