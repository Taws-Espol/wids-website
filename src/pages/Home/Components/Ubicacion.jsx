import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

const Ubicacion = () => (
    <APIProvider apiKey={"AIzaSyCnVttffZ4MLtTnpnFTWChCzUZMv16dJq4"}>
        <Map
            defaultZoom={15}
            gestureHandling={'greedy'}
            fullscreenControl={true}
            style={{ height: '500px', width: 'w-full' }}>
            <Directions origin={{ lat: -2.143737, lng: -79.967578 }} destination={{ lat: -2.143496, lng: -79.966081 }} />
        </Map>
    </APIProvider>
);

function Directions({ origin, destination }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, origin, destination]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <div className="absolute top-0 left-0 !max-w-96 !max-h-96 !overflow-hidden flex flex-col">
            <div className="bg-primary-dark-green  text-white">
                <div className="container mx-auto py-6 px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Ubicación</h1>
                    </div>
                </div>
                <div className="container mx-auto flex flex-col place-content-center place-items-center select-none">
                    <div className="">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.026445702663!2d-79.96903302423073!3d-2.1435536371656436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d7302f96af647%3A0x5a1dd75c545cedd!2sSTEM%20(Edificio%20de%20Posgrados)!5e0!3m2!1ses!2sus!4v1717983642893!5m2!1ses!2sus"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="!w-80 h-48 max-w-full shadow-md rounded-lg"
                        ></iframe>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl">Edificio STEM</h2>
                        <h2 className="text-xl">Campus Gustavo Galindo</h2>
                        <h2 className="text-xl">Km. 30 vía Perimetral</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ubicacion;
