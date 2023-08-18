import { useNavigate } from "react-router-dom";
import { BackSvg, PlusSvg } from "../../assets/svg/svg";

const Receivers = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="receivers_container max-w-[600px] mx-auto h-full relative">
      <div
        className={`receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between`}
      >
        <div className="mt-2 flex flex-row justify-between items-center">
          <div className="cursor-pointer" onClick={goBack}>
            <BackSvg />
          </div>
          <p className="text-[0.8rem]">Select receiver</p>
          <div className="cursor-pointer">
            <PlusSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receivers;
