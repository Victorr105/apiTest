import User from "../models/userModel.js";

//  crud for 

//  getting all the users
async function getAllUsers(req,res) {
    try {
        const userss= await User.find().sort({createdAt:-1}) 
        // 200 ok
        res.status(200).json(userss)
     
    } catch (error) {
        // 500 server error
        res.status(500).json({message : error.message})
    }
    
}

async function getOneUSer(req,res) {
    try {
        const userss = await User.findById(req.params.id);
        if(!userss){
            return res.status(404).json({message: "User not found"});
        }
        // incase blog is found return 200 with the blog 
        // 200 ok
        res.status(200).json(userss)

        
    } catch (error) {
        // 500 server error
       res.status(500).json({message : error.message})
    }
}

// Delete a blog by ID
async function deleteUser(req, res) {
    try {
        const userss = await User.findByIdAndDelete(req.params.id);

        // Check if the blog exists
        if (!userss) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function UpdateOneUser( req,res){
    try {
        // we are going to check whether the request body is a file 
        //  we create a variable that is going to take everything inside the bidy
        const updates = { ...req.body }
        if (req.file) {
            // store a web-friendly path to the uploaded file
            updates.pfp = `/uploads/${req.file.filename}`
        }


        const userss = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                {new:true,runValidators:true}
            )     
            
            if(!userss){
                    return res.status(404).json({message:"User not found"}) 
            }
            res.status(200).json(userss)
    } catch (error) {
         res.status(500).json({ message: error.message });
    }

}

export {getAllUsers,getOneUSer,UpdateOneUser,deleteUser}
