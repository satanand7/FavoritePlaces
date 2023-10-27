import { Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

function LocationPicker({onPickedLocation}) {
    const [pickedLocation, setPickedLocation] = useState();

    const isFocused = useIsFocused();

    const navigation = useNavigation();

    const route = useRoute();

    const [locationPermissionInformation, reqestPermission] = useForegroundPermissions();


    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    async function verifyPermission() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await reqestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions !', 'You need to grant location permissions to use this app.');

            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHander() {
        navigation.navigate('Map');

    }
    let locationPreview = <Text>No location picked yet.</Text>;
    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    }

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickedLocation({...pickedLocation, address:address});
            }
        }

        handleLocation();


       

    },[pickedLocation, onPickedLocation])

    return <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon={'location'} onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon={'map'} onPress={pickOnMapHander}>Pick on map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',

    }
})