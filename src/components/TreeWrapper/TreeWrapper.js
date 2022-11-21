import React from 'react';
import TreeMember from '../TreeMember/TreeMember';
import './TreeWrapper.css';


export default class TreeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
    }

    render() {
        const { list, filterText, isMasterChecked, isMasterToggled, parent } = this.props;
        const checkMember = function(member) {
            return member.name.toLowerCase().includes(filterText.toLowerCase());
        }
        const checkParent = function(member) {
            let parent = member.parent;
            while(parent) {
                if(checkMember(parent)) {
                    return true;
                }
                parent = parent.parent;
            }
            return false;
        }

        const checkChildren = function(member) {
            for(const child of member.children) {
                if (checkMember(child)) {
                    return true;
                }
                if(checkChildren(child)) {
                    return true;
                }
            }
            return false;
        }
        const filterFunction = function (member) {
            if(checkMember(member)) {
                return true;
            }
            if(checkParent(member)) {
                return true;
            }
            if(checkChildren(member)) {
                return true;
            }
            return false;
        }
        const li = [];
        list.forEach((member, index) => {
            member.parent = parent;
            if (filterFunction(member)) {
                if (isMasterToggled) {
                    member.checked = isMasterChecked;
                }
                li.push(
                    <TreeMember
                        key={index}
                        member={member}
                        filterText={filterText}
                        isMasterChecked={isMasterChecked}
                        isMasterToggled={isMasterToggled}
                        onSelectionChange={this.handleSelectionChange}
                    />
                );
            }
        });
        return (
            <ul>
                {li}
            </ul>
        );
    }
}