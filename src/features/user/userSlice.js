import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../api/userApi";
import Cookies from "js-cookie";
import { api, SESSIONS_ENDPOINT } from "../../utils/api";

const getCurrentUserId = async () => {
  const accessToken = Cookies.get("_access_token");
  const client = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken || !client || !uid) {
    return null;
  }

  try {
    const res = await api.get(SESSIONS_ENDPOINT, {
      headers: {
        "access-token": accessToken,
        client: client,
        uid: uid,
      },
    });

    if (res.status === 200) {
      return res.data.data.id;
    }
    return null;
  } catch (error) {
    console.error("ユーザーID取得中にエラーが発生しました:", error);
    return null;
  }
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await getUser(userId);
  const currentUserId = await getCurrentUserId();

  return {
    ...response,
    is_self: currentUserId === Number(userId),
  };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
