import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  School,
  Work,
  Wc,
  Cake,
  Language,
  AccountTree,
  DriveEta,
  PersonSearch,
  StarBorder,
  Visibility,
  Height,
  FitnessCenter,
  Palette,
  Accessibility,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  BusinessCenter,
} from "@mui/icons-material";

const EditProfileForm = ({ profile, onSave, onCancel, isArtist }) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">Genel Bilgiler</Typography>
      <TextField
        fullWidth
        label="Country"
        name="citizen"
        value={formData.citizen || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="University"
        name="university"
        value={formData.university || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <School />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="Agency"
        name="agency"
        value={formData.agency || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Work />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <Wc />
            </InputAdornment>
          }
          label="Gender"
        >
          <MenuItem value="M">Erkek</MenuItem>
          <MenuItem value="F">Kadın</MenuItem>
          <MenuItem value="O">Diğer</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="date"
        fullWidth
        type="date"
        label="Birthdate"
        name="birthdate"
        value={formData.birthdate || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Cake />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Languages"
        name="languages"
        value={formData.languages || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Language />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="Branch"
        name="branch"
        value={formData.branch || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountTree />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="Department"
        name="department"
        value={formData.department || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BusinessCenter />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="Driving Licence"
        name="driving_licence"
        value={formData.driving_licence || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DriveEta />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Manager"
        name="manager"
        value={formData.manager || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSearch />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      <TextField
        fullWidth
        label="References"
        name="references"
        value={formData.references || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StarBorder />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
          title: "Lütfen yalnızca harf, boşluk ve virgül girin",
        }}
      />
      {isArtist && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Fiziksel Özellikler
          </Typography>
          <TextField
            fullWidth
            label="Eye Color"
            name="eye_color"
            value={formData.eye_color || ""}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
            }}
            inputProps={{
              pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
              title: "Lütfen yalnızca harf, boşluk ve virgül girin",
            }}
          />
          <TextField
            fullWidth
            label="Height"
            name="length"
            value={formData.length || ""}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Height />
                </InputAdornment>
              ),
            }}
            inputProps={{
              pattern: "[0-9]+",
              title: "yanlıca rakam giriniz",
            }}
          />
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            value={formData.weight || ""}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FitnessCenter />
                </InputAdornment>
              ),
            }}
            inputProps={{
              pattern: "[0-9]+",
              title: "yanlıca rakam giriniz",
            }}
          />
          <TextField
            fullWidth
            label="Skin Color"
            name="skin_color"
            value={formData.skin_color || ""}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Palette />
                </InputAdornment>
              ),
            }}
            inputProps={{
              pattern: "[A-Za-zğüşöçİĞÜŞÖÇ ,]+",
              title: "Lütfen yalnızca harf, boşluk ve virgül girin",
            }}
          />
          <TextField
            fullWidth
            label="Body Measurements"
            name="body_size"
            value={formData.body_size || ""}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Accessibility />
                </InputAdornment>
              ),
            }}
            inputProps={{
              pattern: "[0-9]+",
              title: "yanlıca rakam giriniz",
            }}
          />
        </>
      )}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Sosyal Medya Hesapları
      </Typography>
      <TextField
        fullWidth
        label="Facebook Address"
        name="facebook"
        value={formData.facebook || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Facebook />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Instagram Address"
        name="instagram"
        value={formData.instagram || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Instagram />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h6" sx={{ mt: 4 }}>
        İletişim Bilgiler
      </Typography>
      <TextField
        fullWidth
        label="Facebook Address"
        name="facebook"
        value={formData.facebook || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Facebook />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Instagram Address"
        name="instagram"
        value={formData.instagram || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Instagram />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Telefon Numarası"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
        inputProps={{
          pattern: "[0-9]+",
          title: "yanlıca rakam giriniz",
        }}
      />
      <Typography variant="h6" sx={{ mt: 4 }}>
        Hakkımda
      </Typography>
      <textarea
        name="introduction"
        value={formData.introduction || ""}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "18.5px 14px",
          fontSize: "1rem",
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.23)",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.87)",
          },
          "&:focus": {
            outline: "2px solid #3f51b5",
          },
        }}
        rows={4}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button type="submit" variant="contained" color="success">
          Save
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
