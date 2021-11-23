import React, { useState } from 'react';
import './galleryStyles.scss';

const Gallery = ({ data, language, seeGallery }) => {
	const [modelOpen, setModelOpen] = useState(false);
	const [modelPhoto, setModelPhoto] = useState(null);

	const openModel = (photo) => {
		setModelOpen(true);
		setModelPhoto(photo);
	};
	const closeModel = () => {
		setModelOpen(false);
		setModelPhoto(null);
	};

	return (
		<main className="gallery-container" ref={seeGallery}>
			<input
				id="search"
				placeholder={
					language === 'portuguese' ? 'Procurar por fotos' : 'Search for Photos'
				}
				type="text"
			/>
			<div className="gallery">
				{modelPhoto && (
					<div
						onClick={() => closeModel()}
						className={modelOpen ? 'open model-view ' : 'model-view'}
					>
						<img
							className="model-photo"
							src={
								window.innerWidth > modelPhoto.width
									? modelPhoto.src.original
									: modelPhoto.src.large
							}
							alt={`by ${modelPhoto.photographer}`}
						/>
						<a href={modelPhoto.url} target="_blank" rel="noopener noreferrer">
							{language === 'english'
								? `Photo by ${modelPhoto.photographer}`
								: `Foto por ${modelPhoto.photographer}`}
						</a>
					</div>
				)}

				{data?.photos.map((photo, index) => {
					return (
						<div className="photo-container" key={index} onClick={() => openModel(photo)}>
							<img
								className="photo"
								src={photo.src.large}
								alt={`by ${photo.photographer}`}
							/>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Gallery;
