import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carRemoved } from '../../redux/features/carsSlice';
import Navbar from '../Navbar';
import CarItem from './CarItem';
import '../../assets/css/carousel.css';

function MainPage() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  
  const handleCarRemoved = (carId) => {
    dispatch(carRemoved(carId));
  };
  const filteredCars = cars.filter((car) => !car.is_removed);

  return (
    <>
      <Navbar />
      <div className="main-page-container">MainPage</div>
      {filteredCars.map((car) => (
        <CarItem
          key={car.id}
          car={car}
          handleCarRemoved={handleCarRemoved}
          classNames={{
            button: 'btn btn-outline-primary',
            carBody: 'card-body',
            imageContainer: 'image-container',
            image: 'card-img-top',
            title: 'card-title',
            discription: 'card-text',
          }}
        />
      ))}
    </>
  );
}

export default MainPage;
