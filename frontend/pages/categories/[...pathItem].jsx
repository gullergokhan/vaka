import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import SubCategory from "@/component/cards/SubCategoryCard";
import ProductCard from "@/component/cards/ProductCard";
import { CategoriesJSON } from "@/constants/Categories";
import API from "@/helpers/ApiBuilder";
import AppContext from "@/AppContext";
import Cookies from "js-cookie";
import { BackendMediaPath } from "@/constants/BackendValues";

const SubCategoriesPage = () => {
  const { query } = useRouter();
  const categoryPathItem = query.pathItem ? query.pathItem[0] : "";
  const subCategoryPathItem =
    query.pathItem && query.pathItem.length >= 2 ? query.pathItem[1] : "";
  const category = CategoriesJSON[categoryPathItem];
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [profiles, setProfiles] = useState(null);
  const { userInfo } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // Check is logged in
    if (userInfo.user === null) {
      return;
    }
    if (!userInfo.loggedIn) {
      router.push("/login");
      return;
    }
    if (subCategoryPathItem) {
      // If sub category id sended in path
      setActiveSubCategory(subCategoryPathItem);
      getProfiles(subCategoryPathItem);
    } else if (category && category.SubCategories.length > 0) {
      // On load, select first and call getProfiles to get profiles
      setActiveSubCategory(category.SubCategories[0].id);
      getProfiles(category.SubCategories[0].id);
    }
  }, [category, userInfo]);

  const getProfiles = async (id) => {
    // Get accessToken ant check with it
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      try {
        const response = await API.get(
          `get_profiles_by_user_role/${id}/`,
          accessToken
        );
        if (response && response.data) {
          setProfiles(response.data);
        }
      } catch (error) {
        console.error("Profil bilgisi yüklenirken bir hata oluştu:", error);
      }
    }
  };

  if (!category?.CategoryTitle) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Typography
        style={{
          marginTop: "95px",
          textAlign: "center",
          fontSize: "4.5rem",
          fontFamily: "Varela Round",
        }}
        sx={{ marginTop: "85px" }}
      >
        {category.CategoryTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          m: "10px",
          mt: "25px",
        }}
      >
        {category.SubCategories.map((subCategory, index) => (
          <SubCategory
            key={index}
            {...subCategory}
            onClick={() => {
              setActiveSubCategory((prevId) =>
                prevId === subCategory.id ? "" : subCategory.id
              );
              getProfiles(subCategory.id);
            }}
            isActive={activeSubCategory === subCategory.id}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: "20px",
        }}
      >
        {profiles &&
          profiles.map((profile, index) => (
            <Box key={index} sx={{ m: "20px" }}>
              <ProductCard
                cardTitle={`${profile.first_name} ${profile.last_name}`}
                cardDescription={profile.introduction}
                cardUrl={`/detail/${profile?.id}`}
                imageUrls={[
                  profile?.photo
                    ? `${BackendMediaPath}${profile.photo}`
                    : "/avtar.webp",
                ]}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default SubCategoriesPage;
