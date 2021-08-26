import React from 'react';

const StepUserName = ({ onNext }) => {
    return (
        <>
            <div>username component</div>
            <button onClick={onNext}>Next</button>
        </>
    );
};

export default StepUserName;