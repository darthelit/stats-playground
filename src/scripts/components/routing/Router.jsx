import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default ({routes}) => {
    return (
        <BrowserRouter>
            {routes()}
        </BrowserRouter>
    )
}

