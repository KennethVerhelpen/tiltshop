import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { Global, css } from '@emotion/react'

import { useWindowSize } from '../../hooks';
import { algoliaSearchClient } from '../../pages/api/algolia';
import { BREAKPOINTS, COLORS } from '../../styles/design-system/variables';

export function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className="autocomplete-wrapper"/>;
}

export const SearchAutocomplete = () => {
  const { width: windowWidth } = useWindowSize();
  const [ width, setWidth ] = useState(windowWidth);

  useEffect(() => {
    setWidth(windowWidth);
  }, [windowWidth])
  
  return (
    <>
      <Global
        styles={css`
          :root {
            --aa-selected-color-rgb: 179,173,214;
            --aa-selected-color-alpha: 0.2;
          }
          .aa-Autocomplete {
            border: none;
            max-width: 36rem;
            width: 100%;
            @media only screen and (min-width: ${BREAKPOINTS.xs}) {
              min-width: 36rem;
            }
          }
          .aa-InputWrapperSuffix {
            min-height: 4.5rem;
          }
          .aa-Form, .aa-Form:focus-within {
            border-radius: 0.75rem !important;
            border: 0 !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          .aa-Panel {
            z-index: 1;
          }
          .aa-Panel--scrollable {
            padding: 0;
          }
          .aa-Item {
            padding: 0 1rem;
          }
          .aa-SubmitIcon {
            display: none;
          }
          .aa-InputWrapperPrefix,
          .aa-InputWrapperSuffix {
            height: auto;
            padding: 0 1rem;
          }
          .aa-ClearIcon {
            color: ${COLORS.PRIMARY_500} !important; 
          }
          .aa-Input::placeholder {
            color: ${COLORS.PRIMARY_500};
          }
          .aa-SubmitButton {
            width: auto;
            padding: 0.5rem;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 2rem;
            height: 2rem;
            display: flex;
            border-radius: 2rem;
            background-color: ${COLORS.PRIMARY_300};
            color: ${COLORS.PRIMARY_500} !important;
          }
          .aa-SubmitButton:before { 
            opacity: 0.5;
            content: 'search';
            font-size: 1.25rem;
            font-family: 'Material Icons Two Tone';
          }
          .aa-DetachedSearchButton {
            background: white;
            border: none;
            border-radius: 0.5rem;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-height: 3.25rem;
            display: flex;
            color: black;
          }
          .aa-DetachedSearchButtonIcon {
            display: none;
          }
          .autocomplete-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      />
      <Autocomplete
        open={true}
        openOnFocus={true}
        placeholder={width <= 680 ? 'Browse products' : 'e.g. Harry Potter, Stranger Things, Headphones...' }
        getSources={({ query }) => [ 
          {
            sourceId: 'topics',
            getItems() {
              return getAlgoliaResults({
                searchClient: algoliaSearchClient,
                queries: [
                  {
                    indexName: 'tiltshop-topics',
                    query,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <a href={`/${item.typeSlug}/${item.slug}`} className="aa-ItemLink">
                    <div className="aa-ItemContent">
                      <div className="aa-ItemTitle">
                        <components.Highlight hit={item} attribute="name" />
                      </div>
                    </div>
                  </a>
                )
              },
              noResults() {
                return 'No products for this query.';
              },
            },
          }    
        ]}
      />
    </>
  )
} 