/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

<<<<<<< HEAD:src/views/checkout/step2/index.tsx
import { Route } from 'constants/routes';
=======
import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from 'constants/routes';
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/views/checkout/step2/index.js
import { setShippingDetails } from 'redux/actions/checkoutActions';
import useDocumentTitle from 'hooks/useDocumentTitle';
import withAuth from '../hoc/withAuth';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import ShippingForm from './ShippingForm';
import ShippingTotal from './ShippingTotal';
import { RouteComponentProps } from 'react-router';
import { IShippingInfo, IUser } from 'types/types';

interface IProps extends RouteComponentProps {
	profile: IUser | any;
	shipping: IShippingInfo;
	subtotal: number;
}
const ShippingDetails: React.FC<IProps> = ({
	profile,
	shipping,
	subtotal,
	history
}) => {
	useDocumentTitle('Check Out Step 2 | Salinaka');
	const [field, setField] = useState({
		fullname: { value: profile.fullname ? profile.fullname : '' },
		email: { value: profile.email ? profile.email : '' },
		address: { value: shipping.address ? shipping.address : profile.address ? profile.address : '' },
		mobile: profile.mobile.value ? profile.mobile : shipping.mobile ? shipping.mobile : {
			value: '',
			data: {}
		},
		isInternational: !!shipping.isInternational ? shipping.isInternational : false,
		isDone: false
	});
	const dispatch = useDispatch();
	const noError = Object.keys(field).every((key) => {
		if (typeof field[key] === 'object') {
			// eslint-disable-next-line no-extra-boolean-cast
			return !!field[key].value && !!!field[key].error;
			// eslint-disable-next-line no-else-return
		} else {
			return true;
		}
	});

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

	const onClickNext = () => {
		if (noError) {
			saveShippingDetails();
			history.push(Route.CHECKOUT_STEP_3);
		}
	};

	return (
		<div className="checkout">
			<StepTracker current={2} />
			<div className="checkout-step-2">
				<h3 className="text-center">
					Shipping Details
				</h3>
				<ShippingForm
					field={field}
					profile={profile}
					setField={setField}
				/>
				<br />
				<ShippingTotal subtotal={subtotal} field={field} />
				<br />
				<Pagination
					disabledNext={!noError}
					onClickNext={onClickNext}
					onClickPrevious={() => history.push(Route.CHECKOUT_STEP_1)}

				/>
			</div>
		</div>
	);
};

export default withAuth(ShippingDetails);
