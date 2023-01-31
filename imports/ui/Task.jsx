import React from 'react';

// export a React component called Task 
//that will represent one task in your To-Do list
export const Task = ({task, onCheckboxClick, onDeleteClick}) => {
    //return a li element since component is in a list
    //receive a callback, a function that will be called when the checkbox is clicked.
    return (
    <li>
        <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
        />
         <span>{task.text}</span>
      <button onClick={ () => onDeleteClick(task) }>&times;</button>
    </li>
    )   
};
