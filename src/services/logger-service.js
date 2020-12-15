export const loggerService = {
  buildLog,
};

// getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
function buildLog(action, changed,task) {
  let txt = "";
  switch (action) {
    // ADD
    case "ADDED_LABEL":
      txt = `added a Label in ${task.title}`;
      break;
    case "ADDED_CHECKLIST":
      txt = `added Checklist in ${task.title}`;
      break;
    case "ADDED_ITEM":
      // Checklist name in changed
      txt = `added item in ${task.title} ${changed}`;
      break;
    case "ADDED_COVER":
      txt = `added Cover to ${task.title}`;
      break;
    case "ADDED_ATTACHMENT":
      txt = `attached a File to ${task.title}`;
      break;
    // REMOVE
    case "REMOVED_TASK":
      txt = `removed ${task.title}`;
      break;
    case "REMOVED_LABEL":
      txt = `removed Label from ${task.title}`;
      break;
    case "REMOVED_COVER":
      txt = `removed Label from ${task.title}`;
      break;
    case "REMOVED_CHECKLIST":
      txt = `removed Checklist from ${task.title}`;
      break;
    case "REMOVED_ITEM":
      // Checklist name in changed
      txt = `removed item from ${task.title} ${changed}`;
      break;
    case "REMOVED_ATTACHMENT":
      txt = `removed a File from ${task.title}`;
      break;
    // UPDATE
    case "UPDATED_DESCRIPSTION":
      txt = `updated the Description of ${task.title}`;
      break;
    case "UPDATED_TITLE":
      txt = `updated the Description of ${task.title}`;
      break;
    case "UPDATED_COVER":
      txt = `changed the Cover of ${task.title}`;
      break;
    case "REMOVED_COVER":
      // the new date in changed
      txt = `removed the cover of ${task.title}`;
      break;
    case "CHANGED_DATE":
      // the new date in changed
      txt = `changed the Due-date of ${task.title} to ${changed}`;
      break;
    case "REMOVED_DATE":
      // the new date in changed
      txt = `removed the Due-date of ${task.title}`;
      break;

    case "UPDATED_CHECKLIST":
      // changed is the name of the Checklist
      txt = `updated Checklist ${changed} in ${task.title}`;
      break;
    // OTHERS
    case "JOINED_MEMBER":
      txt = `joined task ${task.title}`;
      break;
    case "MEMBER_LEFT":
      txt = `has left ${task.title}`;
      break;
    case "MOVED_TASK":
      // changed gets the new list task was moved to
      txt = `moved ${task.title} to ${changed}`;
      break;
    case "COMPLETED_TASK":
      txt = `completed the task - ${task.title}`;
      break;
    case "INCOMPLETED_TASK":
      txt = `incompleted the task - ${task.title}`;
      break;
    case "COPPIED_TASK":
      txt = `Coppied ${task.title}`;
      break;
    case "WATCHED_TASK":
      txt = `Watched ${task.title}`;
      break;
    case "UNWATCHED_TASK":
      txt = `unwatched ${task.title}`;
      break;
  }
  return txt;
}
