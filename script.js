// Data
const services = [
  {id:1,name:'National Emergency Number',en:'National Emergency',num:'999',cat:'All',icon:'/assets/emergency.png'},
  {id:2,name:'Police Helpline Number',en:'Police',num:'999',cat:'Police',icon:'/assets/police.png'},
  {id:3,name:'Fire Service Number',en:'Fire Service',num:'999',cat:'Fire',icon:'/assets/fire-service.png'},
  {id:4,name:'Ambulance Service',en:'Ambulance',num:'1994-999999',cat:'Health',icon:'/assets/ambulance.png'},
  {id:5,name:'Women & Child Helpline',en:'Women & Child Helpline',num:'109',cat:'Help',icon:'/assets/emergency.png'},
  {id:6,name:'Anti-Corruption Helpline',en:'Anti-Corruption',num:'106',cat:'Govt.',icon:'/assets/emergency.png'},
  {id:7,name:'Electricity Helpline',en:'Electricity Outage',num:'16216',cat:'Electricity',icon:'/assets/emergency.png'},
  {id:8,name:'Brac Helpline',en:'Brac',num:'16445',cat:'NGO',icon:'/assets/brac.png'},
  {id:9,name:'Bangladesh Railway Helpline',en:'Railway',num:'163',cat:'Travel',icon:'/assets/Bangladesh-Railway.png'}
];

let coins = 100, hearts = 0, copies = 0;
let history = [];

// Render cards
function renderCards(){
  const container = document.getElementById('cardContainer');
  container.innerHTML = '';
  services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'bg-white shadow rounded-2xl p-4 flex flex-col justify-between';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <img src="${s.icon}" alt="${s.name}" class="w-12 h-12 rounded-xl p-2 bg-red-100" />
        <button onclick="addHeart()" class="text-gray-400 hover:text-red-500"><i class='bx bx-heart'></i></button>
      </div>
      <div>
        <h3 class="font-semibold">${s.name}</h3>
        <p class="text-sm text-gray-500">${s.en}</p>
        <p class="text-lg font-bold mt-1">${s.num}</p>
        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block mt-2">${s.cat}</span>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="copyNum('${s.num}')" class="flex-1 border rounded-lg py-1 text-sm text-gray-600"><i class='bx bx-copy'></i> Copy</button>
        <button onclick="callNum('${s.name}','${s.num}')" class="flex-1 bg-green-500 text-white rounded-lg py-1 text-sm hover:bg-green-600"><i class='bx bx-phone'></i> Call</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addHeart(){
  hearts++;
  document.getElementById('heartCount').innerText = hearts;
}

function copyNum(num){
  navigator.clipboard.writeText(num);
  copies++;
  document.getElementById('copyCount').innerText = copies;
}

function callNum(name,num){
  if(coins < 20){ alert('Not enough coins!'); return; }
  coins -= 20;
  document.getElementById('coinCount').innerText = coins;
  alert(`Calling ${name} at ${num}`);
  const now = new Date().toLocaleTimeString();
  history.unshift({name, num, time: now});
  renderHistory();
}

function renderHistory(){
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.forEach(h => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="flex justify-between"><span>${h.name}</span><span class="text-gray-500">${h.time}</span></div><div class="text-gray-500">${h.num}</div>`;
    list.appendChild(li);
  });
}

function clearHistory(){
  history = [];
  renderHistory();
}

// Init
renderCards(); 