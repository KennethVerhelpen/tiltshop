import React, { useState, useEffect, useRef, Fragment, createRef } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { ThemeType, TopicType, TypeType } from '../../lib/types';
import { Header, SearchAutocomplete, Topic } from '../../components';

export type HomeViewProps = {
  topics: TopicType[];
	types: TypeType[];
	theme: ThemeType;
}

export type BreakpointsType = {
	xs: boolean;
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
}

export type GridWidthType = {
	width: number
};

export type HeaderWrapperType = {
	width: number;
};

export type HeaderContentType = {
  opacity: number;
  blur: number;
	size: number;
	position: number;
}

export const HomeView = (props: HomeViewProps) => {
	const { topics, theme } = { ...props };

	// Hooks
	const [lastPageItemRef, lastPageItemInView ] = useInView();
	const [firstPageItemRef, firstPageItemInView] = useInView();

	// States
	const [markedIndex, setMarkedIndex] = useState<number>(null);
	const [gridItems, setGridItems] = useState<TopicType[]>(topics);
	
	const gridItemRefs = useRef<unknown>([...new Array(gridItems.length)].map(() => createRef<HTMLDivElement>()));

	const handleInViewRef = (index, prevIndex, items) => {
		if (index + 1 === items.length) {
			return lastPageItemRef
		} else if (index === prevIndex) {
			return firstPageItemRef
		} return null
	}

	useEffect(() => {
		// This useEffect adds and removes items from the grid.
		if (lastPageItemInView) {
			// We set the index of the item that will remove extra items when visible again (usually on scroll up) in the view.
			setMarkedIndex(gridItems.length - topics.length);
			// By default, the grid only contains the default list of topics.
			// Once the last item of the list enters the view, the default list of topics is added again after the initial list.
			// This fakes an infinite list of items in the view.
			setGridItems(prevGridItems => {
				return [...prevGridItems, ...topics];
			})
		}
		// To avoid overcharging the DOM, items are removed from the grid when one of the item is back in the view.
		// This item index is changing everytime the list is altered.
		if (firstPageItemInView && !lastPageItemInView) {
			// If the markedIndex is greater than 0, we can safely remove extra items 
			// as the the markedIndex will always be a multiple of the topics length.
			if (markedIndex > 0) {
				setMarkedIndex(prevMarkedIndex => {
					return prevMarkedIndex - topics.length;
				});
			}
			// If the markedIndex is equal to 0, this means we are on top of the page
			// so we return null, otherwise we'll get negative numbers.
			else setMarkedIndex(null);
			setGridItems(prevGridItems => {
				return [...prevGridItems.slice(0, prevGridItems.length - topics.length)];
			})
		}
	}, [lastPageItemInView, firstPageItemInView])
	
  return (
		<main className={'p-0 layout-column layout-align-center-start overflow-hidden'}>
			<header key={'header'} className={'container-lg py-128'}>
				<Header theme={theme} rotation={true}/>
			</header>
			<main className={'layout-row layout-wrap layout-align-center-center flex-gt-xs-none'}>
				{gridItems.map((topic, index) => {
					return (
						// As the topics are duplicated indefinitely and to avoid conflicts, the index is combined to the id to generate the key.
						<div
							key={topic.id + index}
							ref={gridItemRefs.current[index]}
							className={clsx(
								{'cascade fade-in-bottom speed-5' : (index <= topics.length - 1)},
								'p-8 layout-column layout-align-center-center'
							)}
						>
							<div ref={handleInViewRef(index, markedIndex, gridItems)} >
								<Topic
									className={'flex layout-column layout-align-center-center'}
									topic={topic}
									index={index}
								/>
							</div>
						</div>
					)
				})}
			</main>
		</main>
  )
}