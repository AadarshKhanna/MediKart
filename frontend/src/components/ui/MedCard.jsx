import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";

function MedCard({ medicine, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: medicine.name,
    company: medicine.company,
    price: medicine.price,
    description: medicine.description,
  });

  const handleEditChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    onEdit(medicine.id, updatedInfo);
    setIsEditing(false);
  };

  return (
    <div className="relative p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      {!isEditing ? (
        <>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {medicine.name}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{medicine.company}</p>
          <p className="text-gray-900 font-semibold dark:text-white">
            {medicine.price}
          </p>

          {/* Hover effect to show details */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 rounded-lg">
            <h3 className="text-lg font-bold">{medicine.name}</h3>
            <p className="text-sm">{medicine.description}</p>
            <p className="text-sm">{medicine.company}</p>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(medicine.id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Editing Form */}
          <input
            type="text"
            name="name"
            value={updatedInfo.name}
            onChange={handleEditChange}
            className="p-2 border rounded-md w-full dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="company"
            value={updatedInfo.company}
            onChange={handleEditChange}
            className="p-2 border rounded-md w-full dark:bg-gray-600 dark:text-white mt-2"
          />
          <input
            type="text"
            name="price"
            value={updatedInfo.price}
            onChange={handleEditChange}
            className="p-2 border rounded-md w-full dark:bg-gray-600 dark:text-white mt-2"
          />
          <button
            onClick={saveEdit}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default MedCard;
