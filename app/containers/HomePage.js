// @flow
import React, { Component } from 'react';
import DayCard from '../components/DayCard/DayCard';
import WeeklyRemains from '../components/WeeklyRemains/WeeklyRemains';
import Layout from './Layout';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Layout>
        <div
          id="HomePage"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            paddingBottom: "45px"
          }}
        >
          <div style={{ flex: 0.2, maxHeight: '150px', marginTop: '40px' }}>
            <WeeklyRemains />
          </div>
          <div style={{ flex: 0.8 }}>
            <DayCard editable={false}/>
          </div>
        </div>
      </Layout>
    );
  }
}
