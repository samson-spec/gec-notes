import Note from "../models/Note.js"

// ------------------------------------------------
// GET
// retrieve all notes, sorted by creation date (newest first)
export async function getAllNotes (req,res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}); // newest first
        res.status(200).json(notes);
    }catch (error) {

        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
}

// ------------------------------------------------
// GET 
// retrieve a single note by its ID
export async function getNoteById (req,res) {
    try{
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found!"});
        res.status(200).json(note)
    }catch (error) {

        console.error("Error in getNoteById controller:", error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
}

// ------------------------------------------------
// POST
// create a new note with title and content from the request body
export async function createANote (req,res){
    try{
        const {userId, title, content} = req.body

        const note = new Note({
            userId,
            title,
            content
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    }catch (error){
        console.error("Error in createANote controller:", error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
}

// ------------------------------------------------
// PUT
// update an existing note's title and content by its ID, using data from the request body
export async function updateANote (req,res) {
   try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if(!updatedNote) return res.status(404).json({message:"Note not found!"});
        
        res.status(200).json(updatedNote);

   }catch(error){
        console.error("Error in updateANote controller:", error);
        res.status(500).json({
            message: "Internal server error!"
        });
   }
}

// ------------------------------------------------
// DELETE
// delete a note by its ID
export async function deleteANote (req,res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message:"Note not found!"});
        res.status(200).json({message: "Note deleted successfully!"});

    }catch(error){
        console.error("Error in deleteANote controller:", error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
}