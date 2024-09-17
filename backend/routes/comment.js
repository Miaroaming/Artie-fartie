const express = require( 'express' )

const router = express.Router();

const {
    createComment,
    editComment,
    deleteComment,
} = require( '../controllers/commentController' );

// New comment for a specific craft id
router.post( '/crafts/:craftId/comments', createComment );

// Edit Comment
router.patch( '/crafts/:craftId/comments/:commentId', editComment );

// Delete Comment
router.delete( '/crafts/:craftId/comments/:commentId', deleteComment );

module.exports = router;