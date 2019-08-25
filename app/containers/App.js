// @flow
import * as React from 'react';
import { connect } from "react-redux";

import { initializeDB, getEndingDateLatestWeek, addWeek } from "./../database/purchaseFunctions";

import { getBudget } from "./../actions/budget";
import { setWeek } from "./../actions/week";
import { newWeek } from "./../actions/types";

import moment from "moment";

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount = () => {
    initializeDB()
      .then((value) => {
        if (value === null) {
          const compareDate = new Date(getEndingDateLatestWeek());
          const todaysDate = new Date(moment().format("YYYY-MM-DD"));

          if (todaysDate > compareDate) {
            addWeek()
              .then(() => {
                this.props.setCurrentWeek();
              })
              .catch((error) => {
                console.log(error);
              })
          } else {
            this.props.setCurrentWeek();
          }
        } else {
          this.props.setCurrentWeek();
        }
      })
      .then(() => {
        this.props.getBudget(this.props.currentWeek);
      })
      .catch((error) => {
        console.log(error);
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
  },
  newWeek: () => {
    dispatch({type: NEW_WEEK})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

