import connectMongoDB from "@/lib/connectDB";
import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";
import { BlogContext, Resolvers, User, VideoBlogContext } from "@/graphql/__generated__/types";

const resolvers: Resolvers = {
  //! This os Query function to get the data from MongooseDB
  //TODO -  ==========---Query---==========
  Query: {
    async users() {
      await connectMongoDB();
      const documentCount = await userModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await userModel.find();
    },
    // !

    async blogContexts() {
      const documentCount = await blogContextModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await blogContextModel.find();
    },
    // !
    async videoBlogContexts() {
      const documentCount = await videoBlogContentModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await videoBlogContentModel.find();
    },

    // !
    //! This os Query function to get the data by ID from MongooseDB
    async user(_, args) {
      return (await userModel.findById(args.id)) as User;
    },
    //!
    async blogContext(_, args) {
      return (await blogContextModel.findById(args.id)) as BlogContext;
    },
    //!
    async videoBlogContext(_, args) {
      return (await videoBlogContentModel.findById(args.id)) as VideoBlogContext;
    },
    //!
  },

  //TODO -  ==========---Mutation---==========
  // ! Insert New Data Into DB
  Mutation: {
    // Add New User Into DB
    async addUser(_, args) {
      await connectMongoDB();
      // Inputs Validation
      const existUser = await userModel.findOne({ email: args.newUserData!.email });
      if (existUser) {
        throw new GraphQLError("User exist");
      }
      if (!args.newUserData!.name) {
        throw new GraphQLError("Input name empty*");
      }
      if (!args.newUserData!.email) {
        throw new GraphQLError("Input email empty*");
      }
      if (!args.newUserData!.password) {
        throw new GraphQLError("Input password empty*");
      }
      if (!args.newUserData!.avatar) {
        throw new GraphQLError("please Select an Avatar*");
      }
      // Create New Schema
      const newUser = new userModel({
        ...args.newUserData,
      });
      // Store into DB
      return await newUser.save();
    },

    //Add New Block Context Into DB
    async addBlogContext(_, args) {
      await connectMongoDB();

      //Input Validation
      if (!args.newBlogContextData!.title) {
        throw new GraphQLError("Input title empty*");
      }
      if (!args.newBlogContextData!.description) {
        throw new GraphQLError("Input description empty*");
      }
      if (!args.newBlogContextData!.photo) {
        throw new GraphQLError("please Select an Avatar*");
      }
      const newBlogContext = new blogContextModel({
        ...args.newBlogContextData,
      });
      return await newBlogContext.save();
    },

    //
    async addVideoBlogContext(_, args) {
      //Input Validation
      if (!args.newVideoBlogContextData!.title) {
        throw new GraphQLError("Input title empty*");
      }
      if (!args.newVideoBlogContextData!.url) {
        throw new GraphQLError("Input url empty*");
      }
      const newVideoContext = new videoBlogContentModel({
        ...args.newVideoBlogContextData,
      });
      return await newVideoContext.save();
    },
    //!Edit the data
    async editUser(_, args) {
      return (await userModel.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.edits!.name,
            password: args.edits!.password,
            roll: args.edits!.roll,
            avatar: args.edits!.avatar,
          },
        },
        { new: true }
      )) as User;
    },
    //
    async editBlogContext(_, args) {
      return (await blogContextModel.findByIdAndUpdate(
        args.id,
        {
          $set: {
            title: args.edits!.title,
            description: args.edits!.description,
            photo: args.edits!.photo,
          },
        },
        { new: true }
      )) as BlogContext;
    },
    //
    async editVideoContext(_, args) {
      return (await videoBlogContentModel.findByIdAndUpdate(
        args.id,
        {
          $set: {
            title: args.edits!.title,
            url: args.edits!.url,
          },
        },
        { new: true }
      )) as VideoBlogContext;
    },
    //
    //
    //!Delete the data
    async deleteUser(_, args) {
      await connectMongoDB();
      return (await userModel.findByIdAndDelete(args.id)) as User;
    },
    //
    async deleteBlogContext(_, args) {
      await connectMongoDB();
      return (await blogContextModel.findByIdAndDelete(args.id)) as BlogContext;
    },
    //
    async deleteVideoContext(_, args) {
      return (await videoBlogContentModel.findByIdAndDelete(args.id)) as VideoBlogContext;
    },
    //
  },
};

export default resolvers;
