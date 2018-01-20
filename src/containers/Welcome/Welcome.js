import React from 'react';
import './Welcome.css';
import Background from '../../assets/images/beerbkg.jpg';

const welcome = (props) => (

    <div className="Welcome">
        {props.children}
    </div>

);

export default welcome;