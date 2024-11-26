import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import styles from './Layout.module.css'
import ProductCard from '@/component/cards/ProductCard'
import Upside from '@/component/cards/Carousel'
import CategoryCard from '@/component/cards/CategoryCard';
import { MainCategories } from '@/constants/CardValues';

export default function Dashboard() {
  return (
      <>
      <Upside/>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2, 
        width: '100%', 
        margin: 'auto',
        marginTop:10
      }}>
        {
          MainCategories.map((category, index) => (
            <CategoryCard 
              key={index} 
              cardImage={category.cardImage} 
              cardTitle={category.cardTitle} 
              urlPath={category.url_path} 
              tooltipText={category.tooltipText}
            />
          ))
        }
      </Box>

      <Box className={styles.cardContainer}>

      
      </Box>
    </>
  );
}


