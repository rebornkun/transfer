import { Cancel, SearchSvg } from "../assets/svg/svg";
import { useAppContext } from "../context/AppContext";
import CurrencyBtn from "./CurrencyBtn";
import { countries } from "./countries";

const SelectCountry = () => {
  const onSearch = (value) => console.log(value);
  const { toogleSelectCountry, isSelectCountryOpen } = useAppContext();
  return (
    <div
      className={`${
        isSelectCountryOpen ? "open" : "close"
      } selectCurrency transition duration-400 ease-in-out w-full h-[95%] absolute bottom-0 left-0 right-0 bg-white rounded-tl-[30px] rounded-tr-[30px] shadow flex flex-col`}
    >
      <div className="px-2 mt-4 flex flex-row gap-6 items-center">
        <div
          onClick={() => toogleSelectCountry(false)}
          className="cursor-pointer"
        >
          <Cancel />
        </div>
        <p>Select Currency</p>
      </div>
      <div className="search m-2 mt-4 flex flex-row justify-center items-center border-b-[1px] border-black">
        <input
          type="text"
          className="w-full py-1 text-[0.8rem]"
          placeholder="search for country"
        />
        <SearchSvg />
      </div>
      <p className="mt-2 p-2 font-[600] text-[0.8rem] text-darkgrey">
        ALL COUNTRIES
      </p>
      <div className="overflow-y-scroll flex-auto">
        {countries.map((country) => {
          return (
            <CurrencyBtn
              flag={country.flag}
              name={country.name}
              currency={country.currency}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectCountry;
