import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { returnDate } from "../../helper/dateFormat";
import { useAppDispatch, useAppSelector } from "../../reduxTool/app/hooks";
import { setRedirectPage } from "../../reduxTool/features/auth/authSlice";
// import {
//   useCreateCommentMutation,
//   useDeleteCommentMutation,
//   useGetCommentQuery,
// } from "../../reduxTool/features/blog/blogApi";

import { useCreateCommentMutation,useDeleteCommentMutation } from "../../reduxTool/query/userApi";
import { useGetCommentsQuery } from "../../reduxTool/query/blogApi";
import { commentObject } from "../../types";

type propType = {
  articleId: string;
  author: { _id: string; first_name: string; last_name: string };
};

const Comments = (props: propType) => {

  const { articleId, author } = props;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: commentData } = useGetCommentsQuery(articleId);
  const [postComment, res] = useCreateCommentMutation();
  const [deleteComment,resp] = useDeleteCommentMutation()

  /////////////////////////////////////////////////////////////////////////////// 

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user_id);

  //////////////////////////////////////////////////////////////////////////////

  const [commentToName, setCommentToName] = useState(
    "Author (" + author.first_name + " " + author.last_name + " )"
  );
  const [commentTo, setCommentTo] = useState(author._id);
  
  const [comment, setComment] = useState("");

  /////////////////////////////////////////////////////////////////////////////

  const onClearComment = () => {
    setCommentTo(author._id);
    setCommentToName(
      "Author (" + author.first_name + " " + author.last_name + " )"
    );
    setComment("");
  };

  /////////////////////////////////////////////////////////////////////////////

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  /////////////////////////////////////////////////////////////////////////////

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { article: articleId, comment, commentTo, commentBy: user };
    if (comment !== "") {
      await postComment(body);
      onClearComment()
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  const onDeleteComment=async(commentId:string)=>{
      let check = window.confirm('This comment will be deleted permanently')
      if(check){
        let body = {articleId,commentId}
        await deleteComment(body)
      }
  }

  ///////////////////////////////////////////////////////////////////////////////

  const commentRef = useRef<HTMLHeadingElement|null>(null)
  const onScrollView =()=>{
    if(commentRef){
      commentRef.current?.scrollIntoView()
    }
    
  } 

  /////////////////////////////////////////////////////////////////////////////

 
  const onReplyClick =(v:commentObject)=>{
    onScrollView()
    setCommentTo(v.commentBy._id);
    setCommentToName( v.commentBy._id === author._id ? 
      'Author (' +  v.commentBy.first_name + " " + v.commentBy.last_name + ' )'
      : v.commentBy.first_name + " " + v.commentBy.last_name
    );
  }

  /////////////////////////////////////////////////////////////////////////////

   const onLoginRedirect=()=>{
       dispatch(setRedirectPage(articleId))
       navigate('/auth/login')
   }

  /////////////////////////////////////////////////////////////////////////
  return (
    <div className="container mt-4 px-5">
      <div className="d-flex flex-column">
        <form action="" className="mb-5 mt-2" onSubmit={onSubmit}>
          <h4 ref={commentRef}>
            Comment to -{" "}
            <span className="text-success"> @{commentToName} </span>
          </h4>
          <textarea
            style={{
              minWidth: "100%",
              outline: "none",
              padding: "15px",
              fontSize: "1.2rem",
            }}
            className="border border-primary rounded mb-1"
            placeholder="Start Typing..."
            name="commentBox"
            id="commentBox"
            cols={30}
            rows={5}
            disabled={!isAuthenticated}
            value={comment}
            onChange={onCommentChange}
           
          ></textarea>

          {isAuthenticated ? (
            <div className="d-flex">
              <input
                className="btn btn-secondary"
                style={{ padding: "5px 25px" }}
                type="submit"
                value="Add"
              />
              <button
                className="btn btn-light mx-3"
                type="button"
                onClick={onClearComment}
              >
                Clear
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" type="button" onClick={onLoginRedirect}>
              Login to comment
            </button>
          )}
        </form>

        {commentData
          ? commentData.comments.map((v, i) => (
              <div
                key={i}
                className="d-flex flex-column mb-4 px-3 py-4 bg-light rounded "
              >
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex justify-content-center align-items-center text-capitalize bg-primary"
                      style={{
                        borderRadius: "50%",
                        color: "white",
                        width: "25px",
                        height: "25px",
                        marginBottom: "15px",
                      }}
                    >
                      {v.commentBy.first_name.slice(0, 1)}
                    </div>
                    <p
                      className="text-primary text-capitalize  px-2"
                      style={{ fontSize: "1.3rem" }}
                    >
                      {v.commentBy._id === author._id
                        ? v.commentBy.first_name +
                          " " +
                          v.commentBy.last_name +
                          " (Author) - "
                        : v.commentBy.first_name +
                          " " +
                          v.commentBy.last_name +
                          " - "}
                    </p>
                  </div>
                  <p className="text-muted">{returnDate(v.commentTime)}</p>
                </div>

                <div style={{}} className="d-flex">
                  <p style={{ fontSize: "1.3rem" }}>
                    
                    <span
                      className="text-success"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {v.commentTo._id === author._id ? " @" +
                        v.commentTo.first_name +
                        " " +
                        v.commentTo.last_name +
                        " (Author) - ":
                        " @" +
                        v.commentTo.first_name +
                        " " +
                        v.commentTo.last_name +
                       " - " }
                    </span>
                    {v.comment} 
                  </p>
                </div>
                <div className="text-end">
                  {v.commentBy._id !== user ?
                  <span
                    onClick={() =>onReplyClick(v)}
                    className="mx-3 text-success"
                    style={{ cursor: "pointer" }}
                  >
                    reply
                  </span>
                  :""
                   }
                  {v.commentBy._id === user ? (
                    <span onClick={()=>onDeleteComment(v._id)} className="text-danger" style={{ cursor: "pointer" }}>
                      delete
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Comments;
