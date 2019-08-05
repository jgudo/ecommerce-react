import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } from '../constants/constants';
import img1 from '../../../static/salt-image-1.png';
import img2 from '../../../static/salt-image-7.png';
import img3 from '../../../static/salt-image-10.png';

const initState = [
  {
    productId: 'kjh459-ekhw34-rdfr',
    productName: 'Gago',
    productDescription: 'Magang payong',
    productPrice: 400,
    productBrand: 'Salt Maalat',
    productImage: img1,
    dateAdded: new Date().getTime()
  }, {
    productId: 'lj98sdf-sdf3876s-df3gd56',
    productName: 'Drawer',
    productDescription: 'Magang drawer',
    productPrice: 1200,
    productBrand: 'Salt Maalat',
    productImage: img2,
    dateAdded: new Date().getTime()
  }, {
    productId: 'ljghkyiuy-sdf3876s-df3gd56',
    productName: 'Kulangot',
    productDescription: 'Masarap na kulangot',
    productPrice: 50,
    productBrand: 'Salt Maalat',
    productImage: img3,
    dateAdded: new Date().getTime()
  }, {
    productId: 'lkjd8uy6-sdf3876s-df3gd56',
    productName: 'Takla',
    productDescription: 'Masarap na takla',
    productPrice: 250,
    productBrand: 'Salt Maalat',
    productImage: img1,
    dateAdded: new Date().getTime()
  }
];

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case REMOVE_PRODUCT:
      return state.filter(product => product.productId !== action.payload);
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.productId === action.payload.productId) {
          return {
            ...product,
            ...action.payload
          };
        }
        return product;
      });
    default:
      return state;
  }
};
