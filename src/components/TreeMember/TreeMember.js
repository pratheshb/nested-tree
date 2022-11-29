import React from 'react';
import TreeWrapper from '../TreeWrapper/TreeWrapper';
import './TreeMember.css';
import { BsChevronDown } from "react-icons/bs";
import { MdDragIndicator, MdDelete } from "react-icons/md";
import { isTreeMemberAvailable } from '../../utils/utils';

export default class TreeMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isMouseOver: false,
        };
        this.onStartEditing = this.onStartEditing.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onSelectMember = this.onSelectMember.bind(this);
        this.onDeleteMember = this.onDeleteMember.bind(this);
        this.onEditMember = this.onEditMember.bind(this);
        this.handleChildSelect = this.handleChildSelect.bind(this);
        this.handleChildDelete = this.handleChildDelete.bind(this);
        this.handleChildEdit = this.handleChildEdit.bind(this);
        this.handleReorder = this.handleReorder.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    onSelectMember(e) {
        const member = {
            ...this.props.member,
            checked: e.target.checked,
            isMasterToggled: true
        };
        this.props.onChildSelect(this.props.index, member);
    }

    handleChildSelect(children) {
        const filteredList = children.filter((member) => isTreeMemberAvailable(member, this.props.filterText))
        const member = {
            ...this.props.member,
            checked: filteredList.length > 0 && filteredList.every(child => child.checked),
            children: [...children]
        };
        this.props.onChildSelect(this.props.index, member);
    }

    handleCollapse(children) {
        const member = {
            ...this.props.member,
            children: [...children]
        };
        this.props.onCollapse(this.props.index, member);
    }

    onDeleteMember() {
        const member = {
            ...this.props.member,
            deleted: true
        };
        this.props.onChildDelete(this.props.index, member);
    }

    handleChildDelete(children) {
        const member = {
            ...this.props.member,
            children: [...children]
        };

        if (children.length > 0) {
            member.checked = children.every(child => child.checked);
        }
        this.props.onChildDelete(this.props.index, member);
    }

    handleReorder(children) {
        const member = {
            ...this.props.member,
            children: [...children]
        };
        this.props.onReorder(this.props.index, member);
    }

    onEditMember(e) {
        const member = {
            ...this.props.member,
            name: e.target.value
        };
        this.props.onChildEdit(this.props.index, member);
    }

    handleChildEdit(children) {
        const member = {
            ...this.props.member,
            children: [...children]
        };
        this.props.onChildEdit(this.props.index, member);
    }


    onStartEditing() {
        if (this.props.filterText) {
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
        this.setState({ isMouseOver: true });
    }

    onMouseLeave() {
        this.setState({ isMouseOver: false });
    }

    onCollapse() {
        const member = {
            ...this.props.member,
        };
        member.collapsed = !member.collapsed;
        this.props.onCollapse(this.props.index, member);
    }

    render() {
        const member = {
            ...this.props.member
        };
        let memberWrapper = member.name;
        let nestedMember = null;
        let style = {
            visibility: 'hidden',
            transform: 'rotate(270deg)'
        };
        let deleteIcon = null;

        if (member.checked === undefined) {
            member.checked = false;
        }

        if(member.children.length > 0) {
            style.visibility = 'visible';
        }

        if (!member.collapsed && member.children.length > 0) {
            style.transform = 'rotate(0deg)';
            nestedMember = <TreeWrapper
                list={member.children}
                parent={member}
                filterText={this.props.filterText}
                onChildSelect={this.handleChildSelect}
                onChildDelete={this.handleChildDelete}
                onChildEdit={this.handleChildEdit}
                onReorder={this.handleReorder}
                onCollapse = {this.handleCollapse}
            />;
        }
        if (this.state.isEditing) {
            memberWrapper = <input
                type="text"
                autoFocus
                onChange={this.onEditMember}
                onBlur={this.onEndEditing}
                value={member.name} />;
        }

        if (this.state.isMouseOver) {
            deleteIcon = <MdDelete title="Delete" onClick={this.onDeleteMember} />;
        }
        return (
            <li>
                <div className='member-container' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <div className='member'>
                        <BsChevronDown style={style} onClick={this.onCollapse} className='icon' />
                        <input type="checkbox" onChange={this.onSelectMember} checked={member.checked} />
                        <MdDragIndicator className='drag-icon' />
                        <span onClick={this.onStartEditing}>{memberWrapper}</span>
                    </div>
                    {deleteIcon}
                </div>
                {nestedMember}
            </li>
        );
    }
}