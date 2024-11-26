import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import {
  IosShare,
  ArrowForward,
  ArrowBack,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  Favorite,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const RecipeReviewCard = ({
  cardTitle = "",
  cardDescription = "",
  cardUrl = "",
  imageUrls = [
    "/images/m-1.jpg",
    "/images/m-2.jpg",
    "/images/m-3.jpg",
    "/images/m-4.jpg",
  ],
}) => {
  const [anchorEl, setanchorEl] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();

  const maxDescriptionLength = 100;
  const isCardDescriptionAvailable = cardDescription && cardDescription.length;
  const displayDescription =
    isCardDescriptionAvailable &&
    cardDescription.length > maxDescriptionLength &&
    !showFullDescription
      ? cardDescription.substring(0, maxDescriptionLength) + "..."
      : cardDescription;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleClick = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const handleButtonClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleExpandClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="div"
        sx={{
          position: "relative",
          overflow: "hidden",
          maxHeight: 400,
        }}
      >
        <img
          src={imageUrls[selectedImageIndex]}
          style={{
            width: "100%",
            height: "250px",
            display: "block",
            objectFit: "cover",
          }}
          alt=""
          onClick={() => router.push(cardUrl)}
        />
        {imageUrls.length > 1 && (
          <>
            <IconButton
              aria-label="prev"
              onClick={handlePrevClick}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              aria-label="next"
              onClick={handleExpandClick}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <ArrowForward />
            </IconButton>
          </>
        )}
        {isHovered && (
          <>
            <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
              <IconButton onClick={handleClick}>
                <IosShare sx={{ color: "white" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <WhatsApp /> WhatsApp
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Facebook /> Facebook
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Instagram /> Instagram
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Twitter /> Twitter
                </MenuItem>
              </Menu>
            </CardActions>
            <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <IconButton
                aria-label="add to favorites"
                onClick={handleButtonClick}
              >
                <Favorite sx={{ color: isFavorite ? "red" : "white" }} />
              </IconButton>
            </CardActions>
          </>
        )}
      </CardMedia>

      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          onClick={() => router.push(cardUrl)}
        >
          {cardTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {displayDescription}
        </Typography>
        {isCardDescriptionAvailable > maxDescriptionLength && (
          <Button size="small" onClick={toggleDescription}>
            {showFullDescription ? "Daha az göster" : "Devamını oku"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeReviewCard;
