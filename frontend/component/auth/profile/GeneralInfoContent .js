import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  School,
  Work,
  Wc,
  Cake,
  Language,
  AccountTree,
  BusinessCenter,
  DriveEta,
  PersonSearch,
  StarBorder,
  LocationOn,
} from "@mui/icons-material";
const GeneralInfoContent = ({ Profile }) => {
  const getGenderText = (genderCode) => {
    switch (genderCode) {
      case "M":
        return "Erkek";
      case "F":
        return "Kadın";
      case "O":
        return "Diğer";
    }
  };
  const infoItems = [
    { title: "Ülke", value: Profile?.citizen, icon: <LocationOn /> },
    { title: "Üniversite", value: Profile?.university, icon: <School /> },
    { title: "Ajans", value: Profile?.agency, icon: <Work /> },
    {
      title: "Cinsiyet",
      value: getGenderText(Profile?.gender),
      icon: <Wc />,
    },
    { title: "Doğum Tarihi", value: Profile?.birthdate, icon: <Cake /> },
    {
      title: "Bildiği Diller",
      value: Profile?.languages,
      icon: <Language />,
    },
    { title: "Branşı", value: Profile?.branch, icon: <AccountTree /> },
    {
      title: "Departmanı",
      value: Profile?.department,
      icon: <BusinessCenter />,
    },
    {
      title: "Ehliyet Durumu",
      value: Profile?.driving_licence,
      icon: <DriveEta />,
    },
    { title: "Menejer", value: Profile?.manager, icon: <PersonSearch /> },
    {
      title: "Referans",
      value: Profile?.references,
      icon: <StarBorder />,
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
export default GeneralInfoContent;