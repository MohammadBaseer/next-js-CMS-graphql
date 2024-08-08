"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/queries/userQuery";
import { ApolloError } from "apollo-server-errors";

const Login = () => {
  //!SECTION
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      console.log(data);
    },
  });
  //!SECTION

  const [error, setError] = useState<string | null>(null);
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredential((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //!SECTION
  const userLoginFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await loginUser({
        variables: { inputData: loginCredential },
      });
      setLoginCredential({
        email: "",
        password: "",
      });
      setError("");

      console.log("result::::", result);
    } catch (error) {
      const err = error as ApolloError;
      console.log("Network Error:", err.message);
      alert(err.message);
      setError(err.message);
    }
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
        <form className={styles.form} onSubmit={userLoginFunction}>
          <hr className={styles.hr} />

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={loginCredential.email} autoComplete="username" required onChange={getInputValues} />
          </div>

          <div className={styles.password}>
            <label htmlFor="password">password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={loginCredential.password} autoComplete="current-password" onChange={getInputValues} />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div>
            <p>
              Do you want to Register? <Link href="/registration">Registration </Link>
            </p>
          </div>
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {loading ? "Logging..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
