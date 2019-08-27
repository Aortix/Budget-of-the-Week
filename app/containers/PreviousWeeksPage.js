import React, { Component } from 'react';
import { connect } from "react-redux";

import routes from "./../constants/routes";
import { Link } from "react-router-dom";
import Layout from './Layout';

import { setCurrentPage } from "./../actions/day";

//Components
import PreviousWeekCards from "./../components/PreviousWeekCards/PreviousWeekCards";

class PreviousWeeksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.setCurrentPage("PreviousWeeksPage");
    }

    render() {
        return (
            <Layout>
                <div id="PreviousWeeksPage" style={{marginTop: "45px"}}>
                    <Link to={routes.HOME}><i className="fas fa-arrow-left fa-2x" 
                        style={{margin: 12, position: "relative", top: "-45px"}}></i>
                    </Link>
                    <PreviousWeekCards />
                </div>
            </Layout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentPage: (page) => {
        dispatch(setCurrentPage(page))
    }
})

export default connect(null, mapDispatchToProps)(PreviousWeeksPage);
