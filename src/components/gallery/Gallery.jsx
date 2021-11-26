import React, { useEffect, useState } from 'react';
import { useGetSearchPhotosQuery } from '../../services/pexels';
import './galleryStyles.scss';

//icons
import { MdOutlineSearch } from 'react-icons/md';
import Loader from '../loaders/Loader';

const Gallery = ({ language, seeGallery }) => {
	const [modelOpen, setModelOpen] = useState(false);
	const [modelPhoto, setModelPhoto] = useState(null);
	const [isDisabled, setIsDisabled] = useState(false);
	const [displayData, setDisplayData] = useState([]);
	const [portrait, setPortrait] = useState();
	const [landscape, setLandscape] = useState();
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('natureza');

	let count = 20;

	if (window.innerWidth > 750) count = 30;
	if (window.innerWidth > 1200) count = 40;

	const { data: portraitData, isFetching: portraitIsFetching } = useGetSearchPhotosQuery({
		query: query,
		page: page,
		count: count / 2,
		orientation: 'portrait',
	});
	const { data: landscapeData, isFetching: landscapeIsFetching } =
		useGetSearchPhotosQuery({
			query: query,
			page: page,
			count: count / 2,
			orientation: 'landscape',
		});

	function shuffle(array) {
		let returnArray = [];
		for (let i = 0; i < array.length / 2; i++) {
			returnArray.push(array[i]);
			returnArray.push(array[array.length - 1 - i]);
		}
		return returnArray;
	}

	useEffect(() => {
		if (!landscapeData || !portraitData) return;

		const newPortrait = portraitData.photos;
		const newLandscape = landscapeData.photos;

		//check is is not seding the data two times
		if (newPortrait === portrait || newLandscape === landscape) return;

		setLandscape(newLandscape);
		setPortrait(newPortrait);

		const newPhotos = [...newPortrait, ...newLandscape];

		const reordered = shuffle(newPhotos);

		setDisplayData((prev) => [...prev, ...reordered]);

		if (!portraitData.next_page || !landscapeData.next_page) {
			setIsDisabled(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [landscapeData, portraitData]);

	const loadMore = () => {
		if (!portraitData.next_page || !landscapeData.next_page) {
			setIsDisabled(true);
			return;
		}
		setPage(page + 1);
	};

	const openModel = (photo) => {
		setModelOpen(true);
		setModelPhoto(photo);
	};

	const closeModel = () => {
		setModelOpen(false);
		setModelPhoto(null);
	};

	//search
	const handleSearch = (e) => {
		e.preventDefault();

		setQuery(search);
		setDisplayData([]);
		setPage(0);
		loadMore();
		setSearch('');
		if (portraitData.next_page && landscapeData.next_page) setIsDisabled(false);
	};

	return (
		<main className="gallery-container" ref={seeGallery}>
			<form onSubmit={(e) => handleSearch(e)} className="search">
				<input
					id="search"
					placeholder={
						language === 'portuguese' ? 'Procurar por fotos' : 'Search for Photos'
					}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit">
					<MdOutlineSearch size={25} />
				</button>
			</form>
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
				{(portraitIsFetching || landscapeIsFetching) && <Loader />}
				{displayData &&
					displayData.map((photo, index) => {
						return (
							<div
								className={
									photo.height / photo.width < 1
										? 'photo-container wide-photo'
										: 'photo-container'
								}
								key={index}
								onClick={() => openModel(photo)}
							>
								<img
									className="photo"
									src={photo.src.large}
									alt={`by ${photo.photographer}`}
								/>
							</div>
						);
					})}
			</div>

			{!isDisabled && (
				<div className="controls">
					<button onClick={() => loadMore()}>
						{language === 'portuguese' ? 'Mostrar Mais' : 'Show More'}
					</button>
				</div>
			)}
		</main>
	);
};

export default Gallery;
