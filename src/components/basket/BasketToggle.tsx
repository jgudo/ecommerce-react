const BasketToggle = (props) => {
	const onClickToggle = () => {
		if (document.body.classList.contains('is-basket-open')) {
			document.body.classList.remove('is-basket-open');
		} else {
			document.body.classList.add('is-basket-open');
		}
	};

	document.addEventListener('click', (e: MouseEvent) => {
		const closest = (e.target as HTMLDivElement).closest('.basket');
		const toggle = (e.target as HTMLButtonElement).closest('.basket-toggle');
		const closeToggle = (e.target as HTMLButtonElement).closest('.basket-item-remove');

		if (!closest && document.body.classList.contains('is-basket-open') && !toggle && !closeToggle) {
			document.body.classList.remove('is-basket-open');
		}
	});

	return props.children({ onClickToggle });
};

export default BasketToggle;
