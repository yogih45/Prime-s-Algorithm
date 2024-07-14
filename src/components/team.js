import React from 'react';
import '../css/team.css'
import ishan from '../images/Ishan.jpg' 
import yogish from '../images/Yogish.jpg'
import shubham from '../images/Shubham.jpg'
import prajwal from '../images/Prajwal.jpg'

function Contact() {
  return (
    <div>
<section class="team-section">
            <h1>Meet Our Team</h1>
            <div class="team-container">
                <div class="team-member">
                    <img src={ishan} alt="Team Member1" />
                    <h2>Ishan Guptha</h2>
                    <p class="content-p">RV College of Engineering, Banglore</p>
                    <p class="title">Pursuing Bachelor of Engineering<br></br>Department of Information Science and Engineering</p>
                    
                </div>
                <div class="team-member">
                    <img src={yogish} alt="Team Member2" />
                    <h2>Yogish HG</h2>
                    <p class="content-p">RV College of Engineering, Banglore</p>
                    <p class="title">Pursuing Bachelor of Engineering<br></br>Department of Information Science and Engineering</p>
                    
                </div>
                <div class="team-member">
                    <img src={shubham} alt="Team Member3" />
                    <h2>Shubham</h2>
                    <p class="content-p">RV College of Engineering, Banglore</p>
                    <p class="title">Pursuing Bachelor of Engineering<br></br>Department of Information Science and Engineering</p>
                    
                </div>
                <div class="team-member">
                    <img src={prajwal} alt="Team Member3" />
                    <h2>Prajwal Patgar</h2>
                    <p class="content-p">RV College of Engineering, Banglore</p>
                    <p class="title">Pursuing Bachelor of Engineering<br></br>Department of Information Science and Engineering</p>
                    
                </div>
            </div>
        </section>
    </div>
  );
}

export default Contact;
