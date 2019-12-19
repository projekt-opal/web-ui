import React from 'react';
import CSS from './footer.css';

const footer = () => (
    <div className={CSS["footer-fixed"]}>
        <div style={{margin: '10px'}}>OPen data portAL (OPAL)</div>
        <div style={{margin: '10px'}}><a href="https://github.com/projekt-opal">Source codes</a></div>
        <div style={{flexGrow: 1}}/>
        <div style={{margin: '10px'}}><span>&copy;</span><a href="https://dice-research.org">DICE</a></div>
    </div>
);

export default footer;