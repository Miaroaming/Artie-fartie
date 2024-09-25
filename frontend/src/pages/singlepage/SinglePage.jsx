import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import './singlepage.scss';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SinglePage = () => {
  const navigate = useNavigate();
  const MAX_COMMENT_LENGTH = 60;
  const { id } = useParams();
  
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);
  const [isSmallPhone, setIsSmallPhone] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
      setIsSmallPhone(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [craft, setCraft] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.email;

  const handleAddComment = async () => {
    if (!user) {
      alert('You must be logged in to post a comment.');
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/comments/crafts/${craft._id}/comments`,
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

    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/crafts/${id}`)
      .then((res) => {
        setCraft(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!craft) {
    return <div>Craft not found</div>;
  }

  const getEmailCharactersBeforeAtSymbol = (email) => {
    if (!email) {
      return 'Unknown';
    }
    const parts = email.split('@');
    return parts.length > 1 ? parts[0] : email;
  };

  return (
    <div className='single-craft-container'>
      <div className='top-single-craft-container'>
        <button className='back-button' onClick={() => navigate(-1)}><span>Back</span></button>
        <h1>{getEmailCharactersBeforeAtSymbol(craft.user_id)}'s {craft.title}</h1>
      </div>

      <div className='bottom-single-craft-container'>
        <div className='left-single-craft-container'>
          {craft.imageURL && (
            <img src={`${baseURL}/public/uploads/${craft.imageURL}`} alt='craft' />
          )}

          <div className='bottom-left-single-craft-container'>
            <h3>{craft.title}</h3>
            <h3>{craft.notForSale ? 'Not For Sale' : `$${craft.price}`}</h3>
          </div>
        </div>

        <div className='right-single-craft-container'>
          <div className='right-top-single-craft-container'>
            <h3>Type of craft: {craft.type}</h3>
            <h6>Created by: {getEmailCharactersBeforeAtSymbol(craft.user_id)}</h6>
          </div>
          
          <p><strong>Description:</strong> <br /> {craft.description}</p>
          <p><strong>Materials:</strong> <br /> {craft.material}</p>

          <div className='right-bottom-single-craft-container'>
            <h6>Posted {formatDistanceToNow(new Date(craft.createdAt), { includeSeconds: true })} ago</h6>
          </div>

          {/* Modified Buy Now Button */}
          <button
            className='buy-button'
            onClick={() => window.location.href = `mailto:${craft.user_id}?subject=Interest in your craft: ${craft.title}&body=Hi, I am interested in purchasing your craft listed on [Your Platform Name]. Please provide further details.`}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className='comments-section'>
        <img className='comments-title' src='../../../images/comments-title-img.webp' alt='Comments Title Image' />
        
        <button onClick={() => setShowComments(!showComments)} className='comment-hide-show-button'>
          {showComments ? 'Hide Comments' : 'Show comments'}
        </button>

        {showComments && (
          <>
            <img className='top-comments' src='../../../images/top-comments.webp' alt="top comment border" />
            <div className='comments-container'>
              <div className='add-comment'>
                <img 
                  className='comments-postit' 
                  src={isSmallPhone 
                    ? '../../../public/images/comment-postit-phone.webp' 
                    : isPhone 
                    ? '../../../public/images/comment-postit-small-screen.webp' 
                    : '../../../public/images/comment-postit.webp'}
                  alt='comment-postit' 
                />
                <label>Add Comment</label>
                <input
                  type='text'
                  placeholder={user ? 'Add a comment...' : 'Log in to comment'}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={MAX_COMMENT_LENGTH}
                  disabled={!user}
                />
                <button className='submit-button' onClick={handleAddComment} disabled={!user}>Submit</button>
              </div>

              <div className='comments'>
                {(craft.comments || []).map((comment) => (
                  <div key={comment._id} className='comment'>
                    <img 
                      className='comments-postit' 
                      src={isSmallPhone 
                        ? '../../../public/images/comment-postit-phone.webp' 
                        : isPhone 
                        ? '../../../public/images/comment-postit-small-screen.webp' 
                        : '../../../public/images/comment-postit.webp'}
                      alt='comment-postit' 
                    />
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
  );
};

export default SinglePage;