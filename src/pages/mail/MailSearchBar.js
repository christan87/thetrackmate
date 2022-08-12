import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './MailSearchBar.css'

export default function MailSearchBar(props){
    
    return(
        <div className="mail-search-box">
            <input type="text" className="mail-search-text-ind" placeholder='Search...' onChange={props.handleChange} />
            <SearchIcon className="mail-search-btn" aria-label="Search" onClick={props.handleSearch}/>
        </div>
    )
}