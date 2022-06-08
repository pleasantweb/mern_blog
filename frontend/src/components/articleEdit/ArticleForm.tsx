import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../reduxTool/app/hooks";
import { useBlogCreateMutation } from "../../reduxTool/features/blog/blogApi";
import { blogState } from "../../types";
import CategoryPost from "../parts/CategoryPost";
import { onFileChange } from "./helper";

type propType = {
  blog: blogState;
  setBlog: React.Dispatch<React.SetStateAction<blogState>>;
};

const ArticleForm = (props: propType) => {
  const navigate = useNavigate()
  const author = useAppSelector((state) => state.auth.user_id);
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
  const onBlogImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: FileList | null = e.currentTarget.files;
    if (files !== null) {
      if (files.length > 0) {
        const imageUrl = await onFileChange(files[0]);
        setBlog((prev) => ({
          ...prev,
          [e.target.name]: imageUrl,
        }));
      }
    }
  };

  const [postBlog, res] = useBlogCreateMutation();
  const { isSuccess, isError, data } = res;

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>,status: string) => {
    e.preventDefault();
    console.log(blog);
    const body = { author, title, blogImage, category, content, status };
    await postBlog(body);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/profile/${author}`)
    }
  }, [isSuccess]);

  return (
    <form action="" style={{ marginBottom: "50px" }} onSubmit={e=>e.preventDefault()}>
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
          placeholder="Content..."
          id="floatingTextarea2"
          style={{ height: "100px" }}
          name="content"
          onChange={onContentChange}
        ></textarea>
        
      </div>
      <div>
        <button
          onClick={(e) => onSubmit(e, "draft")}
          type="submit"
          className="btn btn-primary"
        >
          Draft
        </button>
        <button
          onClick={(e) => onSubmit(e, "publish")}
          type="submit"
          className="btn btn-primary mx-4"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
