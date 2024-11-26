import React, { useState, useEffect, useContext } from "react";
import { Typography, Button, Box, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { CarouselImages } from "@/constants/Carousel";
import { useRouter } from "next/router";
import AppContext from "@/AppContext";

const SimpleCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = CarouselImages.length;
  const theme = useTheme();
  const router = useRouter();
  const { userInfo } = useContext(AppContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [activeStep]);

  const goToLogin = () => {
    router.push("/register");
  };

  return (
    <Box
      sx={{
        marginTop: "85px",
        position: "relative",
        width: "100%",
        height: "auto",
        flexGrow: 1,
      }}
    >
      <img
        src={CarouselImages[activeStep].image}
        alt={CarouselImages[activeStep].text}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: theme.spacing(6),
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "2rem",
            color: "white",
            textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          {CarouselImages[activeStep].text}
        </Typography>
        {!userInfo?.loggedIn && (
          <Button
            onClick={goToLogin}
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
          >
            ÜCRETSİZ KAYIT OLUN
          </Button>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: theme.spacing(2),
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {CarouselImages.map((item, index) => (
          <Button
            key={index}
            size="small"
            onClick={() => setActiveStep(index)}
            sx={{
              width: 12,
              height: 12,
              minWidth: 0,
              p: 0,
              m: 0.5,
              borderRadius: "50%",
              backgroundColor:
                activeStep === index ? "primary.main" : "grey.400",
              "&:hover": {
                backgroundColor:
                  activeStep === index ? "primary.dark" : "grey.500",
              },
            }}
          />
        ))}
      </Box>
      <Button
        size="large"
        onClick={handleBack}
        sx={{
          position: "absolute",
          top: "50%",
          left: theme.spacing(2),
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "white",
        }}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        size="large"
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: theme.spacing(2),
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "white",
        }}
      >
        <KeyboardArrowRight />
      </Button>
    </Box>
  );
};

export default SimpleCarousel;
