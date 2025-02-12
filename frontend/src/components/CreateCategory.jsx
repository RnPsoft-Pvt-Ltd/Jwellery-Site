import { useState } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.shopevella.com/v1/categories", formData);
      alert("Category created successfully!");
      setFormData({ name: "", description: "", thumbnail: "" });
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", description: "", thumbnail: "" });
  };

  return (
    <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter the category name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter the category description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            placeholder="Enter the image URL"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        {formData.thumbnail && (
          <div className="mb-4 flex justify-center">
            <img
              src={formData.thumbnail}
              alt="Thumbnail Preview"
              className="w-40 h-40 object-cover border rounded-lg"
            />
          </div>
        )}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateCategory;
