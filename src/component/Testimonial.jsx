import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import test1 from '../asset/test1.jpg'
import test2 from '../asset/Test2.jpg'
import test3 from '../asset/Test3.jpg'
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function TestiMonials() {
  return (
    <div>
          <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#f3f2f2", color: "#000" }}
       >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="fw-bold mb-4">Testimonials</h3>
          <h1 className="mb-4 pb-2 mb-md-5 pb-md-0  ">
            Our Happy Clients Say About Us
          </h1>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={test1}
                  className="rounded-circle shadow-1-strong"
                  width="100"
                  height="100"
                />
              </div>
              <h5 className="font-weight-bold">Abhishek Sah</h5>
              <h6 className="font-weight-bold my-3">Visitor</h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }}/>
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star-half-alt" size="sm"  style={{ color: 'orangered' }} />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                "Neoresort in Uttarakhand offers a serene escape amidst nature's beauty. 
              
                it's a perfect destination for both relaxation and adventure seekers."
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={test2}
                  className="rounded-circle shadow-1-strong"
                  width="100"
                  height="100"
                />
              </div>
              <h5 className="font-weight-bold">Sayan Bhatacharjee</h5>
              <h6 className="font-weight-bold my-3">
                Vloger
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                "Neoresort: Uttarakhand's ultimate escape. 
                With comfy rooms and diverse activities, 
                it's a nature lover's dream destination."
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={test3}
                  className="rounded-circle shadow-1-strong"
             
                />
              </div>
              <h5 className="font-weight-bold">Deepika Singh</h5>
              <h6 className="font-weight-bold my-3">
                Traveller
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
                <li>
                  <MDBIcon far icon="star" size="sm"  style={{ color: 'orangered' }} />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                "Neoresort in Uttarakhand: Where tranquility meets adventure. 
                Cozy rooms and a range of activities make it a top pick for nature enthusiasts."
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>


    </div>
  );
}