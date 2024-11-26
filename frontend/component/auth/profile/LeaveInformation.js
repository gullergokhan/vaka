import React, { useEffect, useState } from "react";
import API from "@/helpers/ApiBuilder";
import Cookies from "js-cookie";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RequestLeave from "./RequestLeave";

function LeaveInformation() {
  const [profile, setProfile] = useState(null);  // For storing user profile
  const [leaveInfo, setLeaveInfo] = useState([]);  // For storing leave information as an array
  const [loading, setLoading] = useState(true);  // For tracking loading state
  const [error, setError] = useState(null);  // For handling errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user profile
        const currentUserSource = await API.get(
          "get_current_user",
          Cookies.get("accessToken")
        );
        const currentUser = currentUserSource.data;

        if (currentUser) {
          setProfile(currentUser);  // Set the profile state
          
          // Fetch leave information using the user's ID
          const leaveSource = await API.get(
            `leaves/user/${currentUser.id}/`,  // API endpoint to fetch the leave information
            Cookies.get("accessToken")
          );
          const leaveData = leaveSource.data;
          setLeaveInfo(leaveData);  // Set the leave data state
        }
        setLoading(false);  // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means this will only run once when the component mounts

  // Handling the loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box className="space-y-6">
      {profile && leaveInfo.length > 0 ? (
        <div>
          <RequestLeave profile={profile} leaveInfo={leaveInfo} />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8">Leave Information</h2>
          <TableContainer className="mt-4 bg-white p-6 shadow-xl rounded-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-semibold text-gray-600">Start Date</TableCell>
                  <TableCell className="font-semibold text-gray-600">End Date</TableCell>
                  <TableCell className="font-semibold text-gray-600">Approved</TableCell>
                  <TableCell className="font-semibold text-gray-600">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveInfo.length > 0 ? (
                  leaveInfo.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-800">{new Date(leave.start_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm text-gray-800">{new Date(leave.end_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm text-gray-800">{leave.reason}</TableCell>
                      <TableCell className="text-sm text-gray-800">{leave.isapproved ? "Approved" : "Pending"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-gray-500 text-sm">No leave requests available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p className="text-center text-gray-600">No profile or leave information available</p>
      )}
    </Box>
  );
}

export default LeaveInformation;
