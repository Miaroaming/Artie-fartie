import React from 'react'
// scss import
import './craftDetails.scss'
import { useCraftsContext } from '../../../hooks/useCraftsContext'

// Craft Details function
const CraftDetails = ({ craft }) => {
    // Craft Details Output
  return (
    <div className="craft-details">
        <div className='craft-info-container'>
              <div className='craft-top-info-container'>
                <h4>{ craft.title }</h4>
                <h6>{ craft.price }</h6>
              </div>
              <img src={ craft.imageURL } alt="" />
              <div className='project-bottom-info-container'>
                <div className='project-bottom-left-container'>
                  <p><strong>Created by: </strong>{ craft.user_id }</p>
                </div>
                {/* <div className='project-bottom-right-container'>
                <p>{formatDistanceToNow(
							new Date(craft.createdAt),
							{includeSeconds:true}, 
							{addSuffix:true}
								)
							} ago</p>
                </div> */}
                <div className='project-bottom-container'>
                    <button>See more</button>
                </div>
                
              </div>
              
            </div>
    </div>
  )
}

export default CraftDetails
