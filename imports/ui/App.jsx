import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskCollection } from '../db/TaskCollection';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

//define some sample data which will 
//be used to render a list of tasks (an array)
// const tasks = [
//   {_id: 1, text: 'This is the first task'},
//   {_id: 2, text: 'This is the second task'},
//   {_id: 3, text: 'This is the third task'},
// ];

//function to change your document and pass it along to your Task component
const toggleChecked = ({ _id, isChecked }) => Meteor.call('tasks.setIsChecked', _id, !isChecked);
const deleteTask = ({ _id }) =>  Meteor.call('tasks.remove', _id);

//mongo query
//useTracker function exported by react-meteor-data is a React Hook that allows you 
//to have reactivity in your React components. Every time the data changes through reactivity your component will re-render
export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
 

    const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
      const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
      if (!Meteor.user()) {
        return noDataAvailable;
      }
      const handler = Meteor.subscribe('tasks');
  
      if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
      }
  // refactoring to use single useTracker to get data 
      const tasks = TaskCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
      const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count();
  
      return { tasks, pendingTasksCount };
    });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const logout = () => Meteor.logout();

return (
  <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
             <div className="user" onClick={logout}>
             {user.username} 🚪
            </div>
            <TaskForm />
        <div className="filter">
         <button onClick={() => setHideCompleted(!hideCompleted)}>
           {hideCompleted ? 'Show All' : 'Hide Completed'}
         </button>
       </div>

       {isLoading && <div className="loading">loading...</div>}

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
        </Fragment>
        ) : (
          <LoginForm />
        )}
       
      </div>
  </div>
);
};
