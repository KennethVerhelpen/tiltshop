class Footer extends React.Component {
	render = () => {
		return (
			<footer className="py-64">
				<div className="container-md layout-row layout-align-center-center">
					<div className="layout-column layout-align-start-center text-center">
						<p className="strong h4 serif">tilt.</p>
						<p className="p mt-8 lh-1">
							TiltShop is the best of Amazon, curated by movies, tv shows and video games lovers.
						</p>
						<p className="small mb-32" style={{ opacity: 0.5 }}>
							Every item is hand-picked from Amazon catalogue and sorted out just
							for you.
						</p>
					</div>
				</div>
			</footer>
		);
	};
}

export {Footer};