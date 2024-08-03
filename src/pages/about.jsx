import './about.css'
import Navbar from '../component/navbar'
import Footer from '../component/footer'
export default function About(){
    return(
        <div className="Container">
            <div className="sub">
            <Navbar/>
                <div className="overlay-text" alt="kanatal">
                    <h2>About Us</h2>
                    <p>Where tranquility meets adventure. Cozy rooms and a range of activities make it a top pick for nature enthusiasts</p>
                </div>
              

            </div>
            
            <div className='discon'>
                    <div className='discription'>
                        <h2>About Us</h2>
                        <p>
                        Experience the Tranquil Beauty of Neo Resort, Kanatal<br></br><br></br>

                        Are you someone who finds solace in the serene landscapes of hill stations? 
                        If you haven't yet explored Kanatal, nestled in the picturesque state of Uttarakhand, 
                        India, you're truly missing out on an extraordinary experience. Perched at an impressive 
                        altitude of 8500 feet, Kanatal offers breathtaking vistas of the majestic Himalayan range,
                        promising an unforgettable journey amidst nature's bounty. And when it comes to enhancing your sojourn,
                        Neo Resort stands as an epitome of luxury and comfort.<br></br><br></br>

                        Discover the Essence of Local Gastronomy: Embark on a culinary voyage with Neo Resort as we unveil the
                        authentic flavors of Uttarakhand. Indulge your palate in the region's traditional delicacies, 
                        meticulously crafted by our culinary experts. Our gastronomic delights will undoubtedly tantalize your
                        taste buds and leave you craving for more.<br></br><br></br>

                        Commune with Nature through Meditation: Amidst the tranquility of hill stations lies an 
                        opportunity for profound introspection and spiritual rejuvenation. At Neo Resort, 
                        we've curated a serene meditation enclave where you can immerse yourself in the 
                        tranquil ambiance while communing with the awe-inspiring Himalayas. 
                        It's an experience that promises inner peace and serenity, unlike any other.<br></br><br></br>

                        Whether you seek respite from the chaos of urban life or yearn for a soulful retreat amidst 
                        nature's embrace, Neo Resort beckons you with open arms. Revel in the unparalleled beauty of 
                        Kanatal and elevate your getaway to new heights of luxury and tranquility with us.

                    </p>


                    </div>

            </div>

<Footer/>
        </div>
    )
}