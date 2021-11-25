import React, { useEffect, useState } from 'react';
import { useGetSearchPhotosQuery } from '../../services/pexels';
import './layout.scss';

const Header = ({ language, setLanguage, executeScroll }) => {
	const [imageShow, setImageShow] = useState(0);
	const { data } = useGetSearchPhotosQuery({
		count: 5,
		query: 'nature',
		orientation: 'landscape',
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (imageShow >= 4) {
				setImageShow(0);
			} else {
				setImageShow(imageShow + 1);
			}
		}, 8000);
		return () => clearInterval(interval);
	});

	return (
		<header
			className="header"
			style={{ backgroundImage: `url(${data?.photos[imageShow].src.large})` }}
		>
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
