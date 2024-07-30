import connectMongoDB from "@/lib/connectDB";
import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";

const resolvers = {
  //! This os Query function to get the data from MongooseDB
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
      return await userModel.findById(args.id);
    },
    //!
    async blogContext(_, args) {
      return await blogContextModel.findById(args.id);
    },
    //!
    async videoBlogContext(_, args) {
      return await videoBlogContentModel.findById(args.id);
    },
    //!
  },
};

export default resolvers;
