import React, { Component } from 'react'
import { connect } from "react-redux";
import styles from "./PreviousWeeksCard.css";

class PreviousWeeksCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDays: false
        }
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                <h2 style={{fontSize: "46px", textAlign: "center", marginBottom: "40px"}}>Previous Weeks</h2>
                <div className={styles.cardContainer}>
                    <p className={styles.cardTitle} onClick={() => {
                        this.setState({
                            displayDays: !this.state.displayDays
                        })
                    }}>
                    Week 1: 08/12/2019 - 08/18/2019
                    <span className={styles.arrowDown}>67% Usage &nbsp;<i className="fas fa-sort-down"></i></span>
                    </p>
                    {this.state.displayDays ? 
                    <div style={{textAlign: "center"}}>
                        <p className={styles.cardSubTitle}>$700 Budget | $535 Spent | $165 Remaining</p>
                        <div>
                            <p>Day</p>
                            <p>Total</p>
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
