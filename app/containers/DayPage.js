import React, { Component } from 'react'
import { connect } from "react-redux";

import routes from "./../constants/routes";

import { Link } from "react-router-dom";

import Layout from "./Layout";
import DayCard from "./../components/DayCard/DayCard";
import DayData from "./../components/DayData/DayData";
import WeeklyRemains from "./../components/WeeklyRemains/WeeklyRemains";
import { dispatch } from 'rxjs/internal/observable/range';

class DayPage extends Component {
    render() {
        return (
            <Layout>
                <div style={{paddingBottom: "45px"}}>
                    <Link to={routes.HOME}><i className="fas fa-arrow-left fa-2x" 
                    style={{margin: 12}}></i></Link>
                    <div style={{marginBottom: "120px"}}>
                        <WeeklyRemains />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "75%", margin: "0 auto"}}>
                        <div style={{flex: 0.75}}>
                            <DayCard day={this.props.currentDay} editable={true} scrolling={false} />
                        </div>
                        <div style={{flex: 0.25}}>
                            <DayData />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    currentDay: state.dayReducer.currentDay
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
