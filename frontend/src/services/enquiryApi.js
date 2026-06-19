import api from "./api";

export const submitEnquiry = async (data) => {
  const response = await api.post(
    "/enquiry",
    data
  );

  return response.data;
};