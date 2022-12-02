import { useEffect, useState } from 'react';
import SearchBar from './components/SerchBar/SearchBar';
import TreeWrapper from './components/TreeWrapper/TreeWrapper';
import { isTreeMemberAvailable, mapFn } from './utils/utils';
import './App.css';

export default function App() {

  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [isMasterChecked, setIsMasterChecked] = useState(false);
  const [isList2, setIsList2] = useState(false);

  useEffect(() => {
    fetchData(isList2);
  }, [isList2]);

  async function fetchData(isList2) {
    const url = isList2 ? '/list2.json' : '/list.json';
    try {
      const res = await fetch(url);
      const json = await res.json();
      const list = json.list;
      setList(list);
    } catch(e) {
      throw new Error(e);
    }
  }

  function handleFilterTextChange(filterText) {
    const filteredList = list.filter((member) => isTreeMemberAvailable(member, filterText));
    setFilterText(filterText);
    setIsMasterChecked(filteredList.length > 0 && filteredList.every(member => member.checked))
  }

  function handleMasterCheckBoxChange(isMasterChecked) {
    setIsMasterChecked(isMasterChecked);
    setList(list => [...list].map(member => mapFn(member, filterText, true, isMasterChecked)))
  }

  function handleChildSelect(list) {
    const filteredList = list.filter((member) => isTreeMemberAvailable(member, filterText));
    setList([...list].map((member) => mapFn(member, filterText)));
    setIsMasterChecked(filteredList.length > 0 && filteredList.every(child => child.checked));
  }

  function handleChildDelete(list) {
    const existingList = list.filter(child => !child.deleted);
    setList([...list]);
    setIsMasterChecked(existingList.length > 0 && existingList.every(child => child.checked));
  }

  function handleChildEdit(list) {
    setList([...list]);
  }

  function handleCollapse(list) {
    setList([...list]);
  }

  function handleReorder(list) {
    setList([...list]);
  }

  function onToggleList(isList2) {
    setIsList2(isList2);
  }

  return (
    <div className="container">
      <SearchBar
        isMasterChecked={isMasterChecked}
        onFilterTextChange={handleFilterTextChange}
        onMasterCheckBoxChange={handleMasterCheckBoxChange}
        isList2={isList2}
        onToggleList={onToggleList}
      />
      <hr></hr>
      <div className='tree-container'>
        <TreeWrapper
          parent={null}
          list={list}
          filterText={filterText}
          onChildSelect={handleChildSelect}
          onChildDelete={handleChildDelete}
          onChildEdit={handleChildEdit}
          onReorder={handleReorder}
          onCollapse={handleCollapse}
        />
      </div>
    </div>
  );
}
