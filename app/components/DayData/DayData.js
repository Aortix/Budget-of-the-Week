import React, { Component } from 'react'

import { connect } from "react-redux";

import styles from "./DayData.css";

import { getPurchasesOfDay } from "./../../database/purchaseFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";
import { addingPurchase } from "./../../actions/purchases";

class DayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
        }
    }

    componentDidMount = () => {
        this.setState({
            percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, this.props.currentWeek)) / 
            this.props.budget) * 100)
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.budget !== this.props.budget) {
            this.setState({
                percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, this.props.currentWeek)) / 
                this.props.budget) * 100)
              })
        }

        if (prevProps.addedPurchase !== this.props.addedPurchase &&
          this.props.addedPurchase === true) {
            this.setState({
                percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, this.props.currentWeek)) / 
                this.props.budget) * 100)
            })
          }
      }

    determineColor = () => {
        let percentage = Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, this.props.currentWeek))))

        if (percentage < Math.round(this.props.budget / 7)) {
            return "green"
        } else if (percentage < Math.round(this.props.budget / 7) * 2) {
            return "orange"
        } else {
            return "red"
        }
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <p style={{fontSize: "26px", fontStyle: "italic"}}>This day is using up 
                <span style={{color: this.determineColor(), fontSize: "28px"}}> {this.state.percentage}% </span> 
                of your weekly budget.</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    budget: state.budgetReducer.budget,
    currentDay: state.dayReducer.currentDay,
    addedPurchase: state.purchasesReducer.addedPurchase,
    currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = (dispatch) => ({
    addingPurchase: (itemInput, priceInput, day, week) => {
        dispatch(addingPurchase(itemInput, priceInput, day, week));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DayData)