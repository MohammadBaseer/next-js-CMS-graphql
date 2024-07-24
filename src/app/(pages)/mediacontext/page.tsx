import Link from "next/link";
import styles from "./MediaContext.module.scss";

const MediaPost = () => {
  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/home"} className={styles.title_href}>
            Home
          </Link>
          /Context/Media Context
        </p>
      </div>

      <div className={styles.post_context_table_box}>
        <h1>Video Context List</h1>

        <div className={styles.add_button}>
          <button className={styles.button}>
            <span className="pi pi-plus">&nbsp;</span>Add New Video
          </button>
        </div>

        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Video</th>
              <th className={styles.th}>Title</th>
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
  );
};

export default MediaPost;
