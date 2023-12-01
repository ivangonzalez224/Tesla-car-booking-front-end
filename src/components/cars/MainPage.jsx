import { React } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import CarItem from './CarItem';
import '../../assets/css/carousel.css';


function MainPage() {

  const { cars } = useSelector((state) => state.cars);

  return (
    <>
      <Navbar />
      <div className="main-page-container">MainPage</div>
      {cars.map((car) => (
        <CarItem
          key={car.id}
          car={car}
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
