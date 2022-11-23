import React from 'react';
import TreeMember from '../TreeMember/TreeMember';
import './TreeWrapper.css';
import { isTreeMemberAvailable } from '../../utils/utils';
import { ReactSortable } from "react-sortablejs";
export default class TreeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleChildSelect = this.handleChildSelect.bind(this);
        this.handleChildDelete = this.handleChildDelete.bind(this);
        this.handleChildEdit = this.handleChildEdit.bind(this);
        this.handleReorder = this.handleReorder.bind(this);
    }

    handleChildSelect(index, member) {
        const list = [
            ...this.props.list
        ];
        list[index] = member;
        this.props.onChildSelect(list);
    }

    handleChildDelete(index, member) {
        const list = [
            ...this.props.list
        ];
        if (member.deleted) {
            list.splice(index, 1);
        } else {
            list[index] = member;
        }
        this.props.onChildDelete(list);
    }

    handleChildEdit(index, member) {
        const list = [
            ...this.props.list
        ];
        list[index] = member;
        this.props.onChildEdit(list);
    }

    handleReorder(index, member) {
        const list = [
            ...this.props.list
        ];
        list[index] = member;
        this.props.onReorder(list);
    }

    render() {
        const { list, filterText, parent, isMasterChecked, isMasterToggled } = this.props;
        const li = [];
        let noResults = null;

        list.forEach((member, index) => {
            member.parent = parent;
            if (isTreeMemberAvailable(member, filterText)) {
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
                        onReorder={this.handleReorder}
                    />
                );
            }
        });
        if (parent === null && li.length === 0) {
            noResults = <div className='no-items'>No items found!</div>;
        }
        return (
            <>
                <ReactSortable
                    tag='ul'
                    list={list}
                    setList={(newState) => this.props.onReorder(newState)}
                >
                    {li}
                </ReactSortable>
                {noResults}
            </>
        );
    }
}