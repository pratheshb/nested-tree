import React from 'react';
import './App.css';
import SearchBar from './components/SerchBar/SearchBar';
import TreeWrapper from './components/TreeWrapper/TreeWrapper';


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
    })
  }

  handleChildDelete(list) {
    this.setState({
      list,
      isMasterChecked: list.filter(child => !child.deleted).every(child => child.checked),
      isMasterToggled: false
    })
  }

  handleChildEdit(list) {
    this.setState({
      list,
      isMasterToggled: false
    })
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
          />
        </div>
      </div>
    );
  }
};


const list = [
  {
    name: 'Country', children: [
      {
        name: 'India', children: [
          {
            name: 'Region', children: [
              {
                name: 'Chennai', children: [
                  {
                    name: 'Area', children: [
                      { name: 'OMR', children: [] },
                      { name: 'ECR', children: [] },
                    ]
                  }
                ]
              },
              { name: 'Bangalore', children: [] },
            ]
          }
        ]
      },
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