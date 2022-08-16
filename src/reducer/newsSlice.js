import { createSlice, current } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    clips: [],
  },
  // 스토어의 액션들을 수행하도록 해주는 함수
  reducers: {
    // 클립 추가
    addClip: (state, action) => {
      const newClip = action.payload; // 기사에 대한 정보 전체를 받아온다.
      return {
        clips: [newClip, ...state.clips],
      };
    },
    // 클립 제거
    removeClip: (state, action) => {
      const clipItems = current(state).clips;
      return {
        clips: [...clipItems.filter((news) => news._id !== action.payload._id)],
      };
    },
  },
});

export const { addClip, removeClip } = newsSlice.actions;
export default newsSlice.reducer;
