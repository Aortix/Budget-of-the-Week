import React, { Component } from 'react'
import { connect } from "react-redux";

import styles from "./AddPurchase.css";

import { addingPurchase } from "./../../actions/purchases";

import { validateStringsForItems, validateStringsForPrices } from "./../../validation/validation";

class AddPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemInput: "",
            newPriceInput: "",
            errors: {
                forItems: null,
                forPrices: null
            }
        }

        this.priceInput = React.createRef();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (validateStringsForItems(this.state.newItemInput) === true 
        && validateStringsForPrices(this.state.newPriceInput) === true) {
            this.props.addingPurchase(this.state.newItemInput, this.state.newPriceInput, 
                this.props.currentDay, this.props.currentWeek);
            this.setState({
                newItemInput: "",
                newPriceInput: "",
                errors: {
                    forItems: null,
                    forPrices: null
                }
            })
        } else {
            this.setState({
                errors: {
                    forItems: validateStringsForItems(this.state.newItemInput),
                    forPrices: validateStringsForPrices(this.state.newPriceInput)
                }
            })
        }
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                 <form className={styles.formContainer} onSubmit={this.handleFormSubmit}>
                    <label><i className="fas fa-plus"></i>
                        <div style={{display: "inline-flex", flexDirection: "column"}}>
                        {this.state.errors.forItems !== null && this.state.errors.forItems !== true ? <p className={styles.errorItems}>{this.state.errors.forItems}</p> : null}
                        <input value={this.state.newItemInput} placeholder="Item" onChange={(event) => {
                            this.setState({
                                newItemInput: event.target.value
                            })
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.priceInput.current.focus();
                            }
                        }}
                        onFocus={() => {
                            this.setState({
                                errors: {
                                    ...this.state.errors,
                                    forItems: null
                                }
                            })
                        }} required></input>
                        </div>
                    </label>
                    <label><i className="fas fa-dollar-sign"></i>
                        <div style={{display: "inline-flex", flexDirection: "column"}}>
                        {this.state.errors.forPrices !== null && this.state.errors.forPrices !== true ? <p className={styles.errorPrices}>{this.state.errors.forPrices}</p> : null}
                        <input value={this.state.newPriceInput} placeholder="Price" ref={this.priceInput} onChange={(event) => {
                            this.setState({
                                newPriceInput: event.target.value
                            })
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.handleFormSubmit(event);
                            }
                        }}
                        onFocus={() => {
                            this.setState({
                                errors: {
                                    ...this.state.errors,
                                    forPrices: null
                                }
                            })
                        }} required></input>
                        </div>
                    </label>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentDay: state.dayReducer.currentDay,
    currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = (dispatch) => ({
    addingPurchase: (itemInput, priceInput, day, week) => {
        dispatch(addingPurchase(itemInput, priceInput, day, week));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchase)
