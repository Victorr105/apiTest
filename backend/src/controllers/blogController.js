// This controller will have all blogs logic
// import your model
import Blog from "../models/blogModels.js";
// view all blogs
async function getAllBlogs(req,res) {

    try {
        const blogs = await Blog.find().populate("createdBy","name email").sort({ createdAt: -1 });
        // 200 ok
        res.status(200).json(blogs)
     
    } catch (error) {
        // 500 server error
        res.status(500).json({message : error.message})
    }
    
}
// get one blog 

async function getOneBlogs(req,res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        // incase blog is found return 200 with the blog 
        // 200 ok
        res.status(200).json(blog)

        
    } catch (error) {
        // 500 server error
       res.status(500).json({message : error.message})
    }
}

async function createBlog(req,res){
    try {
        const blog = await Blog.create(req.body)
        // send a res.status(201) => Data created successfully
        res.status(201).json(blog)
    } catch (error) {
        // server error
        res.status(500).json({ message: error.message })
    }
}

// Delete a blog by ID
async function deleteBlog(req, res) {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





async function updateBlog( req,res){
    try {
            const blog = await Blog.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true,runValidators:true}
            )     
            
            if(!blog){
                    return res.status(404).json({message:"Blog not found"}) 
            }
            res.status(200).json(blog)
    } catch (error) {
         res.status(500).json({ message: error.message });
    }

}



// export all function logic
export { getAllBlogs, getOneBlogs, createBlog,deleteBlog,updateBlog}

