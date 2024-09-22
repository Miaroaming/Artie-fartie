import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import './singlepage.scss'

const SinglePage = () => {
  // Use Navigate function
  const navigate = useNavigate();
  
  // Comment length limit
  const MAX_COMMENT_LENGTH = 60;

  // Loading state
  const { id } = useParams();
  
  // ID from URL
  const [loading, setLoading] = useState(true);
  
  // State for single craft
  const [craft, setCraft] = useState(null);
  
  // Comment states
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  // User
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user.email;
  
  // Add comment function
  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/comments/crafts/${craft._id}/comments`,
        {
          text: commentText,
          user_id: user_id,
        }
      );
  
      if (response.status === 201) {
        const newComment = response.data;
        const updatedComments = [...(craft.comments || []), newComment];
  
        const updatedCraft = { ...craft, comments: updatedComments };
        setCraft(updatedCraft);
  
        setCommentText('');
      }
    } catch (error) {
      console.error('Error Adding Comment!', error);
    }
  };
  
  // Use Effect to call crafts
  useEffect(() => {
    axios.get(`http://localhost:4000/api/crafts/${id}`)
      .then((res) => {
        console.log(res.data);
        setCraft(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  
  // Loading state returned
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Return project after loaded
  if (!craft) {
    return <div>Craft not found</div>;
  }

  // Function to split the email address safely
  const getEmailCharactersBeforeAtSymbol = (email) => {
    if (!email) {
      return 'Unknown'; // Fallback value when email is missing
    }
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0] : email; // Return the full email if splitting fails
  };

  return (
    <>
      <div className='single-craft-container'>
        <div className='top-single-craft-container'>

          <button className='back-button' onClick={() => navigate( -1 )}><span>Back</span></button>
          <h1>user</h1>

        </div>

        <div className='bottom-single-craft-container'>
          <div className='left-single-craft-container'>

            { craft.imageURL && (
              <img src={`http://localhost:4000/public/uploads/${ craft.imageURL }`} alt='craft' />
            )}

            <div className='bottom-left-single-craft-container'>
              <h3>{ craft.title }</h3>
              <h3>${ craft.price }</h3>
            </div>
          </div>

          <div className='right-single-craft-container'>
            <div className='right-top-single-craft-container'>

              <h3>{ craft.type }</h3>
              <h3 className='for-sale'>For Sale</h3>
              <h6>Created by:</h6>
              <p>{ craft.description }</p>

            </div>

            <p>{ craft.materials }</p>

            <div className='right-bottom-single-craft-container'>

              <h6>Posted {formatDistanceToNow(new Date(craft.createdAt), { includeSeconds: true })} ago</h6>
            </div>

            <button className='buy-button'>Buy Now</button>
          </div>
        </div>

        
        <div className='comments-section'>
          <img className='comments-title' src='../../../public/images/comments-title-img.webp' alt='Comments Title Image' />
          
          <button onClick={() => setShowComments(!showComments)}>
            {showComments ? 'Hide Comments' : 'Show comments'}
          </button>

          {showComments && (
            <>
              <img className='top-comments' src='../../../public/images/top-comments.webp' alt="top comment border" />
              <div className='comments-container'>
                <div className='add-comment'>
                  <img className='comments-postit' src='../../../public/images/comment-postit.webp' alt="" />
                  <label>Add Comment</label>
                  <input
                    type='text'
                    placeholder='Add a comment...'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    maxLength={MAX_COMMENT_LENGTH}
                  />
                  <button onClick={handleAddComment}>Submit</button>
                </div>

                <div className='comments'>
                  {(craft.comments || []).map((comment) => (
                    <div key={comment._id} className='comment'>
                      <img className='comments-postit' src='../../../public/images/comment-postit.webp' alt="postit note" />
                      <h5>{getEmailCharactersBeforeAtSymbol(comment.user_id)}</h5>
                      <p>{comment.text || 'No comment text available'}</p>
                      <span>
                        Posted: {formatDistanceToNow(new Date(comment.createdAt), { includeSeconds: true })} ago
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <img className='bottom-comments' src='../../../public/images/bottom-comments.webp' alt="bottom comment border" />
            </>
          )}
        </div>

      </div>
    </>
  );
};


export default SinglePage;