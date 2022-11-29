import React from 'react';
import './App.css';
import SearchBar from './components/SerchBar/SearchBar';
import TreeWrapper from './components/TreeWrapper/TreeWrapper';
import { isTreeMemberAvailable, mapFn, getData } from './utils/utils'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filterText: '',
      isMasterChecked: false,
      isList2: false
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMasterCheckBoxChange = this.handleMasterCheckBoxChange.bind(this);
    this.handleChildSelect = this.handleChildSelect.bind(this);
    this.handleChildDelete = this.handleChildDelete.bind(this);
    this.handleChildEdit = this.handleChildEdit.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onToggleList = this.onToggleList.bind(this);
    this.fetchData();
  }

  async fetchData(isList2) {
    const url = isList2 ? '/list2.json' : '/list.json'
    const res = await fetch(url);
  const json = await res.json();
  const list = json.list;
    this.setState({
      list,
      isList2
    });
  }

  handleFilterTextChange(filterText) {
    this.setState(state => {
      const filteredList = state.list.filter((member) => isTreeMemberAvailable(member, filterText));
      return ({
        filterText,
        isMasterChecked: filteredList.length > 0 && filteredList.every(member => member.checked)
      });
    });
  }

  handleMasterCheckBoxChange(isMasterChecked) {
    this.setState((state) => {
      const list = [...state.list];
      return ({
        list: list.map((member) => mapFn(member, state.filterText, true, isMasterChecked)),
        isMasterChecked: isMasterChecked
      });
    });
  }

  handleChildSelect(list) {
    this.setState(state => {
      const filteredList = list.filter((member) => isTreeMemberAvailable(member, state.filterText));
      return ({
        list: list.map((member) => mapFn(member, state.filterText)),
        isMasterChecked: filteredList.length > 0 && filteredList.every(child => child.checked)
      });
    });
  }

  handleChildDelete(list) {
    const existingList = list.filter(child => !child.deleted);
    this.setState({
      list: [...list],
      isMasterChecked: existingList.length > 0 && existingList.every(child => child.checked),
    });
  }

  handleChildEdit(list) {
    this.setState({
      list: [...list],
    });
  }

  handleCollapse(list) {
    this.setState({
      list: [...list],
    });
  }

  handleReorder(list) {
    this.setState({
      list: [...list],
    });
  }

  onToggleList(isList2) {
    this.fetchData(isList2);
  }


  render() {
    return (
      <div className="container">
        <SearchBar
          isMasterChecked={this.state.isMasterChecked}
          onFilterTextChange={this.handleFilterTextChange}
          onMasterCheckBoxChange={this.handleMasterCheckBoxChange}
          isList2 = {this.state.isList2}
          onToggleList = {this.onToggleList}
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
