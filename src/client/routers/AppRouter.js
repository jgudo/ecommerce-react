import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ClientRoute from './ClientRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

import * as ROUTES from '../constants/routes';

// components
import Dashboard from '../components/admin/dashboard/Dashboard'; // Dashboard
import DashboardProducts from '../components/admin/products/Products'; // Dashboard
import DashboardUsers from '../components/admin/users/Users'; // Dashboard
import EditProduct from '../components/product/EditProduct';
import AddProduct from '../components/product/AddProduct'; // AddProduct
import ProductSearch from '../components/product/ProductSearch'; // AddProduct
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import UserProfile from '../components/user/UserProfile';
import Home from '../components/pages/Home';
import CheckOut from '../components/checkout/CheckOut';
import ScrollToTop from '../components/ui/ScrollToTop';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <Switch>
        <PublicRoute 
            component={ScrollToTop(Home)} 
            exact
            path={ROUTES.HOME} 
        />
        <Route 
            component={ProductSearch} 
            exact
            path={ROUTES.SEARCH} 
        />
        <AdminRoute 
            component={ScrollToTop(Dashboard)} 
            exact
            path={ROUTES.DASHBOARD} 
        />
        <AdminRoute 
            component={ScrollToTop(DashboardProducts)} 
            path={ROUTES.DASHBOARD_PRODUCTS} 
        />
        <AdminRoute 
            component={ScrollToTop(DashboardUsers)} 
            path={ROUTES.DASHBOARD_USERS} 
        />
        <AdminRoute 
            component={ScrollToTop(AddProduct)} 
            path={ROUTES.ADD_PRODUCT} 
        />
        <AdminRoute 
            component={ScrollToTop(EditProduct)} 
            path={ROUTES.EDIT_PRODUCT} 
        />
        <PublicRoute 
            component={ScrollToTop(SignUp)} 
            path={ROUTES.SIGNUP} 
        />
        <PublicRoute 
            component={ScrollToTop(SignIn)} 
            path={ROUTES.SIGNIN} 
        />
        <ClientRoute 
            component={ScrollToTop(UserProfile)} 
            path={ROUTES.PROFILE} 
        />
        <ClientRoute 
            component={ScrollToTop(CheckOut)} 
            path={ROUTES.CHECKOUT} 
        />
      </Switch>
    </>
  </Router>
);

export default AppRouter;
