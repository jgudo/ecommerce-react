/* eslint-disable no-nested-ternary */
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Boundary } from 'components/common';
import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from 'constants/routes';
import { Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setShippingDetails } from 'redux/actions/checkoutActions';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import ShippingForm from './ShippingForm';
import ShippingTotal from './ShippingTotal';

const FormSchema = Yup.object().shape({
	fullname: Yup.string()
		.required('Full name is required.')
		.min(2, 'Full name must be at least 2 characters long.')
		.max(60, 'Full name must only be less than 60 characters.'),
	email: Yup.string()
		.email('Email is not valid.')
		.required('Email is required.'),
	address: Yup.string()
		.required('Shipping address is required.'),
	mobile: Yup.object()
		.shape({
			country: Yup.string(),
			countryCode: Yup.string(),
			dialCode: Yup.string().required('Mobile number is required'),
			value: Yup.string().required('Mobile number is required')
		})
		.required('Mobile number is required.'),
	isInternational: Yup.boolean(),
	isDone: Yup.boolean()
});

const ShippingDetails = ({ profile, shipping, subtotal }) => {
	useDocumentTitle('Check Out Step 2 | Salinaka');
	useScrollTop();
	const dispatch = useDispatch();
	const history = useHistory();

	const initFormikValues = {
		fullname: shipping.fullname || '',
		email: shipping.email || '',
		address: shipping.address || '',
		mobile: shipping.mobile || {},
		isInternational: shipping.isInternational || false,
		isDone: shipping.isDone || false
	}

	const onSubmitForm = (form, action) => {
		dispatch(setShippingDetails({
			fullname: form.fullname,
			email: form.email,
			address: form.address,
			mobile: form.mobile,
			isInternational: form.isInternational,
			isDone: true
		}));
		history.push(CHECKOUT_STEP_3);
	}

	return (
		<Boundary>
			<div className="checkout">
				<StepTracker current={2} />
				<div className="checkout-step-2">
					<h3 className="text-center">Shipping Details</h3>
					<Formik
						initialValues={initFormikValues}
						validateOnChange
						validationSchema={FormSchema}
						onSubmit={onSubmitForm}
					>
						{({ values, isValid }) => (
							<Form>
								<ShippingForm />
								<br />
								{/*  ---- TOTAL --------- */}
								<ShippingTotal subtotal={subtotal} />
								<br />
								{/*  ----- NEXT/PREV BUTTONS --------- */}
								<div className="checkout-shipping-action">
									<button
										className="button button-muted"
										onClick={() => history.push(CHECKOUT_STEP_1)}
										type="button"
									>
										<ArrowLeftOutlined />
										&nbsp;
										Go Back
									</button>
									<button
										className="button button-icon"
										disabled={!isValid}
										type="submit"
									>
										Next Step
										&nbsp;
										<ArrowRightOutlined />
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Boundary>
	);
};

export default withCheckout(ShippingDetails);
