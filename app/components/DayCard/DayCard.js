import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

import styles from './DayCard.css';

import routes from "./../../constants/routes";
import { Link, Redirect } from "react-router-dom";

import { getDayPurchases } from "./../../actions/day";
import { getPurchasesOfDay } from "./../../database/dayFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOfAllProducts: sumUpPurchases(getPurchasesOfDay(this.props.day, 0))
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
                db.get(`weeks[${db.get("weeks").value().length - 1}].days`).value()[this.props.day || "Monday"].map((items) => {
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
              db.get(`weeks[${db.get("weeks").value().length - 1}].days`).value()[this.props.day || "Monday"].map((items) => {
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
  dayPrices: state.dayReducer.dayPrices
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDayPurchases: (day, weekID) => dispatch(getDayPurchases(day, weekID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayCard);

