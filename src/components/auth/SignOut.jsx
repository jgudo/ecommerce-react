import { useDispatch } from 'react-redux';
import { signOut } from 'redux/actions/authActions';

const SignOut = (props) => {
	const dispatch = useDispatch();

	const onSignOut = () => {
		dispatch(signOut());
	};

	return props.children({ onSignOut });
};

export default SignOut;
