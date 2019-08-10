import React, { Component } from 'react';
import { Link } from "react-router-dom";

import routes from "./../../constants/routes";
import { remote, ipcRenderer } from "electron";

import styles from './Header.css';

//Components
import AddPurchaseInterface from "./../AddPurchaseInterface/AddPurchaseInterface";

export default class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newPurchaseInterfaceVisible: false,
      newPurchaseInterfaceLocation: {
        height: remote.getCurrentWindow().getBounds().height,
        width: remote.getCurrentWindow().getBounds().width
      }
    }
  }

  componentDidMount = () => {
    ipcRenderer.on('Location', (event, arg) => {
      this.setState({
        newPurchaseInterfaceLocation: {
          height: remote.getCurrentWindow().getBounds().height,
          width: remote.getCurrentWindow().getBounds().width
        }
      })
    })
  }

  newPurchaseButtonClicked = () => {
    if (this.state.newPurchaseInterfaceVisible) {
      this.setState({
        newPurchaseInterfaceVisible: false
      })
        let divs = Array.from(document.querySelectorAll("#HomePage :not(#AddPurchaseInterface)"));
        divs.forEach((elements) => {
          elements.style.setProperty("filter", "none");
        })
    } else {
      this.setState({
        newPurchaseInterfaceVisible: true
      })
      setTimeout(() => {
        let divs = Array.from(document.querySelectorAll("#HomePage :not(#AddPurchaseInterface)"));
        divs.forEach((elements) => {
          elements.style.setProperty("filter", "blur(1px)");
        })
      }, 200)
    }
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.flexContainer}>
          <Link to={routes.PREVIOUSWEEKSSCREEN}><h2 style={{ cursor: 'pointer' }}>Previous Weeks</h2></Link>
          <div className={styles.purchaseButton}
          onClick={this.newPurchaseButtonClicked}>
            <i
              className="fas fa-plus fa-xs"
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
            />
            <span style={{ verticalAlign: 'middle' }}>New Purchase</span>
          </div>
          <div>
            <span style={{ cursor: 'default' }}>Weekly Budget: $</span>
            <span>100</span>
          </div>
        </div>
        <AddPurchaseInterface visible={this.state.newPurchaseInterfaceVisible}
        newPurchaseInterfaceLocation={this.state.newPurchaseInterfaceLocation}/>
      </div>
    );
  }
}
