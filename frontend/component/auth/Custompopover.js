import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
const CustomPopover = ({ anchorEl, handleLeave, text }) => {
  return (
    <Popover
      id={Boolean(anchorEl) ? "mouse-over-popover" : undefined}
      sx={{
        pointerEvents: "none",
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleLeave}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>{text}</Typography>
    </Popover>
  );
};
export default CustomPopover;