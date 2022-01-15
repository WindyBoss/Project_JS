function geoFindMe() {
  if (!navigator.geolocation){
   console.log("Geolocation is not supported by your browser");
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    reverseGeocodingWithGoogle(longitude, latitude)
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function reverseGeocodingWithGoogle(latitude, longitude) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?
      latlng=${latitude},${longitude}&key={GOOGLE_MAP_KEY}`)
  .then( res => res.json())
  .then(response => {
      console.log("User's Location Info: ", response)
   })
   .catch(status => {
      console.log('Request failed.  Returned status of', status)
   })
}

fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
    console.log("Country: ", response.country);
 })
 .catch((data, status) => {
    console.log('Request failed');
 })




const options = {
  enableHighAccuracy: true,
  timeout: 0,
}

function success(pos) {
  var crd = pos.coords;

  reverseGeocodingWithGoogle(crd.latitude, crd.longitude)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);