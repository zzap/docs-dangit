import React from "react";
import useSWR from "swr";

const SearchResults = (props) => {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    // fetch data
    const { data, error } = useSWR(
        "https://developer.wordpress.org/wp-json/wp/v2/comments",
        fetcher
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return(
        <div className="results-wrap">
            <h2>Search results for: {props?.query}</h2>
            
            { data && data?.length > 0 && props?.query && props?.query.length > 2 &&
                <>
                    {console.log( data )}
                    {data.map( ( item, i ) => {
                        return (
                            <div key={i}>
                                <div dangerouslySetInnerHTML={{__html: item?.content?.rendered}} />
                            </div>
                        )
                    })}
                </>
            }

        </div>
    );
}

export default SearchResults;