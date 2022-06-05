import React, { useState, useEffect, useRef, Fragment, createRef } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { ThemeType, TopicType, TypeType } from '../../lib/types';
import { useWindowSize, useMediaQueries } from '../../hooks';
import { Header, SearchAutocomplete, Topic } from '../../components';

import * as S from './home.view.styles';

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
	const { topics, types, theme } = { ...props };

	// Hooks
	const { width } = useWindowSize();
	const { media } = useMediaQueries();
	const [lastPageItemRef, lastPageItemInView ] = useInView();
	const [firstPageItemRef, firstPageItemInView] = useInView();

	// States
	const [markedIndex, setMarkedIndex] = useState<number>(null);
	const [gridItems, setGridItems] = useState<TopicType[]>(topics);
	const [defaultGridRows, setDefaultGridRows] = useState<number>(null);
	const [gridItemWidth, setGridItemWidth] = useState<number>(null);
	const [headerIndex, setHeaderIndex] = useState<number>(0);
	const [headerWidth, setHeaderWidth] = useState<HeaderWrapperType['width']>(null);
	const [gridWidth, setGridWidth] = useState<GridWidthType['width']>(null);
	const [sideItemsNumber, setSideItemsNumber] = useState<number>(null);
	const [breakpoints, setBreakpoints] = useState<BreakpointsType>({
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null
	})
	const [headerParams, setHeaderParams] = useState<HeaderContentType>({
		opacity: 1,
		blur: 0,
		size: 1,
		position: 0
	});
	
	const gridItemRefs = useRef<unknown>([...new Array(gridItems.length)].map(() => createRef<HTMLDivElement>()));
	const headerWrapper = useRef<HTMLDivElement>();

	const handleGridLayout = (breakpoints: BreakpointsType) => {
		// The header is considered as an item of the grid and is rendered conditionnaly in the items mapping.
		// Therefor, knowing that the window and grid width can change, its position in the list has to be adjusted using the index.
		// Furthemore, depending of the window width, the grid width will adjust.
		// Furthemore, depending of the window/grid width, the header width will adjust.
		if (breakpoints.xs) {
			setHeaderIndex(0);
			setHeaderWidth(null);
			setGridWidth(null);
		}
		if (breakpoints.md || breakpoints.sm || breakpoints.lg) {
			setHeaderIndex(4);
			setHeaderWidth(84);
			setGridWidth(84);
		}
		if (breakpoints.xl) {
			setHeaderIndex(7);
			setHeaderWidth(84);
			setGridWidth(126);
		}
	}

	const handleHeaderVisibility = () => {
		if (headerWrapper) {
			const limit = headerWrapper?.current?.getBoundingClientRect()?.height;
			if (window.scrollY < limit) {
				setHeaderParams({
					opacity: 1 - window.scrollY/limit,
					blur: 30 * (window.scrollY/limit),
					size: 1 - (window.scrollY/limit)/10,
					position: 100 * (window.scrollY/limit)
				});
			} else {
				setHeaderParams({
					opacity: 0,
					blur: 30 * (window.scrollY/limit),
					size: 0,
					position: null
				});
			};
		}
	}

	const handleSideItemsNumber = (items) => {
		const gridItemsLength = items.length
		// To get the exact number of items we need to render on the side columns of the grid,
		// we need to know the number of rows that will render in the middle grid.
		// To do so, we have to:
		// - Divide the width of the full grid by the width of one grid item so we get the number of items per row.
		// - Divide the total number of items in the grid by the number of items per row to get the number of rows.
		setDefaultGridRows(Math.round(topics.length / (gridWidth/gridItemWidth)))
		setSideItemsNumber(Math.round(gridItemsLength / (gridWidth/gridItemWidth)));
	}

	const handleInViewRef = (index, prevIndex, items) => {
		if (index + 1 === items.length) {
			return lastPageItemRef
		} else if (index === prevIndex) {
			return firstPageItemRef
		} return null
	}

	const handleBreakpoints = (width: number) => {
		setBreakpoints({
			xs: width <= 600,
			sm: width > 600 && width <= 960,
			md: width > 960 && width <= 1280,
			lg: width > 1280 && width <= 2048,
			xl: width > 2048
		})
	}
 
	useEffect(() => {
		// With the width value (window width) we get from the useWindowWidth hook, we set the breakpoint values.
		handleBreakpoints(width);
	}, [width]);

	useEffect(() => {
		// Once the breakpoints values are computed and/or changed, the layout of the grid adjusts accordingly.
		handleGridLayout(breakpoints);
	}, [breakpoints]);

	useEffect(() => {
		// When the gridWidth value is computed and/or changed, the side items number can be computed.
		handleSideItemsNumber(gridItems);
	}, [gridWidth, gridItems]);

	useEffect(() => {
		// Getting the width of a single grid item in px and dividing it by 16 to get corresponding value in rem.
		// This width will be used to count the number of rows in the grid and to generate sufficient side column items.
		setGridItemWidth((gridItemRefs.current[0]?.current?.getBoundingClientRect()?.width) / 16);
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleHeaderVisibility, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleHeaderVisibility);
		}
	}, [headerParams])

	useEffect(() => {
		// This useEffect adds and removes items from the grid.
		if (lastPageItemInView) {
			// We set the index of the item that will remove extra items when visible again (usually on scroll up) in the view.
			setMarkedIndex(gridItems.length - topics.length);
			// By default, the grid only contains the default list of topics.
			// Once the last item of the list enters the view, the default list of topics is added again on top of the initial list.
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
    <>
			<S.Fading className={'p-0 layout-column layout-gt-xs-row layout-align-center-center layout-align-gt-xs-center-start overflow-hidden'}>
				{!media.xs &&
					<div className={'layout-column layout-align-start-start flex-none pt-32 hide-xs'}>
						{gridItems.slice(0, sideItemsNumber).map((topic, index) => {
							const currentType = types?.find((type: TypeType) => type.id === topic.typeId);
							return (
								<div key={topic.id} className={clsx({'cascade fade-in-bottom speed-5' : (index <= defaultGridRows - 1)}, 'p-8 layout-column layout-align-center-center')}>
									<Topic className={'flex layout-column layout-align-center-center'} topic={topic} index={index} />
								</div>
							)}
						)}
					</div>
				}
				<S.MiddleGrid width={gridWidth} className={'layout-column layout-gt-xs-row layout-wrap layout-align-center-center flex-gt-xs-none'}>
					{gridItems.map((topic, index) => {
						return (
							// As the topics are duplicated indefinitely and to avoid conflicts, the index is combined to the id to generate the key.
							<Fragment key={topic.id + index}>
								{(index === headerIndex) &&
									<S.HeaderWrapper ref={headerWrapper} key={'header'} width={headerWidth} className={'layout-column layout-align-center-center container-sm'}>
										<S.HeaderContent position={headerParams.position} size={headerParams.size} blur={headerParams.blur} opacity={headerParams.opacity} className={clsx({'fixed' : !media.xs}, 'layout-column layout-align-center-center')}>
											<Header align={media.xs ? 'left' : 'center'} theme={theme} rotation={true} className={'mb-48 mt-xs-48'}/>
											<SearchAutocomplete/>
										</S.HeaderContent>
									</S.HeaderWrapper>
								}
								<div ref={gridItemRefs.current[index]} className={clsx({'cascade fade-in-bottom speed-5' : (index <= topics.length - 1)}, 'p-8 layout-column layout-align-center-center')}>
									<div ref={handleInViewRef(index, markedIndex, gridItems)} className={'shadow-5-primary-900'}>
										<Topic className={'flex layout-column layout-align-center-center'} topic={topic} index={index} />
									</div>
								</div>
							</Fragment>
						)
					})}
				</S.MiddleGrid>
				{!media.xs &&
					<div className={'layout-column layout-align-start-start flex-none pt-128 hide-xs'}>
						{gridItems.slice(0, sideItemsNumber).map((topic, index) => {
							return (
								<div key={topic.id} className={clsx({'cascade fade-in-bottom speed-5' : (index <= defaultGridRows - 1)}, 'p-8 layout-column layout-align-center-center')}>
									<Topic className={'flex layout-column layout-align-center-center'} topic={topic} index={index} />
								</div>
							)
						})}
					</div>
				}
			</S.Fading>
    </>
  )
}