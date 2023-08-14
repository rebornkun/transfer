import InputText from "../../components/InputText";
import { useEffect, useState } from 'react';

const Home = () => {
    return (
        <div className="home max-w-[600px] mx-auto h-screen bg-white p-2">
            <div>
            <p className="mt-2 w-full font-[500] text-center">International transfer</p>
            <div className="mt-4 flex flex-row justify-between items-center">
                <div>
                    <p className='text-darkgrey font-[400] leading-tight'>sending from the <br></br>United kingdom</p>
                </div>
                <InputText />
            </div>
            </div>
        </div>
    );
}

export default Home;