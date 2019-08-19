import React, { Component } from 'react'

import routes from "./../constants/routes";
import { Link } from "react-router-dom";
import Layout from './Layout';

export default class PreviousWeeksPage extends Component {
    render() {
        return (
            <Layout>
                <div id="PreviousWeeksPage">
                    <Link to={routes.HOME}>Previous weeks page</Link>
                </div>
            </Layout>
        )
    }
}
