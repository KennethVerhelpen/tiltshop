import clsx from "clsx";
import { ThemeType } from "../../lib/types";
import { Logo } from "../logo/logo";

export type FooterProps = {
	theme: ThemeType;
}

export const Footer = (props: FooterProps) => {
	const { theme } = props;

	return (
		<footer className={clsx(theme === 'dark' ? 'bg-primary-900': 'bg-neutral-100' , 'py-64')}>
			<div className={'container-md layout-row layout-align-center-center'}>
				<div className={'layout-column layout-align-start-center text-center'}>
					<Logo theme={theme} className={'h1'}/>
					<p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'p mt-8 lh-1')}>
						<b>tilt.</b> gathers the best items for movies, tv shows and video games lovers.
					</p>
					<p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'small mb-32')}>
						Every item is hand-picked from Amazon catalogue and sorted out just for you.
					</p>
					<p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'small lh-1')}><b>tilt.</b> is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com.</p>
				</div>
			</div>
		</footer>
	);
}