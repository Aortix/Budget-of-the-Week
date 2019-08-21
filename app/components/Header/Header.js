import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { remote, ipcRenderer } from "electron";
import { connect } from "react-redux"

import routes from "./../../constants/routes";

import styles from './Header.css';

//Components
import AddPurchaseInterface from "./../AddPurchaseInterface/AddPurchaseInterface";

//Database functions
import { getBudgetFunction } from "./../../database/purchaseFunctions";

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
      budgetValue: ""
    }

    this.purchaseInterfaceListener = null;
  }

  componentDidMount = () => {
    this.purchaseInterfaceListener = document.getElementById(this.props.currentPage);

    this.setState({
      budgetValue: getBudgetFunction(this.props.currentWeek).toString()
    })
    
    ipcRenderer.on('Location', (event, arg) => {
      this.setState({
        newPurchaseInterfaceLocation: {
          height: remote.getCurrentWindow().getBounds().height,
          width: remote.getCurrentWindow().getBounds().width
        }
      })
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.purchaseInterfaceListener = document.getElementById(this.props.currentPage)
    }
  }

  componentWillUnmount = () => {

  }

  eventListenerFunction = () => {
    console.log("Clicked");
    this.purchaseInterfaceListener.removeEventListener("click", this.eventListenerFunction, false)
    this.setState({
      newPurchaseInterfaceVisible: false
    })

    let divs = Array.from(document.querySelectorAll(`#${this.props.currentPage} :not(#AddPurchaseInterface)`));
    divs.forEach((elements) => {
      elements.style.setProperty("filter", "none");
    })

    divs = null;
  }

  newPurchaseButtonClicked = () => {
    if (this.state.newPurchaseInterfaceVisible) {
        this.setState({
          newPurchaseInterfaceVisible: false
        })

        this.purchaseInterfaceListener.removeEventListener("click", this.eventListenerFunction, false)
        
        let divs = Array.from(document.querySelectorAll(`#${this.props.currentPage} :not(#AddPurchaseInterface)`));
        divs.forEach((elements) => {
          elements.style.setProperty("filter", "none");
        })

        divs = null;
    } else {
        this.setState({
          newPurchaseInterfaceVisible: true
        })

        this.purchaseInterfaceListener.addEventListener("click", this.eventListenerFunction, false)
        
        let divs = Array.from(document.querySelectorAll(`#${this.props.currentPage} :not(#AddPurchaseInterface)`));
        setTimeout(() => {
          divs.forEach((elements) => {
            elements.style.setProperty("filter", "blur(1px)");
          })
          divs = null;
      }, 100)
    }
  }

  toggleVisibility = () => {
    this.setState({
      newPurchaseInterfaceVisible: false
    })
    
    let divs = Array.from(document.querySelectorAll(`#${this.props.currentPage} :not(#AddPurchaseInterface)`));
    divs.forEach((elements) => {
      elements.style.setProperty("filter", "none");
    })
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
                    this.budgetFormOnSubmit(this.state.budgetValue, this.props.currentWeek);
                  }
                }}
                onBlur={() => {
                  this.setState({
                    editingBudget: false
                  })
                }} autoFocus/>
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
        newPurchaseInterfaceLocation={this.state.newPurchaseInterfaceLocation}
        toggleVisibility={this.toggleVisibility}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budgetReducer.budget,
  currentPage: state.dayReducer.currentPage,
  currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = (dispatch) => ({
  setBudget: (budgetValue, weekID) => {
    dispatch(setBudget(budgetValue, weekID));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)