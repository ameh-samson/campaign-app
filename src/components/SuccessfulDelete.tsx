import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SuccessfulDelete() {
  return (
    <div className="bg-white w-[27.3rem] h-[22.4rem] p-[7rem_4.7rem_4.7rem] absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg">
      <FaCheckCircle className="text-6xl text-[#247B7B] mb-4" />
      <p className="font-bold text-xl text-[#247B7B] mb-2">Campaign Delete</p>
      <p className="font-nunito text-gray-600 text-sm mb-6">
        MTN campaign has been deleted
      </p>
      <Link to="/campaign">
        <button className="font-syne font-bold text-xs w-56 bg-[#247B7B] rounded h-[2.9rem] text-white">
          Go Back to campaign list
        </button>
      </Link>
    </div>
  );
}
