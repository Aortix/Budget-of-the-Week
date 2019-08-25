import React, { Component } from 'react'
import { connect } from "react-redux";

import styles from "./PurchaseRows.css";

import { ADDING_PURCHASES_SWITCH, ADDING_PURCHASES_SWITCH_DISABLE } from '../../actions/types';

import { addingPurchase } from "./../../actions/purchases";

import { validateStringsForItems, validateStringsForPrices } from "./../../validation/validation";

class PurchaseRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemInput: "",
            priceInput: "",
            visible: true,
            errors: {
                forItems: null,
                forPrices: null
            }
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.addingPurchasesSwitch !== this.props.addingPurchasesSwitch
            && this.props.addingPurchasesSwitch === true) {
                if (validateStringsForItems(this.state.itemInput) === true &&
                validateStringsForPrices(this.state.priceInput) === true) {
                    this.props.addedPurchase(this.state.itemInput, this.state.priceInput, 
                        this.props.currentDayForPurchases, this.props.currentWeek);
                    this.props.togglingPurchasesSwitchDisable();
                    this.props.changeRowsDisplayed(this.props.id);
                    this.setState({
                        itemInput: "",
                        priceInput: "",
                        visible: false
                    })
                } else {
                    this.props.togglingPurchasesSwitchDisable();
                    this.setState({
                        errors: {
                            forItems: validateStringsForItems(this.state.itemInput),
                            forPrices: validateStringsForPrices(this.state.priceInput)
                        }
                    })
                }
            }
    }

    render() {
        return (
            this.state.visible === false ? null : 
            <div className={styles.flexContainer}>
                <span style={{fontSize: "20px", flexBasis: "50%"}}>Item</span>
                <span style={{fontSize: "20px", flexBasis: "50%"}}>Price</span>
                
                <form style={{flexBasis: "50%", marginTop: "7px"}}>
                    <label>
                        <i style={{marginRight: "2.5%", marginLeft: "2.5%"}} className="fas fa-plus fa-xs"></i>
                        <input value={this.state.itemInput} onChange={(event) => {
                            this.setState({
                                itemInput: event.target.value
                            })
                        }} onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                            }
                        }}></input>
                    </label>
                </form>
                <form style={{flexBasis: "50%", marginTop: "7px"}}>
                    <label>
                        <i style={{marginRight: "2.5%", marginLeft: "2.5%"}} className="fas fa-dollar-sign fa-xs"></i>
                        <input value={this.state.priceInput} onChange={(event) => {
                            this.setState({
                                priceInput: event.target.value
                            })
                        }}  onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                            }
                        }}></input>
                    </label>
                </form>
                <span style={{fontSize: "12px", flexBasis: "50%", color: "maroon"}}>{this.state.errors.forItems !== null ? this.state.errors.forItems : null}</span>
                <span style={{fontSize: "12px", flexBasis: "50%", color: "maroon"}}>{this.state.errors.forPrices !== null ? this.state.errors.forPrices: null}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    addingPurchasesSwitch: state.purchasesReducer.addingPurchasesSwitch,
    currentWeek: state.weekReducer.currentWeek,
    currentDayForPurchases: state.dayReducer.currentDayForPurchases
})

const mapDispatchToProps = (dispatch) => ({
    addedPurchase: (textInput, priceInput, day, week) => {
        dispatch(addingPurchase(textInput, priceInput, day, week))
    },
    togglingPurchasesSwitch: () => {
        dispatch({type: ADDING_PURCHASES_SWITCH})
    },
    togglingPurchasesSwitchDisable: () => {
        dispatch({type: ADDING_PURCHASES_SWITCH_DISABLE})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRows);
