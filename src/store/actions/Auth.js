import axios from "axios";

export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_ADMIN = "SIGNUP_ADMIN";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOGOUT = "LOGOUT";

export const signupUser = (fullName, email, username, password) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: "/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fullName,
          email,
          username,
          password,
        }),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logInUser = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status === 200 && response.data.success) {
        dispatch({
          type: LOGIN_USER,
          payload: {
            fullName: response.data.message.fullName,
            email: response.data.message.email,
            username: response.data.message.username,
            isAuthCustomer: true,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const signupAdmin = (fullName, email, username, password) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: "/auth/admin/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fullName,
          email,
          username,
          password,
        }),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logInAdmin = (username, password) => {
  return async (dispatch) => {
    // console.log('Here')
    try {
      const response = await axios({
        method: "POST",
        url: "/auth/admin/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status === 200 && response.data.success) {
        dispatch({
          type: LOGIN_ADMIN,
          payload: {
            fullName: response.data.message.fullName,
            email: response.data.message.email,
            username: response.data.message.username,
            isAuthAdmin: true,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      throw new Error();
    }
  };
};
