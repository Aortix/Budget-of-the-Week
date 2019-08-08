import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
