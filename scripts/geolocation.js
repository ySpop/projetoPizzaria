function calcularEndereco() {
  const address = document.getElementById('address-input').value;
  const apiKey = 'AIzaSyBlbItZcpeDpSwPEyQjSoLKWLJQB0xfsow';

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results[0] && data.results[0].geometry) {
        const latitude = data.results[0].geometry.location.lat();
        const longitude = data.results[0].geometry.location.lng();

        fetch('/api/find-nearest-store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latitude, longitude })
        })
        .then(response => response.json())
        .then(data => {
          const nearestStore = data;
          document.getElementById('nearest-store').innerHTML = `A loja mais próxima é: ${nearestStore.name} (${nearestStore.distance} metros)`;
        })
        .catch(error => {
          console.error('Erro ao encontrar a loja mais próxima:', error);
        });
      } else {
        console.error('Erro ao converter o endereço em latitude e longitude:', data);
      }
    })
    .catch(error => {
      console.error('Erro ao converter o endereço em latitude e longitude:', error);
    });
  }        
  
  async function findNearestBankByAddress(address) {
    try {
      const userCoords = await getAddressCoords(address);
      let nearestBank = null;
      let nearestDistance = Infinity;
  
      for (const bank of banks) {
        const distance = haversineDistance(userCoords, bank.coords);
        if (distance < nearestDistance) {
          nearestBank = bank;
          nearestDistance = distance;
        }
      }
  
      console.log(`O banco mais próximo é: ${nearestBank.name}`);
    } catch (error) {
      console.error('Erro ao obter as coordenadas do endereço:', error);
    }
  }
  
  window.onload = function() {
    const address = prompt('Entre com o endereço:');
    findNearestBankByAddress(address);
  };


// ...

// app.post('/api/find-nearest-store', (req, res) => {
//   const { latitude, longitude } = req.body;
//   let nearestStore = null;
//   let minDistance = Infinity;

//   stores.forEach(store => {
//     const distance = calculateDistance(latitude, longitude, store.latitude, store.longitude);
//     if (distance < minDistance) {
//       minDistance = distance;
//       nearestStore = store;
//     }
//   });

//   res.json(nearestStore);
// });

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance * 1000; // Convertendo para metros
}

// // =======================================================
// // document.getElementById('submit-address').addEventListener('click', () => 
//   function calcularEndereco()
//   {
//   const address = document.getElementById('address-input').value;
//   const apiKey = 'AIzaSyBlbItZcpeDpSwPEyQjSoLKWLJQB0xfsow'; // Insira sua chave da API do Google Maps aqui AIzaSyBlbItZcpeDpSwPEyQjSoLKWLJQB0xfsow

//   // Convertendo o endereço em latitude e longitude usando a API do Google Maps
//   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       const latitude = data.results[0].geometry.location.lat();
//       const longitude = data.results[0].geometry.location.lng();

//       // Enviando a latitude e longitude para o servidor para calcular a loja mais próxima
//       fetch('/api/find-nearest-store', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ latitude, longitude })
//       })
//       .then(response => response.json())
//       .then(data => {
//         const nearestStore = data;
//         document.getElementById('nearest-store').innerHTML = `A loja mais próxima é: ${nearestStore.name} (${nearestStore.distance} metros)`;
//       })
//       .catch(error => {
//         console.error('Erro ao encontrar a loja mais próxima:', error);
//       });
//     })
//     .catch(error => {
//       console.error('Erro ao converter o endereço em latitude e longitude:', error);
//     });
// };
// // ==========================================







// import express from "express";

// let express = require('express');
// const app = express();
// const axios = require('axios');

// app.use(express.json());

// app.post('/api/find-nearest-store', async (req, res) => {
//   const { address } = req.body;
//   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
//   const { results } = response.data;
//   if (results.length === 0) {
//     return res.status(400).json({ error: 'Endereço não encontrado' });
//   }
//   const location = results[0].geometry.location;
//   const stores = [
//     { name: 'Loja 1', coords: { latitude: -23.550650, longitude: -46.633333 } },//zona leste artur alvim "lat": -23.59648,"lng": -46.4689542
//     { name: 'Loja 2', coords: { latitude: -23.558167, longitude: -46.641667 } },//zona sul cidade dutra "lat": -23.116038,"lng": -46.7039001
//     { name: 'Loja 3', coords: { latitude: -23.545000, longitude: -46.633333 } },//zona oeste pirituba "lat": -23.4791158,"lng": -46.7418047 
//     { name: 'Loja 4', coords: { latitude: -23.548333, longitude: -46.633333 } },// zona norte tucuruvi "lat": -23.473904,"lng": -46.61081739999999
//   ];
//   let nearestStore = null;
//   let nearestDistance = Infinity;
//   for (const store of stores) {
//     const distance = haversineDistance(location, store.coords);
//     if (distance < nearestDistance) {
//       nearestStore = store;
//       nearestDistance = distance;
//     }
//   }
//   res.json(nearestStore);
// });

// app.listen(3000, () => {
//   console.log('Servidor rodando na porta 3000');
// });


// // Suponha que você tenha uma lista de lojas com suas respectivas latitudes e longitudes
// const stores = [
//     { id: 1, name: 'Loja 1', latitude: -23.5505, longitude: -46.6333 },
//     { id: 2, name: 'Loja 2', latitude: -23.5611, longitude: -46.6456 },
//     { id: 3, name: 'Loja 3', latitude: -23.5717, longitude: -46.6579 },
//     // { id :1, name: 'Loja 1', coords: { latitude: -23.59648, longitude: -46.4689542 } },//zona leste artur alvim "lat": -23.59648,"lng": -46.4689542
// //     { name: 'Loja 2', coords: { latitude: -23.116038 , longitude: -46.7039001 } },//zona sul cidade dutra "lat": -23.116038,"lng": -46.7039001
// //     { name: 'Loja 3', coords: { latitude: -23.4791158, longitude: -46.633333 } },//zona oeste pirituba "lat": -23.4791158,"lng": -46.7418047 
// //     { name: 'Loja 4', coords: { latitude: -23.548333, longitude: -46.633333 } },// zona norte tucuruvi "lat": -23.473904,"lng": -46.61081739999999
//   ];
  
  function findNearestZone(userCoords) {
    let nearestZone = null;
    let nearestDistance = Infinity; 
  }
      const distance = haversineDistance(userCoords, zone.coords);
      if (distance < nearestDistance) {
        nearestZone = zone;
        nearestDistance = distance;
      }
    
  
    return nearestZone;
  
//   // Função para calcular a distância entre dois pontos em latitude e longitude
//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Raio da Terra em quilômetros
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance * 1000; // Convertendo para metros
//   }
  
//   // Função para encontrar a loja mais próxima
//   app.post('/api/find-nearest-store', (req, res) => {
//     const { latitude, longitude } = req.body;
//     let nearestStore = null;
//     let minDistance = Infinity;
  
//     stores.forEach(store => {
//       const distance = calculateDistance(latitude, longitude, store.latitude, store.longitude);
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearestStore = store;
//       }
//     });
  
//     res.json(nearestStore);
//   });


// document.getElementById('submit-address').addEventListener('click', () => {
//     const address = document.getElementById('address-input').value;
//     fetch('/api/find-nearest-store', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ address })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(`A loja mais próxima é: ${data.name}`);
//     })
//     .catch(error => {
//       console.error('Erro ao encontrar a loja mais próxima:', error);
//     });
//   });