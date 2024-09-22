import { useState } from 'react'
import axios from 'axios'
// scss import
import './craftDetails.scss'
import { useCraftsContext } from '../../../hooks/useCraftsContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { useNavigate } from 'react-router-dom'

// Craft Details function
const CraftDetails = ({ craft }) => {

  const { dispatch } = useCraftsContext()
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await axios.delete ( `http://localhost:4000/api/crafts/${ craft._id }` )
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
  const [ editMaterial, setEditMaterial ] = useState( craft.material );
  const [ editPrice, setEditPrice ] = useState( craft.price );
  const [ editNotForSale, setEditNotForSale ] = useState( craft.notForSale );
  const [ editAnonymous, setEditAnonymous ] = useState( craft.anonymous );
  const [ editImageURL, setEditImageURL ] = useState( craft.imageURL );

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
    setEditImageURL( craft.imageURL );
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
      anonymous: editAnonymous,
      imageURL: editImageURL
    };
  
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/crafts/${ craft._id }`,
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
              <input
                type='text'
                value={ editTitle }
                onChange={( e ) => setEditTitle( e.target.value )}
              />

            </div>

            <div className='edit-input-container'>

              <label>Edit Type</label>
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

            <div className='edit-input-container'>

              <label className='craft-post-label'>Description:</label>
              <div className='box-background'>

                <input 
                    type='text'
                    onChange={( e ) => setEditDescription( e.target.value )}
                    value={ editDescription }
                />

              </div>

            </div>
            
            <div className='edit-input-container'>

              <label className='craft-post-label'>Materials:</label>

              <div className='box-background'>

                <input 
                    type='text'
                    onChange={( e ) => setEditMaterial(e.target.value )}
                    value={ editMaterial }
                />

              </div>
              
            </div>

            <div className='edit-input-container'>

              <input 
                type='checkbox'
                onChange={( e ) => setEditNotForSale( e.target.value )}
                value={ editNotForSale }
              />
              <label className='craft-post-label'>Not For Sale</label>
              
            </div>

            <div className='edit-input-container'>

              <label className='craft-post-label'>Image:</label>
              <input 
                id='image-upload'
                type='file'
                onChange={( e ) => setEditImageURL( e.target.files[ 0 ] )}
                accept='image/*'
              />
              
            </div>

            <div className='edit-input-container'>

              <label className='craft-post-label'>Price: ($)</label>
                <div className='box-background'>
                  <input 
                    type='number'
                    onChange={( e ) => setEditPrice( e.target.value )}
                    value={ editPrice }
                  />
                </div>
              
            </div>
            
            <div className='edit-input-container'>

              <input 
                type='checkbox'
                onChange={( e ) => setEditAnonymous( e.target.value )}
                value={ editAnonymous }
              />
              <label className='craft-post-label'>Post Anonymously</label>
              
            </div>
  
            <button onClick={ handleSubmitEdit }>Save</button>
            <button onClick={ handleCancelEdit }>Cancel</button>

          </div>
        </>
      ) :
      (
        <div className='craft-info-container'>

            { craft.image && (
              <img src={`http://localhost:4000/public/uploads/${ craft.image }`} alt='craft' />
            )}

            <div className='craft-top-info-container'>

              <h4>{ craft.title }</h4>
              <h6>$ { craft.price }</h6>

            </div>
                  
            <div className='project-bottom-info-container'>

              <div className='project-bottom-left-container'>

                <p><strong>Created by: </strong>{ craft.user_id }</p>

              </div>

              <div onClick={ handleDelete } className='craft-detail-button-container delete-button'>
                <div className='craft-detail-button-img'>Delete</div>
                <div className='craft-detail-button-img-hover'></div>
              </div>

              <div onClick={ handleEdit } className='craft-detail-button-container edit-button'>

                <div className='craft-detail-button-img'>Edit</div>
                <div className='craft-detail-button-img-hover'></div>

              </div>

              <div className='project-bottom-right-container'>
                <p>{ formatDistanceToNow( new Date( craft.createdAt ),{ includeSeconds: true }, { addSuffix: true })} ago
                </p>
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
