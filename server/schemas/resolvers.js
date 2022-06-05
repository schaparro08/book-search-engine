const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return User.find({});
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
    },
  },

  Mutation: {
    addUsers: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const tokens = signToken(user);
  
      return {tokens, user};
    },
  
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});
  
      if(!user) {
        throw new AuthenticationError('This is not the correct password, pleas try again!')
      }
      const tokens= signToken(user);
      return {tokens,user};
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: {bookId: bookId}}},
          {new: true}
        
        );
      }
      throw new AuthenticationError('Please log in to proceed')
    },
    saveBook: async (parent, {input}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: context.user._id},
          {
            $addToSet: {savedBooks: {input}}
          },
          {
            new:true,
            runValidators:true,
          }
        );

      }
    }
    
  }
};



module.exports = resolvers;
