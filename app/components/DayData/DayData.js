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
            newItemInput: "",
            newPriceInput: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, 0)) / 
            this.props.budget) * 100)
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.budget !== this.props.budget) {
            this.setState({
                percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, 0)) / 
                this.props.budget) * 100),
                newItemInput: "",
                newPriceInput: ""
              })
        }

        if (prevProps.addedPurchase !== this.props.addedPurchase &&
          this.props.addedPurchase === true) {
            this.setState({
              percentage: Math.round((sumUpPurchases(getPurchasesOfDay(this.props.currentDay, 0)) / 
              this.props.budget) * 100)
            })
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

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.addingPurchase(this.state.newItemInput, this.state.newPriceInput, 
            this.props.currentDay, 0);
        this.setState({
            newItemInput: "",
            newPriceInput: ""
        })
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <p style={{fontSize: "20px", fontStyle: "italic"}}>This day is using up 
                <span style={{color: this.determineColor(), fontSize: "22px"}}> {this.state.percentage}% </span> 
                of your weekly budget.</p>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Item: 
                        <input value={this.state.newItemInput} onChange={(event) => {
                            this.setState({
                                newItemInput: event.target.value
                            })
                        }} required></input>
                    </label>
                    <label>Price:
                        <input value={this.state.newPriceInput} onChange={(event) => {
                            this.setState({
                                newPriceInput: event.target.value
                            })
                        }} required></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    budget: state.budgetReducer.budget,
    currentDay: state.dayReducer.currentDay,
    addedPurchase: state.purchasesReducer.addedPurchase
})

const mapDispatchToProps = (dispatch) => ({
    addingPurchase: (itemInput, priceInput, day, week) => {
        dispatch(addingPurchase(itemInput, priceInput, day, week));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DayData)