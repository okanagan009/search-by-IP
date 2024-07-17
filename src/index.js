import 'leaflet/dist/leaflet.css';  
import L from 'leaflet';
import { addOffset ,validatIp, getAdress} from "./helpers";
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [22, 94],
});

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.Coded by <a href="#">Serg</a>.'
}).addTo(map);

L.marker([51.5, -0.09], {icon: markerIcon}).addTo(map);
 


function getData () {
    if (validatIp(ipInput.value)) {
        getAdress(ipInput.value)
            .then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const {lat, lng, country, region, timezone} = mapData.location;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerHTML = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);

    if (matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAdress('102.22.22.1').then(setInfo);
})