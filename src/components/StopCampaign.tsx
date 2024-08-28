import { Link } from "react-router-dom";

export default function StopCampaign() {
  return (
    <div className="bg-white w-[27.3rem] h-[22.4rem] p-[7rem_4.7rem_4.7rem] absolute left-1/2 top-1/5 transform -translate-x-1/2 -translate-y-1/2">
      <p className="font-syne text-xl font-bold text-[#990000] mb-4">
        Stop Campaign
      </p>
      <p className="font-nunito text-[#666666] text-[0.875em] mb-[2.4rem]">
        Are you sure you want to delete the MTN campaign? This action cannot be
        undone.
      </p>
      <div className="flex gap-6 justify-center">
        <Link to="/campaign">
          <button className="w-[6.3rem] h-10 border border-[#247B7B] text-black rounded">
            Cancel
          </button>
        </Link>
        <Link to="/campaign">
          <button className="bg-[#990000] text-white rounded px-4 py-[0.6rem]">
            Delete Campaign
          </button>
        </Link>
      </div>
    </div>
  );
}
