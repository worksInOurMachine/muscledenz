import Strapi from "strapi-sdk-js";
const strapi = new Strapi({
  url: `${process.env.NEXT_PUBLIC_STRAPI_URL}` || "http://localhost:1337",
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN}`,
    },
  },
});
export default strapi;
