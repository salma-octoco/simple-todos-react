import { Meteor } from 'meteor/meteor';
//Check that a value matches a pattern
import { check } from 'meteor/check';
import { TaskCollection } from '../db/TaskCollection';
//for each operation that you are doing in the client next, 
//we are going to call these Methods from the client instead of using
// Mini Mongo operations directly

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorised.');
        }

        TaskCollection.insert({
            text,
            createdAt: new Date(),
            userId: this.userId,
        })
    },

    'tasks.remove'(taskId){
        if (!this.userId) {
            throw new Meteor.Error('Not authorised.');
        }

        const task = TaskCollection.findOne({_id: taskId, userId: this.userId });
        if (!task) {
            throw new Meteor.Error('Access denied.');
        }
      

        TaskCollection.remove(taskId);
    },



    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorised.');
        }
        const task = TaskCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
        throw new Meteor.Error('Access denied.');
        }

        TaskCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }   
});