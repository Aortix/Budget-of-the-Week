import React, {Component} from 'react'

import styles from "./AddPurchaseInterface.css";

import PurchaseRows from './../PurchaseRows/PurchaseRows';

class AddPurchaseInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfRowsArrayToMap: []
        }
    }

    componentDidMount = () => {
        this.state.numberOfRowsArrayToMap.push(<PurchaseRows />);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.visible !== this.props.visible) {
            this.setState({
                numberOfRowsArrayToMap: [<PurchaseRows />]
            })
        }

        if (prevState.numberOfRowsArrayToMap.length !== this.state.numberOfRowsArrayToMap.length && this.props.visible) {
                document.getElementById("AddPurchaseInterface").style.top = 
                `${(this.props.newPurchaseInterfaceLocation.height / 2) - (document.getElementById("AddPurchaseInterface").offsetHeight / 2)}px`;
        }
    }

    render() {
        if (this.props.visible) {
            return (
                <div id="AddPurchaseInterface"
                style={{
                    position: "fixed",
                    width: "400px",
                    minHeight: "250px",
                    border: "1px solid black",
                    boxShadow: "0px 0px 1px black",
                    textAlign: "center",
                    backgroundColor: "#F0F0F0",
                    zIndex: 2,
                    top: `${(this.props.newPurchaseInterfaceLocation.height / 2) - 125}px`,
                    left: `${(this.props.newPurchaseInterfaceLocation.width / 2) - 200}px`,
                }}>
                    {this.state.numberOfRowsArrayToMap.map((component, index) => {
                        return (
                            <React.Fragment key={index}>
                                {component}
                            </React.Fragment>
                        )
                    })}
                    <button className={styles.addRowButton} onClick={() => {
                        if (document.getElementById("AddPurchaseInterface").offsetHeight < 
                        this.props.newPurchaseInterfaceLocation.height - 175) {
                            this.setState({
                                numberOfRowsArrayToMap: [...this.state.numberOfRowsArrayToMap, <PurchaseRows />]
                            })
                        }
                    }}>Additional Row</button>
                    <button className={styles.addItemButton}>Add Items</button>
                </div>
            )
            } else {
                return null;
            }
    }
}

export default AddPurchaseInterface;
