import React from 'react';
import './spinner.scss';

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader-child"></div>
			<div className="loader-child"></div>
			<div className="loader-child"></div>
		</div>
	);
};

export default Loader;
