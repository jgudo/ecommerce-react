import { addProduct } from '../actions/productActions';
import itemReducer from './reducer';

test('Should add new item', () => {
  const newItem = {
    item: 'gago',
    price: 3,
    dateAdded: 0
  };

  const testState = {
    items: [],
    basket: [],
    filters: {
      name: '',
      created: 0 
    }
  };

  const action = addProduct('gago', 3, 0);
  const state = itemReducer(testState, action);
  expect(state.items[0]).toEqual(newItem); 
});
