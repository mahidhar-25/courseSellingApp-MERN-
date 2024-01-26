import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { myPurchasedCourses } from "../store/atoms/courses";
import CouseCard from "./CouseCard";
import axios from "axios";
function LandingPage() {
  const [showPurchasedCourses, setShowPurchasedCourses] = useState(false);
  const [purchasedCourses, setPurchasedCourses] =
    useRecoilState(myPurchasedCourses);

  const getPurchasedCourses = useCallback(async () => {
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

      setPurchasedCourses(response.data);
      setShowPurchasedCourses(true);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <button className="p-3 m-4 border " onClick={getPurchasedCourses}>
        Get All My Learning courses
      </button>
      <button>Get all my created courses</button>
      {showPurchasedCourses ? (
        <div className="flex flex-wrap flex-row  m-auto">
          {purchasedCourses.map((course) => (
            <CouseCard
              key={course.id}
              imageUrl={course.image}
              title={course.title}
              description={course.description}
              rating={course.details.rating}
              price={course.price}
            />
          ))}
        </div>
      ) : (
        "No learning courses yet"
      )}
    </div>
  );
}

export default LandingPage;
