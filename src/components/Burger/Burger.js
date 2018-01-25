import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingr => {
        return [...Array(props.ingredients[ingr])].map((_, i) => {
            return <BurgerIngredient key={ingr + i} type={ingr} />;
        });
    }).reduce((arr, curr) => {
        return arr.concat(curr);
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
};

export default burger;