"use client";
import styles from "./AddUser.module.scss";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AddNewUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    setCredential((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addBlogFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("User Created");
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
          <Link href={"/users"} className={styles.title_href}>
            Users
          </Link>
          /Add New User
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Add New User</h1>
        <div className={styles.hr}></div>
        <form className={styles.form} onSubmit={addBlogFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add User Photo</span>
            </label>
            <input style={{ display: "none" }} type="file" id="addBlogFile" name="avatar" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="name">User Name</label>
            <input className={styles.input_field} type="text" id="name" name="name" value={credential.name} onChange={getInputValues} placeholder="Enter User Name" />
          </div>

          <div>
            <label htmlFor="email">User Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={credential.email} onChange={getInputValues} placeholder="Enter User Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={credential.password} onChange={getInputValues} placeholder="Password" />
          </div>

          <div>
            <label htmlFor="roll">Roles</label>
            <select name="roll" className={styles.input_field} onChange={getInputValues}>
              <option>Assign User Role</option>
              <option value="admin">Admin</option>
              <option value="modifier">Modifier</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              Add New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
