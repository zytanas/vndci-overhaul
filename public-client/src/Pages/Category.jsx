import React, {useState} from "react";
import { useGetCategoriesQuery, useAddCategoryMutation } from "../app/features/api/categoryApiSlice";

const Category = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  const [newCategoryName, setNewCategoryName] = useState(""); // State for new category name
  const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation(); // Mutation hook

  const handleAddCategory = async () => {
    if (newCategoryName) {
      await addCategory({ name: newCategoryName }); // Call the mutation
      setNewCategoryName(""); // Clear the input field after adding
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching categories.</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {/* Input for adding a new category */}
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
        />
        <button onClick={handleAddCategory} disabled={isAddingCategory}>
          Add Category
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData?.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;

