import React from 'react';
import TreeWrapper from '../TreeWrapper/TreeWrapper';
import './TreeMember.css';
import { BsChevronDown } from "react-icons/bs";
import { MdDragIndicator, MdDelete } from "react-icons/md";
export default class TreeMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member: null,
            isEditing: false,
            isMouseOver: false
        };
        this.handleSelection = this.handleSelection.bind(this);
        this.onStartEditing = this.onStartEditing.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        // this.handleChildSelection = this.handleChildSelection.bind(this);
    }

    handleSelection(e) {
        this.setState((state, props) => {
            const member = state.member || props.member;
            member.checked = e.target.checked;
            return { member }
        });
    }

    onStartEditing() {
        this.setState({
            isEditing: true
        });
    }

    onEndEditing() {
        this.setState({
            isEditing: false
        });
    }

    onMouseOver() {
        this.setState({
            isMouseOver: true
        });
    }

    onMouseLeave() {
        this.setState({
            isMouseOver: false
        });
    }

    onNameChange(e) {
        this.setState((state, props) => {
            const member = state.member || props.member;
            member.name = e.target.value;
            return ({
                member
            })
        })
    }

    // handleChildSelection(list) {
    //     if(list === null) {
    //         return;
    //     }
    //     this.setState((state, props) => {
    //         const  member  = state.member || props.member;
    //         member.checked = list.every(child => child.checked);
    //         member.children = list;
    //         return {member}
    //     });
    // }

    render() {
        let nestedMember = null;
        let visibility = 'hidden';
        let { member, filterText, isMasterChecked, isMasterToggled } = this.props;
        if (member.checked === undefined) {
            member.checked = false;
        }
        if (this.state.member) {
            member = this.state.member;
            isMasterChecked = member.checked;
            isMasterToggled = true;
        }

        if (member.children.length) {
            visibility = 'visible';
            nestedMember = <TreeWrapper
                list={member.children}
                parent = {member}
                filterText={filterText}
                isMasterChecked={isMasterChecked}
                isMasterToggled={isMasterToggled}
                onSelectionChange={this.handleChildSelection}
            />
        }

        let memberName = member.name;
        if(this.state.isEditing) {
            memberName = <input 
            type="text" 
            autoFocus 
            onChange={this.onNameChange} 
            onBlur={this.onEndEditing} 
            value={memberName}>
            </input>
        }
        let deleteIcon = null;
        if(this.state.isMouseOver) {
            deleteIcon = <MdDelete></MdDelete>;
        }
        return (
            <li>
                <div className='member-container' onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                    <div className='member'>
                        <BsChevronDown style={{ visibility }} className='icon'></BsChevronDown>
                        <input type="checkbox" onChange={this.handleSelection} checked={member.checked}></input>
                        <MdDragIndicator></MdDragIndicator>
                        <span onClick={this.onStartEditing}>{memberName}</span>
                    </div>
                    {deleteIcon}
                </div>
                {nestedMember}
            </li>
        );
    }
}