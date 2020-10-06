import { EMiscActionType } from 'constants/constants';

// isLoading method
export default (bool: boolean = true) => ({
	type: EMiscActionType.LOADING,
	payload: bool
});
