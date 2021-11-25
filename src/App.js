import React, { useRef, useState } from 'react';
import Gallery from './components/gallery/Gallery';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
	const [language, setLanguage] = useState('portuguese');

	const seeGallery = useRef();

	const executeScroll = () => seeGallery?.current.scrollIntoView();

	return (
		<div className="app">
			<Header
				language={language}
				setLanguage={setLanguage}
				executeScroll={executeScroll}
			/>
			<Gallery language={language} seeGallery={seeGallery} />

			<Footer language={language} />
		</div>
	);
}

export default App;
