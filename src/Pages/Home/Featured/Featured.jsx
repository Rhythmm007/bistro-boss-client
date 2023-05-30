import React from 'react';
import './Featured.css'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className='pt-8 my-20 bg-fixed featured-item text-white'>
            <SectionTitle
                subHeading={'check it out'}
                heading={'featured item'}
            ></SectionTitle>
            <div className='md:flex pt-12 pb-24 py-40 justify-center items-center'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className=' space-y-4 md:ml-10'>
                    <p>Aug 20, 2023</p>                    
                    <p >Where can I get some</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem consectetur libero, culpa vel sunt sit blanditiis, veritatis illum voluptatem rem, ab voluptas tempore recusandae nobis illo aliquid at soluta. Ipsum dicta quaerat accusantium veniam culpa magni earum. Ad, perferendis consequatur.</p>  
                    <button className='btn btn-outline border-0 border-b-4'>Order Now</button>                  
                </div>
            </div>
        </div>
    );
};

export default Featured;