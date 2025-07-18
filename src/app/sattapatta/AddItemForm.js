import React, { useState, useEffect } from 'react';
import { createSattapattaItem } from '@/api/sattapattaItem.js';

const AddItemForm = ({ setAddItemFormVisibility, setProducts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [estimatedValue, setEstimatedValue] = useState('');
  const [condition, setCondition] = useState('used');
  const [status, setStatus] = useState('available');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (imageFiles.length < 1) {
      setImagePreviews([]);
      return;
    }

    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const handleImageFilesChange = (e) => {
    // Append new files (avoid duplicates)
    const newFiles = Array.from(e.target.files);

    // Optionally filter duplicates by name+size or just replace all
    // Here we append:
    setImageFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      setMessage('No files selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    imageFiles.forEach(file => formData.append('imageFiles', file));
    formData.append('estimatedValue', estimatedValue);
    formData.append('condition', condition);
    formData.append('status', status);

    try {
      const response = await createSattapattaItem(formData);
      setProducts(prev => [response, ...prev]); // add new item on top
      setAddItemFormVisibility(false);
      setMessage('Item added successfully!');
    } catch (error) {
      console.error('Error adding new item:', error);
      setMessage('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:from-[#5c5f1e] dark:to-[#9e39c9] 
                      w-full max-w-2xl p-6 sm:p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-[#68217A] dark:text-white mb-2 -mt-4">
          Add New Sattapatta Item
        </h2>

        {message && <p className="text-red-500 dark:text-red-400 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="md:space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Upload Images + Preview */}
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold dark:text-white mb-1">Upload Images:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFilesChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>

            {/* Preview container */}
            <div className="flex flex-wrap gap-3 max-w-xs max-h-[150px] overflow-y-auto">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 rounded-lg object-cover border border-gray-400 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-bl-md px-1 opacity-80 hover:opacity-100 focus:outline-none"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Estimated Value:</label>
            <input
              type="number"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Condition:</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="new">New</option>
              <option value="used">Used and working</option>
              <option value="old">Not working</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="available">Available</option>
              <option value="exchanged">Exchanged</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-1">
            <button
              type="button"
              onClick={() => setAddItemFormVisibility(false)}
              className="px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400 text-black font-semibold dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-[#68217A] hover:bg-[#8b2fa2] text-white font-semibold"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
