import {Mongo} from 'meteor/mongo';

//create a new collection to store our tasks
export const TaskCollection = new Mongo.Collection('tasks');


// api directory: stor api-related code like publications and methods