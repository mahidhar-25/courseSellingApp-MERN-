import { atom, selector } from "recoil";
import axios from "axios";

export const coursesAtom = atom({
  key: "coourseAtom",
  default: [],
});

export const myPurchasedCourses = atom({
  key: "myPurchasedCourses",
  default: [],
});

// export const fetchPurchasedCourses = selector({
//   key: "fetchPurchasedCourses",
//   get: async ({ get }) => {
//     const accessToken = localStorage.getItem("accessToken");

//     const response = await axios.get(`http://localhost:3000/creator/courses`, {
//       headers: {
//         authorization: accessToken,
//       },
//     });

//     return response.data;
//   },
// });
