import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_WISHLIST_PRODUCTS = "GET_WISHLIST_PRODUCTS";
export const SET_WISHLIST_PRODUCTS = "SET_WISHLIST_PRODUCTS";

export const getAllProducts = () => {
  return async (dispatch) => {
    // console.log("all products action");
    try {
      const response = await axios({
        method: "GET",
        url: "/product/getAllProducts",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: {
            allProducts: response.data.message,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const addProduct = (
  productTitle,
  productPrice,
  quantity,
  description,
  productPic,
  adminEmail
) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/product/addProduct",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          productTitle,
          productPrice,
          quantity,
          description,
          productPic,
          adminEmail,
        }),
      });
      // console.log(response)
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const removeProduct = (deleteProductTitle, adminEmail) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/product/removeProduct",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          deleteProductTitle,
          adminEmail,
        }),
      });
      // console.log(response)
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const addToWishlist = (id, email) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/product/addToWishlist",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id,
          email,
        }),
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getWishlistProducts = (customerEmail) => {
  return async (dispatch) => {
    try {
      // console.log("Get Wishlist Action");
      const response = await axios({
        method: "POST",
        url: "/product/getWishlistProducts",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          customerEmail,
        }),
      });
      // console.log("here", response.data);
      if (response.data.success) {
        dispatch({
          type: GET_WISHLIST_PRODUCTS,
          payload: {
            allProducts: response.data.message,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const removeWishlistProduct = (customerEmail, id) => {
  return async (dispatch) => {
    try {
      // console.log("Action here");
      const response = await axios({
        method: "POST",
        url: "/product/removeWishlistProduct",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          customerEmail,
          id,
        }),
      });
      // console.log("here", response.data.message[0].wishlist);
      if (response.data.success) {
        dispatch({
          type: SET_WISHLIST_PRODUCTS,
          payload: {
            allProducts: response.data.message,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
