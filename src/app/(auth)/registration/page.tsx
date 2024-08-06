"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Registration.module.scss";
import Link from "next/link";
import avatar from "../../../assets/img/registrationFormAvatar/addAvatar.png";
import Image from "next/image";

const Registration = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [newUserCredential, setNewUserCredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUserCredential((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const userRegisterFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nem: ", newUserCredential.name);
    console.log("Email: ", newUserCredential.email);
    console.log("Password: ", newUserCredential.password);
    setError("New User Created");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file ? URL.createObjectURL(file) : null);
  };

  useEffect(() => {
    //! This is only one way that I found to change the page title of client component, but No warranty for SEO
    document.title = "Register";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Register</h1>
        </div>
        <form className={styles.form} onSubmit={userRegisterFunction}>
          <hr className={styles.hr} />
          <div>
            <label htmlFor="name">Username</label>
            <input className={styles.input_field} type="text" id="name" name="name" value={newUserCredential.name} autoComplete="username" onChange={getInputValues} />
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={newUserCredential.email} autoComplete="username" required  onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={newUserCredential.password}  autoComplete="current-password" onChange={getInputValues} />
          </div>

          <div>
            <label className={styles.file} htmlFor="file">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add an avatar</span>
            </label>
            <input style={{ display: "none" }} type="file" id="file" name="avatar" onChange={handleFileChange} />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <p>
              Do you have already an account? <Link href="/login">Login </Link>
            </p>
          </div>
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
