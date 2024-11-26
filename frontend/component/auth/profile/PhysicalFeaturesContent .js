import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  Visibility,
  Height,
  FitnessCenter,
  Palette,
  Accessibility,
} from "@mui/icons-material";

const PhysicalFeaturesContent = ({ Profile }) => {
  const infoItems = [
    {
      title: "Göz Rengi",
      value: Profile?.eye_color,
      icon: <Visibility />,
    },
    { title: "Boy", value: Profile?.length, icon: <Height /> },
    { title: "Kilo", value: Profile?.weight, icon: <FitnessCenter /> },
    { title: "Ten Rengi", value: Profile?.skin_color, icon: <Palette /> },
    {
      title: "Vücut Ölçüleri",
      value: Profile?.body_size,
      icon: <Accessibility />,
    },
  ];

  return (
    <Paper elevation={3} sx={{ padding: "16px", marginTop: "8px" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {infoItems.map((info, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              variant="outlined"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <CardContent sx={{ flex: "1 1 auto" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {info.icon}
                  <Box ml={1}>{info.title}</Box>
                </Typography>
                <Typography variant="body2">{info.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PhysicalFeaturesContent;
