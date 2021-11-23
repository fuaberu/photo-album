import React, { useRef, useState } from 'react';
import Gallery from './components/gallery/Gallery';
import { useGetCuratedPhotosQuery } from './services/pexels';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
	const [language, setLanguage] = useState('portuguese');
	const { data } = useGetCuratedPhotosQuery(30);

	const seeGallery = useRef();

	const executeScroll = () => seeGallery?.current.scrollIntoView();

	console.log(data);
	return (
		<div className="app">
			<Header
				language={language}
				setLanguage={setLanguage}
				executeScroll={executeScroll}
			/>
			<Gallery data={data} language={language} seeGallery={seeGallery} />
			<Footer language={language} />
		</div>
	);
}

export default App;
