const {User, Thought} = require('../models');

// The Apollo server library can also be set up to pass the data sources, such as the database model we're working with, as an argument to the resolver function. If you ever look at the tutorial Apollo has on its website, you'll see that they set it up in that way, so don't be alarmed if it looks different from how we've set it up here.

const resolvers = {
    Query: {
        //get all thoughts
        thoughts: async(parent, {username}) => {
            const params = username ? {username} : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        //get one thought by id
        thought: async (parent, {_id}) => {
            return Thought.findOne({_id});
        },
        //get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
        //get a user by username
        user: async (parent, {username}) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
    }
};

module.exports = resolvers;