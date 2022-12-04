import { useState } from 'react';
import { MdDragIndicator, MdDelete, MdKeyboardArrowDown } from "react-icons/md";
import TreeWrapper from '../TreeWrapper/TreeWrapper';
import { isTreeMemberAvailable } from '../../utils/utils';
import './TreeMember.css';

export default function TreeMember({
    member,
    index,
    filterText,
    onChildSelect,
    onChildDelete,
    onChildEdit,
    onReorder,
    onCollapse,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);

    function handleMemberSelect(e) {
        onChildSelect(index, {
            ...member,
            checked: e.target.checked,
            isMasterToggled: true
        });
    }

    function handleChildSelect(children) {
        const filteredList = children.filter((member) => isTreeMemberAvailable(member, filterText));
        onChildSelect(index, {
            ...member,
            checked: filteredList.length > 0 && filteredList.every(child => child.checked),
            children: [...children]
        });
    }

    function handleCollapse(children) {
        onCollapse(index, {
            ...member,
            children: [...children]
        });
    }

    function handleMemberDelete() {
        onChildDelete(index, {
            ...member,
            deleted: true
        });
    }

    function handleChildDelete(children) {
        const updatedMember = {
            ...member,
            children: [...children]
        };

        if (children.length > 0) {
            updatedMember.checked = children.every(child => child.checked);
        }
        onChildDelete(index, updatedMember);
    }

    function handleReorder(children) {
        onReorder(index, {
            ...member,
            children: [...children]
        });
    }

    function handleMemberEdit(e) {
        onChildEdit(index, {
            ...member,
            name: e.target.value
        });
    }

    function handleChildEdit(children) {
        onChildEdit(index, {
            ...member,
            children: [...children]
        });
    }

    function handleStartEditing() {
        if (filterText) {
            alert('filter applied. please clear filter and try editing')
            return;
        }
        setIsEditing(true);
    }

    function handleToggleCollapse() {
        onCollapse(index, {
            ...member,
            collapsed: !member.collapsed
        });
    }
    const expandIconStyle = {
        visibility: member.children.length > 0 ? 'visible' : 'hidden',
        transform: `rotate(${member.collapsed ? '270deg' : '0deg'})`
    };
    return (
        <li>
            <div className='member-container' onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}>
                <div className='member'>
                    <MdKeyboardArrowDown style={expandIconStyle} onClick={handleToggleCollapse}/>
                    <input type="checkbox" onChange={handleMemberSelect} checked={member.checked === undefined ? false : member.checked} />
                    <MdDragIndicator className='drag-icon' />
                    <span onClick={handleStartEditing}>
                        {isEditing ? <input
                            type="text"
                            autoFocus
                            onChange={handleMemberEdit}
                            onBlur={() => setIsEditing(false)}
                            value={member.name} /> : member.name
                        }
                    </span>
                </div>
                {isMouseOver && <MdDelete title="Delete" onClick={handleMemberDelete} />}
            </div>
            {
                !member.collapsed && member.children.length > 0 &&
                (<TreeWrapper
                    list={member.children}
                    parent={member}
                    filterText={filterText}
                    onChildSelect={handleChildSelect}
                    onChildDelete={handleChildDelete}
                    onChildEdit={handleChildEdit}
                    onReorder={handleReorder}
                    onCollapse={handleCollapse}
                />)
            }
        </li>
    );
}