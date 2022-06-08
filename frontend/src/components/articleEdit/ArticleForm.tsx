import React from "react";
import { blogData } from "../../types";
import CategoryPost from "../parts/CategoryPost";
import { onFileChange } from "./helper";

type propType = {
  blog: blogData;
  setBlog: React.Dispatch<React.SetStateAction<blogData>>;
};

const ArticleForm = (props: propType) => {
  const { blog, setBlog } = props;
  const { title, category, blogImage, content } = blog;

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlog((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onBlogImageChange =async (e:React.ChangeEvent<HTMLInputElement>) => {
    let files : FileList | null = e.currentTarget.files
    if(files !== null){
        if(files.length >0){
            const imageUrl =await onFileChange(files[0])
            setBlog(prev=>({
                ...prev,[e.target.name]:imageUrl
            }))
        }
    }
  };
const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(blog);
    
}

  return (
    <form action="" style={{ marginBottom: "50px" }} onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <select
        className="form-select mt-5"
        name="category"
        onChange={onCategoryChange}
        aria-label="Default select example"
        value={category}
      >
        <CategoryPost />
      </select>
      <div className="mb-3 mt-5">
        <label htmlFor="formFile" className="form-label">
          Blog Image
        </label>
        <input
          className="form-control"
          name="blogImage"
          onChange={onBlogImageChange}
          type="file"
          id="formFile"
        />
      </div>
      <div className="form-floating mb-5 mt-5">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          name="content"
          onChange={onContentChange}
        ></textarea>
        <label htmlFor="floatingTextarea2">Content...</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
