import React from 'react';
import TreeMember from '../TreeMember/TreeMember';
import './TreeWrapper.css';
export default class TreeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleChildSelect = this.handleChildSelect.bind(this);
        this.handleChildDelete = this.handleChildDelete.bind(this);
        this.handleChildEdit = this.handleChildEdit.bind(this);
    }

    handleChildSelect(index, member) {
        const list = [
            ...this.props.list
        ]
        list[index] = member;
        this.props.onChildSelect(list);
    }

    handleChildDelete(index, member) {
        const list = [
            ...this.props.list
        ]
        list[index] = member;
        this.props.onChildDelete(list);
    }

    handleChildEdit(index, member) {
        const list = [
            ...this.props.list
        ]
        list[index] = member;
        this.props.onChildEdit(list);
    }

    render() {
        const { list, filterText, parent, isMasterChecked, isMasterToggled } = this.props;
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
            if (member.deleted) {
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
                        onChildSelect={this.handleChildSelect}
                        onChildDelete={this.handleChildDelete}
                        onChildEdit={this.handleChildEdit}
                    />
                );
            }
        });
        if (parent === null && li.length === 0) {
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