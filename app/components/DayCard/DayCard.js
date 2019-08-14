import React, { Fragment } from 'react';
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

import styles from './DayCard.css';

import routes from "./../../constants/routes";
import { Link, Redirect } from "react-router-dom";

export default function DayCard(props) {
  if (props.editable === false && !props.scrolling) {
    return (
      <Link to={routes.DAYSCREEN}>
        <div className={styles.mainContainer}>
              <h2 className={styles.dayText}>{props.day || "Monday"}</h2>
              {
              db.get(`weeks[${db.get("weeks").value().length - 1}].days`).value()[props.day || "Monday"].map((items) => {
                return (
                  <div key={items.id + items.itemName + items.price} className={styles.flexContainer}>
                      <span className={styles.productText}>{items.itemName}</span>
                      <span className={styles.moneyText}>{items.price}</span>
                  </div>
                )  
              })
              }
        </div>
        </Link>
    )
  } else if (props.editable === false && props.scrolling) {
    return (
      <div className={styles.mainContainer}>
            <h2 className={styles.dayText}>{props.day || "Monday"}</h2>
            {
            db.get(`weeks[${db.get("weeks").value().length - 1}].days`).value()[props.day || "Monday"].map((items) => {
              return (
                <div key={items.id + items.itemName + items.price} className={styles.flexContainer}>
                    <span className={styles.productText}>{items.itemName}</span>
                    <span className={styles.moneyText}>{items.price}</span>
                </div>
              )  
            })
            }
      </div>
  )
  }
  else {
    return null
  }
}