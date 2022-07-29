import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './SearchBarExpand.css';

export default function SearchBarExpand(props){
    return(
        <div className={`${props.component !== "tickets"?"search-box":"search-box2"}`}>
            <input type="text" className="search-text" placeholder='Search...' onChange={props.handleChange} />
            <SearchIcon className="search-btn" aria-label="Search"/>
            {/* <IconButton className="search-btn" color="secondary" aria-label="Search">
                <SearchIcon />
            </IconButton> */}
        </div>
    )
}