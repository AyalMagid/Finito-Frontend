export const utilService = {
  getRandomId,
  getEmptyGroup,
  getEmptyTask,
  getEmptyCheckList,
  getNewBoard,
  deepCopy,
  getUrlBasedOnScreenWidth,
  getNewNotification,
};

//Tired of wirting JSON.parse(JSON.stringify(object)

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
// function for generating an empty checkList
function getEmptyCheckList(title = "Check List") {
  const checklist = {
    id: getRandomId(),
    title,
    items: [],
  };
  return checklist;
}
function getEmptyGroup(groupName = "") {
  const group = {
    id: getRandomId(),
    title: groupName,
    position: "",
    tasks: [],
    labelsOpen: false,
  };
  return group;
}

// function for generating an empty task
function getEmptyTask(parentListId) {
  const task = {
    parentListId,
    id: getRandomId(),
    title: "",
    desc: "",
    dueDate: "",
    watchMembers: [],
    createdAt: Date.now(),
    executeTime: "",
    members: [],
    labels: [],
    comments: [],
    cover: {
      color: "",
      url: "",
    },
    attachments: [],
    checkLists: [],
  };
  return task;
}

function getNewBoard() {
  const newBoard = {
    name: "",
    members: [],
    tags: [],
    style: {
      bgColor: "#48aef9",
      bgUrls: [],
      bgUrl: "",
      previewUrl: "",
    },
    creator: {},
    createdAt: Date.now(),
    activities: [],
    labels: [
      {
        id: getRandomId(),
        title: "",
        color: "#61BD4F",
        selectedColor: "#519839",
        wasClicked: false,
      },
      {
        id: getRandomId(),
        title: "",
        color: "#f2d600",
        selectedColor: "#D9B51C",
        wasClicked: false,
      },
      {
        id: getRandomId(),
        title: "",
        color: "#ff9f1a",
        selectedColor: "#cd8313",
        wasClicked: false,
      },
      {
        id: getRandomId(),
        title: "",
        color: "#eb5a46",
        selectedColor: "#b04632",
        wasClicked: false,
      },
      {
        id: getRandomId(),
        title: "",
        color: "#0079BF",
        selectedColor: "#055A8C",
        wasClicked: false,
      },
      {
        id: getRandomId(),
        title: "",
        color: "#C377E0",
        selectedColor: "#89609E",
        wasClicked: false,
      },
    ],
    taskGroups: [
      {
        id: getRandomId(),
        title: "Task-Group 1",
        position: "",
        tasks: [],
        labelsOpen: false,
      },
    ],
  };
  return newBoard;
}

function getNewNotification(sender = "Admin", content) {
  const notification = {
    senderId: "tomer123",
    id: getRandomId(),
    sender,
    content,
    closed: false,
  };
  return notification;
}

function getUrlBasedOnScreenWidth(screenWidth) {
  if (screenWidth < 640) {
    return "small";
  } else if (screenWidth > 640 && screenWidth < 1200) {
    return "regular";
  } else {
    return "full";
  }
}

function getRandomId() {
  var pt1 = Date.now().toString(16);
  var pt2 = _getRandomInt(1000, 9999).toString(16);
  var pt3 = _getRandomInt(1000, 9999).toString(16);
  return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function _getRandomInt(num1, num2) {
  var max = num1 >= num2 ? num1 + 1 : num2 + 1;
  var min = num1 <= num2 ? num1 : num2;
  return Math.floor(Math.random() * (max - min)) + min;
}

//Specific funcion to help in DND on board!

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
