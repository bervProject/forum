import { authService, userService } from "./services";

const customAuthProvider = {
  signin({ email, password }: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      authService
        .post("/auth/login", { email, password })
        .then((result) => {
          const response = result.data;
          window.localStorage.setItem("accessToken", response.accessToken);
          window.localStorage.setItem("refreshToken", response.refreshToken);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        })
        .then(() => {
          userService
            .get(`/userByEmail/${encodeURI(email)}`)
            .then((result) => {
              const response = result.data;
              window.localStorage.setItem("user", JSON.stringify(response));
              resolve(response);
            });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  signout() {
    const refreshToken = window.localStorage.getItem('refreshToken');
    return new Promise<any>((resolve, reject) => {
      authService
        .post("/auth/logout", { token: refreshToken })
        .then((result) => {
          console.log(result.data);
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("refreshToken");
          resolve(result.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
};

export { customAuthProvider };
