import React, { Component, Fragment } from 'react'

import styles from "./PreviousWeekCards.css";

import { getAllWeeksLength } from "./../../database/purchaseFunctions";
import PreviousWeeksCard from "./../PreviousWeeksCard/PreviousWeeksCard";

export default class PreviousWeekCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weeksLength: 0,
            weeksArray: []
        }
    }

    componentDidMount = () => {
        let weeksArrayMount = [];
        for (let i = 0; i < getAllWeeksLength(); i++) {
            weeksArrayMount.push(<PreviousWeeksCard weekID={i}/>)
        }

        this.setState({
            weeksLength: getAllWeeksLength(),
            weeksArray: weeksArrayMount
        })
    }


    render() {
        return (
            <div>
                <h2 style={{fontSize: "46px", textAlign: "center", marginBottom: "40px"}}>Previous Weeks</h2>
                {this.state.weeksArray.map((component, index) => {
                    return (
                        <Fragment key={index}>
                            {component}
                        </Fragment>
                    )
                })}
            </div>
        )
    }
}
