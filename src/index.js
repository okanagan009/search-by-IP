import 'leaflet/dist/leaflet.css';  
import L from 'leaflet';
import { validatIp } from "./helpers";
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
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_NGQQzsCjWCn88zNy1uTVT4uBxzxjg&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerHTML = mapData.isp;
}