import React, { useState, useEffect } from 'react';
import { createSattapattaItem } from '@/api/sattapattaItem.js';
import api from '@/api/api';
import { getToken } from '@/constants/authToken';
import { useRouter } from 'next/navigation';
import { editSattapattaItem } from '@/api/sattapattaItem.js'; // ✅ make sure this is imported


const AddItemForm = ({ product = null, setAddItemFormVisibility, setProducts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [keptImageUrls, setKeptImageUrls] = useState([]);
  const [estimatedValue, setEstimatedValue] = useState('');
  const [condition, setCondition] = useState('used');
  const [status, setStatus] = useState('available');
  const [message, setMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // Prefill form if editing
  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setDescription(product.description || '');
      setEstimatedValue(product.estimatedValue || '');
      setCondition(product.condition || 'used');
      setStatus(product.status || 'available');
      if (Array.isArray(product.imageUrls)) {
        setKeptImageUrls(product.imageUrls);
        setImagePreviews(product.imageUrls);
      }
    }
  }, [product]);

 const handleImageFilesChange = e => {
  const newFiles = Array.from(e.target.files);
  const newPreviews = newFiles.map(file => URL.createObjectURL(file));

  // 🧹 Remove existing images when new ones are added
  setKeptImageUrls([]); // clear existing
  setImageFiles(newFiles); // replace with new
  setImagePreviews(newPreviews); // replace previews
};


  const handleRemoveImage = index => {
    const keptCount = keptImageUrls.length;

    if (index < keptCount) {
      // Remove from existing images
      const updatedKept = keptImageUrls.filter((_, i) => i !== index);
      setKeptImageUrls(updatedKept);
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new files
      const fileIndex = index - keptCount;
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async e => {
  e.preventDefault();

  const totalImages = keptImageUrls.length + imageFiles.length;
  if (totalImages === 0) {
    setMessage('Please select at least one image.');
    return;
  }

  if (totalImages > 6) {
    setMessage('Maximum 6 images allowed.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('estimatedValue', estimatedValue);
  formData.append('condition', condition);
  formData.append('status', status);

  // ✅ Correct key: 'files' matches backend multer config
  imageFiles.forEach(file => formData.append('imageFiles', file));


  if (keptImageUrls.length > 0) {
    formData.append('existingImages', JSON.stringify(keptImageUrls));
  }

  // ✅ Log everything inside FormData
  console.log('%c🔍 FormData contents before submitting:', 'color: blue; font-weight: bold;');
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: [File] name=${value.name}, size=${value.size}`);
    } else {
      console.log(`${key}:`, value);
    }
  }

  try {
    if (product && product._id) {
  const updatedItem = await editSattapattaItem(product._id, formData);
  setProducts(prev => prev.map(p => (p._id === product._id ? updatedItem.item : p)));
  setMessage('Item updated successfully!');
} else {
  const response = await createSattapattaItem(formData);
  setProducts(prev => [response, ...prev]);
  setMessage('Item added successfully!');
}

    setAddItemFormVisibility(false);
  } catch (error) {
    console.error('🚨 Error saving item:', error);
    setMessage('Failed to save item. Please try again.');
  }
};


  if (checkingAuth) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:from-[#5c5f1e] dark:to-[#9e39c9]
                      w-full max-w-2xl p-6 sm:p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-[#68217A] dark:text-white mb-2 -mt-4">
          {product ? 'Edit Sattapatta Item' : 'Add New Sattapatta Item'}
        </h2>

        {message && <p className="text-red-500 dark:text-red-400 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="md:space-y-4">
          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Description:</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

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

          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Estimated Value:</label>
            <input
              type="number"
              value={estimatedValue}
              onChange={e => setEstimatedValue(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Condition:</label>
            <select
              value={condition}
              onChange={e => setCondition(e.target.value)}
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="new">New</option>
              <option value="used">Used and working</option>
              <option value="old">Not working</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold dark:text-white mb-1">Status:</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="available">Available</option>
              <option value="exchanged">Exchanged</option>
            </select>
          </div>

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
              {product ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
