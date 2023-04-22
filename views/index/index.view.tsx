import React, { useState, useEffect, useRef, createRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { ThemeType, TopicType, TypeType } from "../../lib/types";
import { Topic } from "../../components/topic-new/topic";
import clsx from "clsx";

export type IndexViewProps = {
  topics: TopicType[];
  types: TypeType[];
  theme: ThemeType;
};

export type BreakpointsType = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};

export type GridWidthType = {
  width: number;
};

export type HeaderWrapperType = {
  width: number;
};

export type HeaderContentType = {
  opacity: number;
  blur: number;
  size: number;
  position: number;
};

export const IndexView = (props: IndexViewProps) => {
  const { topics, theme } = { ...props };

  // Hooks
  const [lastPageItemRef, lastPageItemInView] = useInView();
  const [firstPageItemRef, firstPageItemInView] = useInView();

  // States
  const [markedIndex, setMarkedIndex] = useState<number>(null);
  const [gridItems, setGridItems] = useState<TopicType[]>(topics);

  const gridItemRefs = useRef<unknown>(
    [...new Array(gridItems.length)].map(() => createRef<HTMLDivElement>())
  );

  const handleInViewRef = (index, prevIndex, items) => {
    if (index + 1 === items.length) {
      return lastPageItemRef;
    } else if (index === prevIndex) {
      return firstPageItemRef;
    }
    return null;
  };

  useEffect(() => {
    // This useEffect adds and removes items from the grid.
    if (lastPageItemInView) {
      // We set the index of the item that will remove extra items when visible again (usually on scroll up) in the view.
      setMarkedIndex(gridItems.length - topics.length);
      // By default, the grid only contains the default list of topics.
      // Once the last item of the list enters the view, the default list of topics is added again after the initial list.
      // This fakes an infinite list of items in the view.
      setGridItems((prevGridItems) => {
        return [...prevGridItems, ...topics];
      });
    }
    // To avoid overcharging the DOM, items are removed from the grid when one of the item is back in the view.
    // This item index is changing everytime the list is altered.
    if (firstPageItemInView && !lastPageItemInView) {
      // If the markedIndex is greater than 0, we can safely remove extra items
      // as the the markedIndex will always be a multiple of the topics length.
      if (markedIndex > 0) {
        setMarkedIndex((prevMarkedIndex) => {
          return prevMarkedIndex - topics.length;
        });
      }
      // If the markedIndex is equal to 0, this means we are on top of the page
      // so we return null, otherwise we'll get negative numbers.
      else setMarkedIndex(null);
      setGridItems((prevGridItems) => {
        return [
          ...prevGridItems.slice(0, prevGridItems.length - topics.length),
        ];
      });
    }
  }, [lastPageItemInView, firstPageItemInView]);

  return (
    <main
      className={"p-0 layout-column layout-align-center-start overflow-hidden"}
    >
      <div
        className="overflow-hidden relative
        after:content-[''] after:bg-[url('https://tiltshop-data.s3.us-east-2.amazonaws.com/images/textures/noise-dark.webp')] after:bg-[length:100px_100px] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:opacity-25

        before:content-[''] before:bg-[url('https://tiltshop-data.s3.us-east-2.amazonaws.com/images/textures/noise-dark.webp')] before:bg-[length:100px_100px] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:mix-blend-overlay"
      >
        <div className="to-slate-950 bg-gradient-to-b from-transparent from-75% absolute w-full h-full top-0 left-0 z-10" />
        <header className="fixed top-0 left-0 w-full">
          <nav className="mx-auto flex max-w-7xl items-center flex-row p-6 lg:px-8">
            <div className="flex flex-auto">
              <a href="#" className="hover:scale-105 transition-transform">
                <span
                  className="text-4xl font-cursive border-white text-white"
                  style={{
                    filter:
                      "drop-shadow(4px -2px 0px rgba(132, 97, 238, 0.6)) drop-shadow(-4px -3px 0px rgba(101, 49, 209, 0.4)) drop-shadow(3px 7px 0px rgba(84, 41, 175, 0.4))",
                  }}
                >
                  tilt.
                </span>
              </a>
            </div>
            <div className="flex-none">
              <ul className="list-none flex flex-row rounded-full ring-1 ring-violet-400/30 text-xs bg-slate-900 bg-opacity-80 backdrop-blur-sm px-4">
                <li className="font-medium text-white px-3 py-2 cursor-pointer">
                  <a href="">All</a>
                </li>
                <li className="text-violet-500/75 hover:text-white px-3 py-2 cursor-pointer transition-all">
                  <a href="">Movie</a>
                </li>
                <li className="text-violet-500/75 hover:text-white px-3 py-2 cursor-pointer transition-all">
                  <a href="">TV Show</a>
                </li>
                <li className="text-violet-500/75 hover:text-white px-3 py-2 cursor-pointer transition-all">
                  <a href="">Video Games</a>
                </li>
                <li className="text-violet-500/75 hover:text-white px-3 py-2 cursor-pointer transition-all">
                  <a href="">Electronics</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-auto" />
          </nav>
        </header>
        <main>
          <section className="text-center px-5 pt-10 pb-8 relative">
            <h1 className="text-8xl text-white font-black font-default text-center flex flex-col place-items-center">
              <span className="relative z-10 before:absolute before:z-20 before:content-['The_best_items_for'] before:bg-clip-text before:text-transparent before:bg-gradient-to-b before:from-transparent before:to-violet-900 before:left-0 before:top-0 from-65% after:bg-clip-text after:text-transparent after:bg-gradient-to-r after:from-teal-500 after:via-violet-500 after:to-rose-500 after:absolute after:top-0 after:left-0 after:content-['The_best_items_for'] after:z-10 text-slate-950">
                The best items for
              </span>
              <span
                className="text-white z-20 relative -mt-8"
                style={{
                  textShadow:
                    "0px -30px 26px rgba(3, 6, 22, 0.35), 0px -5px 32px rgba(3, 6, 22, 0.35)",
                }}
              >
                cinema lovers.
              </span>
            </h1>
            <p className="text-violet-400 text-lg z-10 relative mt-8">
              A list of great products hand-picked just for you.
            </p>
            <div
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0 blur-3xl bg-violet-500 rounded-full w-[18rem] h-[18rem]
          before:content-[''] before:left-[-9rem] before:top-[9rem] before:absolute before:blur-3xl before:bg-teal-500 before:rounded-full before:w-[18rem] before:h-[18rem]
          after:content-[''] after:left-[9rem] after:top-[9rem] after:absolute after:blur-3xl after:bg-rose-500/75 after:rounded-full after:w-[18rem] after:h-[18rem]"
            />
          </section>
        </main>
      </div>
      <section
        className={
          "flex flex-row flex-wrap justify-center container mx-auto relative z-50 max-w-5xl"
        }
      >
        {gridItems.map((topic, index) => {
          return (
            // As the topics are duplicated indefinitely and to avoid conflicts, the index is combined to the id to generate the key.
            <div
              key={`${topic.name}-${topic.id}-${index}`}
              ref={gridItemRefs.current[index]}
              className={"p-2 flex flex-col align-center basis-1/3"}
            >
              <div ref={handleInViewRef(index, markedIndex, gridItems)}>
                <Topic topic={topic} index={index} />
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};
