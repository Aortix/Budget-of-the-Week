import React from 'react'

import styles from "./PurchaseRows.css";

export default function PurchaseRows() {
    return (
        <div className={styles.flexContainer}>
            <span style={{fontSize: "20px", flexBasis: "50%"}}>Item</span>
            <span style={{fontSize: "20px", flexBasis: "50%"}}>Price</span>
            
            <form style={{flexBasis: "50%", marginTop: "7px"}}>
                <label>
                    <i style={{marginRight: "2.5%", marginLeft: "2.5%"}} className="fas fa-plus fa-xs"></i>
                    <input></input>
                </label>
            </form>
            <form style={{flexBasis: "50%", marginTop: "7px"}}>
                <label>
                    <i style={{marginRight: "2.5%", marginLeft: "2.5%"}} className="fas fa-dollar-sign fa-xs"></i>
                    <input></input>
                </label>
            </form>
        </div>
    )
}
