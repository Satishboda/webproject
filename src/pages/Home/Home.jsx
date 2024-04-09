import React, { useEffect, useState } from "react";
import "./home.scss";
import SimpleImageSlider from 'react-simple-image-slider'

import { ProfileCard } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getProfiles } from "../../services/Search";

const Home = () => {
  const Images=[
      {url: './images/image1.png'},
      {url: './images/images4.jpeg'},
      {url: './images/image2.png'},
      
  ]
  const navigate = useNavigate();
  const redirectToExplore = ()=>{
    navigate('/staff');
    return;
  }
  const redirectToLogin = ()=>{
    navigate('/login');
    return ;
  }
  const [ image, setImage ] = useState(null);
  const [ dataImages, setDataImages ]= useState();
  const updateImage = (newImage)=>{
    setImage(newImage);
  }
  const [ name,setName ] =  useState();
  const updateName = (newName)=>{
    setName(newName);
  }
  const upload = async()=>{
    const form =  new FormData();
    const user ={
      name:"chary",
      desg:"ghjuk"
    }
    form.append('image',image);
    form.append('name',name)
    form.append('body',JSON.stringify(user));
    const data =  await axios.post("http://localhost:3000/api/images/upload",form);
  }
  const getImages = async()=>{
    const res =  await axios.get("http://localhost:3000/api/images/get");
    setDataImages(res.data.images[1].image);
    console.log(res.data);
  }
  const getStaffProfiles = async()=>{
    const {error, data } =  await getProfiles();
    console.log(data);
  }
  useEffect(()=>{
    getStaffProfiles();
  },[])
  return (
    <div className="home flexcol">
      <div >
        <div className='home'>
            <div className='head'><h1><label className='dept'>Taashee</label> <label className='of'>Linux</label> <label className='cse'>Services</label></h1></div>
            <div className='imageSlide'>
            <SimpleImageSlider
              width={window.screen.width-110}
              height={400}
              images={Images}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
              autoPlayDelay={3.0}
            />
            </div>
            <div className='keys'>
                <button  onClick={redirectToExplore}>KNOW MORE..</button>
                <button onClick={redirectToLogin}>LOGIN</button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Home;



