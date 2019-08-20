// @flow
import * as React from 'react';
import { connect } from "react-redux";

import { initializeDB } from "./../database/purchaseFunctions";

import { getBudget } from "./../actions/budget";
import { setWeek } from "./../actions/week";

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
        this.props.setCurrentWeek();
      })
      .then(() => {
        this.props.getBudget(this.props.currentWeek);
      })
  }
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
  currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = (dispatch) => ({
  getBudget: (weekID) => {
    dispatch(getBudget(weekID))
  },
  setCurrentWeek: () => {
    dispatch(setWeek())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

