import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
// import AdminRoute from './AdminRoute';

import * as ROUTES from '../constants/routes';

// Admin components
// to be added on next update

// import Dashboard from '../views/admin/dashboard/Dashboard'; 
// import DashboardProducts from '../views/admin/products/Products'; 
// import DashboardUsers from '../views/admin/users/Users'; 
// import EditProduct from '../views/admin/products/EditProduct';
// import AddProduct from '../views/admin/products/AddProduct'; 

import ProductSearch from '../components/product/ProductSearch'; 
import SignUp from '../views/auth/SignUp';
import SignIn from '../views/auth/SignIn';
import ForgotPassword from '../views/auth/ForgotPassword';
import UserAccount from '../views/account/UserAccount';
import EditAccount from '../views/account/EditAccount';
import Home from '../views/home/Home';
import CheckOutStep1 from '../views/checkout/step1/OrderSummary';
import CheckOutStep2 from '../views/checkout/step2/ShippingDetails';
import CheckOutStep3 from '../views/checkout/step3/Payment';
import PageNotFound from '../views/404/PageNotFound';
import ScrollToTop from '../components/ui/ScrollToTop';
import Preloader from '../components/ui/Preloader';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={<Preloader />}>
      <Switch>
        <Route 
            component={ProductSearch} 
            exact
            path={ROUTES.SEARCH} 
        />
        <PublicRoute 
            component={ScrollToTop(Home)} 
            exact
            path={ROUTES.HOME} 
        />
        <PublicRoute 
            component={ScrollToTop(SignUp)} 
            path={ROUTES.SIGNUP} 
        />
        <PublicRoute 
            component={ScrollToTop(SignIn)} 
            path={ROUTES.SIGNIN} 
        />
        <PublicRoute 
            component={ScrollToTop(ForgotPassword)} 
            path={ROUTES.FORGOT_PASSWORD} 
        />
        <ClientRoute 
            component={ScrollToTop(UserAccount)} 
            exact
            path={ROUTES.ACCOUNT} 
        />
        <ClientRoute 
            component={ScrollToTop(EditAccount)} 
            exact
            path={ROUTES.ACCOUNT_EDIT} 
        />
        <ClientRoute 
            component={ScrollToTop(CheckOutStep1)} 
            path={ROUTES.CHECKOUT_STEP_1} 
        />
        <ClientRoute 
            component={ScrollToTop(CheckOutStep2)} 
            path={ROUTES.CHECKOUT_STEP_2} 
        />
        <ClientRoute 
            component={ScrollToTop(CheckOutStep3)} 
            path={ROUTES.CHECKOUT_STEP_3} 
        />
        <PublicRoute component={ScrollToTop(PageNotFound)} />
         {/* <AdminRoute 
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
        /> */}
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
