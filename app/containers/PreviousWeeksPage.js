import React, { Component } from 'react'

import routes from "./../constants/routes";
import { Link } from "react-router-dom";
import Layout from './Layout';

export default class PreviousWeeksPage extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <Link to={routes.HOME}>Previous weeks page</Link>
                </div>
            </Layout>
        )
    }
}
