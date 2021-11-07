import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { Global, css } from '@emotion/react'

import { algoliaSearchClient } from '../../pages/api/algolia';
import * as S from './search-autocomplete.styles';

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

  return <div ref={containerRef} />;
}

export const SearchAutocomplete = () => {
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
            width: 36rem;
          }
          .aa-InputWrapperSuffix {
            min-height: 4.5rem;
          }
          .aa-Form {
            border-radius: 0.75rem;
            border: 0;
            outline: none;
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
          
        `}
      />
      <Autocomplete
        open={true}
        openOnFocus={true}
        // debug={true}
        placeholder={'e.g. Harry Potter, Stranger Things, Headphones...'}
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
                  <div className="aa-ItemWrapper">
                    <div className="aa-ItemContent">
                      <div className="aa-ItemContentBody">
                        <div className="aa-ItemContentTitle">
                          <components.Snippet hit={item} attribute="name" />
                        </div>
                        <div className="aa-ItemContentDescription">
                          <components.Snippet hit={item} attribute="description" />
                        </div>
                      </div>
                    </div>
                    <div className="aa-ItemActions">
                      <button
                        className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                        type="button"
                        title="Select"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                        </svg>
                      </button>
                    </div>
                  </div>
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