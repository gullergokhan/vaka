import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import { mainColor, mainTextColor } from "@/constants/Colors";

const SubCategory = ({
  subCategoryTitle = "Title",
  icon = <AccountBoxIcon />,
  onClick,
  isActive,
  id,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      style={{
        width: 130,
        height: 130,
        margin: "auto",
        marginTop: 10,
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s",
        cursor: "pointer",
        margin: 10,
        boxShadow: "1px 4px 8px 1px rgba(0, 0, 0, 0.5)",
        backgroundColor: isActive ? mainColor : "white",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(id)}
    >
      <CardContent style={{ textAlign: "center" }}>
        <IconButton
          style={{ fontSize: 80, marginBottom: 1, backgroundColor: "white" }}
        >
          {icon}
        </IconButton>
        <Typography style={{ color: isActive ? mainTextColor : "black" }}>
          {subCategoryTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SubCategory;
