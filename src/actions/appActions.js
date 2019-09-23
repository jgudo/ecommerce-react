import { LOADING } from 'constants/constants';

export const isLoading = (bool = true) => ({
  type: LOADING,
  payload: bool
});
