import { ReactSortable } from "react-sortablejs";
import TreeMember from '../TreeMember/TreeMember';
import { isTreeMemberAvailable } from '../../utils/utils';
import './TreeWrapper.css';
import { useFilter } from "../../FilterContext";

export default function TreeWrapper({
    parent,
    list,
    onChildSelect,
    onChildDelete,
    onChildEdit,
    onReorder,
    onCollapse
}) {

    const filterText = useFilter();

    function generateUpdatedList(index, member) {
        return list.map((elm, i) => i === index ? member : elm);
    }

    function handleChildSelect(index, member) {
        onChildSelect(generateUpdatedList(index, member));
    }

    function handleCollapse(index, member) {
        onCollapse(generateUpdatedList(index, member));
    }

    function handleChildEdit(index, member) {
        onChildEdit(generateUpdatedList(index, member));
    }

    function handleReorder(index, member) {
        onReorder(generateUpdatedList(index, member));
    }

    function handleChildDelete(index, member) {
        let updatedList;
        if (member.deleted) {
            updatedList = list.filter((_, i) => i !== index);
        } else {
            updatedList = generateUpdatedList(index, member);
        }
        onChildDelete(updatedList);
    }

    const li = [];
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
                    onChildSelect={handleChildSelect}
                    onChildDelete={handleChildDelete}
                    onChildEdit={handleChildEdit}
                    onReorder={handleReorder}
                    onCollapse={handleCollapse}
                />
            );
        }
    });
    return (
        <>
            <ReactSortable
                tag='ul'
                list={list}
                setList={(newState) => onReorder(newState)}
            >
                {li}
            </ReactSortable>
            {parent === null && li.length === 0 && (
                <div className='no-items'>No items found!</div>)}
        </>
    );
}