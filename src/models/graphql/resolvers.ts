import userModel from "../mongoose/userModel";
import blogContextModel from "../mongoose/blogModel";
import { GraphQLError } from "graphql";
import videoBlogContentModel from "../mongoose/videoBlogModel";
import { BlogContext, Resolvers, User, VideoBlogContext } from "@/graphql/__generated__/types";
import cloudinary from "@/config/cloudinary";
import { removeCloudinaryImage } from "@/util/cloudinaryImageManagement";
import { encryptPassword, verifyPassword } from "@/util/passwordServices";
import generateToken from "@/util/jwt_token_generator/jwt_token_generator";
import { authContext } from "@/util/check_auth/check_auth";
import { UserInfoTypes } from "@/graphql/CustomTypes/UserInfoType.ts/userInfoTypes";

const resolvers: Resolvers = {
  //! This os Query function to get the data from MongooseDB
  //TODO -  ==========---Query---==========
  Query: {
    async users(_, __, context) {
      try {
        authContext(context);
        const documentCount = await userModel.countDocuments();
        if (documentCount === 0) {
          throw new GraphQLError("Not found");
        }
        const result = await userModel.find();
        return result;
      } catch (error: any) {
        console.error("Error in users query: ", error);
        throw new GraphQLError(error.message);
      }
    },

    // !

    async blogContexts() {
      // const user = authContext(context);
      // const { id, role, username } = user as UserInfoTypes;

      try {
        // if (role === "User") {
        //   const result = await blogContextModel.find({ "createdBy.id": id, "createdBy.username": username });
        //   return result;
        // } else {
        const result = await blogContextModel.find();
        return result;
        // }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    // !
    async videoBlogContexts() {
      // const user = authContext(context);
      // const { id, role, username } = user as UserInfoTypes;
      try {
        // if (role === "User") {
        //   const result = await videoBlogContentModel.find({ "createdBy.id": id, "createdBy.username": username });
        //   return result;
        // } else {
        const result = await videoBlogContentModel.find();
        return result;
        // }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    // !
    //! This os Query function to get the data by ID from MongooseDB
    async user(_, { id }, context) {
      authContext(context);

      try {
        const result = (await userModel.findById(id)) as User;
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    //!
    async blogContext(_, { id }) {
      // const user = authContext(context);
      // const { id: uid, role, username } = user as UserInfoTypes;
      try {
        // if (role === "User") {
        //   const result = await blogContextModel.findById({ _id: id, "createdBy.id": uid, "createdBy.username": username });
        //   return result;
        // } else {
        const result = await blogContextModel.findById(id);
        return result;
        // }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    //!
    async videoBlogContext(_, { id }) {
      // const user = authContext(context);
      // const { id: uid, role, username } = user as UserInfoTypes;
      try {
        // if (role === "User") {
        //   const result = await videoBlogContentModel.findById({ _id: id, "createdBy.id": uid, "createdBy.username": username });
        //   return result;
        // } else {
        const result = await videoBlogContentModel.findById(id);
        return result;
        // }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //!
  },

  //TODO -  ==========---Mutation---==========
  // ! Insert New Data Into DB
  Mutation: {
    //! !====================================
    // Add New User Into DB
    async addUser(_, { newUserData }) {
      const { name, email, password, avatar } = newUserData as User;
      //! Validation
      if (!name.trim()) {
        throw new GraphQLError("Input name empty*");
      }
      if (!email.trim().toLowerCase()) {
        throw new GraphQLError("Input email empty*");
      }
      if (!password) {
        throw new GraphQLError("Input password empty*");
      }
      if (!avatar.url) {
        throw new GraphQLError("please Select an Avatar*");
      }

      const newAvatar = { url: "", public_id: "" };

      try {
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
              name: name.trim(),
              email: email.trim().toLowerCase(),
              password: encryptedPassword,
              role: "User",
              avatar: {
                url: newAvatar.url,
                public_id: newAvatar.public_id,
              },
              createdAt: new Date().toISOString(),
            });
            // Store into DB
            const result = await newUser.save();
            const token = generateToken(result);
            return {
              ...result._doc,
              _id: result._id,
              token,
            };
          }
        }
      } catch (error: any) {
        throw new GraphQLError(error);
      }
    },

    // !====================================

    //!  ----- Login User

    async loginUser(_, { inputData }) {
      // const { email, password } = inputData;
      const email = inputData.email.trim().toLowerCase();
      const password = inputData.password;
      console.log("email", email);

      if (!email) {
        throw new GraphQLError("Input email empty*");
      }
      if (!password) {
        throw new GraphQLError("Input password empty*");
      }
      try {
        const isUser = await userModel.findOne({ email });

        if (!isUser) {
          console.log("User Not Fount");
          throw new GraphQLError("User Not Fount*");
        }
        const matchPassword = await verifyPassword(password, isUser.password);
        if (!matchPassword) {
          console.log("wrong credentials");
          throw new GraphQLError("wrong credentials*");
        }
        const token = generateToken(isUser);

        return {
          ...isUser._doc,
          _id: isUser._id,
          token,
        };
      } catch (error: any) {
        throw new GraphQLError(error);
      }
    },

    //! ----

    //Add New Block Context Into DB
    async addBlogContext(_, { newBlogContextData }, context) {
      const user = authContext(context);
      const { id, username } = user as UserInfoTypes;
      const { title, description, photo } = newBlogContextData as BlogContext;
      const newPhoto = photo.url;
      if (!title.trim()) {
        throw new GraphQLError("Input title empty*");
      }
      if (!description.trim()) {
        throw new GraphQLError("Input description empty*");
      }
      if (!newPhoto.trim()) {
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
          title: title.trim(),
          description: description.trim(),
          createdBy: {
            id,
            username,
          },
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
    //!
    async addVideoBlogContext(_, { newVideoBlogContextData }, context) {
      const { title, url } = newVideoBlogContextData as VideoBlogContext;
      const user = authContext(context);
      const { id, username } = user as UserInfoTypes;
      if (!title.trim()) {
        throw new GraphQLError("Input title empty*");
      }
      if (!url.trim()) {
        throw new GraphQLError("Input url empty*");
      }
      try {
        const newVideoContext = new videoBlogContentModel({
          title: title.trim(),
          url: url.trim(),
          createdBy: {
            id,
            username,
          },
        });
        const result = await newVideoContext.save();
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    async editUser(_: any, { id, edits }, context) {
      const user = authContext(context);
      const { name, password, role, avatar } = edits as User;

      if (!id) {
        throw new GraphQLError("User ID is required");
      }

      try {
        const existingUser = (await userModel.findById(id)) as User;
        if (!existingUser) {
          throw new GraphQLError("User not found");
        }

        const updateFields: any = {};

        if (name) {
          updateFields.name = name.trim();
        }
        if (password) {
          updateFields.password = password;
        }
        if (role) {
          updateFields.role = role;
        }

        if (avatar && avatar.url) {
          const newPhoto = avatar.url;

          if (newPhoto.match(/data:image\/(jpeg|jpg|png|gif|bmp|tiff|webp|svg\+xml);base64,/)) {
            // Handle base64 image upload
            if (existingUser.avatar && existingUser.avatar.public_id) {
              await removeCloudinaryImage(existingUser.avatar.public_id);
            }
            const uploaded = await cloudinary.uploader.upload(newPhoto, {
              folder: "NextJS_Apollo_GraphQL_Project/users_avatar",
            });
            updateFields.avatar = {
              url: uploaded.secure_url,
              public_id: uploaded.public_id,
            };
          } else {
            throw new GraphQLError("Invalid image format. Supported formats are .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg");
          }
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) {
          throw new GraphQLError("Error updating user");
        }
        const refreshToken = generateToken(updatedUser);

        return {
          result: updatedUser,
          refreshToken,
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    //!=================================
    async editBlogContext(_, { id, edits }, context) {
      const user = authContext(context);
      const { title, photo, description } = edits as BlogContext;
      const newPhoto = photo?.url;
      if (!title.trim()) {
        throw new GraphQLError("Input title empty*");
      }
      if (!description.trim()) {
        throw new GraphQLError("Input description empty*");
      }
      if (!newPhoto.trim()) {
        throw new GraphQLError("please Select an Avatar*");
      }
      const newAvatar = { url: "", public_id: "" };

      // !
      if (newPhoto?.match(/data:image\/(jpeg|jpg|png|gif|bmp|tiff|webp|svg\+xml);base64,/)) {
        const isData = (await blogContextModel.findById(id)) as BlogContext;
        const ImageID = isData.photo.public_id as string;
        await removeCloudinaryImage(ImageID);
        const uploaded = await cloudinary.uploader.upload(newPhoto, {
          folder: "NextJS_Apollo_GraphQL_Project/Blogs_Images",
        });
        newAvatar.url = uploaded.secure_url;
        newAvatar.public_id = uploaded.public_id;
      } else {
        throw new GraphQLError("Invalid image format. Supported formats are .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg");
      }
      // !

      try {
        return (await blogContextModel.findByIdAndUpdate(
          id,
          {
            $set: {
              title: title.trim(),
              description: description.trim(),
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

    async editVideoContext(_, { id, edits }, context) {
      const { title, url } = edits as VideoBlogContext;
      const user = authContext(context);
      if (!title.trim()) {
        throw new GraphQLError("Input title empty*");
      }
      if (!url.trim()) {
        throw new GraphQLError("Input url empty*");
      }
      try {
        ///NOTE -  // * Check if Not item display not fount item
        const result = await videoBlogContentModel.findByIdAndUpdate(
          id,
          {
            $set: {
              title: title.trim(),
              url: url.trim(),
            },
          },
          { new: true }
        );

        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
    //

    //!Delete the data
    async deleteUser(_, { id }, context) {
      const user = authContext(context);
      try {
        const result = (await userModel.findByIdAndDelete(id)) as User;
        return result;
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
    //!=================================

    async deleteBlogContext(_, { id }, context) {
      const user = authContext(context);
      const { id: uid, role, username } = user as UserInfoTypes;

      try {
        if (role === "User") {
          const isData = (await blogContextModel.findByIdAndDelete({ _id: id, "createdBy.id": uid, createdBy: username })) as BlogContext;
          const ImageID = isData.photo.public_id as string;
          await removeCloudinaryImage(ImageID);
          return isData;
        }
        if (role === "Admin") {
          const isData = (await blogContextModel.findByIdAndDelete(id)) as BlogContext;
          const ImageID = isData.photo.public_id as string;
          await removeCloudinaryImage(ImageID);
          return isData;
        } else {
          throw new GraphQLError("cannot delete");
        }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //!=================================

    //
    async deleteVideoContext(_, { id }, context) {
      const user = authContext(context);
      const { id: uid, role, username } = user as UserInfoTypes;

      try {
        if (role === "User") {
          const result = (await videoBlogContentModel.findByIdAndDelete({ _id: id, "createdBy.id": uid, createdBy: username })) as VideoBlogContext;
          return result;
        }
        if (role === "Admin") {
          const result = (await videoBlogContentModel.findByIdAndDelete(id)) as VideoBlogContext;
          return result;
        } else {
          throw new GraphQLError("cannot delete");
        }
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    //
  },
};

export default resolvers;
