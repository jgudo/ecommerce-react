import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } from '../constants/constants';
import img1 from '../../../static/salt-image-1.png';
import img2 from '../../../static/salt-image-7.png';
import img3 from '../../../static/salt-image-10.png';

const initState = [
  {
    id: 'kjh459-ekhw34-rdfr',
    name: 'Gago',
    description: 'Magang payong',
    price: 400,
    brand: 'Salt Maalat',
    keywords: ['maga', 'payong'],
    image: img1,
    maxQuantity: 10,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'lj98sdf-sdf3876s-df3gd56',
    name: 'Drawer',
    description: 'Magang drawer',
    price: 1200,
    brand: 'Betsin Maalat',
    keywords: ['drawer', 'gag'],
    image: img2,
    maxQuantity: 5,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'ljghkyiuy-sdf3876s-df3gd56',
    name: 'Kulangot',
    description: 'Masarap na kulangot',
    price: 50.45,
    brand: 'Salt Maalat',
    keywords: ['kulangot', 'masarap'],
    image: img3,
    maxQuantity: 2,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'lkjd8uy6-sdf3876s-df3gd56',
    name: 'Takla',
    description: 'Masarap na takla',
    price: 250.12,
    brand: 'Salt Maalat',
    keywords: ['takla', 'salamin', 'black'],
    image: img1,
    maxQuantity: 8,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'hgje56-46dg2g-gs35',
    name: 'Mukha Mo',
    description: 'Wala lang',
    price: 253,
    brand: 'Betsin Maalat',
    keywords: ['mukha', 'salamin'],
    image: img2,
    maxQuantity: 10,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'gh56-shf45s-gdfg35',
    name: 'Tabo',
    description: 'Magaling na tabo',
    price: 523.54,
    brand: 'Salt Maalat',
    keywords: ['tabo', 'malinaw'],
    image: img1,
    maxQuantity: 12,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'gnjyi5-dfg3rq-dg35',
    name: 'Kibal',
    description: 'Masarap na kibal',
    price: 122.24,
    brand: 'Salt Maalat',
    keywords: ['kibal'],
    image: img3,
    maxQuantity: 2,
    quantity: 1,
    dateAdded: new Date().getTime()
  }, {
    id: 'dfghj634-sdkj23-dfgkj387',
    name: 'Lapot',
    description: 'Masarap na takla',
    price: 95.24,
    brand: 'Salt Maalat',
    keywords: ['lapot'],
    image: img1,
    maxQuantity: 8,
    quantity: 1,
    dateAdded: new Date().getTime()
  }
];

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.payload);
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.id === action.payload.id) {
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
