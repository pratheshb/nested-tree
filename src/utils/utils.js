let filterText = '';
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


const isTreeMemberAvailable = function (member, text = '') {
    filterText = text;
    return isMemberAvailable(member) || isParentAvailable(member) || isChildrenAvailable(member);
}

export { isTreeMemberAvailable };