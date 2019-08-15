import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { remote, ipcRenderer } from "electron";
import { connect } from "react-redux"

import routes from "./../../constants/routes";

import styles from './Header.css';

//Components
import AddPurchaseInterface from "./../AddPurchaseInterface/AddPurchaseInterface";

import { getBudgetFunction } from "./../../database/budgetFunctions";

//Action Types
import { GET_BUDGET } from '../../actions/types';

//Actions
import { setBudget } from "./../../actions/budget";

export class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newPurchaseInterfaceVisible: false,
      newPurchaseInterfaceLocation: {
        height: remote.getCurrentWindow().getBounds().height,
        width: remote.getCurrentWindow().getBounds().width
      },
      editingBudget: false,
      budgetValue: getBudgetFunction(0).toString()
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

  budgetFormOnSubmit = (budgetValue, weekID) => {
    if (typeof budgetValue === 'string') {
      let convertedBudgetValue = parseInt(budgetValue);
      if (typeof convertedBudgetValue === "number" && !isNaN(convertedBudgetValue)) {
        this.props.setBudget(convertedBudgetValue, weekID)
        this.setState({
          editingBudget: false,
          budgetValue: budgetValue
        })
      } else {
        console.log("This is not a number!");
      }
    } else {
      console.log("String format is incorrect in state!");
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
            {this.state.editingBudget ?
            <form style={{display: "inline", marginLeft: "5px", marginRight: "5px"}} 
              onSubmit={(event) => {
                event.preventDefault();
              }}>
              <label>
                <input className={styles.budgetInput} type="text" value={this.state.budget} 
                onChange={(event) => {
                  this.setState({
                    budgetValue: event.target.value
                  })
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.budgetFormOnSubmit(this.state.budgetValue, 0);
                  }
                }} />
              </label>
            </form> : 
            <span onClick={() => {
              this.setState({
                editingBudget: true
              })
            }}>{this.props.budget}</span>
            }
          </div>
        </div>
        <AddPurchaseInterface visible={this.state.newPurchaseInterfaceVisible}
        newPurchaseInterfaceLocation={this.state.newPurchaseInterfaceLocation}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budgetReducer.budget
})

const mapDispatchToProps = (dispatch) => ({
  setBudget: (budgetValue, weekID) => {
    dispatch(setBudget(budgetValue, weekID));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)