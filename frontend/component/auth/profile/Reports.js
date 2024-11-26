import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "@/helpers/ApiBuilder";
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function Report() {
  const [data, setData] = useState(null); // API verisi
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API'den veri çekme
        const response = await API.get("monthly-report/", Cookies.get("accessToken"));
        
        // Yanıtı konsola yazdır
        console.log("API Yanıtı:", response);
    
        // Eğer response veya response.data boşsa hata fırlat
        if (!response || !response.data || !Array.isArray(response.data)) {
          throw new Error("API'den geçersiz veya boş veri geldi.");
        }

        // Gelen veriyi state'e kaydet
        console.log("Gelen veri:", response.data);
        setData(response.data);  
        setLoading(false);  // Yükleniyor durumunu bitir
      } catch (error) {
        console.error("API Hatası:", error.message);
        setError(`Veri alınamadı: ${error.message}`);
        setLoading(false);  // Yükleniyor durumunu bitir
      }
    };

    fetchData(); // Veri çekme fonksiyonunu çağır
  }, []);

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

  // Toplam sürelerin hesaplanması
  const totalMinutes = data?.reduce((acc, userData) => acc + userData.total_minutes, 0);
  const totalLateMinutes = data?.reduce((acc, userData) => acc + userData.total_late_minutes, 0);
  const totalLateHours = totalLateMinutes / 60; // Geç kalma süresi saat cinsinden

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Rapor Verisi</Typography>

      {/* Toplam Çalışma ve Geç Kalma Süreleri */}
      <Typography variant="body1">Toplam Çalışma Süresi: {totalMinutes?.toFixed(2)} dakika</Typography>
      <Typography variant="body1">Toplam Geç Kalma Süresi: {totalLateMinutes?.toFixed(2)} dakika</Typography>
      <Typography variant="body1">Toplam Geç Kalma Süresi: {totalLateHours?.toFixed(2)} saat</Typography>

      {/* Tablo */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Kullanıcı</strong></TableCell>
              <TableCell><strong>Toplam Çalışma Süresi (Dakika)</strong></TableCell>
              <TableCell><strong>Geç Kalma Süresi (Dakika)</strong></TableCell>
              <TableCell><strong>Geç Kalma Süresi (Saat)</strong></TableCell>
              <TableCell><strong>İlk Giriş Zamanı</strong></TableCell>
              <TableCell><strong>İlk Çıkış Zamanı</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((userData, index) => (
              <TableRow key={index}>
                <TableCell>{userData.user}</TableCell>
                <TableCell>{userData.total_minutes.toFixed(2)}</TableCell>
                <TableCell>{userData.total_late_minutes.toFixed(2)}</TableCell>
                <TableCell>{userData.total_late_hours.toFixed(2)}</TableCell>
                <TableCell>{userData.first_login_time}</TableCell>
                <TableCell>{userData.first_logout_time || "Yok"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Report;
