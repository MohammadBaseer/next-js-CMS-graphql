// ! To Delete Image From Cloudinary

import cloudinary from "@/config/cloudinary";

const removeCloudinaryImage = async (imageID: string) => {
  try {
    const result = await cloudinary.uploader.destroy(imageID);
    if (result.result === "ok") {
      console.log("Image deleted successfully:", result);
    } else {
      console.error("Error deleting image:", result);
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

export { removeCloudinaryImage };
