export const API_CLIENT_ID = process.env.API_CLIENT_ID || "default-client-id";
export const API_CLIENT_SECRET =
	process.env.API_CLIENT_SECRET || "default-client-secret";
export const API_VERSION = process.env.API_VERSION || "v1";
export const API_URL = process.env.API_URL || "http://localhost:3000";
export const BASE_API_URL = `${API_URL}/${API_VERSION}`;
