export class Place{
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUri= imageUri;
        this.address = location.address;
        this.location = {lat:location.lat, lng:location.lng};  // {lat:34.234234, long:34.2532}
        this.id = id;
    }
}