import React from 'react';
import './SearchBar.css';
import { BsChevronDown } from "react-icons/bs";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.onFilterTextChange = this.onFilterTextChange.bind(this);
        this.onMasterCheckBoxChange = this.onMasterCheckBoxChange.bind(this);
        this.onToggleList = this.onToggleList.bind(this);
    }

    onFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    onMasterCheckBoxChange(e) {
        this.props.onMasterCheckBoxChange(e.target.checked);
    }

    onToggleList() {
        this.props.onToggleList(!this.props.isList2);
    }

    render() {
        return (
            <div className="search-bar-container">
                <BsChevronDown className='icon'/>
                <input type='checkbox' className='master-checkbox' onChange={this.onMasterCheckBoxChange} checked={this.props.isMasterChecked} />
                <input className='search-bar' type='textbox' placeholder='Search...' onChange={this.onFilterTextChange} />
                <button className='toggle-list-btn' onClick={this.onToggleList}>Toggle List</button>
            </div>
        );
    }
}