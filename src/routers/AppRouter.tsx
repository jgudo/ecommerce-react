import { Route as ROUTES } from 'constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router, Switch } from 'react-router-dom';
import EditAccount from 'views/account/edit_account';
import UserAccount from 'views/account/user_account';
import AddProduct from 'views/admin/add_product';
import Dashboard from 'views/admin/dashboard';
import EditProduct from 'views/admin/edit_product';
import Products from 'views/admin/products';
import ForgotPassword from 'views/auth/forgot_password';
import SignIn from 'views/auth/signin';
import SignUp from 'views/auth/signup';
import CheckOutStep1 from 'views/checkout/step1';
import CheckOutStep2 from 'views/checkout/step2';
import CheckOutStep3 from 'views/checkout/step3';
import PageNotFound from 'views/error/PageNotFound';
import FeaturedProducts from 'views/featured';
import Home from 'views/home';
import RecommendedProducts from 'views/recommended';
import Search from 'views/search';
import Shop from 'views/shop';
import ViewProduct from 'views/view_product';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<PublicRoute
				component={Search}
				exact
				path={ROUTES.SEARCH}
			/>
			<PublicRoute
				component={Home}
				exact
				path={ROUTES.HOME}
			/>
			<PublicRoute
				component={Shop}
				exact
				path={ROUTES.SHOP}
			/>
			<PublicRoute
				component={FeaturedProducts}
				exact
				path={ROUTES.FEATURED_PRODUCTS}
			/>
			<PublicRoute
				component={RecommendedProducts}
				exact
				path={ROUTES.RECOMMENDED_PRODUCTS}
			/>
			<PublicRoute
				component={SignUp}
				path={ROUTES.SIGNUP}
			/>
			<PublicRoute
				component={SignIn}
				exact
				path={ROUTES.SIGNIN}
			/>
			<PublicRoute
				component={ForgotPassword}
				path={ROUTES.FORGOT_PASSWORD}
			/>
			<PublicRoute
				component={ViewProduct}
				path={ROUTES.VIEW_PRODUCT}
			/>
			<ClientRoute
				component={UserAccount}
				exact
				path={ROUTES.ACCOUNT}
			/>
			<ClientRoute
				component={EditAccount}
				exact
				path={ROUTES.ACCOUNT_EDIT}
			/>
			<ClientRoute
				component={CheckOutStep1}
				path={ROUTES.CHECKOUT_STEP_1}
			/>
			<ClientRoute
				component={CheckOutStep2}
				path={ROUTES.CHECKOUT_STEP_2}
			/>
			<ClientRoute
				component={CheckOutStep3}
				path={ROUTES.CHECKOUT_STEP_3}
			/>
			<AdminRoute
				component={Dashboard}
				exact
				path={ROUTES.ADMIN_DASHBOARD}
			/>
			<AdminRoute
				component={Products}
				path={ROUTES.ADMIN_PRODUCTS}
			/>
			<AdminRoute
				component={AddProduct}
				path={ROUTES.ADD_PRODUCT}
			/>
			<AdminRoute
				component={EditProduct}
				path={`${ROUTES.EDIT_PRODUCT}/:id`}
			/>
			<PublicRoute component={PageNotFound} />
		</Switch>
	</Router>
);

export default AppRouter;
