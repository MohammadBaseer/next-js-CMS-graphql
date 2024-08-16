"use client";
import Link from "next/link";
import styles from "./PostContext.module.scss";
import "primeicons/primeicons.css";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { DELETE_POST_CONTEXT, GET_POST_CONTEXT } from "@/queries/postContextQuery";
import { GetAllBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import withAuth from "@/Component/RoutesProtect/withAuth";
import { GetSingleUsersType } from "@/types/customTypes/UsersCustomTypes";
import { GET_USERS_BY_ID } from "@/queries/userQuery";

const PostContext = () => {
  const { userProfile } = useContext(AuthContext);

  const { data: userData } = useSuspenseQuery<GetSingleUsersType>(GET_USERS_BY_ID, {
    variables: {
      userId: userProfile?.id,
    },
  });
  const userRole = userData.user.role;
  const user_id = userData.user._id;

  const { data, refetch } = useSuspenseQuery<GetAllBlogContextType>(GET_POST_CONTEXT);

  const [deleteBlogContext] = useMutation(DELETE_POST_CONTEXT);

  const deleteBlogHandler = (id: string) => async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await deleteBlogContext({
        variables: {
          deleteBlogContextId: id,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete video context", error);
    }
  };
  useEffect(() => {
    document.title = "Post Blog List";
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.page_title}>
          <p>
            <span className="pi pi-home">&nbsp;</span>
            <Link href={"/dashboard"} className={styles.title_href}>
              Home
            </Link>
            /Context/Blog Context
          </p>
        </div>
        <div className={styles.post_context_table_box}>
          <h1>Blogs Content List</h1>
          <div className={styles.add_button}>
            <Link href={"/blogcontext/addblog"} className={styles.button}>
              <span className="pi pi-plus">&nbsp;</span>Add New Post
            </Link>
          </div>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Created By</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {data.blogContexts
                .filter((blog) => (userRole === "User" ? blog.createdBy.id === userProfile?.id : blog))
                .map((blog, index) => {
                  const dateObject = new Date(blog.createdAt);
                  const dateString = dateObject.toDateString();
                  return (
                    <tr className={styles.tr} key={index}>
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>
                        <img className={styles.image} src={blog.photo.url} alt="nice" />
                      </td>
                      <td className={styles.td}>{blog.title}</td>
                      <td className={styles.td}>{blog.description.slice(0, 50) + "..."}</td>
                      <td className={styles.td}>{blog.createdBy.username}</td>
                      <td className={styles.td}>{dateString}</td>
                      <td className={styles.td}>
                        <Link href={`/blogcontext/edit/${blog._id}`} className={styles.ref}>
                          <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                        </Link>
                        &nbsp;
                        {(blog.createdBy.id === user_id && userRole === "Editor") || userRole === "User" ? <i className={`pi pi-trash ${styles.delete_icon}`} onClick={deleteBlogHandler(blog._id)}></i> : userRole === "Admin" ? <i className={`pi pi-trash ${styles.delete_icon}`} onClick={deleteBlogHandler(blog._id)}></i> : " "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {data.blogContexts.length === 0 ? <h1>Not Found</h1> : ""}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PostContext);
