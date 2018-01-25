import React, {Component} from 'react';
import axios from '../../axios-order';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.values(ingredients).reduce((acc, curr) => {
            return acc += curr
        }, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        let newIngredients = {...this.state.ingredients};
        newIngredients[type] += 1;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseHandler(newIngredients);
    };

    removeIngredientHandler = (type) => {
        let newIngredients = {...this.state.ingredients};
        let newPrice = this.state.totalPrice;

        if (newIngredients[type] > 0){
            newIngredients[type] -= 1;
            newPrice -= INGREDIENT_PRICES[type];
        }

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseHandler(newIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinuedHandler = () => {
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'moi moi',
                address: { 
                    street: 'Street 1',
                    zipcode: '33300',
                    country: 'France'
                },
                email: 'test@test.com'
            },
            deliveryMode: 'fastest'
        };

        axios.post('/orders.json', order)
            .then((result) => this.setState({loading: false}))
            .catch((error) => this.setState({loading: false}));
    };

    render(){

        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let summary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinued={this.purchaseContinuedHandler}
            purchaseCancelled={this.purchaseCancelledHandler}
            price={this.state.totalPrice} />;

        if(this.state.loading){
            summary = <Spinner />;
        }

        return(
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler.bind(this)}>
                    {summary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler.bind(this)}/>
            </React.Fragment>

        )
    }
}

export default BurgerBuilder;