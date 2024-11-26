import { Person, Face2, Work, SlowMotionVideo, ConnectWithoutContact } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import API from '@/helpers/ApiBuilder';
import AppContext from '@/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import { BackendMediaPath } from '@/constants/BackendValues';
import Divider from '@mui/material/Divider';
import { useIsMobile } from '@/constants/Main';

const DetailPage = ({ }) => {
    const { router, query } = useRouter();
    const { userInfo } = useContext(AppContext);
    const userId = query.pathItem;
    const isMobile = useIsMobile(800)

    // Use state to manage the artist profile
    const [Profile, setProfile] = useState(null);

    useEffect(() => {
        // Define an async function to fetch data
        async function fetchProfile() {
            if (userInfo.user === null) {
                return;
            }
            if (!userInfo.loggedIn) {
                router.push('/login');
                return;
            }
            const accessToken = Cookies.get("accessToken");
            if (accessToken && userId) {
                const profile = await API.get(`get_profile/${userId}/`, accessToken);
                setProfile(profile?.data);
            }
        }
        fetchProfile();
        return () => {
            // Any cleanup logic goes here
        };
    }, [userInfo, router, userId]);

    if (!userInfo) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    } else if (Profile?.error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="warning">
                    <Typography variant="h6">{Profile?.error}</Typography>
                </Alert>
            </Box>
        );
    }
    return (
        <Box p={isMobile ? 0 : 11} mt={isMobile ? 8 : 0}>
            {Profile && (

                <Grid container sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)', bgcolor: 'background.paper', borderRadius: 2 , 
                backgroundImage: `url(${"/images/detail/background.png"})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',}}>
                    {/* Left Top Column */}
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Image */}
                        <Avatar
                            alt={`${Profile.first_name} ${Profile.last_name}`}
                            src={BackendMediaPath + Profile.photo || "path/to/default/image.jpg"}
                            sx={{
                                width: { xs: '50vw', sm: '30vw', md: 300, },
                                height: { xs: '50vw', sm: '30vw', md: 300, },
                                margin: 2
                            }}
                        />
                    </Grid>
                    {/* Middle Top Column */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: 325, margin: 0.75, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                            <CardContent>
                                <Typography variant="h6">{' '}<Person sx={{ fontSize: 33 }} /> Kisisel bilgiler</Typography>
                                <Divider sx={{ bgcolor: 'black', my: 1 }} />
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Isim:</Typography>
                                    {' '}{Profile?.first_name}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Soyisim:</Typography>
                                    {' '}{Profile?.last_name}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Telefon numarasi:</Typography>
                                    {' '}{Profile?.phone}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Ulke:</Typography>
                                    {' '}{Profile?.country}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Sehir:</Typography>
                                    {' '}{Profile?.city}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Uyruk:</Typography>
                                    {' '}{Profile?.citizen}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Right Top Column */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: 325, margin: 0.75, backgroundColor: 'rgba(255, 255, 255, 0.85)' }} >
                            <CardContent>
                                <Typography variant="h6"><Face2 /> Vucut ozellikleri</Typography>
                                <Divider sx={{ bgcolor: 'black', my: 1 }} />
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Cinsiyet:</Typography>
                                    {Profile?.gender == "M" ? "Bay" : "Bayan"}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Vücut ölçüsü:</Typography>
                                    {' '}{Profile?.body_size}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Boy ölçüsü:</Typography>
                                    {' '}{Profile?.length}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Kilo:</Typography>
                                    {' '}{Profile?.weight}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Goz rengi:</Typography>
                                    {' '}{Profile?.eye_color}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Cilt rengi:</Typography>
                                    {' '}{Profile?.skin_color}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Bottom Column */}
                    <Grid item xs={12} md={4}>
                        {/* Basic Information */}
                        <Card sx={{ height: 325, margin: 0.75, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                            <CardContent>
                                <Typography variant="h6"><Work /> Profesyonel bilgi</Typography>
                                <Divider sx={{ bgcolor: 'black', my: 1 }} />
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Ehliyet:</Typography>
                                    {' '}{Profile?.driving_licence}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Ajans:</Typography>
                                    {' '}{Profile?.agency}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Brans:</Typography>
                                    {' '}{Profile?.branch}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Diller:</Typography>
                                    {' '}{Profile?.languages}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Tecrube:</Typography>
                                    {' '}{Profile?.experience}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Middle Bottom Column */}
                    <Grid item xs={12} md={4}>
                        {/* Other Information */}
                        <Card sx={{ height: 325, margin: 0.75, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                            <CardContent>
                                <Typography variant="h6"><ConnectWithoutContact sx={{ fontSize: 30 }} /> Sosyal platformlar</Typography>
                                <Divider sx={{ bgcolor: 'black', my: 1 }} />
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Facebook:</Typography>
                                    {' '}{Profile?.facebook}
                                </Typography>
                                <Typography variant="body1" m={2}>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}> Instagram:</Typography>
                                    {' '}{Profile?.instagram}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Bottom Column */}
                    <Grid item xs={12} md={4}>
                        {/* Other Information */}
                        <Card sx={{ height: 325, margin: 0.75, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                
                                <video controls style={{minWidth: '400px',height: '295px'}}>
                                    <source src={BackendMediaPath + Profile.video} type="video/mp4" />
                                    Sorry, your browser doesn't support embedded videos.
                                </video>
                                {/* More other info fields */}
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default DetailPage;