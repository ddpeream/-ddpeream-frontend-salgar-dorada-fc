import { formCreatedDto } from "./player.interfase";
import axios from "axios";

const getAxiosConfig = () => {
  const loginData = localStorage.getItem("LOGIN");
  const token = loginData ? JSON.parse(loginData) : null;
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createPlayer = async (
  player: formCreatedDto
): Promise<formCreatedDto> => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = getAxiosConfig();
  try {
    console.log("Body", player);
    const response = await axios.post(
      `https://${BASE_URL}/players`,
      player,
      config
    );
    console.log("La respuesta de crear", response);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('error al crear', error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
  return player;
};

export const getPlayers = async (): Promise<formCreatedDto[]> => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = getAxiosConfig();
  try {
    const response = await axios.get(`https://${BASE_URL}/players`, config);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    throw new Error("Error al obtener jugadores");
  }
};
