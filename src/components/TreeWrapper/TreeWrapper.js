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
        const list = this.props.list.map((elm, i) => {
            if (i === index) {
                return member;
            } else {
                return elm;
            }
        });
        this.props.onChildSelect(list);
    }

    handleChildDelete(index, member) {
        let list;
        if (member.deleted) {
            list = this.props.list.filter((_, i) => i !== index);
        } else {
            list = this.props.list.map((elm, i) => {
                return i === index ? member : elm;
            });
        }
        this.props.onChildDelete(list);
    }

    handleChildEdit(index, member) {
        const list = this.props.list.map((elm, i) => {
            return i === index ? member : elm;
        });
        this.props.onChildEdit(list);
    }

    handleReorder(index, member) {
        const list = this.props.list.map((elm, i) => {
            return i === index ? member : elm;
        });
        this.props.onReorder(list);
    }

    render() {
        const { filterText, parent } = this.props;
        const list = [
            ...this.props.list
        ];
        const li = [];
        let noResults = null;

        list.forEach((elm, index) => {
            const member = {
                ...elm,
                parent,
            };
            if (isTreeMemberAvailable(member, filterText)) {
                li.push(
                    <TreeMember
                        key={index}
                        member={member}
                        index={index}
                        filterText={filterText}
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