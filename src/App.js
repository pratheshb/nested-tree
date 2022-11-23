import React from 'react';
import './App.css';
import SearchBar from './components/SerchBar/SearchBar';
import TreeWrapper from './components/TreeWrapper/TreeWrapper';
import { list } from './utils/utils'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: list,
      filterText: '',
      isMasterChecked: false,
      isMasterToggled: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMasterCheckBoxChange = this.handleMasterCheckBoxChange.bind(this);
    this.handleChildSelect = this.handleChildSelect.bind(this);
    this.handleChildDelete = this.handleChildDelete.bind(this);
    this.handleChildEdit = this.handleChildEdit.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
      isMasterToggled: false,
    });
  }

  handleMasterCheckBoxChange(isMasterChecked) {
    this.setState({
      isMasterChecked,
      isMasterToggled: true
    });
  }

  handleChildSelect(list) {
    this.setState({
      list,
      isMasterChecked: list.every(child => child.checked),
      isMasterToggled: false
    });
  }

  handleChildDelete(list) {
    const existingList = list.filter(child => !child.deleted)
    this.setState({
      list,
      isMasterChecked: existingList.length > 0 && existingList.every(child => child.checked),
      isMasterToggled: false
    });
  }

  handleChildEdit(list) {
    this.setState({
      list,
      isMasterToggled: false
    });
  }

  handleReorder(list) {
    this.setState({
      list,
      isMasterToggled: false
    });
  }
  

  render() {
    return (
      <div className="container">
        <SearchBar
          isMasterChecked={this.state.isMasterChecked}
          onFilterTextChange={this.handleFilterTextChange}
          onMasterCheckBoxChange={this.handleMasterCheckBoxChange}
        />
        <hr></hr>
        <div className='tree-container'>
          <TreeWrapper
            parent={null}
            {...this.state}
            onChildSelect={this.handleChildSelect}
            onChildDelete={this.handleChildDelete}
            onChildEdit={this.handleChildEdit}
            onReorder={this.handleReorder}
          />
        </div>
      </div>
    );
  }
}
