import React, {Component} from 'react'
import { connect } from "react-redux";


import styles from "./AddPurchaseInterface.css";

import { ADDING_PURCHASES_SWITCH } from '../../actions/types';
import { setCurrentDayForPurchases } from "./../../actions/day";

import PurchaseRows from './../PurchaseRows/PurchaseRows';

class AddPurchaseInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfRowsArrayToMap: [],
            changingDay: false
        }

        this.addItemsButtonRef = React.createRef();
    }

    componentDidMount = () => {
        this.setState({ 
            numberOfRowsArrayToMap: [<PurchaseRows toggleVisibility={this.props.toggleVisibility} />]
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.visible !== this.props.visible) {
            this.setState({
                numberOfRowsArrayToMap: [<PurchaseRows toggleVisibility={this.props.toggleVisibility}/>]
            })
        }

        if (prevState.numberOfRowsArrayToMap.length !== this.state.numberOfRowsArrayToMap.length && this.props.visible) {
                document.getElementById("AddPurchaseInterface").style.top = 
                `${(this.props.newPurchaseInterfaceLocation.height / 2) - 
                (document.getElementById("AddPurchaseInterface").offsetHeight / 2)}px`;
        }
    }

    changeDay = (event) => {
        this.props.setCurrentDayForPurchases(event.target.innerHTML);
        this.setState({
            changingDay: false
        })
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
                    boxShadow: "0px 0px 1px var(--headerColor)",
                    textAlign: "center",
                    backgroundColor: "var(--bodyColor)",
                    padding: "10px",
                    zIndex: 2,
                    top: `${(this.props.newPurchaseInterfaceLocation.height / 2) - 125}px`,
                    left: `${(this.props.newPurchaseInterfaceLocation.width / 2) - 200}px`,
                }}>
                    <div>
                        <div className={styles.dayDropdown} onClick={() => {
                            this.setState({
                                changingDay: !this.state.changingDay
                            })
                        }}>
                            <span>{this.props.currentDayForPurchases}</span>&nbsp;
                            <i className="fas fa-sort-down"></i>
                        </div>
                        {this.state.changingDay ? <ul className={styles.ulDropdown}>
                            <li onClick={this.changeDay}>Monday</li>
                            <li onClick={this.changeDay}>Tuesday</li>
                            <li onClick={this.changeDay}>Wednesday</li>
                            <li onClick={this.changeDay}>Thursday</li>
                            <li onClick={this.changeDay}>Friday</li>
                            <li onClick={this.changeDay}>Saturday</li>
                            <li onClick={this.changeDay}>Sunday</li>
                        </ul>: null}
                    </div>
                    {this.state.numberOfRowsArrayToMap.map((component, index) => {
                        return (
                            <React.Fragment key={index}>
                                {component}
                            </React.Fragment>
                        )
                    })}
                    <button className={styles.addRowButton} 
                        onClick={() => {
                            if (document.getElementById("AddPurchaseInterface").offsetHeight < 
                            this.props.newPurchaseInterfaceLocation.height - 175) {
                                this.setState({
                                    numberOfRowsArrayToMap: [...this.state.numberOfRowsArrayToMap, 
                                    <PurchaseRows toggleVisibility={this.props.toggleVisibility} />]
                                })
                            }
                        }}>Additional Row</button>
                    <div ref="addItemsButtonRef"
                        className={styles.addItemButton}
                        onClick={() => {
                            this.props.addingPurchasesSwitch();
                    }}>Add Items</div>
                </div>
            )
            } else {
                return null;
            }
    }
}

const mapStateToProps = (state) => ({
    currentDayForPurchases: state.dayReducer.currentDayForPurchases
})

const mapDispatchToProps = (dispatch) => ({
    addingPurchasesSwitch: () => {
        dispatch({type: ADDING_PURCHASES_SWITCH})
    },
    setCurrentDayForPurchases: (day) => {
        dispatch(setCurrentDayForPurchases(day))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseInterface);
