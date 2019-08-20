import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ClientRoute from './ClientRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

import * as ROUTES from '../constants/routes';

// components
import Dashboard from '../components/admin/dashboard/Dashboard'; // Dashboard
import DashboardProducts from '../components/admin/dashboard/products/Products'; // Dashboard
import DashboardUsers from '../components/admin/dashboard/users/Users'; // Dashboard
import EditProduct from '../components/product/EditProduct';
import AddProduct from '../components/product/AddProduct'; // AddProduct
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import UserProfile from '../components/user/UserProfile';
import Home from '../components/store/Home';
import CheckOut from '../components/payment/CheckOut';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <Switch>
        <PublicRoute 
            component={Home} 
            exact
            path={ROUTES.HOME} 
        />
        <AdminRoute 
            component={Dashboard} 
            exact
            path={ROUTES.DASHBOARD} 
        />
        <AdminRoute 
            component={DashboardProducts} 
            path={ROUTES.DASHBOARD_PRODUCTS} 
        />
        <AdminRoute 
            component={DashboardUsers} 
            path={ROUTES.DASHBOARD_USERS} 
        />
        <AdminRoute 
            component={AddProduct} 
            path={ROUTES.ADD_PRODUCT} 
        />
        <AdminRoute 
            component={EditProduct} 
            path={ROUTES.EDIT_PRODUCT} 
        />
        <PublicRoute 
            component={SignUp} 
            path={ROUTES.SIGNUP} 
        />
        <PublicRoute 
            component={SignIn} 
            path={ROUTES.SIGNIN} 
        />
        <ClientRoute 
            component={UserProfile} 
            path={ROUTES.PROFILE} 
        />
        <ClientRoute 
            component={CheckOut} 
            path={ROUTES.CHECKOUT} 
        />
      </Switch>
    </>
  </Router>
);

export default AppRouter;
