const Comment = require( '../models/commentModel' );

const Craft = require( '../models/craftModel' );

// Create new comment
const createComment = async ( req, res ) => {

    //  id of craft for comment
    const { craftId } = req.params; 

    try {
        const craft = await Craft.findById( craftId );
        
        if ( !craft ) {
            return res.status(404).json({ error: 'Craft not found' });
        }

        const newComment = new Comment({
            text: req.body.text,
            user_id: req.body.user_id,
        })

        // save comment to database
        await newComment.save();

        // push comment to array
        craft.comments.push(newComment);
        await craft.save();

        res.status( 201 ).json(newComment);

    } catch ( error ) {

        console.error( error );
        res.status( 500 ).json({ error: 'Server error' });

    }
    
};

// Edit existing Comment
const editComment = async ( req, res ) => {
    
    const { craftId, commentId } = req.params;

    try {
        const craft = await Craft.findById( craftId );

        // If craft id is not found 
        if ( !craft ) {
            return res.status(404).json({ error: 'Craft not found' });
        }

        const comment = await Comment.findByIdAndUpdate(
            commentId, 
            {
                text: req.body.text,
            },
            { new: true }
        );

        // If comment id is not found 
        if ( !comment ) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json(comment);

    } catch ( error ) {
        
        console.error( error );
        res.status( 500 ).json({ error: 'Server error' });
        
    }
}

// Delete existing Comment
const deleteComment = async ( req, res ) => {
    
    const { craftId, commentId } = req.params;

    try {
        const craft = await Craft.findById( craftId );

        // If craft id is not found 
        if ( !craft ) {
            return res.status(404).json({ error: 'Craft not found' });
        }

        const comment = await Comment.findByIdAndDelete( commentId );

        // If comment id is not found 
        if ( !comment ) {
            return res.status( 404 ).json({ error: 'Comment not found' });
        }

        // remove comment reference from craft
        craft.comments = craft.comments.filter(
            ( comment ) => comment.toString() !== commentId
        );

        await craft.save();

        res.status(200).json(comment);

    } catch ( error ) {
        
        console.error( error );
        res.status( 500 ).json({ error: 'Server error' });

    }
}

module.exports = { createComment, editComment, deleteComment };