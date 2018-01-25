import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>; 
    });

    return (
        <React.Fragment>
            <h1>Your order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    )
};

export default orderSummary;