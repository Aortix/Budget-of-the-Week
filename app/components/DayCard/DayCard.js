import React from 'react';

import styles from './DayCard.css';

export default function DayCard() {
  return (
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
      <h2 className={styles.totalText}>Total: $600</h2>
    </div>
  );
}
