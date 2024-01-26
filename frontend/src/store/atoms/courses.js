import { atom, selector } from "recoil";
import axios from "axios";
import PurchasedCourses from "../../components/PurchasedCourses";

export const coursesAtom = atom({
  key: "courseAtom",
  default: [],
});

export const myPurchasedCourses = atom({
  key: "myPurchasedCourses",
  default: [],
});

export const myFilteredPurchasedCourses = atom({
  key: "myFilteredPurchasedCourses",
  default: selector({
    key: "myFilteredPurchasedCoursesSelector",
    get: ({ get }) => {
      const courses = get(allCourses);
      const purchasedCourses = get(myPurchasedCourses);

      const filteredCourses = purchasedCourses.map((course) => {
        const filteredCourse = courses.find((c) => c._id === course._id);

        return {
          ...course,
          course: {
            ...filteredCourse,
          },
        };
      });

      return filteredCourses;
    },
  }),
});

export const myCourses = atom({
  key: "myCourses",
  default: [],
});
export const allCourses = atom({
  key: "allCourses",
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
