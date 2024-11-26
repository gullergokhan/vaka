import { BASE_URL } from "@/constants/BackendValues";

/**
 * API class to handle HTTP requests.
 */
class API {
    /**
     * Perform a GET request to the specified endpoint.
     * @param {string} endpoint - The endpoint to send the GET request to.
     * @param {string|null} token - Optional token for authorization.
     * @returns {Promise<any>} - A promise that resolves with the response data.
     * @throws {Error} - If there is an HTTP error or a network error.
     */
    static async get(endpoint, token = null) {
        // Define headers with default Content-Type
        const headers = {
            'Content-Type': 'application/json',
        };

        // Add Authorization header if token is provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            // Perform the GET request
            const response = await fetch(BASE_URL + endpoint, {
                method: 'GET',
                headers: headers,
            });

            // Check if response is successful
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }

            // Parse and return the JSON response
            return response.json();
        } catch (error) {
            // Log the error and re-throw it
            console.error("Error fetching data:", error);
        }
    }

    /**
     * Perform a POST request to the specified endpoint.
     * @param {string} endpoint - The endpoint to send the POST request to.
     * @param {Object} data - The data to send in the POST request body.
     * @param {string|null} token - Optional token for authorization.
     * @returns {Promise<any>} - A promise that resolves with the response data.
     * @throws {Error} - If there is an HTTP error or a network error.
     */
    static async post(endpoint, data, token = null) {
        // Define headers with Content-Type for form data
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        // Add Authorization header if token is provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            // Perform the POST request
            const response = await fetch(BASE_URL + endpoint, {
                method: 'POST',
                headers: headers,
                body: new URLSearchParams(data).toString(),
            });

            // Check if response is successful
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }

            // Parse and return the JSON response
            return response.json();
        } catch (error) {
            // Log the error and re-throw it
            console.error("Error posting data:", error);
        }
    }
}

export default API;
