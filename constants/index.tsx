export const routesWithOutNaVbAR = ["/dashboard"];

export const CLIENT_AUTH_KEY = "clientAuth";
export const ADMIN_AUTH_KEY = "auth";

export const toastColors = {
  SUCESS: "green",
  FAIL: "red",
  INFO: "white",
};

export const ROWS_PER_PAGE = 8;
export const majorColors: string[] = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan
  "#FF00FF", // Magenta
  "#000000", // Black
  "#FFFFFF", // White
  "#808080", // Gray
  "#800000", // Maroon
  "#808000", // Olive
  "#800080", // Purple
  "#008080", // Teal
  "#FF6347", // Tomato
  "#FF4500", // OrangeRed
  "#FFD700", // Gold
  "#DAA520", // GoldenRod
  "#ADFF2F", // GreenYellow
  "#4B0082", // Indigo
  "#6A5ACD", // SlateBlue
  "#483D8B", // DarkSlateBlue
  "#2E8B57", // SeaGreen
  "#FF1493", // DeepPink
  "#C71585", // MediumVioletRed
  "#D2691E", // Chocolate
  "#F4A460", // SandyBrown
  "#B22222", // FireBrick
  "#FFB6C1", // LightPink
  "#FF69B4", // HotPink
  "#FF8C00", // DarkOrange
  "#9ACD32", // YellowGreen
];

export const emptyCart = {
  cart: [],
  total: 0,
  totalCount: 0,
};

export const emptyUser = {
  user_id: "",
  access_token: "",
  phone_number: "",
  email: "",
  name: "",
  is_Verfied: false,
  is_Admin: false,
  client_access_token: "",
  shippingDetails: [],
};

export const cartLocalStorageAcessKey = "cartDetails";

export const userStorageAcessKey = "userDetails";

export const priceRanges = [
  { value: "0", label: "Any Price" },
  { value: "500", label: "Under 500" },
  { value: "1000", label: "Under 1000" },
  { value: "5000", label: "Under 5000" },
  { value: "10000", label: "Under 10000" },
];

export const categories = [
  { value: "all", label: "All" },
  { value: "wood", label: "Wooden" },
  { value: "plastic", label: "Plastic" },
  { value: "glass", label: "Glass" },
];

export const sortBy = [
  { value: "all", label: "Default" },
  { value: "desc", label: "Price Low To High" },
  { value: "asc", label: "Price High To lIGH" },
];

export const size = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

