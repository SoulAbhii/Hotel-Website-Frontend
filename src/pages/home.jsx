
import Footer from "../component/footer";
import HotelAmenities from "../component/hotel-facility";
import Slider from "../component/image-gallery";
import Landing from "../component/landing";
import TariffPackages from "../component/rooms";

export default function Home(){
    return (
        <>
           <Landing/>
           <Slider/>
       <HotelAmenities/>
           <Footer/>
          
        </>
    );
}