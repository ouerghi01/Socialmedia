
import React from 'react';
import 'primeicons/primeicons.css';

import { Menubar } from 'primereact/menubar';
export default function MainMenu(props) {
    

    return (
        <div className="card">
            <Menubar model={props.items}  style={{
                borderRadius: '10px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
                
            }}/>
        </div>
    )
}
        
        