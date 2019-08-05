import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

// components
import Dashboard from '../components/dashboard/Dashboard'; // Dashboard
import AddProduct from '../components/product/AddProduct'; // AddProduct
import SignUp from '../components/signup/SignUp';
import EditProduct from '../components/product/EditProduct';
import UserProfile from '../components/user/UserProfile';
import Home from '../components/shop/Home';

const AppRouter = () => (
    <BrowserRouter>
        <>
            <Switch>
                <PrivateRoute path="/" component={Home} exact/>
                <AdminRoute path="/dashboard" component={Dashboard} />
                <AdminRoute path="/newitem" component={AddProduct} />
                <AdminRoute path="/edititem/:id" component={EditProduct} />
                <PublicRoute path="/signup" component={SignUp} />
                <PrivateRoute path="/profile" component={UserProfile} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRouter;
