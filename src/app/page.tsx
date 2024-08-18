"use client";
import WebNavbar from "@/Component/WebNavbar/WebNavbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <WebNavbar />
      <div>
        <h1>Welcome To The Next- js- 14 App - GraphQL 'CMS' Project</h1>
        <h3>User Base Roles: </h3>
        <br />
        <h4> Admin: Full Access</h4>
        ---{">"} - Add Post Blogs ---{">"} Update Post Blogs ---{">"} Delete Post Blogs
        <br /> ---{">"} - Add Video Blogs ---{">"} Update Video Blogs ---{">"} Delete Video Blogs
        <br /> ---{">"} - Add User ---{">"} Change User Roles
        <br /> ---{">"} - Profile Update
        <br />
        <br />
        <h4> Editor: Only Edit the Data</h4>
        ---{">"} - Add Post Blogs ---{">"} Update Post Blogs ---{">"} only Delete Own Post Blogs
        <br /> ---{">"} - Add Video Blogs ---{">"} Update Video Blogs ---{">"} only Delete Own Video Blogs
        <br /> ---{">"} - Profile Update
        <br />
        <br />
        <h4> Other Users: Access to own Data</h4>
        ---{">"} - Add Own Post Blogs ---{">"} Update Own Post Blogs ---{">"} Delete Own Post Blogs
        <br /> ---{">"} - Add Own Video Blogs ---{">"} Update Own Video Blogs ---{">"} Delete Own Video Blogs
        <br /> ---{">"} - Profile Update
        <br />
      </div>{" "}
    </>
  );
}
