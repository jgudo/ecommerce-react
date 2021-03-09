/* eslint-disable no-nested-ternary */
import { Boundary } from 'components/common';
import { CustomInput, CustomMobileInput } from 'components/formik';
import { CHECKOUT_STEP_1 } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setShippingDetails } from 'redux/actions/checkoutActions';
import * as Yup from 'yup';
import { Pagination, StepTracker } from '../components';
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

	const saveShippingDetails = () => {
		const isChanged = true; // TODO save only if changed

		if (isChanged) {
			dispatch(setShippingDetails({
				fullname: field.fullname.value,
				email: field.email.value,
				address: field.address.value,
				mobile: field.mobile,
				isInternational: field.isInternational,
				isDone: true
			}));
		}
	};

	const onClickNext = (isValid) => {
		if (isValid) {
			// saveShippingDetails();
			// history.push(CHECKOUT_STEP_3);
		}
	};

	const initFormikValues = {
		fullname: '',
		email: '',
		address: '',
		mobile: {},
		isInternational: false,
		isDone: false
	}

	const onSubmitForm = (values, action) => {
		console.log(values);
		console.log(action);
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
												<CustomMobileInput
													name="mobile"
												/>
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
																// checked={field.value}
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
								<Pagination
									disabledNext={!isValid}
									history={history}
									onClickNext={() => onClickNext(isValid)}
									onClickPrevious={() => history.push(CHECKOUT_STEP_1)}

								/>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</Boundary>
	);
};

export default withAuth(ShippingDetails);
