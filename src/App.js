import React from 'react';
import './App.css';
import SearchBar from './components/SerchBar/SearchBar';
import TreeWrapper from './components/TreeWrapper/TreeWrapper';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      isMasterChecked: false,
      isMasterToggled: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMasterCheckBoxChange = this.handleMasterCheckBoxChange.bind(this);
    this.handleChildSelection = this.handleChildSelection.bind(this);
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

  handleChildSelection() {

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
            list={list}
            parent={ null}
            {...this.state}
            onSelectionChange={this.handleChildSelection}
          />
        </div>
      </div>
    );
  }
};


const list = [
  {
    name: 'Country', children: [
      { name: 'India', children: [
        {
          name: 'Region', children: [
            { name: 'Chennai', children: []},
            { name: 'Bangalore', children: []},
          ]
        }
      ] },
      { name: 'China', children: [] },
      { name: 'Vietnam', children: [] },
    ]
  },
  {
    name: 'Expires on', children: [
      { name: 'Jan', children: [] },
      { name: 'Feb', children: [] },
      { name: 'Mar', children: [] },
    ]
  },
];