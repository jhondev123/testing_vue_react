import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Cashier from '../pages/Cashier/Cashier';

const RouteApp: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cashier" element={<Cashier />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default RouteApp;
