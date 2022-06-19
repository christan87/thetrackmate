import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './SearchBarExpand2.css';



export default function SearchBarExpand2(props){
    let style = {};
    if(props.component==="tickets"){
        style = {
            marginRight:"1rem"
        }
    }
    
    return(
        <div className="search-box-ind" style={style}>
            <input type="text" className="search-text-ind" placeholder='Search...' onChange={props.handleChange} />
            <SearchIcon className="search-btn-ind" aria-label="Search"/>
        </div>
    )
}