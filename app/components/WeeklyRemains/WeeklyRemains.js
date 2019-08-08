import React from 'react';

import styles from './WeeklyRemains.css';

export default function WeeklyRemains() {
  return (
    <div className={styles.mainContainer}>
      <p style={{ fontSize: 30 }}>Remaining Balance</p>
      <p style={{ fontSize: 70, marginTop: '6px' }}>$100</p>
    </div>
  );
}
