"use client";
import Link from "next/link";
import styles from "./Profile.module.scss";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { useMutation } from "@apollo/client";
import { UPDATE_USERS } from "@/queries/userQuery";
import { ApolloError } from "apollo-server-errors";
import { convertToBase64 } from "@/util/convertToBase64";
import withAuth from "@/Component/RoutesProtect/withAuth";

type inputsType = {
  id: string;
  name: string;
  image: string;
};

const MyProfile = () => {
  const { userProfile, getUserProfile } = useContext(AuthContext);

  const [updateProfile, { loading }] = useMutation(UPDATE_USERS, {
    update(_, { data }) {
      console.log(data ? "success" : "Failed");
    },
  });

  let id = "";
  let name = "";
  let avatar = "";

  if (userProfile) {
    (id = userProfile?.id), (name = userProfile?.username);
    avatar = userProfile?.avatar;
  }

  const [inputs, setInputs] = useState<inputsType>({
    id: id,
    name: name,
    image: avatar,
  });

  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState("");
  //!
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file ? URL.createObjectURL(file) : null);

    let value = "";
    if (file) {
      const base64 = await convertToBase64(file);
      if (typeof base64 === "string") value = base64;
    }
    setUserPhoto(value);
    console.log("inputs", inputs);
  };

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateProfileFunction = async (e: any) => {
    e.preventDefault();
    try {
      const result = await updateProfile({
        variables: {
          editUserId: inputs.id,
          edits: {
            name: inputs.name,
            avatar: {
              url: userPhoto,
            },
          },
        },
      });

      console.log("result Data:::::>>>", result);
      if (result.data) {
        if (result.data.editUser.refreshToken) {
          console.log(" yes it work ");
          localStorage.setItem("token", result.data.editUser.refreshToken);
          getUserProfile();
        }

        if (result.errors) {
          console.error("Mutation errors:", result.errors);
          // setError("An error occurred during login.");
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

  useEffect(() => {
    if (userProfile) {
      setInputs({
        id: userProfile.id,
        name: userProfile.username,
        image: userProfile.avatar,
      });
    }
  }, [userProfile]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.page_title}>
          <p>
            <span className="pi pi-home">&nbsp;</span>
            <Link href={"/home"} className={styles.title_href}>
              Home
            </Link>
            /My Profile
          </p>
        </div>
        <div className={styles.post_context_table_box}>
          <h1>My Profile</h1>
          <br />

          <form onSubmit={updateProfileFunction}>
            <div className={styles.row}>
              <div className={styles.col_25}>
                <div className={styles.p_image_box}>
                  <label className={styles.label} htmlFor="profile">
                    <img className={styles.p_image} src={selectImage ? selectImage : inputs.image} alt="" />
                  </label>
                </div>
              </div>
              <div className={styles.col_75}>
                <input className={styles.input} type="file" id="profile" name="image" placeholder="Your name.." style={{ display: "none" }} onChange={handleFileChange} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.col_25}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
              </div>
              <div className={styles.col_75}>
                <input className={styles.input} type="text" id="name" name="name" placeholder="Your name.." value={inputs.name} onChange={getInputValues} />
              </div>
            </div>
            <br />
            <div className={styles.row}>
              <button className={styles.input} type="submit" value="Submit">
                {loading ? "Updating..." : " Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MyProfile);
