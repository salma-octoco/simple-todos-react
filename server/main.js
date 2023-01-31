import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TaskCollection } from "/imports/db/TaskCollection";
//make sure your server is registering these methods
//ask for your server to import the file then Meteor.methods will be evaluated and will register your methods on server startup
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';


//insert tasks into collection
const insertTask = (taskText, user) =>
  TaskCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

  const SEED_USERNAME = 'meteorite';
  const SEED_PASSWORD = 'password';
  

//if no tasks exist in the collection, add the following list of tasks to the collection
//importing the TasksCollection and adding a few tasks to it iterating over an array of
// strings and for each string calling a function to insert this string as our text field in our task document
Meteor.startup(() =>{
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TaskCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

// Meteor.startup(async () => {
//   // If the Links collection is empty, add some data.
//   if (await LinksCollection.find().countAsync() === 0) {
//     await insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app',
//     });

//     await insertLink({
//       title: 'Follow the Guide',
//       url: 'https://guide.meteor.com',
//     });

//     await insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com',
//     });

//     await insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com',
//     });
//   }
// });


