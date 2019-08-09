import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ClientRoute from './ClientRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

// components
import Dashboard from '../components/admin/dashboard/Dashboard'; // Dashboard
import DashboardProducts from '../components/admin/dashboard/products/Products'; // Dashboard
import DashboardUsers from '../components/admin/dashboard/users/Users'; // Dashboard
import EditProduct from '../components/product/EditProduct';
import AddProduct from '../components/product/AddProduct'; // AddProduct
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import UserProfile from '../components/user/UserProfile';
import Home from '../components/shop/Home';
import CheckOut from '../components/payment/CheckOut';

const AppRouter = () => (
    <BrowserRouter>
        <>
            <Switch>
                <PublicRoute path="/" component={Home} exact/>
                <AdminRoute path="/dashboard" component={Dashboard} exact/>
                <AdminRoute path="/dashboard/products" component={DashboardProducts} />
                <AdminRoute path="/dashboard/users" component={DashboardUsers} />
                <AdminRoute path="/dashboard/add" component={AddProduct} />
                <AdminRoute path="/edit/:id" component={EditProduct} />
                <PublicRoute path="/signup" component={SignUp} />
                <PublicRoute path="/signin" component={SignIn} />
                <ClientRoute path="/profile" component={UserProfile} />
                <ClientRoute path="/checkout" component={CheckOut} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRouter;
