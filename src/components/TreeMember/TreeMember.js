import React from 'react';
import TreeWrapper from '../TreeWrapper/TreeWrapper';
import './TreeMember.css';
import { BsChevronDown } from "react-icons/bs";
import { MdDragIndicator, MdDelete } from "react-icons/md";

let isMemberSelected = false;
export default class TreeMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member: props.member,
            isEditing: false,
            isMouseOver: false,
            index: props.index,
        };
        this.onSelectMember = this.onSelectMember.bind(this);
        this.onStartEditing = this.onStartEditing.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this.onEditMember = this.onEditMember.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onDeleteMember = this.onDeleteMember.bind(this);
        this.handleChildSelect = this.handleChildSelect.bind(this);
    }

    onSelectMember(e) {
        this.props.onChildSelect(this.state.index, e.target.checked, true);
    }

    handleChildSelect(children) {
        const {member} = this.props;
        member.checked = children.every(child => child.checked);
        member.children = children;
        this.props.onChildSelect(this.state.index, member.checked);  
    }

    onStartEditing() {
        if(this.props.filterText) {
            alert('filter applied. please clear filter and try editing')
            return;
        }
        this.setState({
            isEditing: true
        });
    }

    onEndEditing() {
        this.setState({
            isEditing: false
        });
    }

    onMouseEnter() {
        this.setState({isMouseOver: true});
    }

    onMouseLeave() {
        this.setState({isMouseOver: false});
    }

    onEditMember(e) {
        this.setState(state => {
            const {member} = state;
            member.name = e.target.value;
            return ({
                member
            });
        });
    }

    onDeleteMember() {
        this.props.onMemberDelete(this.state.index);
    }

    render() {
        let nestedMember = null;
        let visibility = 'hidden';
        let { member, filterText, isMasterToggled, isMasterChecked } = this.props;
        // const {member} = this.state;

        if (member.checked === undefined) {
            member.checked = false;
        }

        if(isMemberSelected) {
            isMasterChecked = member.checked;
            isMasterToggled = true;
        }

        isMemberSelected = false;

        if(isMasterToggled) {
            member.checked = isMasterChecked;
        }

        if (member.children.length) {
            visibility = 'visible';
            nestedMember = <TreeWrapper
                list={member.children}
                parent = {member}
                filterText={filterText}
                isMasterChecked = {isMasterChecked}
                isMasterToggled = {isMasterToggled}
                onChildSelect = {this.handleChildSelect}
            />
        }

        let memberName = member.name;
        if(this.state.isEditing) {
            memberName = <input 
            type="text" 
            autoFocus 
            onChange={this.onEditMember} 
            onBlur={this.onEndEditing} 
            value={memberName}>
            </input>
        }
        let deleteIcon = null;
        if(this.state.isMouseOver) {
            deleteIcon = <MdDelete title="Delete" onClick={this.onDeleteMember}></MdDelete>;
        }
        return (
            <li>
                <div className='member-container' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <div className='member'>
                        <BsChevronDown style={{ visibility }} className='icon'></BsChevronDown>
                        <input type="checkbox" onChange={this.onSelectMember} checked={member.checked}></input>
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