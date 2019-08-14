// @flow
import * as React from 'react';

import { initializeDB } from "./../database/initializeDB";

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  componentDidMount = () => {
    console.log("App mounted.");
    initializeDB();
  }
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
