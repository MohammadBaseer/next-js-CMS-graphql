"use client";
import styles from "./AddBlog.module.scss";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ApolloError, useMutation } from "@apollo/client";
import { INSERT_POST_CONTEXT } from "@/queries/postContextQuery";
import { convertToBase64 } from "@/util/convertToBase64";
import withAuth from "@/Component/RoutesProtect/withAuth";

type BlogInputTypes = {
  title: string;
  description: string;
  photo: string;
};
const AddNewBlog = () => {
  //! ------
  const [insertBlogContext, { loading }] = useMutation(INSERT_POST_CONTEXT);
  //! ------
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [blogInput, setBlogInput] = useState<BlogInputTypes>({
    title: "",
    description: "",
    photo: "",
  });
  //! =====================
  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    setBlogInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //! =====================
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file ? URL.createObjectURL(file) : null);

    let value = "";
    if (file) {
      const base64 = await convertToBase64(file);
      if (typeof base64 === "string") value = base64;
    }
    setBlogInput((prev) => {
      return {
        ...prev,
        photo: value,
      };
    });
  };
  //! =====================
  const addBlogFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { photo } = blogInput;
      const result = await insertBlogContext({
        variables: {
          newBlogContextData: {
            title: blogInput.title,
            description: blogInput.description,
            photo: {
              url: photo,
            },
          },
        },
      });
      console.log("Successfully Added", result);
      // ! reset the state after insert
      setBlogInput({ title: "", description: "", photo: "" });
      setSelectImage(null);
    } catch (GraphQLError) {
      const err = GraphQLError as ApolloError;
      console.log("Network Error:", err.message);
      alert(err.message);
    }
  };
  //! =====================
  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/home"} className={styles.title_href}>
            Home
          </Link>
          /Context/
          <Link href={"/blogcontext"} className={styles.title_href}>
            Blog Context
          </Link>
          /Add New Blog
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Add New Blog</h1>
        <div className={styles.hr}></div>
        <form className={styles.form} method="mu" onSubmit={addBlogFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add Blog Photo</span>
            </label>
            <input style={{ display: "none" }} type="file" id="addBlogFile" name="photo" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input className={styles.input_field} type="text" id="title" name="title" value={blogInput.title} onChange={getInputValues} placeholder="Title" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea className={styles.input_field} id="description" name="description" value={blogInput.description} onChange={getInputValues}></textarea>
          </div>
          {/* {error && <div className={styles.error}>{error}</div>} */}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {loading ? "Adding Blog..." : "Add New Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddNewBlog);
