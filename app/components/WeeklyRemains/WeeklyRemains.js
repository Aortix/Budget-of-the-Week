import React, { Component } from 'react';
import { connect } from "react-redux";

import styles from './WeeklyRemains.css';

import { getTotalPriceForTheWeek } from "./../../database/weekFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";

export class WeeklyRemains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingBalance: this.props.budget - sumUpPurchases(getTotalPriceForTheWeek(0))
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.budget !== this.props.budget) {
      this.setState({
        remainingBalance: this.props.budget - sumUpPurchases(getTotalPriceForTheWeek(0))
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
  budget: state.budgetReducer.budget
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyRemains);