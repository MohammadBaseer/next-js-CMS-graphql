"use client";
import { useContext, useEffect, useLayoutEffect } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { isToken } from "@/token/tokenCheck";

const Login = () => {
  const { userLoginFunction, getLoginInputValues, loginCredential, loginLoader, error } = useContext(AuthContext);

  const router = useRouter();

  useLayoutEffect(() => {
    const token = isToken();
    if (token) {
      router.push("/");
    }
  }, []);

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
        <form className={styles.form} onSubmit={userLoginFunction}>
          <hr className={styles.hr} />

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={loginCredential.email} autoComplete="username" required onChange={getLoginInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={loginCredential.password} autoComplete="current-password" onChange={getLoginInputValues} />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div>
            <p>
              Do you want to Register? <Link href="/registration">Registration </Link>
              <br />
              Go Home? <Link href="/">Home </Link>
            </p>
          </div>
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {loginLoader ? "Logging..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
