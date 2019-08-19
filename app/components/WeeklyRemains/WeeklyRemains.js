import React, { Component } from 'react';
import { connect } from "react-redux";

import styles from './WeeklyRemains.css';

import { getTotalPriceForTheWeek } from "./../../database/purchaseFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";

export class WeeklyRemains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingBalance: (this.props.budget - sumUpPurchases(getTotalPriceForTheWeek(0))).toFixed(2)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.budget !== this.props.budget) {
      this.setState({
        remainingBalance: (this.props.budget - sumUpPurchases(getTotalPriceForTheWeek(0))).toFixed(2)
      })
    }

    if (prevProps.addedPurchase !== this.props.addedPurchase &&
      this.props.addedPurchase === true) {
        console.log("Weeklyremains added purchase call");
        this.setState({
          remainingBalance: (this.props.budget - sumUpPurchases(getTotalPriceForTheWeek(0))).toFixed(2)
        })
      }
  }
  
  render() {
    return (
      <div className={styles.mainContainer}>
        <p style={{ fontSize: 30 }}>Remaining Balance</p>
        <p style={{ fontSize: 70, marginTop: '6px' }}>${this.state.remainingBalance}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budgetReducer.budget,
  addedPurchase: state.purchasesReducer.addedPurchase
})

export default connect(mapStateToProps, null)(WeeklyRemains);