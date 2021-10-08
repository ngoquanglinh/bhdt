import React from 'react'

function Search() {
    return (
        <div id="search" className="search-modal">
        <button type="button" className="close">×</button>
        <form>
            <input type="search" placeholder="type keyword(s) here" />
            <button type="submit" className="btn btn-lg btn-green">Search</button>
        </form>
    </div>
    )
}

export default Search
