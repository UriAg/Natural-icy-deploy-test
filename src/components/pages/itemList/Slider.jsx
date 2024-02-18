import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, A11y, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';

const Slider = ({ space, uniqueSlide, navigationActive, paginationActive, categories, sliderType }) =>{

    const [isActive, setIsActive] = useState(false);
    const handleButtonClick = () => {
        setIsActive(!isActive);
    };
    
    const [slidesPerView, setSlidesPerView] = useState(uniqueSlide ? 1 : window.innerWidth > 1150 ? 5 : 
        window.innerWidth > 965 && window.innerWidth < 1150 ? 4 :
        window.innerWidth > 656 && window.innerWidth < 965 ? 3 :
        window.innerWidth > 440 && window.innerWidth < 656 ? 2 : 1);
    

    useEffect(() => {
        if(!uniqueSlide){
                const actualizarSlidesPerView = () => {
                // Ajusta la cantidad de slides visibles según el ancho de la ventana
                if (window.innerWidth > 965 && window.innerWidth < 1150) {
                setSlidesPerView(4);
                } else if (window.innerWidth > 656 && window.innerWidth < 965) {
                setSlidesPerView(3);
                } else if (window.innerWidth < 656 && window.innerWidth > 440) {
                setSlidesPerView(2);
                }else if (window.innerWidth < 440) {
                setSlidesPerView(1);
                } else {
                setSlidesPerView(5);
                }
            };

            
            window.addEventListener('resize', actualizarSlidesPerView);
        
            return () => {
                window.removeEventListener('resize', actualizarSlidesPerView);
            };
        }
    }, []);
    
    let swiperModules = [A11y];
    navigationActive && swiperModules.push(Navigation)
    paginationActive && swiperModules.push(Pagination)
    sliderType === 'headBrands' && swiperModules.push(EffectFade)
    sliderType === 'headBrands' && swiperModules.push(Autoplay)

    return(
    <>
        <Swiper
            modules={swiperModules}
            effect={sliderType==='headBrands' ? 'fade' : false}
            autoplay={sliderType==='headBrands' ? {
                delay: 5000,
                disableOnInteraction: false,
            } : false}
            spaceBetween={space}
            slidesPerView={slidesPerView}
            navigation={navigationActive}
            pagination={paginationActive && {clickable:true}}
            >
            {
                sliderType === 'categories' &&
                categories.map(({ id, path, title, icon }) => (
                    <SwiperSlide key={id}>
                    <Link key={id} to={path} className="redirecting-overlay">
                        <div tabIndex="0" onClick={handleButtonClick} className="categoriasContent">
                        <Icon icon={icon} />
                        <Typography variant="category">
                            {title}
                        </Typography>
                        </div>
                    </Link>
                    </SwiperSlide>
                ))
            }
            {
                sliderType === 'headBrands' &&
                categories.map(({ title, middleText, boldEndText, img }) => (
                    <SwiperSlide key={img}>
                    <div className="carrusel">
                        <div className="carruselContainer">
                                <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "1.875rem" }}>{title}</Typography>
                            <Typography variant="carrusel">{middleText}</Typography>
                            <Typography variant="carrusel" sx={{ fontWeight: "600" }}>{boldEndText}</Typography>
                        </div>
                        <img src={`${import.meta.env.BASE_URL}src/assets/${img}`} alt="Brand image" />
                    </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>
    )

}

export default Slider