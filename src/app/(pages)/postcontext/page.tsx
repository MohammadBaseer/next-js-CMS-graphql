import Link from "next/link";
import styles from "./PostContext.module.scss";
import "primeicons/primeicons.css";

const PostContext = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.page_title}>
          <p>
            <span className="pi pi-home">&nbsp;</span>
            <Link href={"/home"} className={styles.title_href}>
              Home
            </Link>
            /Context/Post Context
          </p>
        </div>
        <div className={styles.post_context_table_box}>
          <h1>Post Content List</h1>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <td className={styles.td}>1</td>
                <td className={styles.td}>
                  <img className={styles.image} src="https://www.blog.de/wp-content/uploads/2024/07/Vintage-trifft-Modern.jpg" alt="nice" />
                </td>
                <td className={styles.td}>City of Berlin</td>
                <td className={styles.td}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus inventore cum sunt nemo? Quo maxime similique molestias eum quos pariatur debitis. Aut voluptatum dignissimos eius? Quod unde quam molestias soluta est, facere dolorem incidunt assumenda velit veniam suscipit excepturi earum.</td>
                <td className={styles.td}>20.5.2024</td>
                <td className={styles.td}>
                  <Link href={"/"} className={styles.ref}>
                    <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                  </Link>
                  &nbsp;
                  <Link href={"/"} className={styles.ref}>
                    <i className={`pi pi-trash ${styles.delete_icon}`}></i>
                  </Link>
                </td>
              </tr>

              <tr className={styles.tr}>
                <td className={styles.td}>1</td>
                <td className={styles.td}>
                  <img className={styles.image} src="https://www.blog.de/wp-content/uploads/2024/07/Vintage-trifft-Modern.jpg" alt="nice" />
                </td>
                <td className={styles.td}>City of Berlin</td>
                <td className={styles.td}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus inventore cum sunt nemo? Quo maxime similique molestias eum quos pariatur debitis. Aut voluptatum dignissimos eius? Quod unde quam molestias soluta est, facere dolorem incidunt assumenda velit veniam suscipit excepturi earum.</td>
                <td className={styles.td}>20.5.2024</td>
                <td className={styles.td}>
                  <Link href={"/"} className={styles.ref}>
                    <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                  </Link>
                  &nbsp;
                  <Link href={"/"} className={styles.ref}>
                    <i className={`pi pi-trash ${styles.delete_icon}`}></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostContext;
