import InputText from "../../components/InputText";
import CountryBox from "../../components/CountryBox";
import { BothArrows } from "../../assets/svg/svg";

const Home = () => {
    return (
        <div className="home max-w-[600px] mx-auto h-screen bg-white p-2">
            <div>
            <p className="mt-2 w-full font-[500] text-center">International transfer</p>
            <div className="mt-4 flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <p className='text-darkgrey font-[400] leading-tight text-[0.8rem]'>sending from the <br></br>United kingdom</p>
                    <CountryBox />
                </div>
                <InputText />
            </div>
            <div className="middleLine flex flex-row w-full ">
            <BothArrows />

            </div>
            </div>
        </div>
    );
}

export default Home;