import { useState } from "react";
import Cookies from "js-cookie";
import API from "@/helpers/ApiBuilder";
import { Card, CardContent, TextField, Button, Typography, Box, Alert, Grid } from "@mui/material";

export default function RequestLeave({ profile }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleReasonChange = (e) => setReason(e.target.value);

  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason) {
      setError("All fields are required");
      return;
    }

    setError("");  // Clear previous error
    const formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("reason", reason);

    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      setError("You must be logged in to request leave.");
      return;
    }

    try {
      await API.post("create_leave/", formData, accessToken);
      setSuccess(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Request Leave
          </Typography>

          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ marginBottom: 2 }}>Leave request submitted successfully!</Alert>}

          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={3}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Reason for Leave"
                value={reason}
                onChange={handleReasonChange}
                fullWidth
                variant="outlined"
                multiline
                rows={1}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                sx={{ height: "100%" }}
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
