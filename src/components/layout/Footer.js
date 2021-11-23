import React from 'react';
import './layout.scss';

const Footer = ({ language }) => {
	return (
		<footer className="footer">
			<p>
				Copyright @{new Date().getFullYear()} |{' '}
				{language === 'portuguese' ? 'Desenvolvido por' : 'Designed by'}{' '}
				<a
					href="https://www.linkedin.com/in/kevin-fabel/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Kevin Fabel
				</a>
			</p>
			<a href="https://github.com/fuaberu" target="_blank" rel="noopener noreferrer">
				Github
			</a>
		</footer>
	);
};

export default Footer;
