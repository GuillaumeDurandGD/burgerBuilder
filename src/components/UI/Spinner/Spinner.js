import React from 'react';

import classes from './Spinner.css';

const spinner = () => {
    return <div className={classes.skFoldingCube}>
        <div className={[classes.skCube1, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube2, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube4, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube3, classes.skCube].join(" ")}></div>
    </div>;
};

export default spinner;