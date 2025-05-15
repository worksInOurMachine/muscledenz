import Strapi from "strapi-sdk-js";
const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL,
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {},
});

// strapi.axios.defaults.headers.common["Authorization"] = "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN;
export { strapi };
