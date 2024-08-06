import connectMongoDB from "@/config/connectDB";
import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";
import { BlogContext, Resolvers, User, VideoBlogContext } from "@/graphql/__generated__/types";
import cloudinary from "@/config/cloudinary";
import { removeCloudinaryImage } from "@/util/cloudinaryImageManagement";

const resolvers: Resolvers = {
  //! This os Query function to get the data from MongooseDB
  //TODO -  ==========---Query---==========
  Query: {
    async users() {
      console.log("Running::::::::");

      await connectMongoDB();
      const documentCount = await userModel.countDocuments();
      if (documentCount === 0) {
        throw new GraphQLError("Not found");
      }
      return await userModel.find();
    },
    // !

    async blogContexts() {
      await connectMongoDB();

      try {
        // const documentCount = await blogContextModel.countDocuments();
        return await blogContextModel.find();
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    // !
    async videoBlogContexts() {
      await connectMongoDB();
      // const documentCount = await videoBlogContentModel.countDocuments();
      try {
        const result = await videoBlogContentModel.find();
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    // !
    //! This os Query function to get the data by ID from MongooseDB
    async user(_, args) {
      await connectMongoDB();
      return (await userModel.findById(args.id)) as User;
    },
    //!
    async blogContext(_, args) {
      await connectMongoDB();
      return (await blogContextModel.findById(args.id)) as BlogContext;
    },
    //!
    async videoBlogContext(_, args) {
      await connectMongoDB();
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
    async addBlogContext(_, { newBlogContextData }) {
      const { title, description, photo } = newBlogContextData as BlogContext;

      const newPhoto = photo.url;
      if (!title) {
        throw new GraphQLError("Input title empty*");
      }
      if (!description) {
        throw new GraphQLError("Input description empty*");
      }
      if (!newPhoto) {
        throw new GraphQLError("please Select an Avatar*");
      }

      await connectMongoDB();
      const newAvatar = { url: "", public_id: "" };

      if (newPhoto?.match(/data:image\/(jpeg|jpg|png|gif|bmp|tiff|webp|svg\+xml);base64,/)) {
        const uploaded = await cloudinary.uploader.upload(newPhoto, {
          folder: "NextJS_Apollo_GraphQL_Project/Blogs_Images",
        });
        newAvatar.url = uploaded.secure_url;
        newAvatar.public_id = uploaded.public_id;
      } else {
        throw new GraphQLError("Invalid image format. Supported formats are .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg");
      }

      try {
        const newData = {
          title: title,
          description: description,
          photo: {
            url: newAvatar.url,
            public_id: newAvatar.public_id,
          },
        };

        const newBlogContext = new blogContextModel({ ...newData });

        const result = await newBlogContext.save();

        return result;
      } catch (error) {
        const err = error as Error;
        console.log("error :>> ", error);
        return new GraphQLError(err.message ? `AddBlog error:::${err.message}` : "something went really bad!");
      }
    },

    //
    async addVideoBlogContext(_, args) {
      await connectMongoDB();
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
      await connectMongoDB();
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

    //!=================================
    async editBlogContext(_, { id, edits }) {
      await connectMongoDB();
      console.log(edits);
      console.log("edits", edits?.photo?.url);
      const newPhoto = edits?.photo?.url;

      console.log("newPhoto:::::::::::", newPhoto);

      const newAvatar = { url: "", public_id: "" };

      if (newPhoto?.match(/data:image\/(jpeg|jpg|png|gif|bmp|tiff|webp|svg\+xml);base64,/)) {
        const isData = (await blogContextModel.findById(id)) as BlogContext;
        const ImageID = isData.photo.public_id as string;
        await removeCloudinaryImage(ImageID);
        const uploaded = await cloudinary.uploader.upload(newPhoto, {
          folder: "NextJS_Apollo_GraphQL_Project/Blogs_Images",
        });
        newAvatar.url = uploaded.secure_url;
        newAvatar.public_id = uploaded.public_id;
        console.log("uploaded :>> ", uploaded);
      } else {
        throw new GraphQLError("Invalid image format. Supported formats are .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg");
      }

      try {
        return (await blogContextModel.findByIdAndUpdate(
          id,
          {
            $set: {
              title: edits!.title,
              description: edits!.description,
              photo: {
                url: newAvatar.url,
                public_id: newAvatar.public_id,
              },
            },
          },
          { new: true }
        )) as BlogContext;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //!=================================

    async editVideoContext(_, args) {
      await connectMongoDB();

      try {
        const result = (await videoBlogContentModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.edits!.title,
              url: args.edits!.url,
            },
          },
          { new: true }
        )) as VideoBlogContext;

        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
    //
    //!Delete the data
    async deleteUser(_, args) {
      await connectMongoDB();
      try {
        const result = (await userModel.findByIdAndDelete(args.id)) as User;
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
    //!=================================

    async deleteBlogContext(_, { id }) {
      await connectMongoDB();

      try {
        const isData = (await blogContextModel.findById(id)) as BlogContext;
        const ImageID = isData.photo.public_id as string;
        await removeCloudinaryImage(ImageID);

        return (await blogContextModel.findByIdAndDelete(id)) as BlogContext;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //!=================================

    //
    async deleteVideoContext(_, args) {
      try {
        const result = (await videoBlogContentModel.findByIdAndDelete(args.id)) as VideoBlogContext;
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
  },
};

export default resolvers;
