import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { carRemoved } from '../../redux/features/carsSlice';
import { getCities } from '../../redux/cities/CitiesSlice';
import Navbar from '../Navbar';
import CarItem from './CarItem';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/carouselStyle.css';

function MainPage() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const { cityItems } = useSelector((store) => store.cities);
  useEffect(() => {
    if (cityItems.length === 0) {
      dispatch(getCities());
    }
  });
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 375 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
      items: 1,
    },
  };

  const handleCarRemoved = (carId) => {
    dispatch(carRemoved(carId));
  };
  const filteredCars = cars.filter((car) => !car.is_removed);

  return (
    <>
      <Navbar />
      <div className="main-page-container">
        <Carousel responsive={responsive}>
          {filteredCars.map((car) => (
            <ul className="car-item" key={car.id}>
              <CarItem
                key={car.id}
                car={car}
                handleCarRemoved={handleCarRemoved}
                classNames={{
                  button: 'btn btn-outline-primary btn-car-item',
                  carBody: 'card-body',
                  imageContainer: 'image-container',
                  image: 'card-img-top',
                  title: 'card-title',
                  discription: 'card-text',
                }}
              />
            </ul>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default MainPage;
