import React, { Component } from 'react'
import { connect } from "react-redux";

import routes from "./../constants/routes";

import { Link } from "react-router-dom";

import Layout from "./Layout";
import DayCard from "./../components/DayCard/DayCard";
import DayData from "./../components/DayData/DayData";
import WeeklyRemains from "./../components/WeeklyRemains/WeeklyRemains";
import AddPurchase from "./../components/AddPurchase/AddPurchase";
import { setCurrentPage } from "./../actions/day";
import { relative } from 'upath';

class DayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.setCurrentPage("DayPage");
    }

    render() {
        return (
            <Layout>
                <div id="DayPage" style={{paddingBottom: "45px", marginTop: "40px"}}>
                    <Link to={routes.HOME}><i className="fas fa-arrow-left fa-2x" 
                    style={{margin: 12, position: "relative", top: -40}}></i></Link>
                    <div style={{marginBottom: "120px"}}>
                        <WeeklyRemains />
                    </div>
                    <div style={{textAlign: "center"}}>
                        <AddPurchase /> 
                    </div>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "75%", margin: "0 auto"}}>
                        <div style={{flex: 0.7}}>
                            <DayCard day={this.props.currentDay} editable={true} scrolling={false} />
                        </div>
                        <div style={{flex: 0.3}}>
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
    setCurrentPage: (page) => {
        dispatch(setCurrentPage(page));
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);
