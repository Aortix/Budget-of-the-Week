import React, { Component } from 'react'

import styles from "./WeekCards.css";

import { daysOfTheWeek } from "./../../utils/daysOfTheWeek";
import DayCard from "./../DayCard/DayCard";

export default class WeekCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolling: false,
            scrollDown: 0,
            currentPosition: 0
        }

        this.scrollingTimeout = null;
    }

    render() {
        return (
            <div className={styles.mainContainer} 
            onMouseDown={(event) => {
                event.preventDefault();
                this.setState({
                    scrollDown: event.clientX
                })

                this.scrollingTimeout = setTimeout(() => {
                    this.setState({
                        scrolling: true
                    })
                }, 150)
            }}
            onMouseUp={(event) => {
                this.setState({
                    scrolling: false,
                    currentPosition: this.state.currentPosition + (this.state.scrollDown - event.clientX)
                })
                clearTimeout(this.scrollingTimeout);
            }}
            onMouseLeave={(event) => {
                this.setState({
                    scrolling: false
                })
                clearTimeout(this.scrollingTimeout);
            }}
            onMouseMove={(event) => {
            if (this.state.scrolling === true) {
                if (event.movementX > 0) {
                    this.props.homePageContainer.current.scrollLeft = 
                    this.state.currentPosition + (this.state.scrollDown - event.clientX);
                } else if (event.movementX < 0) {
                    this.props.homePageContainer.current.scrollLeft = 
                    this.state.currentPosition + (this.state.scrollDown - event.clientX);
                }
            }
            }}>
            {
                daysOfTheWeek.map((day, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div style={{margin: "0px 12px"}} />
                            <DayCard scrolling={this.state.scrolling} editable={this.props.editable} day={day}/>
                            <div style={{margin: "0px 12px"}} />
                        </React.Fragment>
                    )
                })
            }
            </div>
        )
    }
}
