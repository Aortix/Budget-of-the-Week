import React from 'react';

import styles from './DayCard.css';

import routes from "./../../constants/routes";
import { Link } from "react-router-dom";

export default function DayCard(props) {
  if (props.editable === false) {
    return (
      <Link to={routes.DAYSCREEN}>
      <div className={styles.mainContainer}>
        <h2 className={styles.dayText}>Monday</h2>
        <div className={styles.flexContainer}>
          <span className={styles.productText}>Lunch</span>
          <span className={styles.moneyText}>$5000</span>
        </div>
        <div className={styles.flexContainer}>
          <span className={styles.productText}>Grocery Shopping</span>
          <span className={styles.moneyText}>$100</span>
        </div>
        <div className={styles.flexContainer}>
          <span className={styles.productText}>Lunch</span>
          <span className={styles.moneyText}>$5000</span>
        </div>
        <div className={styles.flexContainer}>
          <span className={styles.productText}>Dinner</span>
          <span className={styles.moneyText}>$200</span>
        </div>
        <h2 className={styles.totalText}>Total: $600</h2>
      </div>
  </Link>
    )
  }
  else {
    return null
  }
}
