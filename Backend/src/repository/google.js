import axios from "axios";

export const fetchUserDetails = async (accessToken) =>{
    try {
        const headers = {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json",
		};
		const params = {
			personFields: "names,emailAddresses,phoneNumbers,photos,genders,coverPhotos", // Specify the desired fields here
		};
		const response = await axios.get("https://people.googleapis.com/v1/people/me", {
			headers,
			params,
		});
		return response.data;
    } catch (error) {
        throw error
    }
};
