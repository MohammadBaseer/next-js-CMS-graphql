import connectMongoDB from "@/lib/connectDB";
import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";

const resolvers = {
  //! This os Query function to get the data from from MongooseDB
  Query: {
    async user() {
      await connectMongoDB();
      const documentCount = await userModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      console.log(documentCount);
      return await userModel.find();
    },
    // !
    async blogContext() {
      const documentCount = await blogContextModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await blogContextModel.find();
    },
    // !
    async videoBlogContext() {
      const documentCount = await videoBlogContentModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await videoBlogContentModel.find();
    },
    // !
  },
};

export default resolvers;
