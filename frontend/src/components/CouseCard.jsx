import React from "react";
const progressPercentage = 60;
function CouseCard({ imageUrl, title, description, rating, price }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col mx-3 basis-1/5">
      <img className="w-full" alt="course image " src={imageUrl} />

      <div className="mt-4 mb-3 p-2">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base"> {description}</p>
      </div>
      <div className="h-1 w-full bg-gray-300 mb-4 pe-2">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full ${
            progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
          }`}
        ></div>
        <div className="flex flex-row justify-between">
          <p className="text-sm">{progressPercentage}% complete</p>
          <p className="text-sm"> {rating}/5</p>
        </div>
      </div>
      <div className="w-4/5 p-2 flex flex-col items-center justify-center m-auto">
        <button className="bg-blue-700 rounded-full text-white text-center w-full p-2 mb-2 ">
          go to course
        </button>
      </div>
    </div>
  );
}

export default CouseCard;
