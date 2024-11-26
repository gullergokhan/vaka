import React, { useEffect, useState } from "react";
import API from "@/helpers/ApiBuilder";
import Cookies from "js-cookie";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from "@mui/material";

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionSource = await API.get("all-user-sessions", Cookies.get("accessToken"));
        setSessions(sessionSource.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" sx={{ color: "red", textAlign: "center", marginTop: 2 }}>{error}</Typography>;
  }

  return (
    <Box sx={{ spaceY: 6 }}>
      {sessions.length > 0 ? (
        <TableContainer sx={{ marginTop: 4, backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", padding: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Kullanıcı</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Login Zamanı</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Çıkış Zamanı</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Toplam Süre (dk)</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Geç Kalma (dk)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{session.user}</TableCell>
                  <TableCell align="center">{session.login_time}</TableCell>
                  <TableCell align="center">{session.logout_time || "N/A"}</TableCell>
                  <TableCell align="center">{session.duration}</TableCell>
                  <TableCell align="center">{session.late_minutes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", color: "#757575", marginTop: 3 }}>
          Veri bulunmamaktadır
        </Typography>
      )}
    </Box>
  );
}

export default Dashboard;
