import React, { Fragment, useEffect, useState } from 'react'
import Slider from "react-slick";
import { useDispatch, useSelector, } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from 'react-router-dom';
import { getListSlides } from "./../../state/actions";
import { startActionWithPromise } from "./../../Helper/saga-promise-helpers";

function SlideSection() {

    const dispatch = useDispatch();

    const [model, setModel] = useState({
        page: 1,
        pageSize: 3,
        search: "",
    })

    const [slide, setSlides] = useState([])

    useEffect(async () => {
        const data = await startActionWithPromise(getListSlides, model, dispatch);
        setSlides(data.data.items);
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        fade: true,
        autoplay: true,
        arrows: true,
        className: 'slides'
    };
    console.log(slide, "slide");
    return (
        <Fragment>
            <div className="slider-home" style={{ overflow: "hidden" }}>
                <Slider {...settings}>
                    {
                        slide.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/products-sale/${item.id}`} key={index}>
                                        <div className="" >
                                            <img className="" src={`http://localhost:8000${item.image}`} />
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </Fragment >
    )
}

export default SlideSection
