export const getCarDescription = (car: ApiData.Car): string =>
    `Stock # ${car.stockNumber} - ${car.mileage.number} ${car.mileage.unit} - ${car.fuelType} - ${car.color}`;
