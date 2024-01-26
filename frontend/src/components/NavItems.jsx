import React, { useCallback } from "react";
import { showNav } from "../store/atoms/nav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allCourses, myPurchasedCourses } from "../store/atoms/courses";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const buttonClassText =
  "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

const allNavFalse = {
  allCourses: false,
  myLearnings: false,
  myCourses: false,
  addNewCourse: false,
};
function NavItems() {
  const navigate = useNavigate();
  const setPurchasedCourses = useSetRecoilState(myPurchasedCourses);
  const setAllCourses = useSetRecoilState(allCourses);

  const [navBarSign, setNavBarSign] = useRecoilState(showNav);

  const getAllCourses = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/creator/courses`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(response.data);

      setAllCourses(response.data);
      setNavBarSign({ ...allNavFalse, allCourses: true });

      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getPurchasedCourses = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/creator/purchasedCourses`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(response.data.purchasedCourses);

      setPurchasedCourses(response.data.purchasedCourses);
      setNavBarSign({ ...allNavFalse, myLearnings: true });

      navigate("/myLearnings");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="mt-4 ms-12 ps-10">
      <button type="button" className={buttonClassText} onClick={getAllCourses}>
        All Courses
      </button>
      <button
        type="button"
        className={buttonClassText}
        onClick={getPurchasedCourses}
      >
        My Learning
      </button>
      <button
        type="button"
        className={buttonClassText}
        // onClick={getMyCourses}
      >
        My Courses
      </button>

      <button type="button" className={buttonClassText}>
        Add new Course
      </button>
    </div>
  );
}

export default NavItems;
