import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CategoriesJSON } from "@/constants/Categories";

export default function BasicSelect({ personal, setSelectedUserRole }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    // İlk kategori seçimini sıfırla
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSubCategories([]);
  }, [personal]);

  // Ana kategori değişikliği işleyici
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSubCategories(CategoriesJSON[category]?.SubCategories || []);
    setSelectedSubCategory("");
  };

  // Alt kategori değişikliği işleyici
  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategory(subCategory);
    setSelectedUserRole(subCategory);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 1 }}>
      {/* Ana Kategori Seçimi */}
      <FormControl fullWidth>
        <InputLabel id="category-label">2NTECH</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="2NTECH"
        >
          {Object.keys(CategoriesJSON)
            .filter((category) =>
              personal
                ? category === "personel" || category === "offical"
                : category !== "personel" && category !== "offical"
            )
            .map((category) => (
              <MenuItem key={category} value={category}>
                {CategoriesJSON[category].CategoryTitle}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Alt Kategori Seçimi */}
      {subCategories.length > 0 && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="sub-category-label">Alt 2NTECH</InputLabel>
          <Select
            labelId="sub-category-label"
            id="sub-category-select"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            label="Alt 2NTECH"
          >
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory.id} value={subCategory.id}>
                {subCategory.subCategoryTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
