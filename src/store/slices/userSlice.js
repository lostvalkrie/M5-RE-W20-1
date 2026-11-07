import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api/userAPI";

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getUser();
      console.log(data.results[0]);
      return data.results[0];
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message });
    }
  },
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

export default userSlice.reducer;
