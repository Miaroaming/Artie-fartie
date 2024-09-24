import { useState } from 'react'
import axios from 'axios'
// scss import
import './craftDetails.scss'
import { useCraftsContext } from '../../../hooks/useCraftsContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_API_BASE_URL

// Craft Details function
const CraftDetails = ({ craft }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.email
  const { dispatch } = useCraftsContext()
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await axios.delete ( `${baseURL}/api/crafts/${ craft._id }` )
    const json = await response.data

    if( response.status === 200 ) {
      console.log( json );
      dispatch({ type: 'DELETE-CRAFT', payload: json} )
    }
  }

  // Set up for Editing Fucntion
  const [ isEditing, setIsEditing ] = useState( false );
  const [ editTitle, setEditTitle ] = useState( craft.title );
  const [ editType, setEditType ] = useState( craft.type );
  const [ editDescription, setEditDescription ] = useState( craft.description );
  const [ editMaterial, setEditMaterial ] = useState( craft.material || '' );
  const [ editPrice, setEditPrice ] = useState( craft.price );
  const [ editNotForSale, setEditNotForSale ] = useState( craft.notForSale );
  const [ editAnonymous, setEditAnonymous ] = useState( craft.anonymous );

  const handleNavigate = () => {
    let path = `/${ craft._id }`
    navigate( path )
  }

  const handleEdit = () => {
    setIsEditing( true );
  };

  const handleCancelEdit = () => {
    setEditTitle( craft.title );
    setEditType( craft.type );
    setEditDescription( craft.description );
    setEditMaterial( craft.material);
    setEditPrice( craft.price );
    setEditNotForSale( craft.notForSale );
    setEditAnonymous( craft.anonymous );
    setIsEditing( false );
  };

  const handleSubmitEdit = async () => {
    const updatedCraft = {
      title: editTitle,
      type: editType,
      description: editDescription,
      material: editMaterial,
      price: editPrice,
      notForSale: editNotForSale,
      anonymous: editAnonymous
    };
  
    try {
      const response = await axios.patch(
        `${baseURL}/api/crafts/${ craft._id }`,
        updatedCraft
      );
      const updatedData = response.data;
  
      if (response.status === 200) {
        console.log( response );
        console.log( updatedData );
        dispatch({ type: 'UPDATE_CRAFT', payload: updatedData });
        setIsEditing( false );
      }
    } catch (error) {
      console.error( 'Error updating craft:', error );
    }
  };
  

  // Craft Details Output
  return (
    <div className='craft-details'>

      { isEditing ? (
        <>
          <div className='edit-modal'>
            
            <div className='edit-input-container'>

              <label>Edit Exercise Title:</label>
              <div className='box-input-edit'>
              <input
                type='text'
                value={ editTitle }
                onChange={( e ) => setEditTitle( e.target.value )}
              />
              </div>
              

            </div>

            <div className='edit-input-container'>

              <label>Edit Type</label>
              <div className='box-input-edit'>
              <select 
                onChange={( e ) => setEditType( e.target.value )}
                value={ editType }
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

              <label className='craft-post-label'>Description:</label>
              <div className='box-input-edit'>

                <input 
                    type='text'
                    onChange={( e ) => setEditDescription( e.target.value )}
                    value={ editDescription }
                />

              </div>

            </div>
            
            <div className='edit-input-container'>

              <label className='craft-post-label'>Materials:</label>

              <div className='box-input-edit'>

                <input 
                    type='text'
                    onChange={( e ) => setEditMaterial(e.target.value )}
                    value={ editMaterial || ''}
                />

              </div>
              
            </div>

            <div className='edit-input-container'>

              <div className='edit-checkbox-cont'>
              <input 
                type='checkbox'
                onChange={( e ) => setEditNotForSale( e.target.value )}
                value={ editNotForSale }
              />
              <label className='craft-post-label'>Not For Sale</label>
              </div>
              
              
              
            </div>


            <div className='edit-input-container'>

              <label className='craft-post-label'>Price: ($)</label>
                <div className='box-input-edit'>
                  <input 
                    type='number'
                    onChange={( e ) => setEditPrice( e.target.value )}
                    value={ editPrice }
                  />
                </div>
              
            </div>
            
            <div className='edit-input-container'>
              <div className='edit-checkbox-cont'>
              <input 
                type='checkbox'
                onChange={( e ) => setEditAnonymous( e.target.value )}
                value={ editAnonymous }
              />
              <label className='craft-post-label'>Post Anonymously</label>
              </div>
              
              
            </div>
  
            <div className='edit-btns-cont'>
              <div className='edit-btn'>
                <button onClick={ handleSubmitEdit }>Save</button>
              </div>
            <div className='edit-btn'>
              <button onClick={ handleCancelEdit }>Cancel</button>
            </div>
            
            </div>
            

          </div>
        </>
      ) :
      (
        <div className='craft-info-container'>

            { craft.imageURL && (
              <img src={`${baseURL}/public/uploads/${ craft.imageURL }`} alt='craft' />
            )}

            <div className='craft-top-info-container'>

              <h4>{ craft.title }</h4>
              <h6>$ { craft.price }</h6>

            </div>
                  
            <div className='project-bottom-info-container'>
              <div className='icons-and-time-created'>
              {craft.user_id === user_id ? (
                <div className='craft-detail-button-container'>

                  <div onClick={ handleEdit } id='edit'>
                    <div className='edit-hover-img'></div>
                    <div className='craft-edit-btn'></div>
                    
                  </div>

                  <div onClick={ handleDelete } id='delete'>
                    <div className='delete-hover-img'></div>
                    <div className='craft-delete-btn'></div>
                  </div>

                  </div>
                ) : (
                  <p><strong>Created by: <br /> </strong>{ craft.user_id }</p>
                )}

                  <div className='created-time'>
                    <p>Posted: <br /> { formatDistanceToNow( new Date( craft.createdAt ),{ includeSeconds: true }, { addSuffix: true })} ago
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
  )
}

export default CraftDetails
