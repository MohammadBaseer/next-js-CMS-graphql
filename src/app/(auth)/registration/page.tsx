"use client";
import { useContext, useEffect } from "react";
import styles from "./Registration.module.scss";
import Link from "next/link";
import avatar from "../../../assets/img/registrationFormAvatar/addAvatar.png";
import Image from "next/image";
import { AuthContext } from "@/context/authContext";
import { isToken } from "@/token/tokenCheck";
import { useRouter } from "next/navigation";

const Registration = () => {
  const { userRegisterFunction, getInputValuesFunction, registerHandleFileChange, registrationLoader, newUserCredential, selectImage, error } = useContext(AuthContext);
  const router = useRouter();
  const token = isToken();
  if (token) {
    router.push("/");
  }

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
            <input className={styles.input_field} type="text" id="name" name="name" value={newUserCredential.name} autoComplete="username" onChange={getInputValuesFunction} />
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={newUserCredential.email} autoComplete="username" required onChange={getInputValuesFunction} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={newUserCredential.password} autoComplete="current-password" onChange={getInputValuesFunction} />
          </div>

          <div>
            <label className={styles.file} htmlFor="file">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add an avatar</span>
            </label>
            <input style={{ display: "none" }} type="file" id="file" name="avatar" onChange={registerHandleFileChange} />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <p>
              Do you have already an account? <Link href="/login">Login </Link>
              <br />
              Go Home? <Link href="/">Home </Link>
            </p>
          </div>
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {registrationLoader ? "Creating..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
