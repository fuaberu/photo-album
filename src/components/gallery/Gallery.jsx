import React, { useEffect, useRef, useState } from 'react';
import { useGetSearchPhotosQuery } from '../../services/pexels';
import './galleryStyles.scss';

//icons
import { MdOutlineSearch } from 'react-icons/md';
import Spinner from '../Spinner';

const Gallery = ({ language, seeGallery }) => {
	const [modelOpen, setModelOpen] = useState(false);
	const [modelPhoto, setModelPhoto] = useState(null);
	const [displayData, setDisplayData] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('natureza');

	const { data, isFetching } = useGetSearchPhotosQuery({
		query: query,
		page: page,
		count: 30,
	});

	const fullGrid = useRef(0);

	const currentWidth = window.innerWidth;
	let remainder = 2;
	if (currentWidth > 750) remainder = 3;
	if (currentWidth > 1200) remainder = 4;

	useEffect(() => {
		if (!data) return;
		const newData = data.photos;
		newData.forEach((photo) => {
			const ratio = photo.height / photo.width < 1 ? 2 : 1;
			if ((fullGrid.current + ratio) % remainder === 0) {
				//completes grid
				setDisplayData((prev) => [...prev, photo]);
				fullGrid.current += ratio;
			} else if (fullGrid.current <= page * 6 * remainder) {
				setDisplayData((prev) => [...prev, photo]);
				fullGrid.current += ratio;
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const loadMore = () => {
		if (!data.next_page) return;
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
				{isFetching && <Spinner />}
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
			<div className="controls">
				<button onClick={() => loadMore()}>Load More</button>
			</div>
		</main>
	);
};

export default Gallery;
