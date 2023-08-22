import { BackSvg, PersonSvg } from "../../assets/svg/svg";

const AddReceivers = ({ setPage }) => {
  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      <div className="nav mt-2 flex flex-row justify-start items-center">
        <div className="cursor-pointer" onClick={() => setPage("home")}>
          <BackSvg />
        </div>
      </div>
      <div className="flex-auto w-full mt-6 flex flex-col">
        <p className="text-[1.2rem] font-bold mb-6">
          Who are you sending money to?
        </p>
        <div
          className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center px-2 py-4 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
          onClick={() => setPage("add_new_receivers")}
        >
          <div className="rounded-full h-[30px] w-[30px] flex flex-row items-center justify-center bg-grey">
            <PersonSvg />
          </div>
          <p className="h-fit font-bold text-[0.8rem]">Someone else</p>
        </div>
      </div>
    </div>
  );
};

export default AddReceivers;
