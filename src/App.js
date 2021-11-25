import React, { useState } from 'react';
import Gallery from './components/gallery/Gallery';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
	const [language, setLanguage] = useState('portuguese');

	return (
		<div className="app">
			<Header language={language} setLanguage={setLanguage} />
			<Gallery language={language} />
			<Footer language={language} />
		</div>
	);
}

export default App;
