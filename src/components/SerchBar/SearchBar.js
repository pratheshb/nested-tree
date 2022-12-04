import { MdKeyboardArrowDown } from "react-icons/md";
import './SearchBar.css';

export default function SearchBar({
    isMasterChecked,
    onFilterTextChange,
    onMasterCheckBoxChange,
    isList2,
    onToggleList
}) {
    function handleTextChange(e) {
        onFilterTextChange(e.target.value);
    }

    function handleSelectionChange(e) {
        onMasterCheckBoxChange(e.target.checked);
    }

    function handleToggle() {
        onToggleList(!isList2);
    }
    return (
        <div className="search-bar-container">
            <MdKeyboardArrowDown/>
            <input type='checkbox' className='master-checkbox' onChange={handleSelectionChange} checked={isMasterChecked} />
            <input className='search-bar' type='textbox' placeholder='Search...' onChange={handleTextChange} />
            <button className='toggle-list-btn' onClick={handleToggle}>Toggle List</button>
        </div>
    );
}