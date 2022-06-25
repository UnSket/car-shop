declare namespace ApiData {
    interface Car {
        stockNumber: number;
        manufacturerName: string;
        modelName: string;
        mileage: {
            number: number;
            unit: 'km' | 'mi';
        };
        fuelType: 'Diesel' | 'Petrol';
        pictureUrl: string;
        color: string;
    }

    interface Manufacturer {
        name: string;
        models: {
            name: string;
        }[];
    }
}
