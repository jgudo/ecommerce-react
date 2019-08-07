import React from 'react';

const BasketToggle = (props) => {
  document.addEventListener('click', () => {

    // document.body.classList.remove('basket-open');
    // console.log(document.activeElement);
  });

  const onClickToggle = (e) => {
    e.preventDefault(); 
    
    if (document.body.classList.contains('basket-open')) {
      document.body.classList.remove('basket-open');
    } else {
      document.body.classList.add('basket-open');
    }
  };

  return props.children({ onClickToggle });
};

export default BasketToggle;
