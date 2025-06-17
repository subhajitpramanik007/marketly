import ApiService, { ApiResponse } from "./api";

const authService = new ApiService("http://localhost:8080/api/auth", {
  "Content-Type": "application/json",
});

export const healthCheck = async () => {
  const response = await authService.get<ApiResponse<any>>("/health");
  if (response.ok) {
    console.log(response.data.success);
  } else {
    console.log(response.error);
  }
};


