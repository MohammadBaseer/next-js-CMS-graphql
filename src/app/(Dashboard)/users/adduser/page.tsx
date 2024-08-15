"use client";
import styles from "./AddUser.module.scss";
import avatar from "../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import withAuth from "@/Component/RoutesProtect/withAuth";

const AddNewUser = () => {
  const { userRegisterFunction, getInputValuesFunction, registerHandleFileChange, registrationLoader, newUserCredential, selectImage, error } = useContext(AuthContext);

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
        <form className={styles.form} onSubmit={userRegisterFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <Image className={styles.avatar} src={selectImage !== null ? selectImage : avatar} width={80} height={80} alt="user" />
              <span>Add User Photo</span>
            </label>
            <input style={{ display: "none" }} type="file" id="addBlogFile" name="avatar" onChange={registerHandleFileChange} />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input className={styles.input_field} type="text" id="name" name="name" value={newUserCredential.name} onChange={getInputValuesFunction} placeholder="Enter User Name" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input className={styles.input_field} type="email" id="email" name="email" value={newUserCredential.email} onChange={getInputValuesFunction} placeholder="Enter User Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className={styles.input_field} type="password" id="password" name="password" value={newUserCredential.password} onChange={getInputValuesFunction} placeholder="Password" />
          </div>

          {/* <div>
            <label htmlFor="roll">Roles</label>
            <select name="roll" className={styles.input_field} onChange={getInputValues}>
              <option>Assign User Role</option>
              <option value="admin">Admin</option>
              <option value="modifier">Modifier</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div> */}

          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {registrationLoader ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddNewUser);
