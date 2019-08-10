import React from 'react'

import styles from "./AddPurchaseInterface.css";

export default function AddPurchaseInterface(props) {
    if (props.visible) {
        return (
            <div id="AddPurchaseInterface"
            style={{
                position: "fixed",
                width: "400px",
                height: "200px",
                border: "1px solid black",
                boxShadow: "0px 0px 1px black",
                textAlign: "center",
                backgroundColor: "#F0F0F0",
                zIndex: 2,
                top: `${(props.newPurchaseInterfaceLocation.height / 2) - 100}px`,
                left: `${(props.newPurchaseInterfaceLocation.width / 2) - 200}px`,
            }}>
                Add an item! Hello!
            </div>
        )
        } else {
            return null;
        }
}
