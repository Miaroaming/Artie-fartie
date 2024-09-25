import { useState } from 'react';
import axios from 'axios';
import { useCraftsContext } from '../../../hooks/useCraftsContext';
import './craftForm.scss';

const baseURL = import.meta.env.VITE_API_BASE_URL

const CraftForm = () => {
    const { dispatch } = useCraftsContext();
    const [imageURL, setImageURL] = useState(null);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [notForSale, setNotForSale] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [error, setError] = useState(null);
    const [hideForm, setHideForm] = useState(true);
    
    const validateInputs = () => {
        if (!title || !description || !type || !material || (!notForSale && !price)) {
            return "Please fill in all required fields.";
        }
        if (!imageURL) {
            return "Please upload an image.";
        }
        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return; // Exit if validation fails
        }
    
        // Get user from localStorage if exists
        const user = JSON.parse(localStorage.getItem('user'));
    
        // Check if anonymous and generate/retrieve anonymous ID
        let anonymousID = localStorage.getItem('anonymousID');
        if (!anonymousID && anonymous) {
            anonymousID = `anon-${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID
            localStorage.setItem('anonymousID', anonymousID); // Save anonymous ID in localStorage
        }
    
        // Use anonymousID if user posts anonymously, otherwise use user email
        const user_id = anonymous ? anonymousID : user?.email;
    
        // Prepare the form data to send to the server
        const formData = new FormData();
        formData.append('title', title);
        formData.append('imageURL', imageURL);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('material', material);
        
        const finalPrice = notForSale ? '0' : price;
        formData.append('price', finalPrice);
        formData.append('notForSale', notForSale ? 'true' : 'false');
        formData.append('anonymous', anonymous ? 'true' : 'false');
        formData.append('user_id', user_id); // Send either anonymousID or user email
    
        try {
            const response = await axios.post(`${baseURL}/api/crafts/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            // Reset form fields after successful submission
            setTitle('');
            setType('');
            setDescription('');
            setMaterial('');
            setPrice('');
            setNotForSale(false);
            setAnonymous(false);
            setError(null);

            setHideForm(false);
    
            dispatch({ type: 'CREATE_CRAFTS', payload: response.data });
    
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };


    return (
        <>

        {hideForm && (
            <div id='graphpaper'>
                <div className='create-craft-post-container'>
                    <h3>Create your Craft</h3>
                    <form className='create-craft-post-form' onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className='craft-post-input'>
                            <label className='craft-post-label'>Title:</label>
                            <div className='box-background'>
                                <input
                                    type='text'
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div className='craft-post-input'>
                            <label className='craft-post-label'>Description:</label>
                            <div className='box-background'>
                                <input
                                    type='text'
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                        </div>

                        {/* Type Input */}
                        <div className='craft-post-input'>
                            <label className='craft-post-label'>Type:</label>
                            <div className='box-background'>
                                <select
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}
                                >
                                    <option value=''>Select a Type</option>
                                    <option value='Crochet'>Crochet</option>
                                    <option value='Embroidery'>Embroidery</option>
                                    <option value='Painting'>Painting</option>
                                    <option value='Pottery'>Pottery</option>
                                    <option value='Jewellery'>Jewellery</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Materials Input */}
                        <div className='craft-post-input'>
                            <label className='craft-post-label'>Materials:</label>
                            <div className='box-background'>
                                <input
                                    type='text'
                                    onChange={(e) => setMaterial(e.target.value)}
                                    value={material}
                                />
                            </div>
                        </div>

                        {/* Not For Sale Checkbox */}
                        <div className='craft-post-input' id='not-for-sale'>
                            <input
                                type='checkbox'
                                onChange={(e) => setNotForSale(e.target.checked)}
                                checked={notForSale}
                            />
                            <label className='craft-post-label'>Not For Sale</label>
                        </div>

                        {/* Image Upload */}
                        <div className='craft-post-input'>
                            <label className='craft-post-label'>Image:</label>
                            <input
                                id='image-upload'
                                type='file'
                                onChange={(e) => setImageURL(e.target.files[0])}
                                accept='image/*'
                            />
                        </div>

                        {/* Price Input */}
                        {!notForSale && (
                            <div className='craft-post-input'>
                                <label className='craft-post-label'>Price: </label>
                                <div className='box-background'>
                                    <input 
                                        type='number'
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Anonymous Checkbox */}
                        <div className='craft-post-input' id='post-anon'>
                            <input
                                type='checkbox'
                                onChange={(e) => setAnonymous(e.target.checked)}
                                checked={anonymous}
                            />
                            <label className='craft-post-label'>Post Anonymously</label>
                        </div>
                        

                        <div id='add-post-btn'>
                            <button onClick={handleSubmit}>Add Post</button>
                        </div>
                    
                    </form>
                    {error && <div className='error'>{error}</div>}
                </div>
                
            </div>
        )}
        </>
    );
};

export default CraftForm;