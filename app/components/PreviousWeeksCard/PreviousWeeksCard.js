import React, { Component } from 'react'
import { connect } from "react-redux";
import styles from "./PreviousWeeksCard.css";

import { getCreationDate, getBudgetFunction, getTotalPriceForTheWeek, getPurchasesOfDay } from "./../../database/purchaseFunctions";
import sumUpPurchases from "./../../utils/sumUpPurchases";
import daysOfTheWeek from "./../../utils/daysOfTheWeek";

import moment from "moment";

class PreviousWeeksCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDays: false,
            creationDate: "",
            endingDate: "",
            budget: 1,
            weekTotalSpent: 0,
            weekPercentage: 0
        }
    }

    componentDidMount = () => {
        this.setState({
            creationDate: getCreationDate(this.props.weekID),
            budget: getBudgetFunction(this.props.weekID),
            weekTotalSpent: sumUpPurchases(getTotalPriceForTheWeek(this.props.weekID)),
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.budget !== this.state.budget) {
            this.setState({
                weekPercentage: Math.round((sumUpPurchases(getTotalPriceForTheWeek(this.props.weekID)) / this.state.budget) * 100)
            })
        }

        if (prevState.creationDate !== this.state.creationDate) {
            const dayINeed = 0; // for Sunday
            const today = moment().isoWeekday();

            // if we haven't yet passed the day of the week that I need:
            if (today <= dayINeed) { 
            // then just give me this week's instance of that day
            this.setState({
                endingDate: moment().isoWeekday(dayINeed).format("YYYY-MM-DD")
            })
            } else {
            // otherwise, give me *next week's* instance of that same day
            this.setState({
                endingDate: moment().add(1, 'weeks').isoWeekday(dayINeed).format("YYYY-MM-DD")
            })
            }
        }
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.cardContainer}>
                    <p className={styles.cardTitle} onClick={() => {
                        this.setState({
                            displayDays: !this.state.displayDays
                        })
                    }}>
                    Week {this.props.weekID + 1}: {this.state.creationDate} - {this.state.endingDate}
                    <span className={styles.arrowDown}>{this.state.weekPercentage}% Usage &nbsp;<i className="fas fa-sort-down"></i></span>
                    </p>
                    {this.state.displayDays ? 
                    <div style={{textAlign: "center"}}>
                        <p className={styles.cardSubTitle}>${this.state.budget} Budget | ${this.state.weekTotalSpent} Spent | 
                        ${this.state.budget - this.state.weekTotalSpent} Remaining</p>
                        <div>
                            {daysOfTheWeek.map((day, index) => {
                                return (
                                    <div key={index}>
                                        <p>{day}</p>
                                        <p>${sumUpPurchases(getPurchasesOfDay(day, this.props.weekID))}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousWeeksCard);
