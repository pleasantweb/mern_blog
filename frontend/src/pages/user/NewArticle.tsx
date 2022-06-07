import React from 'react'

const NewArticle = () => {
  return (
    <div className='container' style={{minHeight:'100vh'}}>
        <h1 className='text-center'>New Article</h1>
        <form action="" style={{marginBottom:'50px'}}>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"  />
        </div>
        <select className="form-select  mt-4" aria-label="Default select example">
            <option selected>Category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <div className="mb-3 mt-4">
            <label htmlFor="formFile" className="form-label">Blog Image</label>
            <input className="form-control" type="file" id="formFile" />
        </div>
        <div className="form-floating mb-5">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:'100px'}}></textarea>
            <label htmlFor="floatingTextarea2">Content...</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default NewArticle;