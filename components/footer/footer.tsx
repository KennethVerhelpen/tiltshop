export const Footer = () => {
	return (
		<footer className={'py-64 bg-primary-900'}>
			<div className={'container-md layout-row layout-align-center-center'}>
				<div className={'layout-column layout-align-start-center text-center'}>
					<p className={'strong h4 serif text-primary-100'}>tilt.</p>
					<p className={'p mt-8 lh-1 text-primary-500'}>
						TiltShop gathers the best items for movies, tv shows and video games lovers.
					</p>
					<p className={'small mb-32 text-primary-500'}>
						Every item is hand-picked from Amazon catalogue and sorted out just for you.
					</p>
					<p className={'small lh-1 text-primary-700'}>Tiltshop.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com.</p>
				</div>
			</div>
		</footer>
	);
}