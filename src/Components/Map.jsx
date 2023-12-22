import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const libraries = ["places"];
const center = { lat: 48.8584, lng: 2.2945 };

function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0",
        libraries: libraries,
    });
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef();

    if (!isLoaded) {
        return <Skeleton />;
    }

    async function calculateRoute() {
        if (
            originRef.current.value === "" ||
            destiantionRef.current.value === ""
        ) {
            return;
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance("");
        setDuration("");
        originRef.current.value = "";
        destiantionRef.current.value = "";
    }

    return (
        <>
            {/* Google Map Box */}
            {/* <div position="absolute" left={0} top={0} h="100%" w="100%">
                <GoogleMap
                    center={center}
                    zoom={10}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div> */}

            <Autocomplete>
                <input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>

            <Autocomplete>
                <input
                    type="text"
                    placeholder="Destination"
                    ref={destiantionRef}
                />
            </Autocomplete>

            <button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calculate Route
            </button>

            <h1>Distance: {distance} </h1>
            <h1>Duration: {duration} </h1>
        </>
    );
}

export default Map;
