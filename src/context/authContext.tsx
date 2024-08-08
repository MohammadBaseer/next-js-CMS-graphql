import { LOGIN_USER, REGISTER_USER } from "@/queries/userQuery";
import { convertToBase64 } from "@/util/convertToBase64";
import { useMutation } from "@apollo/client";
import { ApolloError } from "apollo-server-errors";
import React, { ChangeEvent, createContext, FormEvent, ReactNode, useState } from "react";

type AuthContextTypes = {
  // ! Registration Elements Types
  registrationLoader: boolean;
  newUserCredential: { name: string; email: string; password: string; avatar: string };
  selectImage: string | null;
  error: string | null;
  userRegisterFunction: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  getInputValuesFunction: (e: ChangeEvent<HTMLInputElement>) => void;
  registerHandleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // ! Login Elements Types
  loginCredential: { email: string; password: string };
  loginLoader: boolean;
  userLoginFunction: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  getLoginInputValues: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthContextInitialValue: AuthContextTypes = {
  // ! Registration Initial Value Elements
  registrationLoader: false,
  newUserCredential: { name: "", email: "", password: "", avatar: "" },
  selectImage: null,
  error: null,
  userRegisterFunction: () => {
    throw new Error("The userRegisterFunction Error");
  },
  getInputValuesFunction: () => {
    throw new Error("The setNewUserCredential Error");
  },
  registerHandleFileChange: () => {
    throw new Error("The setNewUserCredential Error");
  },
  // ! Login Initial Value Elements
  loginCredential: { email: "", password: "" },
  loginLoader: false,
  userLoginFunction: () => {
    throw new Error("The userRegisterFunction Error");
  },
  getLoginInputValues: () => {
    throw new Error("The setNewUserCredential Error");
  },
};

export const AuthContext = createContext<AuthContextTypes>(AuthContextInitialValue);

type childrenPropsTypes = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: childrenPropsTypes) => {
  //! ================================== User Registration Part
  // ^ Registration Query
  const [registerUser, { loading: registrationLoader }] = useMutation(REGISTER_USER, {
    update(_, { data }) {
      console.log("data:::", data);
    },
  });
  // ^ -------
  //^ Setter
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [newUserCredential, setNewUserCredential] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  // ^ --------

  // ^ Get Input Values Function
  const getInputValuesFunction = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUserCredential((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // ^ -----
  // ^ Handel File Function
  const registerHandleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectImage(file ? URL.createObjectURL(file) : null);
    let value = "";
    if (file) {
      const base64 = await convertToBase64(file);
      if (typeof base64 === "string") value = base64;
    }
    setNewUserCredential((prev) => {
      return {
        ...prev,
        avatar: value,
      };
    });
  };
  //^ -----

  // ^ User Registration Function
  const userRegisterFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { avatar, name, email, password } = newUserCredential;
      const result = await registerUser({
        variables: {
          newUserData: {
            name,
            email,
            password,
            avatar: {
              url: avatar,
            },
          },
        },
      });
      setNewUserCredential({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
      setError("");
      setSelectImage(null);
    } catch (error) {
      const err = error as ApolloError;
      console.log("Network Error:", err.message);
      alert(err.message);
      setError(err.message);
    }
  };
  // ? ================================== End User Registration Part

  // ! ================================== User Login Part
  //!SECTION
  const [loginUser, { loading: loginLoader }] = useMutation(LOGIN_USER, {
    update(_, { data }) {
      console.log(data);
    },
  });
  //!SECTION

  // const [error, setError] = useState<string | null>(null);
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const getLoginInputValues = (e: ChangeEvent<HTMLInputElement>) => {
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
    } catch (error) {
      const err = error as ApolloError;
      console.log("Network Error:", err.message);
      alert(err.message);
      setError(err.message);
    }
  };
  // ? ================================== End User Login Part

  return (
    <AuthContext.Provider
      value={{
        userRegisterFunction,
        getInputValuesFunction,
        registerHandleFileChange,
        registrationLoader,
        newUserCredential,
        selectImage,
        error,
        userLoginFunction,
        getLoginInputValues,
        loginCredential,
        loginLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
