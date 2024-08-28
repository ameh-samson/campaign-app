import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Successful() {
  return (
    <div className="bg-white w-[27.3rem] h-[22.4rem] p-[7rem_4.7rem_4.7rem] absolute top-1/3 left-1/3">
      <div className="flex flex-col items-center justify-center">
        <FaCheckCircle className="text-[5.6em] text-[#247b7b]" />
        <p className="font-nunito text-[#666666] text-[0.875em] mb-[2.4rem]">
          Campaign Successfully Created!
        </p>
        <Link to="/campaign">
          <button className="font-syne font-bold text-[0.75em] w-[14.3rem] bg-[#247b7b] rounded h-[2.9rem] text-white">
            Go Back to campaign list
          </button>
        </Link>
      </div>
    </div>
  );
}
