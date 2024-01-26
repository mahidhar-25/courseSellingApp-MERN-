import React from "react";
import { useRecoilValue } from "recoil";
import { filteredMyCourses } from "../store/atoms/courses";
import CourseCard from "./CourseCard";

function MyCourses() {
  const myFilteredCourse = useRecoilValue(filteredMyCourses);
  return (
    <>
      <div className="flex flex-wrap flex-row  justify-evenly m-auto">
        {myFilteredCourse.map((course) => (
          <CourseCard
            key={course._id}
            imageUrl={course.image}
            title={course.title}
            description={course.description}
            rating={course.details.rating}
            // price={purchasedCourse.course.price}
          />
        ))}
      </div>
    </>
  );
}

export default MyCourses;
