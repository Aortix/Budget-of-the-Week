// @flow
import * as React from 'react';
import { connect } from "react-redux";

import { initializeDB } from "./../database/initializeDB";

import { getBudget } from "./../actions/budget";

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount = () => {
    initializeDB()
      .then((value) => {
        if (value === null) {
          console.log("DB already made");
        }
        this.props.getBudget(0);
      })
  }
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  getBudget: (weekID) => {
    dispatch(getBudget(weekID))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

