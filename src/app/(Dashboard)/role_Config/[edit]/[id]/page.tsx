"use client";
import styles from "./EditUser.module.scss";
import { useState } from "react";
import Link from "next/link";
import withAuth from "@/Component/RoutesProtect/withAuth";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { GET_USERS_BY_ID, UPDATE_USERS } from "@/queries/userQuery";
import { GetSingleUsersType } from "@/types/customTypes/UsersCustomTypes";
import { ApolloError } from "apollo-server-errors";

type ParamsPropsType = {
  params: {
    id: string;
  };
};

const UpdateUser = ({ params: { id } }: ParamsPropsType) => {
  const { data, refetch } = useSuspenseQuery<GetSingleUsersType>(GET_USERS_BY_ID, {
    variables: {
      userId: id,
    },
  });

  const [roleUpdate, { loading }] = useMutation(UPDATE_USERS, {
    update(_, { data }) {
      console.log("Update data:::", data);
    },
  });

  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<any>(data.user.role);

  const handleChange = (event: any) => {
    setRole(event.target.value);
  };

  const updateRoleFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await roleUpdate({
        variables: {
          editUserId: id,
          edits: {
            role,
          },
        },
      });

      console.log("result Data:::::>>>", result);
      if (result.data) {
        refetch;
        if (result.errors) {
          setError("Mutation errors");
          console.error("Mutation errors:", result.errors);
        }
      }
    } catch (GraphQLError) {
      const err = GraphQLError as ApolloError;
      console.log("GraphQL Error:", err.message);
      console.log("Error Details:", err.graphQLErrors);
      console.log("Network Error:", err.networkError);
      alert("profile couldn't be updated");
    }
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
          /Update User
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Update User</h1>
        <div className={styles.hr}></div>
        <form className={styles.form} onSubmit={updateRoleFunction}>
          <div>
            <label className={styles.file} htmlFor="addBlogFile">
              <img className={styles.avatar} src={data.user.avatar.url} width={80} height={80} alt="user" />
            </label>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input className={styles.input_field} type="text" id="name" name="name" readOnly value={data.user.name} />
          </div>

          <div>
            <label htmlFor="roll">Roles</label>
            <select
              name="roll"
              className={styles.input_field}
              value={role} // Controlled by state
              onChange={handleChange} // Handle changes
            >
              <option value="" disabled>
                Assign User Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(UpdateUser);
