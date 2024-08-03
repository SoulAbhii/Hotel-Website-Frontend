import './Book.css'
import Footer from "../component/footer";
import Navbar from "../component/navbar";
import BookPage from "./bookpage";

export default function Book() {
    return (
        <div className='Book-page'>
            <Navbar />
            <BookPage />
            <Footer />
        </div>
    );
}