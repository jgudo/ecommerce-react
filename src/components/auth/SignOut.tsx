import { useDispatch } from 'react-redux';
import { signOut } from 'redux/actions/authActions';

const SignOut = ({ children }) => {
	const dispatch = useDispatch();

	const onSignOut = () => {
		dispatch(signOut());
	};

	return children && children({ onSignOut });
};

export default SignOut;
