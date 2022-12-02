let filterText = '';

const isMemberAvailable = function (member) {
    return member.name.toLowerCase().includes(filterText);
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
    filterText = text.toLowerCase();
    return isMemberAvailable(member) || isParentAvailable(member) || isChildrenAvailable(member);
}


const mapFn = function(member, filterText, isMasterToggled, isMasterChecked) {
  if (isTreeMemberAvailable(member, filterText)) {
    if (member.isMasterToggled) {
      isMasterToggled = true;
      isMasterChecked = member.checked;
    }
    return ({
      ...member,
      isMasterToggled: false,
      checked: isMasterToggled ? isMasterChecked : member.checked,
      children: [...member.children].map((member) => mapFn(member, filterText, isMasterToggled, isMasterChecked))
    });
  } else {
    return member;
  }
}

export { isTreeMemberAvailable, mapFn };