import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";

import styles from './DayCard.css';

import routes from "./../../constants/routes";
import { Link, Redirect } from "react-router-dom";

import { getPurchasesOfDay } from "./../../database/dayFunctions";
import { updateDay } from "./../../database/purchaseFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOfAllProducts: sumUpPurchases(getPurchasesOfDay(this.props.day, 0)),
      dayInformation: updateDay(this.props.day)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.addedPurchase !== this.props.addedPurchase &&
      this.props.addedPurchase === true) {
        this.setState({
          dayInformation: updateDay(this.props.day)
        })
      }
  }

  render() {
    if (this.props.editable === false && !this.props.scrolling) {
      return (
        <Link to={routes.DAYSCREEN}>
          <div className={styles.mainContainer}>
                <h2 className={styles.dayText}>{this.props.day || "Monday"}</h2>
                <h3 className={styles.totalText}>{`$${this.state.totalOfAllProducts}`}</h3>
                {
                this.state.dayInformation.map((items) => {
                  return (
                    <div key={this.props.day + items.id} className={styles.flexContainer}>
                        <span className={styles.productText}>{items.itemName}</span>
                        <span className={styles.moneyText}>{items.price}</span>
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
              this.state.dayInformation.map((items) => {
                return (
                  <div key={this.props.day + items.id} className={styles.flexContainer}>
                      <span className={styles.productText}>{items.itemName}</span>
                      <span className={styles.moneyText}>{items.price}</span>
                  </div>
                )  
              })
              }
        </div>
      )
    }
    else {
      return null
    }
  }
}

const mapStateToProps = (state) => ({
  addedPurchase: state.purchasesReducer.addedPurchase
});

export default connect(mapStateToProps, null)(DayCard);

