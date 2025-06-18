import React, { useState } from 'react';
import { createSattapattaItem } from '@/api/sattapattaItem.js'; // Ensure this path is correct

const AddItemForm = ({ setAddItemFormVisibility, setProducts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [estimatedValue, setEstimatedValue] = useState('');
  const [condition, setCondition] = useState('used');
  const [status, setStatus] = useState('available');
  const [message, setMessage] = useState('');

  const handleImageFilesChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // Convert FileList to Array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      setMessage('No files selected for upload');
      return; // Prevent form submission
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    imageFiles.forEach(file => {
      formData.append('imageFiles', file); // Ensure this matches the multer field name
    });
    formData.append('estimatedValue', estimatedValue);
    formData.append('condition', condition);
    formData.append('status', status);

    try {
      const response = await createSattapattaItem(formData);
      setProducts((prevProducts) => [...prevProducts, response]);
      setAddItemFormVisibility(false);
      setMessage('Item added successfully!');
    } catch (error) {
      console.error('Error adding new item:', error);
      setMessage('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Add New Sattapatta Item</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageFilesChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Estimated Value:</label>
          <input
            type="number"
            value={estimatedValue}
            onChange={(e) => setEstimatedValue(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Condition:</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="old">Old</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="available">Available</option>
            <option value="exchanged">Exchanged</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded">
          Add Item
        </button>
        <button type="button" onClick={() => setAddItemFormVisibility(false)} className="mt-4 ml-2 bg-red-500 text-white p-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
