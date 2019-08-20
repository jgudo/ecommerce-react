import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '../ui/CircularProgress';

const withLoader = (propName, msg) => (Component) => props => {
  const { prop, isLoading } = useSelector(state => ({
    prop: state[propName],
    isLoading: state.app.loading
  }));

  return prop.length === 0 && isLoading ? (
    <div className="loader">
      <h5>{msg}</h5>
      <CircularProgress visible={true} theme="dark"/>
    </div> 
  ) : (
    <Component { ...props } />
  )
};

export default withLoader;
