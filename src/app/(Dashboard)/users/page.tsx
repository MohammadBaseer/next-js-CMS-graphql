"use client";
import Link from "next/link";
import styles from "./Users.module.scss";
import { useSuspenseQuery } from "@apollo/client";
import { GET_USERS } from "@/queries/userQuery";
import { GetAllUsersType } from "@/types/customTypes/UsersCustomTypes";
import withAuth from "@/Component/RoutesProtect/withAuth";

const Users = () => {
  const { data } = useSuspenseQuery<GetAllUsersType>(GET_USERS);
  console.log("data:::", data);

  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/dashboard"} className={styles.title_href}>
            Dashboard
          </Link>
          /Context/Users
        </p>
      </div>
      <div className={styles.post_context_table_box}>
        <h1>Users</h1>

        <div className={styles.add_button}>
          <Link href={"/users/adduser"} className={styles.button}>
            <span className="pi pi-plus">&nbsp;</span>Add New User
          </Link>
        </div>

        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Registration Date</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {data.users.map((userData, index) => {
              const dateObject = new Date(userData.createdAt);
              const dateString = dateObject.toDateString();
              return (
                <tr className={styles.tr} key={index + 1}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    <img className={styles.image} src={userData.avatar.url} alt="nice" />
                  </td>
                  <td className={styles.td}>{userData.name}</td>
                  <td className={styles.td}>{userData.email}</td>
                  <td className={styles.td}>{dateString}</td>
                  <td className={styles.td}>{userData.role}</td>
                  <td className={styles.td}>N/A</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(Users);
