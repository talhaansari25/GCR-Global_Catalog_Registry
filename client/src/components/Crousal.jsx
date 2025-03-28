import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import cr1 from '../assets/CR1.png'
import cr2 from '../assets/CR2.png'
import cr3 from '../assets/CR3.png'

export default function Crousal() {
  // const [crImg] = useState(['https://picsum.photos/1300/201', 'https://picsum.photos/1300/202', 'https://picsum.photos/1300/200'])
  const [crImg] = useState([cr1, cr3, cr2])
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % crImg.length);
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [crImg.length]);


  return (
    <div className='crousal'>
      <div className="crContent" >
        <div className="innerWindow" style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>

          {crImg.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '240px', flexShrink: 0 }}
            />
          ))}

        </div>
      </div>
    </div>
  )
}
