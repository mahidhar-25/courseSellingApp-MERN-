import { atom } from "recoil";

export const showNav = atom({
  key: "showNav",
  default: {
    allCourses: true,
    myLearnings: false,
    myCourses: false,
    addNewCourse: false,
  },
});
