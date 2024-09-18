import React from 'react'
import axios from 'axios'
// scss import
import './craftDetails.scss'
import { useCraftsContext } from '../../../hooks/useCraftsContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

// Craft Details function
const CraftDetails = ({ craft }) => {

  const { dispatch } = useCraftsContext()

  const handleClick = async () => {
    const response = await axios.delete ( `http://localhost:4000/public/uploads/${ craft._id }` )
    const json = await response.data

    if( response.status === 200 ) {
      console.log(json);
      dispatch({ type: 'DELETE-CRAFT', payload: json} )
    }
  }

  // Craft Details Output
  return (
    <div className="craft-details">

        <div className='craft-info-container'>

              <div className='craft-top-info-container'>
                <h4>{ craft.title }</h4>
                <h6>{ craft.price }</h6>
              </div>

              {craft.image && (
                        <img src={`http://localhost:4000/public/uploads/${ craft.image }`} alt="craft" />
                    )}
                    
              <div className='project-bottom-info-container'>

                <div className='project-bottom-left-container'>
                  <p><strong>Created by: </strong>{ craft.user_id }</p>
                </div>
                <div className='project-bottom-right-container'>
                <p>{ formatDistanceToNow( new Date( craft.createdAt ),{ includeSeconds: true }, { addSuffix: true })} ago
                </p>
                </div>
                <div className='project-bottom-container'>
                    <button>See more</button>
                </div>
                
              </div>
              <span onClick={ handleClick }>delete</span>
            </div>
    </div>
  )
}

export default CraftDetails
