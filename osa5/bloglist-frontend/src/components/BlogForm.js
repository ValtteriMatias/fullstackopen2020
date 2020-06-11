import React from 'react'

const BlogForm = ({
    addBlog,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl,
    newBlogLikes,
    handleBlogTitleChange,
    handleBlogAuthorChange,
    handleBlogUrlChange,
    handleBlogLikesChange
}) => {

return (
  <div>
    <form onSubmit={addBlog}>
            <p>Title</p>
                <input
                    value={newBlogTitle}
                    onChange={handleBlogTitleChange}
                /> 
            <p>Author</p>
                <input
                    value={newBlogAuthor}
                    onChange={handleBlogAuthorChange}
                /> 
            <p>Url</p>
                <input
                    value={newBlogUrl}
                    onChange={handleBlogUrlChange}
                /> 
            <p>Likes</p>
                <input
                    value={newBlogLikes}
                    onChange={handleBlogLikesChange}
                />
            <br/>
            <br/>
        <button type="submit">save</button>
    </form>  
  </div>    
  )
}


  export default BlogForm


