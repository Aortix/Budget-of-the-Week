// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import WeekCards from "./../components/WeekCards/WeekCards";
import WeeklyRemains from '../components/WeeklyRemains/WeeklyRemains';
import { setCurrentPage } from "./../actions/day";
import Layout from './Layout';

type Props = {};

class HomePage extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }

    this.homePageContainer = React.createRef();
  }

  componentDidMount = () => {
    this.props.setCurrentPage("HomePage");
  }

  render() {
    return (
      <Layout>
        <div id="HomePage">
          <div style={{marginTop: "40px"}}>
            <WeeklyRemains />
          </div>
          <div
            ref={this.homePageContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'flex-start',
              alignItems: 'center',
              paddingBottom: "45px",
              overflow: "auto"
            }}
          >
            <div style={{ flex: 1, alignSelf: "flex-start", marginTop: "120px"}}>
              <WeekCards homePageContainer={this.homePageContainer} editable={false}/>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPage: state.dayReducer.currentPage
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (page) => {
    dispatch(setCurrentPage(page));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);