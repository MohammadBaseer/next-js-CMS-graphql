"use client";
import styles from "./AddBlog.module.scss";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/css/plugins/code_view.min.css";
// import "froala-editor/js/plugins.pkgd.min.js";

const AddNewBlog = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [blogInput, setBlogInput] = useState({
    title: "",
    description: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    setBlogInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleModelChange = (description: string) => {
    setBlogInput((prev) => {
      return { ...prev, description };
    });
  };

  const addBlogFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title: ", blogInput.title);
    console.log("desorption: ", blogInput.description);
    setError("New Blog Created");

    console.log("title ::::>>>", blogInput.title);
    console.log("Desc ::::>>>", blogInput.description);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file ? URL.createObjectURL(file) : null);
  };

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
        <form className={styles.form} onSubmit={addBlogFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add Blog Photo</span>
            </label>
            <input style={{ display: "none" }} type="file" id="addBlogFile" name="avatar" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input className={styles.input_field} type="text" id="title" name="title" value={blogInput.title} onChange={getInputValues} placeholder="Title" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            {/* <textarea className={styles.input_field} id="description" name="description" value={blogInput.description} onChange={getInputValues}></textarea> */}
            <FroalaEditor
              tag="textarea"
              model={blogInput.description}
              onModelChange={handleModelChange}
              config={{
                placeholderText: "Description",
                heightMin: 300,
                heightMax: 600,
              }}
            />{" "}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              Add New Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBlog;
