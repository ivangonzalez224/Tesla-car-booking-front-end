import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carRemoved } from '../../redux/features/carsSlice';
import Navbar from '../Navbar';
import CarItem from './CarItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/carouselStyle.css'


function MainPage() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 992, min: 320 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 320, min: 0 },
      items: 1
    }
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
            <div className='car-item'>
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
            </div>
          ))}
      </Carousel>;
      </div>
    </>
  );
}

export default MainPage;
