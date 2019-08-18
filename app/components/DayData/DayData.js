import React, { Component } from 'react'

import { connect } from "react-redux";

import styles from "./DayData.css";

import { getPurchasesOfDay } from "./../../database/dayFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";

class DayData extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    determineColor = () => {
        let percentage = Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, 0))))
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
                <p style={{fontSize: "20px", fontStyle: "italic"}}>This day is using up 
                <span style={{color: this.determineColor(), fontSize: "22px"}}> {Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, 0)) / this.props.budget) * 100)}% </span> 
                of your weekly budget.</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    budget: state.budgetReducer.budget,
    currentDay: state.dayReducer.currentDay
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DayData)