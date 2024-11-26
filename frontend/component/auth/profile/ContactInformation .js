import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Phone, Facebook, Instagram } from "@mui/icons-material";

const ContactInformation = ({ Profile }) => {
  const infoItems = [
    { title: "Telefon Numarası", value: Profile?.phone, icon: <Phone /> },
    {
      title: "Facebook Adresi",
      value: Profile?.facebook,
      icon: <Facebook />,
    },
    {
      title: "Instagram Adresi",
      value: Profile?.instagram,
      icon: <Instagram />,
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
export default ContactInformation;
