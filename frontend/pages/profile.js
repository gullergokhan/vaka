import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Switch,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  Settings,
  Close,
  VideoCameraFront,
  PhotoCamera,
} from "@mui/icons-material";
import GeneralInfoContent from "@/component/auth/profile/GeneralInfoContent ";
import PhysicalFeaturesContent from "@/component/auth/profile/PhysicalFeaturesContent ";
import ContactInformation from "@/component/auth/profile/ContactInformation ";
import SocialMediaAccounts from "@/component/auth/profile/SocialMediaAccounts ";
import EditProfileForm from "@/component/auth/profile/EditProfileForm";
import { BASE_URL } from "@/constants/BackendValues";
import { useIsMobile } from "@/constants/Main";
import Cookies from "js-cookie";
import API from "@/helpers/ApiBuilder";
import AppContext from "@/AppContext";
import { BackendMediaPath } from "@/constants/BackendValues";
import LeaveInformation from "@/component/auth/profile/LeaveInformation";
import Dashboards from "@/component/auth/profile/Dashboard";
import Report from "@/component/auth/profile/Reports";
import Approve from "@/component/auth/profile/Approve";

function Profile() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({});
  const [anchorEl, setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [Profile, setProfile] = useState(null);
  const isMobile = useIsMobile(800);
  const updateEndpoint = "update_profile"
  const isManager =
    userInfo &&
    userInfo.user &&
    userInfo.user.user_role &&
    userInfo.user.user_role.includes("offical");

  useEffect(() => {
    async function fetchProfileData() {
      if (userInfo.user === null) {
        return;
      }
      if (!userInfo.loggedIn) {
        router.push("/login");
        return;
      }
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("Access token bulunamadı.");
        return;
      }
      try {
        const response = await API.get("get_profile", accessToken);
        if (response && response.data) {
          setProfile(response.data);
          setIsSwitchChecked(response.data.is_active);
        }
      } catch (error) {
        console.error("Profil bilgisi yüklenirken bir hata oluştu:", error);
      }
    }

    fetchProfileData();
  }, [userInfo, router]);

  if (!userInfo) {
    return <Box sx={{ marginTop: 10 }}>Loading...</Box>;
  }
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const handleEditClick = () => {
    setDrawerOpen(true);

    setEditedProfileData(Profile || {});
  };
  /**
   * Recursively replaces all null values in an object with empty strings.
   * @param {Object} obj - The object to be processed.
   */
  const replaceNulls = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        obj[key] = "";
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        replaceNulls(obj[key]);
      }
    });
  };
  const handleSave = async (updatedProfile) => {
    replaceNulls(updatedProfile);
    delete updatedProfile["is_active"];
    delete updatedProfile["experience"];
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      await API.post(updateEndpoint, updatedProfile, accessToken);
      setProfile(updatedProfile);
      setDrawerOpen(false);
    }
  };

  const handleCancel = () => {
    setDrawerOpen(false);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const AboutContent = () => (
    <Box sx={{ margin: "auto", maxWidth: "300px", textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: "2rem",
          fontFamily: "Varela Round",
          textAlign: "center",
        }}
      >
        Hakkımda
      </Typography>
      <Typography sx={{ marginBottom: "10px", fontSize: "1rem" }}>
        {Profile ? Profile.introduction : ""}
      </Typography>
    </Box>
  );
  const handleCameraClick = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("avatar", file);
          const jwtToken = Cookies.get("accessToken");
          try {
            const response = await fetch(`${BASE_URL}${updateEndpoint}`, {
              method: "POST",
              headers: jwtToken
                ? {
                    Authorization: `Bearer ${jwtToken}`,
                  }
                : {},
              body: formData,
            });

            if (response.ok) {
              const dataSource = await response.json();
              const data = dataSource.data;

              setProfile((prevState) => ({
                ...prevState,
                photo: data.photo,
              }));
              setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                user: {
                  ...prevUserInfo.user,
                  photo: data.photo,
                },
              }));
            } else {
              console.error(
                "Profil fotoğrafı güncellenirken hata oluştu:",
                response.status
              );
            }
          } catch (error) {
            console.error("Profil fotoğrafı güncelleme hatası:", error);
          }
          document.body.removeChild(fileInput);
        }
      };
      document.body.appendChild(fileInput);
      fileInput.click();
    } catch (error) {
      console.error("Dosya seçme hatası:", error);
    }
  };

  const handleVideoClick = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "video/*";

      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("video", file);
          const jwtToken = Cookies.get("accessToken");
          try {
            const response = await fetch(`${BASE_URL}${updateEndpoint}`, {
              method: "POST",
              headers: jwtToken
                ? {
                    Authorization: `Bearer ${jwtToken}`,
                  }
                : {},
              body: formData,
            });
            if (response.ok) {
              const dataSource = await response.json();
              const data = dataSource.data;
              setProfile((prevState) => ({
                ...prevState,
                video: data.video,
              }));
            } else {
              console.error(
                "Profil fotoğrafı güncellenirken hata oluştu:",
                response.status
              );
            }
          } catch (error) {
            console.error("Profil fotoğrafı güncelleme hatası:", error);
          }
          document.body.removeChild(fileInput);
        }
      };
      document.body.appendChild(fileInput);
      fileInput.click();
    } catch (error) {
      console.error("Dosya seçme hatası:", error);
    }
  };

  const handleActiveChange = async (event) => {
    const newActiveStatus = event.target.checked;

    try {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const accessToken = Cookies.get("accessToken");
        let responseSource = await API.post(
          updateEndpoint,
          { is_active: newActiveStatus },
          accessToken
        );
        let response = responseSource.data;
        if (response?.error) {
          console.error(
            "Aktif durumu güncellenirken hata oluştu:",
            response.status
          );
          setIsSwitchChecked(Profile.is_active);
        } else {
          setIsSwitchChecked(response.is_active);
        }
      }
    } catch (error) {
      console.error("Aktif durumu güncelleme hatası:", error);
      setIsSwitchChecked(Profile.is_active);
    }
  };
  const tabContents = [
    {
      label: "Genel Bilgiler",
      content: <GeneralInfoContent Profile={Profile} />,
    },
     {
      label: "Fiziksel Özellikler",
      content: <PhysicalFeaturesContent Profile={Profile} />,
    },
    {
      label: "Sosyal Medya Hesapları",
      content: <SocialMediaAccounts Profile={Profile} />,
    },
    {
      label: "İletişim Bilgileri",
      content: <ContactInformation Profile={Profile} />,
    },
    ...(isManager ? [] : [{
      label: "İzinlerim",
      content: <LeaveInformation Profile={Profile} />,
    }]),
    isManager && {
      label: "Giriş Çıkış Görüntüle",
      content: <Dashboards Profile={Profile} />,
    },
    isManager && {
      label: "Rapor Görüntüle",
      content: <Report Profile={Profile} />,
    },
    isManager && {
      label: "Onay",
      content: <Approve Profile={Profile} />,
    },
  ].filter(Boolean);
  return (
    <Box p={5}>
      {Profile && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginTop: 5,
              textAlign: "center",
              fontSize: "3rem",
              fontFamily: "Varela Round",
            }}
            gutterBottom
          >
            Profile
          </Typography>
          <Box
            sx={{
              position: "absolute",
              right: 40,
              top: 90,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Switch
                  checked={isSwitchChecked}
                  onChange={handleActiveChange}
                />
              </Box>
              <IconButton
                aria-label="ayarlar"
                onClick={() => {
                  handleClose();
                  handleEditClick();
                }}
                sx={{ width: 50 }}
              >
                <Settings />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 3,
              marginLeft: isMobile ? "" : "150px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: { md: 3 },
              }}
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={Profile ? BackendMediaPath + Profile.photo : ""}
                  sx={{
                    width: 200,
                    height: 200,
                    border: "2px solid #fff",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleCameraClick}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    border: "2px solid #3f51b5",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {userInfo && userInfo.user
                    ? `${userInfo.user.first_name} ${userInfo.user.last_name}`
                    : ""}
                </Typography>
                <Typography>
                  {" "}
                  {userInfo && userInfo.user ? userInfo.user.email : ""}{" "}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "50%" }, textAlign: "center" }}>
              <AboutContent />
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", md: "40%" },
                height: "auto",
                margin: 2,
              }}
            >
              <video
                controls
                key={Profile ? Profile.video : "default-key"}
                style={{ width: "100%", height: "auto", maxHeight: "325px" }}
              >
                <source
                  src={Profile ? BackendMediaPath + Profile.video : ""}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <IconButton
                color="secondary"
                onClick={handleVideoClick}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: isMobile ? "" : -10,
                  border: "2px solid #3f51b5",
                  backgroundColor: "background.paper",
                  borderRadius: "50%",
                }}
              >
                <VideoCameraFront />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: 15, textAlign: "center" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered={!isMobile}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
            >
              {tabContents.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>

            {tabContents[activeTab] && tabContents[activeTab].content}
          </Box>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box sx={{ width: isMobile ? "100%" : 750 }} role="presentation">
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ position: "absolute", left: 8, top: 8 }}
              >
                <Close />
              </IconButton>
              <Typography
                sx={{ textAlign: "center", pt: 3 }}
                variant="h6"
                noWrap
              >
                Profili Düzenle
              </Typography>
              <EditProfileForm
                profile={editedProfileData}
                onSave={handleSave}
                onCancel={handleCancel}
                isManager={isManager}
              />
            </Box>
          </Drawer>
        </Box>
      )}
    </Box>
  );
}
export default Profile;
