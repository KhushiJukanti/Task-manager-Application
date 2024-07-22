import React from 'react';
import '../App.css';

function Search({onSearch}) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };
    return (
        <div className='container mt-3'>
            <nav className="container navbar bg-body-tertiary" style={{ width: '155vh' }}>
                <div className="nav">
                    <form className="d-flex" role="search">
                        <label className="form-label" htmlFor="search-input">Search:</label>
                        <input id="search-input" className="form-control" placeholder="Type to search..." onChange={handleSearchChange}/>
                    </form>
                </div>
                <div className="d-flex align-items-center ms-3">
                    <label className="form-label me-2">SortBy:</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Recent</option>
                        <option value="1">Oldest</option>

                    </select>
                </div>
            </nav>
        </div>
    );
}

export default Search;
