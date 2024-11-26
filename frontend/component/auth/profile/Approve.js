import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "@/helpers/ApiBuilder";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function Approve() {
  const [data, setData] = useState(null); // API verisi
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu

  // İzinleri API'den çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API'den veri çekme
        const response = await API.get("leaves/", Cookies.get("accessToken"));
        
        if (!response || !response.data || !Array.isArray(response.data)) {
          throw new Error("API'den geçersiz veya boş veri geldi.");
        }

        // Gelen veriyi state'e kaydet
        setData(response.data);  
        setLoading(false);  // Yükleniyor durumunu bitir
      } catch (error) {
        setError(`Veri alınamadı: ${error.message}`);
        setLoading(false);  // Yükleniyor durumunu bitir
      }
    };

    fetchData(); // Veri çekme fonksiyonunu çağır
  }, []);

  // Onay işlemi
  const handleApprove = async (leaveId) => {
    try {
      // İzin talebini onayla
      const response = await API.post(`leaves/approve/${leaveId}/`, { action: "approve" }, {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      });

      if (response.data.message === "Leave approved successfully") {
        // Onay başarılıysa veriyi yeniden al
        setData((prevData) => prevData.filter((leave) => leave.id !== leaveId));
      } else {
        alert("Onaylama işlemi başarısız.");
      }
    } catch (error) {
      alert("Onaylama işlemi sırasında bir hata oluştu.");
      console.error(error);
    }
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <Typography variant="h6" sx={{ color: "red", textAlign: "center", marginTop: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Tüm İzin Talepleri</Typography>

      {/* Tablo */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Kullanıcı</strong></TableCell>
              <TableCell><strong>Başlangıç Tarihi</strong></TableCell>
              <TableCell><strong>Bitiş Tarihi</strong></TableCell>
              <TableCell><strong>İzin Nedeni</strong></TableCell>
              <TableCell><strong>Onay Durumu</strong></TableCell>
              <TableCell><strong>Onayla</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employee_email}</TableCell>
                <TableCell>{leave.start_date}</TableCell>
                <TableCell>{leave.end_date}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>{leave.is_approved ? "Onaylı" : "Onaysız"}</TableCell>
                <TableCell>
                  {!leave.is_approved && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(leave.id)}
                    >
                      Onayla
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Approve;
