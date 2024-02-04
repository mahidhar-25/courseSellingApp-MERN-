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

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: true,
});

export const filterToSearch = atom({
  key: "filterToSearch",
  default: "",
});

export const loading = atom({
  key: "loading",
  default: true,
});
