"use client";
import styles from "./EditPostBlogContext.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { ApolloError, useMutation, useSuspenseQuery } from "@apollo/client";
import { GET_POST_CONTEXT_BY_ID, UPDATE_POST_CONTEXT } from "@/queries/postContextQuery";
import { convertToBase64 } from "@/util/convertToBase64";
import { GetSingleBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import withAuth from "@/Component/RoutesProtect/withAuth";

type ParamsPropsType = {
  params: {
    id: string;
  };
};

type BlogInputTypes = {
  title: string;
  description: string;
  photo: {
    url: string;
  };
};
const EditBlogContext = ({ params: { id } }: ParamsPropsType) => {
  //!SECTION

  const { data: fetchData } = useSuspenseQuery<GetSingleBlogContextType>(GET_POST_CONTEXT_BY_ID, {
    variables: {
      blogContextId: id,
    },
  });

  //! End SECTION

  //! ------
  // const [insertBlogContext, { error: fetchError, data }] = useMutation(INSERT_POST_CONTEXT);
  //! ------
  const [selectImage, setSelectImage] = useState<string | File | string | null>(null);
  const [error, setError] = useState<string>("");
  const [blogInput, setBlogInput] = useState<BlogInputTypes>({
    title: fetchData.blogContext.title,
    description: fetchData.blogContext.description,
    photo: {
      url: fetchData.blogContext.photo.url,
    },
  });
  //! =====================
  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    setBlogInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  //! To Update/Edit The Data by ID
  const [editBlog, { loading, error: GraphQLError }] = useMutation(UPDATE_POST_CONTEXT, {
    onCompleted: (data) => {},
    onError: (error) => {
      setError(`Submission error! ${error.message}`);
    },
  });

  //! =====================
  const handleModelChange = (description: string) => {
    setBlogInput((prev) => {
      return { ...prev, description };
    });
  };
  //! =====================
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | any = e.target.files?.[0];

    if (e.target.files!.length === 0) {
      URL.revokeObjectURL(selectImage as string);
      setSelectImage(fetchData.blogContext.photo.url);
    }
    if (e.target.files!.length === 1) {
      setSelectImage(URL.createObjectURL(file));
    } else {
      URL.revokeObjectURL(selectImage as string);
      setSelectImage(fetchData.blogContext.photo.url);
    }

    //FIXME -
    //REVIEW -  //! write an statement to handel the file if the file.length is 0
    let value = "";
    if (file) {
      const base64 = await convertToBase64(file);
      if (typeof base64 === "string") value = base64;
    }
    setBlogInput((prev) => {
      return {
        ...prev,
        photo: {
          url: value,
        },
      };
    });
  };

  //! =====================
  const editBlogFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { url } = blogInput.photo;
      const result = await editBlog({
        variables: {
          editBlogContextId: id,
          edits: blogInput,
        },
      });
      console.log("Successfully Added");
      // ! reset the state after insert
    } catch (GraphQLError) {
      const err = GraphQLError as ApolloError;
      console.log("GraphQL Error:", err);
      console.log("Error Details:", err.graphQLErrors);
      console.log("Network Error:", err.networkError);
      alert("Blog couldn't be updated");
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
          /Edit Blog
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Edit Blog</h1>
        <div className={styles.hr}></div>
        <form className={styles.form} method="mu" onSubmit={editBlogFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <img className={styles.avatar} src={(selectImage !== null ? selectImage : blogInput.photo.url) as string} width={80} height={80} alt={blogInput.title} />
              <span>Change Blog Photo</span>
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
          {error && <div className={styles.error}>{error}</div>}
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

export default withAuth(EditBlogContext);
