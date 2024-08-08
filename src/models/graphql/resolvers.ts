import connectMongoDB from "@/config/connectDB";
import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";
import { BlogContext, Resolvers, User, VideoBlogContext } from "@/graphql/__generated__/types";
import cloudinary from "@/config/cloudinary";
import { removeCloudinaryImage } from "@/util/cloudinaryImageManagement";
import { encryptPassword, verifyPassword } from "@/util/passwordServices";
import { ApolloError, UserInputError } from "apollo-server-errors";
import generateToken from "@/util/jwt_token_generator/jwt_token_generator";
import { authContext } from "@/util/check_auth/check_auth"; 

const resolvers: Resolvers = {
  //! This os Query function to get the data from MongooseDB
  //TODO -  ==========---Query---==========
  Query: {
    async users() {
      try {
        const documentCount = await userModel.countDocuments();
        console.log(`Document count: ${documentCount}`);
        if (documentCount === 0) {
          console.log("No documents found");
          throw new GraphQLError("Not found");
        }
        const res = await userModel.find();
        console.log(`Found documents: ${res.length}`);
        console.log(res);
        return res;
      } catch (error: any) {
        console.error("Error in users query: ", error);
        throw new GraphQLError(error.message);
      }
    },

    // !

    async blogContexts() {
      try {
        // const documentCount = await blogContextModel.countDocuments();
        return await blogContextModel.find();
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    // !
    async videoBlogContexts() {
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
    //! !====================================
    // Add New User Into DB
    async addUser(_parent: any, { newUserData: {name , email, password, avatar, role} }) {
      //! Validation
      if (!name.trim()) {
        // throw new GraphQLError("Input name empty*");
        throw new UserInputError("Input name empty*");
      }
      if (!email.trim()) {
        // throw new GraphQLError("Input email empty*");
        throw new UserInputError("Input email empty*");
      }
      if (!password) {
        // throw new GraphQLError("Input password empty*");
        throw new UserInputError("Input password empty*");
      }
      if (!avatar.url) {
        // throw new GraphQLError("please Select an Avatar*");
        throw new UserInputError("please Select an Avatar*");
      }

      const newAvatar = { url: "", public_id: "" };

      //! User  Validation
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        throw new GraphQLError("User exist");
      }
      if (!existUser) {
        // ! Cloudinary Save
        if (avatar.url?.match(/data:image\/(jpeg|jpg|png|gif|bmp|tiff|webp|svg\+xml);base64,/)) {
          const uploaded = await cloudinary.uploader.upload(avatar!.url, {
            folder: "NextJS_Apollo_GraphQL_Project/users_avatar",
          });
          newAvatar.url = uploaded.secure_url;
          newAvatar.public_id = uploaded.public_id;
        } else {
          throw new GraphQLError("Invalid image format. Supported formats are .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg");
        }
        //!
        //! Password Bcrypt
        const encryptedPassword = await encryptPassword(password);

        if (!encryptedPassword) {
          throw new GraphQLError("Password encrypt error");
        }
        if (encryptedPassword) {
          // Create New Schema
          const newUser = new userModel({
            name: name,
            email: email,
            password: encryptedPassword,
            role: role,
            avatar: {
              url: newAvatar.url,
              public_id: newAvatar.public_id,
            },
            createdAt: new Date().toISOString()
          });
          // Store into DB
          const result = await newUser.save();
          const token = generateToken(result);
          console.log("result:::", result);
          console.log("token:::", token);
          return {
            ...result._doc,
            _id: result._id, 
            token,
          };
        }
      }
    },

    // !====================================

    //!  ----- Login User

    async loginUser(_: any, { inputData: { email, password } }: any) {
      if (!email.trim()) {
        // throw new GraphQLError("Input email empty*");
        throw new UserInputError("Input email empty*");
      }
      if (!password) {
        // throw new GraphQLError("Input password empty*");
        throw new UserInputError("Input password empty*");
      }
      try {
        const isUser = await userModel.findOne({ email });

        if (!isUser) {
          console.log("User Not Fount");
          return;
        }
        const matchPassword = await verifyPassword(password, isUser.password);
        if (!matchPassword) {
          console.log("wrong credentials");
          return;
        }
        const token = generateToken(isUser);
        console.log("token:::::::", token);
        return {
          token,
        };
      } catch (error) {
        throw new UserInputError("something went wrong*");
      }
    },

    //! ----

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
            role: args.edits!.role,
            avatar: args.edits!.avatar,
          },
        },
        { new: true }
      )) as User;
    },

    //!=================================
    async editBlogContext(_, { id, edits }) {
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

    async editVideoContext(_, args, context) {
      const user = authContext(context);

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
