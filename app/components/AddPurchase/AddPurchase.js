import React, { Component } from 'react'
import { connect } from "react-redux";

import styles from "./AddPurchase.css";

import { addingPurchase } from "./../../actions/purchases";

class AddPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemInput: "",
            newPriceInput: ""
        }

        this.priceInput = React.createRef();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.addingPurchase(this.state.newItemInput, this.state.newPriceInput, 
            this.props.currentDay, this.props.currentWeek);
        this.setState({
            newItemInput: "",
            newPriceInput: ""
        })
    }

    render() {
        return (
            <div className={styles.mainContainer}>
                 <form className={styles.formContainer} onSubmit={this.handleFormSubmit}>
                    <label><i className="fas fa-plus"></i>
                        <input value={this.state.newItemInput} placeholder="Item" onChange={(event) => {
                            this.setState({
                                newItemInput: event.target.value
                            })
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.priceInput.current.focus();
                            }
                        }} required></input>
                    </label>
                    <label><i className="fas fa-dollar-sign"></i>
                        <input value={this.state.newPriceInput} placeholder="Price" ref={this.priceInput} onChange={(event) => {
                            this.setState({
                                newPriceInput: event.target.value
                            })
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.handleFormSubmit(event);
                            }
                        }} required></input>
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
