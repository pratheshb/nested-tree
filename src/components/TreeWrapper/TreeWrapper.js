import React from 'react';
import TreeMember from '../TreeMember/TreeMember';
import './TreeWrapper.css';
export default class TreeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
        this.handleChildSelect = this.handleChildSelect.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
    }


    handleChildSelect(index, checked, isInitial) {
        const {list} = this.props;
        list[index].checked = checked;
        const selectChildren = function(member) {
            for(let child of member.children) {
                child.checked = checked;
                selectChildren(child);
            }
        }
        if(isInitial) {
            selectChildren(list[index]);
        }
        this.props.onChildSelect(list, checked);
    }

    handleDeleteMember(index) {
        this.setState(state => {
            const list = state.list;
            list[index].isDeleted = true;
            return ({
                list: list
            });
        })
    }

    render() {
        let { filterText, parent, isMasterChecked, isMasterToggled } = this.props;
        const { list } = this.state;
        const li = [];
        let noResults = null;

        const isMemberAvailable = function (member) {
            return member.name.toLowerCase().includes(filterText.toLowerCase());
        }

        const isParentAvailable = function (member) {
            let parent = member.parent;
            while (parent) {
                if (isMemberAvailable(parent)) {
                    return true;
                }
                parent = parent.parent;
            }
            return false;
        }

        const isChildrenAvailable = function (member) {
            for (const child of member.children) {
                if (isMemberAvailable(child)) {
                    return true;
                }
                if (isChildrenAvailable(child)) {
                    return true;
                }
            }
            return false;
        }

        list.forEach((member, index) => {
            member.parent = parent;
            if (member.isDeleted) {
                return;
            }
            if (isMemberAvailable(member) || isParentAvailable(member) || isChildrenAvailable(member)) {
                li.push(
                    <TreeMember
                        key={index}
                        member={member}
                        index={index}
                        filterText={filterText}
                        isMasterChecked={isMasterChecked}
                        isMasterToggled={isMasterToggled}
                        onMemberDelete={this.handleDeleteMember}
                        onChildSelect={this.handleChildSelect}
                    />
                );
            }
        });
        if(parent === null && li.length === 0) {
            noResults = <div className='no-items'>No items found!</div>
        }
        return (
            <>
            <ul>
                {li}
            </ul>
            {noResults}
            </>
        );
    }
}