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
                <InputText color={'black'} id={1}/>
            </div>
            <div className="middleLine flex flex-row w-full h-[30px] my-2 justify-center items-center gap-1">
            <BothArrows />
            <div className="line h-[0.5px] bg-grey flex-auto"></div>
            <p className="text-[0.8rem] text-darkgrey">1 GBP = 5.13477 PLN ~ Delivery fee £0.00</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <p className='text-darkgrey font-[400] leading-tight text-[0.8rem]'>receiving in Poland</p>
                    <CountryBox />
                </div>
                <InputText color={'green'} id={2}/>
            </div>
            </div>
        </div>
    );
}

export default Home;