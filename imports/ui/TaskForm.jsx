import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';


//the array destructuring [text, setText], where text is the stored value which we 
//want to use, which in this case will be a string; and setText is a function used to update that value

export const TaskForm = () => {
    const [text, setText] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
    
        if (!text) return;
        // does not need to receive the user anymore as we get the userId in the server
        Meteor.call('tasks.insert', text);

        setText('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type to add new tasks"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
    
          <button type="submit">Add Task</button>
        </form>
    );
};