import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";

import styles from './DayCard.css';

import routes from "./../../constants/routes";
import { Link, Redirect } from "react-router-dom";

import { updateDay, getPurchasesOfDay } from "./../../database/purchaseFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";
import { setCurrentDay } from "./../../actions/day";
import { isTemplateExpression } from 'typescript';
import { addingPurchase, updatingPurchase, deletingPurchase } from '../../actions/purchases';

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOfAllProducts: 0,
      dayInformation: [],
      itemText: "",
      selectedItem: null
    }
  }

  componentDidMount = () => {
    this.setState({
      totalOfAllProducts: sumUpPurchases(getPurchasesOfDay(this.props.day, 0)),
      dayInformation: updateDay(this.props.day),
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    //When application is started for the first time, this needs to run to update the data after
    // the lowdb json object is created
    if (this.state.dayInformation === 0) {
      this.setState({
        totalOfAllProducts: sumUpPurchases(getPurchasesOfDay(this.props.day, 0)),
        dayInformation: updateDay(this.props.day),
      })
    }

    if (prevProps.addedPurchase !== this.props.addedPurchase &&
      this.props.addedPurchase === true) {
        this.setState({
          totalOfAllProducts: sumUpPurchases(getPurchasesOfDay(this.props.day, 0)),
          dayInformation: updateDay(this.props.day)
        })
      }
  }

  addingItem = (itemInput, priceInput, day, week) => {
    this.props.addPurchaseToDay(itemInput, priceInput, day, week);
  }

  submittingUpdate = (itemID, itemText, itemPrice, day, week) => {
    this.props.updatePurchaseToDay(itemID, itemText, itemPrice, day, week);
    this.setState({
      itemText: "",
      selectedItem: null
    })
  }

  deletingItem = (itemID, day, week) => {
    this.props.deletePurchaseToDay(itemID, day, week);
  }

  render() {
    if (this.props.editable === false && !this.props.scrolling) {
      return (
        <Link to={routes.DAYSCREEN}>
          <div className={styles.mainContainer} onClick={() => {
            this.props.setCurrentDay(this.props.day)
          }}>
                <h2 className={styles.dayText}>{this.props.day || "Monday"}</h2>
                <h3 className={styles.totalText}>{`$${this.state.totalOfAllProducts}`}</h3>
                {
                this.state.dayInformation && this.state.dayInformation.slice(0).reverse().map((items) => {
                  return (
                    <div key={this.props.day + items.id} className={styles.flexContainer}>
                        <span className={styles.productText}>{items.itemName}</span>
                        <span className={styles.moneyText}>${items.price}</span>
                    </div>
                  )  
                })
                }
          </div>
        </Link>
      )
    } else if (this.props.editable === false && this.props.scrolling) {
      return (
        <div className={styles.mainContainer}>
              <h2 className={styles.dayText}>{this.props.day || "Monday"}</h2>
              <h3 className={styles.totalText}>{`$${this.state.totalOfAllProducts}`}</h3>
              {
              this.state.dayInformation && this.state.dayInformation.slice(0).reverse().map((items) => {
                return (
                  <div key={this.props.day + items.id} className={styles.flexContainer}>
                      <span className={styles.productText}>{items.itemName}</span>
                      <span className={styles.moneyText}>${items.price}</span>
                  </div>
                )  
              })
              }
        </div>
      )
    }
    else {
      return (
        <div className={styles.mainFlexContainer}>
          <div className={styles.subFlexContainer}>
              <div className={styles.subFlexContainerTitle}>
                <h2 className={styles.dayText}>{this.props.day || "Monday"}</h2>
                <h3 className={styles.totalText}>{`$${this.state.totalOfAllProducts}`}</h3>
              </div>
              {
              this.state.dayInformation && this.state.dayInformation.slice(0).reverse().map((items) => {
                return (
                  <div key={this.props.day + items.id} className={styles.subSubFlexContainer}>
                    {this.state.selectedItem !== this.props.day + items.id + "product" ?
                        <span className={styles.productText} onClick={() => {
                          this.setState({
                            itemText: items.itemName,
                            selectedItem: this.props.day + items.id + "product"
                          })
                        }}>{items.itemName}</span> : 
                        <form onSubmit={(event) => {
                          event.preventDefault();
                          this.submittingUpdate(items.id, this.state.itemText, items.price, this.props.day, 0)
                        }}>
                          <input className={styles.textInput} 
                          value={this.state.itemText}
                          onChange={(event) => {
                            this.setState({
                              itemText: event.target.value
                            })
                          }}></input>
                        </form>
                    }
                    {this.state.selectedItem !== this.props.day + items.id + "price" ?
                        <span className={styles.moneyText} onClick={() => {
                          this.setState({
                            itemText: items.price,
                            selectedItem: this.props.day + items.id + "price"
                          })
                        }}>${items.price}</span> :
                        <form onSubmit={(event) => {
                          event.preventDefault();
                          this.submittingUpdate(items.id, items.itemName, this.state.itemText, this.props.day, 0)
                        }}>
                          <input className={styles.priceInput}
                          value={this.state.itemText}
                          onChange={(event) => {
                            this.setState({
                              itemText: event.target.value
                            })
                          }}></input>
                        </form>
                    }
                    <i style={{cursor: "pointer", margin: "3px"}} className="fas fa-times-circle"
                    onClick={() => {
                      this.deletingItem(items.id, this.props.day, 0)
                    }}></i>
                  </div>
                )  
              })
              }
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  addedPurchase: state.purchasesReducer.addedPurchase
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentDay: (day) => {
    dispatch(setCurrentDay(day))
  },
  addPurchaseToDay: (itemInput, priceInput, day, week) => {
    dispatch(addingPurchase(itemInput, priceInput, day, week))
  },
  updatePurchaseToDay: (itemID, itemText, itemPrice, day, week) => {
    dispatch(updatingPurchase(itemID, itemText, itemPrice, day, week))
  },
  deletePurchaseToDay: (itemID, day, week) => {
    dispatch(deletingPurchase(itemID, day, week))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DayCard);

