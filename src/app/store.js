import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../services/slices/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
