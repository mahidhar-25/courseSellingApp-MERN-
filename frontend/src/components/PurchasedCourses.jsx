import React from "react";
import { useRecoilValue } from "recoil";
import CourseCard from "./CourseCard";
import { myFilteredPurchasedCourses } from "../store/atoms/courses";
import NavItems from "./NavItems";

function PurchasedCourses() {
  const filteredCourses = useRecoilValue(myFilteredPurchasedCourses);
  return (
    <>
      <div className="flex flex-wrap flex-row  justify-evenly m-auto">
        {filteredCourses.map((purchasedCourse) => (
          <CourseCard
            key={purchasedCourse.course._id}
            imageUrl={purchasedCourse.course.image}
            title={purchasedCourse.course.title}
            description={purchasedCourse.course.description}
            rating={purchasedCourse.course.details.rating}
            // price={purchasedCourse.course.price}
          />
        ))}
      </div>
    </>
  );
}

export default PurchasedCourses;
