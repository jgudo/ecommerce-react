/* eslint-disable no-nested-ternary */
import { Boundary } from 'components/common';
import { CustomInput, CustomMobileInput } from 'components/formik';
import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setShippingDetails } from 'redux/actions/checkoutActions';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withAuth from '../hoc/withAuth';
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
					<h3 className="text-center">
						Shipping Details
				</h3>
					<Formik
						initialValues={initFormikValues}
						validateOnChange
						validationSchema={FormSchema}
						onSubmit={onSubmitForm}
					>
						{({ values, isValid }) => (
							<Form>
								<div className="checkout-shipping-wrapper">
									<div className="checkout-shipping-form">
										<div className="checkout-fieldset">
											<div className="d-block checkout-field">
												<Field
													name="fullname"
													type="text"
													label="* Full Name"
													placeholder="Enter your full name"
													component={CustomInput}
													style={{ textTransform: 'capitalize' }}
												/>
											</div>
											<div className="d-block checkout-field">
												<Field
													name="email"
													type="email"
													label="* Email Address"
													placeholder="Enter your email address"
													component={CustomInput}
												/>
											</div>
										</div>
										<div className="checkout-fieldset">
											<div className="d-block checkout-field">
												<Field
													name="address"
													type="text"
													label="* Shipping Address"
													placeholder="Enter full shipping address"
													component={CustomInput}
												/>
											</div>
											<div className="d-block checkout-field">
												<CustomMobileInput name="mobile" defaultValue={values.mobile} />
											</div>
										</div>
										<div className="checkout-fieldset">
											<Field name="isInternational">
												{({ field, form, meta }) => (
													<div className="checkout-field">
														{meta.touched && meta.error ? (
															<span className="label-input label-error">{meta.error}</span>
														) : (
															<label className="label-input" htmlFor={field.name}>Shipping Option</label>
														)}
														<div className="checkout-checkbox-field">
															<input
																checked={field.value}
																id={field.name}
																onChange={(e) => {
																	form.setValues({ ...form.values, [field.name]: e.target.checked });
																}}
																value={meta.value}
																type="checkbox"
															/>
															<label className="d-flex w-100" htmlFor={field.name}>
																<h5 className="d-flex-grow-1 margin-0">
																	&nbsp; International Shipping &nbsp;
																<span className="text-subtle">7-14 days</span>
																</h5>
																<h4 className="margin-0">$50.00</h4>
															</label>
														</div>
													</div>
												)}
											</Field>
										</div>
									</div>
								</div>
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
										Go Back
									</button>
									<button
										className="button"
										disabled={!isValid}
										type="submit"
									>
										Next Step
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

export default withAuth(ShippingDetails);
