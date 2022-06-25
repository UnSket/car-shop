import React from "react";

const FAVOURITE_CARS_KEY = 'FAVOURITE_CARS';
const favouriteCarsUnparsed = localStorage.getItem(FAVOURITE_CARS_KEY) || '';
const favouriteCars = new Set(favouriteCarsUnparsed.split(','));

export const favouriteCarsService = {
    isCarFavourite: (stockNumber: string) => {
        return favouriteCars.has(stockNumber);
    },
    toggleCar: (stockNumber: string) => {
        if (favouriteCars.has(stockNumber)) {
            favouriteCars.delete(stockNumber);
        } else {
            favouriteCars.add(stockNumber);
        }

        localStorage.setItem(FAVOURITE_CARS_KEY, Array.from(favouriteCars).filter(Boolean).join(','));
    }
}

export const useIsCarFavourite = (stockNumber?: number) => {
    const [isFavourite, setIsFavourite] = React.useState(favouriteCarsService.isCarFavourite(String(stockNumber)));

    const toggle = React.useCallback(() => {
        favouriteCarsService.toggleCar(String(stockNumber));
        setIsFavourite(favouriteCarsService.isCarFavourite(String(stockNumber)));
    }, [stockNumber]);

    return {toggle, isFavourite};
}
