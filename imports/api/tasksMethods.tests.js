import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { TaskCollection } from '/imports/db/TaskCollection';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', () => {});
    });
  });
}

//ensure the database is in the state we expect before beginning
if (Meteor.isServer) {
    describe('Tasks', () => {
      describe('methods', () => {
        const userId = Random.id();
        let taskId;
  
        beforeEach(() => {
          TaskCollection.remove({});
          taskId = TaskCollection.insert({
            text: 'Test Task',
            createdAt: new Date(),
            userId,
          });
        });
      });
    });
  }

  // creating a single task that’s associated with a random userId that’ll be different for each test run
if (Meteor.isServer) {
    describe('Tasks', () => {
      describe('methods', () => {
        const userId = Random.id();
        let taskId;
  
        beforeEach(() => {
          TaskCollection.remove({});
          taskId = TaskCollection.insert({
            text: 'Test Task',
            createdAt: new Date(),
            userId,
          });
        });
      });
    });
}