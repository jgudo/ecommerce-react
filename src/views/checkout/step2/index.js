import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import withAuth from '../hoc/withAuth';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import ShippingForm from './ShippingForm';
import ShippingTotal from './ShippingTotal';

import { setShippingDetails } from 'actions/checkoutActions';

const ShippingDetails = ({ profile, shipping, subtotal, history }) => {
  const [field, setField] = useState({
    fullname: { value: profile.fullname ? profile.fullname : '' },
    email: { value: profile.email ? profile.email : '' },
    address: { value: shipping.address ? shipping.address : profile.address ? profile.address : ''},
    mobile: profile.mobile.value ? profile.mobile : shipping.mobile ? shipping.mobile : {
      value: '',
      data: {}
    },
    isInternational: !!shipping.isInternational ? shipping.isInternational : false,
    isDone: shipping.isDone ? shipping.isDone : false
  });
  const dispatch = useDispatch();
  const noError = Object.keys(field).every((key) => {
    if (typeof field[key] === 'object') {
      return !!field[key].value && !!!field[key].error
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
        isDone: field.isDone
      }));
    }     
  };

  const onClickNext = () => {
    if (noError) {
      saveShippingDetails();
      history.push('/checkout/step3');
    }
  };

  return (
    <div className="checkout">
      <StepTracker current={2}/>
      <div className="checkout-step-2">
        <h3 className="text-center">
          Shipping Details
        </h3>
        <ShippingForm 
            profile={profile}
            shipping={shipping}
            subtotal={subtotal}
            history={history}
            field={field}
            setField={setField}
        />
        <br/>
        <ShippingTotal subtotal={subtotal} field={field} />
        <br/>
        <Pagination 
            history={history}
            onClickPrevious={() => history.push('/checkout/step1')}
            disabledNext={!noError}
            onClickNext={onClickNext}

        />
      </div>
    </div>
  );
};

export default withAuth(ShippingDetails);
