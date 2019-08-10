import React, { Component } from 'react'

import routes from "./../constants/routes";

import { Link } from "react-router-dom";

import Layout from "./Layout";

export default class DayPage extends Component {
    render() {
        return (
            <Layout>
                <div style={{paddingBottom: "45px"}}>
                    <Link to={routes.HOME}>Day Page</Link>
                </div>
            </Layout>
        )
    }
}
