"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import avatar from "../../../assets/img/registrationFormAvatar/addAvatar.png";
import Image from "next/image";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [newUserCredential, setNewUserCredential] = useState({
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
    console.log("Email: ", newUserCredential.email);
    console.log("Password: ", newUserCredential.password);
    setError("New User Created");
  };

  useEffect(() => {
    //! This is only one way that I found to change the page title of client component, but No warranty for SEO
    document.title = "Login";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main_box}>
        <div className={styles.reg_head}>
          <h1>Login</h1>
        </div>
        <form className={styles.form} onSubmit={userRegisterFunction}>
          <hr className={styles.hr} />


          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={newUserCredential.email} autoComplete="username" required  onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={newUserCredential.password}  autoComplete="current-password" onChange={getInputValues} />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div>
            <p>
              Do you want to Register? <Link href="/registration">Registration </Link>
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

export default Login;
