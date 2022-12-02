import { BsChevronDown } from "react-icons/bs";
import './SearchBar.css';

export default function SearchBar({
    isMasterChecked,
    onFilterTextChange,
    onMasterCheckBoxChange,
    isList2,
    onToggleList
}) {
    function onTextChange(e) {
        onFilterTextChange(e.target.value);
    }

    function onCheckBoxChange(e) {
        onMasterCheckBoxChange(e.target.checked);
    }

    function onToggle() {
        onToggleList(!isList2);
    }
    return (
        <div className="search-bar-container">
            <BsChevronDown className='icon' />
            <input type='checkbox' className='master-checkbox' onChange={onCheckBoxChange} checked={isMasterChecked} />
            <input className='search-bar' type='textbox' placeholder='Search...' onChange={onTextChange} />
            <button className='toggle-list-btn' onClick={onToggle}>Toggle List</button>
        </div>
    );
}