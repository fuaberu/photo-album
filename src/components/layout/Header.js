import React, { useEffect, useState } from 'react';

import background1 from '../../images/pexels-background-1.jpg';
import background2 from '../../images/pexels-background-2.jpg';
import background3 from '../../images/pexels-background-3.jpg';
import background4 from '../../images/pexels-background-4.jpg';
import background5 from '../../images/pexels-background-5.jpg';

import './layout.scss';

const Header = ({ language, setLanguage, executeScroll }) => {
	const [imageShow, setImageShow] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			if (imageShow >= 5) {
				setImageShow(1);
			} else {
				setImageShow(imageShow + 1);
			}
		}, 8000);
		return () => clearInterval(interval);
	});

	return (
		<header className="header">
			<img
				src={background1}
				alt="background"
				className={imageShow === 1 ? 'absoluteImage' : 'absoluteImage hidden'}
			/>
			<img
				src={background2}
				alt="background"
				className={imageShow === 2 ? 'absoluteImage' : 'absoluteImage hidden'}
			/>
			<img
				src={background3}
				alt="background"
				className={imageShow === 3 ? 'absoluteImage' : 'absoluteImage hidden'}
			/>
			<img
				src={background4}
				alt="background"
				className={imageShow === 4 ? 'absoluteImage' : 'absoluteImage hidden'}
			/>
			<img
				src={background5}
				alt="background"
				className={imageShow === 5 ? 'absoluteImage' : 'absoluteImage hidden'}
			/>
			<h1>{language === 'portuguese' ? 'Álbum de Fotos' : 'Album Gallery'}</h1>

			<select name="select" onChange={(e) => setLanguage(e.target.value)}>
				<option value="portuguese">
					{language === 'portuguese' ? 'Português' : 'Portuguese'}
				</option>
				<option value="english">
					{language === 'portuguese' ? 'Inglês' : 'English'}
				</option>
			</select>
			<button onClick={() => executeScroll()}>
				{language === 'portuguese' ? 'Veja a galeria' : 'see gallery'}
			</button>
		</header>
	);
};

export default Header;
