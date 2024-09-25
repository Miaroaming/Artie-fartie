import { useState } from 'react';
import axios from 'axios';
import './craftDetails.scss';
import { useCraftsContext } from '../../../hooks/useCraftsContext';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_BASE_URL

// Craft Details function
const CraftDetails = ({ craft }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const anonymousID = localStorage.getItem('anonymousID'); // Retrieve the anonymous ID from localStorage

    const { dispatch } = useCraftsContext();
    const navigate = useNavigate();

    // Check if the current user can edit/delete the post
    const canEditOrDelete = craft.user_id === user?.email || craft.user_id === anonymousID;

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(craft.title);
    const [editType, setEditType] = useState(craft.type);
    const [editDescription, setEditDescription] = useState(craft.description);
    const [editMaterial, setEditMaterial] = useState(craft.material || '');
    const [editPrice, setEditPrice] = useState(craft.price);
    const [editNotForSale, setEditNotForSale] = useState(craft.notForSale);
    const [editAnonymous, setEditAnonymous] = useState(craft.anonymous);

    const handleDelete = async () => {
      try {
          const response = await axios.delete(`http://localhost:4000/api/crafts/${craft._id}`);
          if (response.status === 200) {
              dispatch({ type: 'DELETE_CRAFT', payload: craft._id }); // Update state directly with ID
          }
      } catch (error) {
          console.error('Error deleting craft:', error);
      }
  };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setEditTitle(craft.title);
        setEditType(craft.type);
        setEditDescription(craft.description);
        setEditMaterial(craft.material);
        setEditPrice(craft.price);
        setEditNotForSale(craft.notForSale);
        setEditAnonymous(craft.anonymous);
        setIsEditing(false);
    };

    const handleSubmitEdit = async () => {
      const updatedCraft = {
          title: editTitle,
          type: editType,
          description: editDescription,
          material: editMaterial,
          price: editPrice,
          notForSale: editNotForSale,
          anonymous: editAnonymous,
      };
 
      try {
          const response = await axios.patch(`${baseURL}/api/crafts/${craft._id}`, updatedCraft);
          if (response.status === 200) {
              const updatedData = response.data;
              dispatch({ type: 'UPDATE_CRAFT', payload: updatedData });
              setIsEditing(false);
  
              const refreshedCraftsResponse = await axios.get(`http://localhost:4000/api/crafts`);
              if (refreshedCraftsResponse.status === 200) {
                  dispatch({ type: 'SET_CRAFTS', payload: refreshedCraftsResponse.data });
              }
          }
      } catch (error) {
          console.error('Error updating craft:', error);
      }
  };

    const handleNavigate = () => {
        let path = `/${craft._id}`;
        navigate(path);
    };

    return (
        <div className='craft-details'>
            <div className='pin-post-img'/>
            {isEditing ? (
                <>
                    <div className='edit-modal'>
                        <div className='edit-input-container'>
                            <label>Edit Craft Title:</label>
                            <div className='box-input-edit'>
                                <input
                                    type='text'
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='edit-input-container'>
                            <label>Edit Type</label>
                            <div className='box-input-edit'>
                                <select
                                    onChange={(e) => setEditType(e.target.value)}
                                    value={editType}
                                >
                                    <option value='Crochet'>Crochet</option>
                                    <option value='Embroidery'>Embroidery</option>
                                    <option value='Painting'>Painting</option>
                                    <option value='Pottery'>Pottery</option>
                                    <option value='Jewellery'>Jewellery</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className='edit-input-container'>
                            <label>Description:</label>
                            <div className='box-input-edit'>
                                <input
                                    type='text'
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='edit-input-container'>
                            <label>Materials:</label>
                            <div className='box-input-edit'>
                                <input
                                    type='text'
                                    value={editMaterial}
                                    onChange={(e) => setEditMaterial(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='edit-input-container edit-checkbox-cont' >
                            <input
                                type='checkbox'
                                checked={editNotForSale}
                                onChange={(e) => setEditNotForSale(e.target.checked)}
                            />
                            <label>Not For Sale</label>
                        </div>

                        <div className='edit-input-container'>
                            <label>Price: ($)</label>
                            <div className='box-input-edit'>
                                <input
                                    type='number'
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='edit-input-container edit-checkbox-cont'>
                            <input
                                type='checkbox'
                                checked={editAnonymous}
                                onChange={(e) => setEditAnonymous(e.target.checked)}
                            />
                            <label>Post Anonymously</label>
                        </div>

                        <div className='edit-btns-cont'>
                            <button onClick={handleSubmitEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='craft-info-container' >
                    {craft.imageURL && (
                        <img src={`${baseURL}/public/uploads/${craft.imageURL}`} alt='craft' onClick={ handleNavigate }/>
                    )}

                    <div className='craft-top-info-container'>
                        <h4>{craft.title}</h4>
                        <h6>{craft.notForSale ? 'Not For Sale' : `$${craft.price}`}</h6>
                    </div>

                    <div className='project-bottom-info-container'>
                        <div className='icons-and-time-created'>
                            {canEditOrDelete ? (
                                <div className='craft-detail-button-container'>
                                    <div onClick={handleEdit} id='edit'>
                                        <div className='edit-hover-img'></div>
                                        <div className='craft-edit-btn'></div>
                                    </div>

                                    <div onClick={handleDelete} id='delete'>
                                        <div className='delete-hover-img'></div>
                                        <div className='craft-delete-btn'></div>
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    <strong>Created by: </strong>
                                    {craft.user_id}
                                </p>
                            )}
                            <div className='created-time'>
                                <p>
                                    Posted: <br />
                                    {formatDistanceToNow(new Date(craft.createdAt), {
                                        includeSeconds: true,
                                    })}{' '}
                                    ago
                                </p>
                            </div>
                        </div>

                        <div className='project-bottom-container'>
                            <button onClick={ handleNavigate }>See more</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CraftDetails;