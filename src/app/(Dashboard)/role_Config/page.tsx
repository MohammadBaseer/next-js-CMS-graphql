"use client";
import Link from "next/link";
import styles from "./Role.module.scss";
import { useSuspenseQuery } from "@apollo/client";
import { GET_USERS } from "@/queries/userQuery";
import { GetAllUsersType } from "@/types/customTypes/UsersCustomTypes";
import withAuth from "@/Component/RoutesProtect/withAuth";

const Users = () => {
  const { data } = useSuspenseQuery<GetAllUsersType>(GET_USERS);

  const dataCount1 = data.users.filter((userRole) => userRole.role === "Admin").length;

  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/dashboard"} className={styles.title_href}>
            Dashboard
          </Link>
          /Context/Users Role Configuration
        </p>
      </div>
      <div className={styles.post_context_table_box}>
        <h1>Users Role Configuration</h1>

        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {data.users.map((userData, index) => {
              // const roleCount = userData.role === "Admin";
              // console.log("roleCount", typeof roleCount);
              return (
                <tr className={styles.tr} key={index + 1}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    <img className={styles.image} src={userData.avatar.url} alt="nice" />
                  </td>
                  <td className={styles.td}>{userData.name}</td>
                  <td className={styles.td}>{userData.role}</td>
                  <td className={styles.td}>
                    {userData.role === "User" || userData.role === "Editor" ? (
                      <Link href={`/role_Config/edit/${userData._id}`} className={styles.ref}>
                        <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                      </Link>
                    ) : dataCount1 === 1 ? (
                      ""
                    ) : (
                      <Link href={`/role_Config/edit/${userData._id}`} className={styles.ref}>
                        <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                      </Link>
                    )}
                  </td>
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
