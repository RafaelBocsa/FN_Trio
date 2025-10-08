import api from "./axios";

export const fetchGeminiResponse = async (question, uuid) => {
  try {
    const response = await api.post(
      `${api.defaults.baseURL}/api/v1/gemini/` + uuid + `/ask`,
      { question }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
