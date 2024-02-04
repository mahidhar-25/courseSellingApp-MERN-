import React, { useCallback } from "react";

import NavItems from "./NavItems.jsx";
import { useRecoilValue } from "recoil";
import { allCourses, filteredAllCourses } from "../store/atoms/courses.js";
import CourseCard from "./CourseCard.jsx";
import { filterToSearch, showNav } from "../store/atoms/nav.js";
function LandingPage() {
  const filter = useRecoilValue(filterToSearch);
  //const showNavSign = useRecoilValue(showNav);

  const AllCourses = useRecoilValue(filteredAllCourses);
  return (
    <>
      <NavItems />
      <div className="flex flex-wrap flex-row  justify-evenly m-auto">
        {AllCourses.map((course) => (
          <CourseCard
            key={course._id}
            courseId={course._id}
            imageUrl={course.image}
            title={course.title}
            description={course.description}
            rating={course.details.rating}
            // price={course.price}
          />
        ))}
      </div>
    </>
  );
}

export default LandingPage;
