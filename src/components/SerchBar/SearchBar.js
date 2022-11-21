import React from 'react';
import './SearchBar.css';
import { BsChevronDown } from "react-icons/bs";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleMasterCheckBoxChange = this.handleMasterCheckBoxChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleMasterCheckBoxChange(e) {
        this.props.onMasterCheckBoxChange(e.target.checked);
    }

    render() {
        return (
            <div className="search-bar-container">
                <BsChevronDown className='icon'></BsChevronDown>
                <input type='checkbox' className='master-checkbox' onChange={this.handleMasterCheckBoxChange} checked={this.props.onMasterChecked}></input>
                <input className='search-bar' type='textbox' placeholder='Search...' onChange={this.handleFilterTextChange}></input>
            </div>
        )
    }
}