import React from 'react';

import styles from './Header.css';

export default function Header() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.flexContainer}>
        <h2 style={{ cursor: 'pointer' }}>Previous Weeks</h2>
        <div className={styles.purchaseButton}>
          <i
            className="fas fa-plus fa-xs"
            style={{ marginRight: '6px', verticalAlign: 'middle' }}
          />
          <span style={{ verticalAlign: 'middle' }}>New Purchase</span>
        </div>
        <div>
          <span style={{ cursor: 'default' }}>Weekly Budget: $</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
