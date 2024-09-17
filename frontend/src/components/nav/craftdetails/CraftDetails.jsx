import React from 'react'
// scss import
import './craftDetails.scss'

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
              {workout.image && (
                        <img className="workout-image" src={`http://localhost:4000/public/uploads/${workout.image}`} alt="Workout" />
                    )}
              <div className='project-bottom-info-container'>
                <div className='project-bottom-left-container'>
                  <p><strong>Created by: </strong>{ craft.user_id }</p>
                </div>
                <div className='project-bottom-container'>
                    <button>See more</button>
                </div>
                
              </div>
              
            </div>
    </div>
  )
}

export default CraftDetails
