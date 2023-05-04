const map = L.map("map").setView([0, 0], 9);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);


if ("geolocation" in navigator) {
  console.log("geolocation is available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // const lat = 12.90153845;
    // const lng = 77.51818965029108;
    const data = { lat, lng };

    document.getElementById("btn").addEventListener("click", async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);


    let firstTime = true;
    const target = L.icon({
      iconUrl: "target.png",
      iconSize: [50, 32],
      iconAnchor: [25, 16],
    });
    const marker = L.marker([0, 0], { icon: target }).addTo(map);
    async function victim(data) {
      const { lat, lng } = data;
      marker.setLatLng([lat, lng]);
      console.log(lat, lng);
      if (firstTime) {
        map.setView([lat, lng], 16);
        firstTime = false;
      }
    }
    victim(data);

    // 77.51362069748443, 12.90889810414145
    

    });

    //Ambulaance location

    document.getElementById("call").addEventListener("click", async () => {
var amb_lat=0;
var amb_lng=0;
// const victim_lat = data.lat
// const victim_lng = data.lng
const string_api = "https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:77.51818965029108,12.90153845,3000&bias=proximity:77.51818965029108,12.90153845&limit=5&apiKey=7ac85dd6c12942fb9ab33242da6da854"
console.log(string_api)

var result={}
var requestOptions = {
  method: 'GET',
};
  const feature=fetch(string_api, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))

  const response = await fetch(string_api, requestOptions);
  const json = await response.json();
  console.log(json);
  
  console.log("hello")
  feature_hos=Object.values(json)
  feature_hos_2=Object.values(feature_hos[1])
  feature_hos_3=Object.values(feature_hos_2[0])
  feature_hos_4=feature_hos_3[2]
  feature_hos_5=Object.values(feature_hos_4)[1]
  console.log(feature_hos)
  console.log(feature_hos_2)
  console.log(feature_hos_3)
  console.log(feature_hos_4)
  console.log(feature_hos_5);


const ambulance =L.Routing.control({
  waypoints: [
    L.latLng(feature_hos_5[1], feature_hos_5[0]),
    L.latLng(data.lat, data.lng),
  ],
  lineOptions: {
    styles: [{color: 'red ', opacity: 1, weight: 5}]
 },
 routeWhileDragging: true,  
}).addTo(map);

          })
  });
  
} else {
  console.log("geolocation unavailable");
}
