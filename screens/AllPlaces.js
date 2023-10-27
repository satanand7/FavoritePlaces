import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces() {

    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        async function loadPlaces() {
            fetchPlaces().then(places => {
                setLoadedPlaces(places);
            });
        }

        if (isFocused) {
            loadPlaces();

        }

    }, [isFocused])

    return <PlacesList places={loadedPlaces} />
}


export default AllPlaces;