import { LOADING } from 'constants/constants';

// isLoading method
export default (bool = true) => ({
	type: LOADING,
	payload: bool
});
