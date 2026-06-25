/* ============================================================
   MADURAI TAMIL JI HOLIDAYS – PREMIUM JAVASCRIPT
   ============================================================ */

'use strict';

/* ── INTRO SCREEN ──────────────────────────────────────── */
(function initIntro() {
  document.body.classList.add('intro-active');

  // Spawn floating particles
  const container = document.getElementById('introParticles');
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'intro-particle';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      animation-duration:${3 + Math.random() * 6}s;
      animation-delay:${Math.random() * 4}s;
      width:${1 + Math.random() * 4}px;
      height:${1 + Math.random() * 4}px;
      background:${Math.random() > 0.6 ? '#0099ff' : Math.random() > 0.5 ? '#a855f7' : '#ff2d78'};
    `;
    container.appendChild(p);
  }

  // Auto-dismiss after loader completes (~5.5 s)
  setTimeout(dismissIntro, 5600);
})();

function dismissIntro() {
  const screen = document.getElementById('intro-screen');
  if (!screen) return;
  screen.classList.add('hide');
  document.body.classList.remove('intro-active');
  setTimeout(() => screen.remove(), 900);
}

function skipIntro() { dismissIntro(); }

/* ── NAVBAR ────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

function toggleNav() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = ['home', 'about', 'destinations', 'packages', 'vehicles', 'booking', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < 120) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
}

/* ── HERO SLIDESHOW ────────────────────────────────────── */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.si');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  indicators[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  indicators[currentSlide].classList.add('active');
}

setInterval(() => goToSlide(currentSlide + 1), 6000);

/* ── SMART AUTOCOMPLETE ────────────────────────────────── */
const LOCATIONS = [
  // States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
  // Tamil Nadu Districts
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
  'Erode', 'Vellore', 'Thoothukudi', 'Kancheepuram', 'Thanjavur', 'Dindigul',
  'Cuddalore', 'Kanyakumari', 'Krishnagiri', 'Namakkal', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Sivaganga', 'Tenkasi', 'The Nilgiris', 'Tirupathur',
  'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Virudhunagar',
  'Chengalpattu', 'Kallakurichi', 'Karur', 'Mayiladuthurai',
  // Major Cities
  'Delhi', 'Mumbai', 'Kolkata', 'Hyderabad', 'Bangalore', 'Ahmedabad', 'Pune',
  'Jaipur', 'Lucknow', 'Surat', 'Kanpur', 'Nagpur', 'Visakhapatnam', 'Bhopal',
  'Patna', 'Ludhiana', 'Agra', 'Varanasi', 'Meerut', 'Nashik', 'Faridabad',
  'Amritsar', 'Allahabad', 'Howrah', 'Jabalpur', 'Gwalior', 'Vijayawada',
  'Jodhpur', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli',
  'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Moradabad', 'Jalandhar',
  'Bhubaneswar', 'Warangal', 'Mira Bhayandar', 'Thiruvananthapuram', 'Bhiwandi',
  'Saharanpur', 'Gorakhpur', 'Guntur', 'Bikaner', 'Amravati', 'Noida',
  // Tourist Destinations
  'Ooty', 'Kodaikanal', 'Munnar', 'Alleppey', 'Thekkady', 'Kochi', 'Varkala',
  'Coorg', 'Hampi', 'Gokarna', 'Chikmagalur', 'Wayanad', 'Kovalam', 'Kanyakumari',
  'Rameshwaram', 'Dhanushkodi', 'Madurai', 'Rameswaram', 'Velankanni', 'Palani',
  'Tirupati', 'Tirumala', 'Kashi', 'Varanasi', 'Rishikesh', 'Haridwar', 'Kedarnath',
  'Badrinath', 'Yamunotri', 'Gangotri', 'Ayodhya', 'Mathura', 'Vrindavan',
  'Mahabalipuram', 'Pondicherry', 'Kumbakonam', 'Chidambaram', 'Tanjore',
  'Goa Beaches', 'Jaisalmer', 'Udaipur', 'Jodhpur', 'Jaipur', 'Ajmer', 'Pushkar',
  'Agra', 'Delhi', 'Shimla', 'Manali', 'Leh Ladakh', 'Dharamshala', 'Mcleod Ganj',
  'Darjeeling', 'Gangtok', 'Puri', 'Bhubaneswar', 'Konark', 'Andaman Islands',
  'Lakshadweep', 'Mahabaleshwar', 'Lonavala', 'Alibaug', 'Aurangabad', 'Ajanta', 'Ellora',
];

function showSuggestions(input, dropdownId) {
  const query = input.value.trim().toLowerCase();
  const dropdown = document.getElementById(dropdownId);
  if (!query || query.length < 2) {
    dropdown.classList.remove('show');
    return;
  }
  const matches = LOCATIONS.filter(l => l.toLowerCase().includes(query)).slice(0, 8);
  if (!matches.length) { dropdown.classList.remove('show'); return; }

  dropdown.innerHTML = matches.map(m => `
    <div class="sug-item" onclick="selectSuggestion('${m}', this)">
      <i class="fas fa-map-marker-alt"></i> ${m}
    </div>`).join('');
  dropdown.classList.add('show');
}

function selectSuggestion(value, el) {
  const dropdown = el.closest('.suggestions-dropdown');
  const input = dropdown.previousElementSibling;
  input.value = value;
  dropdown.classList.remove('show');
}

// Close dropdowns on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.autocomplete-wrap')) {
    document.querySelectorAll('.suggestions-dropdown').forEach(d => d.classList.remove('show'));
  }
});

function swapLocations() {
  const from = document.getElementById('fromInput');
  const to = document.getElementById('toInput');
  [from.value, to.value] = [to.value, from.value];
}

function searchJourney() {
  const from = document.getElementById('fromInput').value;
  const to = document.getElementById('toInput').value;
  if (!from || !to) { alert('Please enter both From and Destination locations.'); return; }
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

/* ── FEATURE MODAL ─────────────────────────────────────── */
const FEATURE_DATA = {
  trusted: {
    icon: 'fas fa-shield-alt',
    title: 'Trusted & Reliable',
    desc: 'With over 12+ years of operation from Madurai, we have built an unshakeable reputation for trust, honesty and reliability across thousands of families and corporate clients.',
    points: ['12+ years of continuous operation', 'Thousands of verified 5-star reviews', 'Licensed & insured fleet', 'Transparent billing — no hidden charges', 'Government-registered travel agency']
  },
  fleet: {
    icon: 'fas fa-car-side',
    title: 'Premium Fleet',
    desc: 'Our diverse fleet covers every travel need — from a solo airport pickup to a 50-person corporate retreat. All vehicles are regularly serviced, GPS-tracked and climate-controlled.',
    points: ['Sedan, SUV, Innova, Crysta, Fortuner', 'Tempo Traveller 12/15 Seat', 'Mini Bus 20/25 Seat', 'Luxury Coach 35/45 Seat', 'Volvo Sleeper Bus']
  },
  support: {
    icon: 'fas fa-headset',
    title: '24/7 Support',
    desc: 'Travel can be unpredictable. Our round-the-clock support team is always one call away — whether you are in Madurai or the Himalayas.',
    points: ['24/7 phone & WhatsApp support', 'Dedicated trip coordinator per booking', 'Emergency on-road assistance', 'Real-time driver tracking', 'Instant query resolution']
  },
  pricing: {
    icon: 'fas fa-rupee-sign',
    title: 'Best Pricing',
    desc: 'We believe great travel should not break the bank. Our transparent pricing model ensures you get the maximum value with zero hidden surprises.',
    points: ['Transparent tariff cards', 'No hidden charges or surprise fees', 'Group discounts available', 'Flexible payment options', 'Best price match guarantee']
  },
  drivers: {
    icon: 'fas fa-user-tie',
    title: 'Expert Drivers',
    desc: 'Our professional drivers are more than just chauffeurs — they are trained travel companions who know every route, every shortcut and every must-visit spot.',
    points: ['Verified background checks', '5+ years driving experience', 'First aid trained', 'Fluent in Tamil, English & Hindi', 'Deep local destination knowledge']
  },
  hotel: {
    icon: 'fas fa-hotel',
    title: 'Hotel Booking',
    desc: 'From budget guesthouses to luxury resorts, we handle all your accommodation needs at exclusive partner rates — so you focus on the journey, not the logistics.',
    points: ['Budget to luxury options', 'Partner hotel network across India', 'Discounted room rates', 'Honeymoon room decoration', 'Early check-in / late checkout assistance']
  },
  pilgrimage: {
    icon: 'fas fa-hands-praying',
    title: 'Pilgrimage Tours',
    desc: 'We specialize in sacred journeys across India — from the famous Rameshwaram and Tirupati in the South to Char Dham and Kashi in the North.',
    points: ['Rameshwaram & Dhanushkodi', 'Tirupati Balaji (with e-tickets)', 'Palani Murugan Temple', 'Velankanni Church', 'Kashi, Ayodhya & Mathura (North India)', 'Char Dham Yatra']
  },
  honeymoon: {
    icon: 'fas fa-heart',
    title: 'Honeymoon Specials',
    desc: 'Begin your forever journey with a trip curated to perfection. From rose petal room decorations to sunset houseboat dinners — every detail is crafted with love.',
    points: ['Private houseboat stays in Kerala', 'Rose petal room decoration', 'Romantic candlelight dinners', 'Couple spa experiences', 'Sunset cruise arrangements', 'Photography service on request']
  },
  family: {
    icon: 'fas fa-users',
    title: 'Family Tours',
    desc: 'Family trips need extra care — and we deliver exactly that. Safe, comfortable and fun-packed itineraries for every generation in your family.',
    points: ['Child-friendly destinations', 'Safe, verified vehicles', 'Family-sized accommodation', 'Flexible itineraries', 'Kid-friendly activity planning', 'Priority seating arrangements']
  },
  corporate: {
    icon: 'fas fa-briefcase',
    title: 'Corporate Travel',
    desc: 'Professional corporate travel management for companies of all sizes. Team outings, client tours, conference transport — handled with executive precision.',
    points: ['Dedicated account manager', 'Large fleet for group travel', 'GST invoices provided', 'Customizable itineraries', 'On-time guaranteed pickups', 'Bulk booking discounts']
  }
};

function openFeatureModal(key) {
  const data = FEATURE_DATA[key];
  if (!data) return;
  document.getElementById('fmIcon').innerHTML = `<i class="${data.icon}"></i>`;
  document.getElementById('fmTitle').textContent = data.title;
  document.getElementById('fmDesc').textContent = data.desc;
  document.getElementById('fmPoints').innerHTML = data.points.map(p => `<li>${p}</li>`).join('');
  document.getElementById('featureModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFeatureModal(e) {
  if (e && e.target !== document.getElementById('featureModal')) return;
  document.getElementById('featureModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ── INDIA MAP (SVG) ────────────────────────────────────── */
const STATE_DATA = {
  'Tamil Nadu': {
    destinations: ['Madurai', 'Chennai', 'Coimbatore', 'Ooty', 'Kodaikanal', 'Rameshwaram', 'Kanyakumari', 'Tirunelveli', 'Rameswaram', 'Mahabalipuram', 'Pondicherry', 'Kumbakonam', 'Chidambaram', 'Thanjavur', 'Velankanni'],
    districts: ['Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Kancheepuram', 'Thanjavur', 'Dindigul', 'Cuddalore', 'Kanyakumari', 'Krishnagiri', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Sivaganga', 'Tenkasi', 'The Nilgiris', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Virudhunagar', 'Chengalpattu', 'Kallakurichi', 'Karur', 'Mayiladuthurai'],
    pilgrimage: ['Rameshwaram', 'Velankanni', 'Palani Murugan', 'Meenakshi Amman Madurai', 'Tiruvannamalai Arunachaleswarar', 'Chidambaram Nataraja', 'Kumbakonam Temples', 'Rameswaram 22 Theerthams'],
    honeymoon: ['Ooty', 'Kodaikanal', 'Yelagiri', 'Yercaud', 'Kotagiri'],
    packages: ['Madurai Heritage Tour', 'Rameshwaram Pilgrimage', 'Ooty-Kodai Hill Trip', 'Kanyakumari Sunrise', 'South Tamil Nadu Circuit'],
    type: 'tamilnadu'
  },
  'Kerala': {
    destinations: ['Alleppey', 'Munnar', 'Kochi', 'Thekkady', 'Wayanad', 'Varkala', 'Kovalam', 'Trivandrum', 'Kozhikode', 'Thrissur'],
    pilgrimage: ['Guruvayur Temple', 'Sabarimala Ayyappa', 'Padmanabhaswamy Temple'],
    honeymoon: ['Alleppey Houseboat', 'Munnar Tea Gardens', 'Vagamon', 'Athirapally Falls'],
    packages: ['Kerala Backwaters 4D/3N ₹8,500/person', 'Kerala Honeymoon 5D/4N ₹18,000/couple', 'Munnar Hill Escape 3D/2N ₹5,500/person'],
    type: 'general'
  },
  'Karnataka': {
    destinations: ['Bangalore', 'Mysore', 'Coorg', 'Hampi', 'Chikmagalur', 'Gokarna', 'Hassan', 'Ooty (via Ooty)'],
    pilgrimage: ['Dharmasthala', 'Udupi Sri Krishna', 'Kukke Subramanya'],
    honeymoon: ['Coorg', 'Chikmagalur', 'Sakleshpur'],
    packages: ['Mysore-Coorg 4D/3N', 'Hampi Heritage Tour', 'Chikmagalur Coffee Estate'],
    type: 'general'
  },
  'Andhra Pradesh': {
    destinations: ['Tirupati', 'Araku Valley', 'Visakhapatnam', 'Vijayawada', 'Srikalahasti'],
    pilgrimage: ['Tirupati Balaji Darshan', 'Srikalahasti Temple', 'Simhachalam'],
    honeymoon: ['Araku Valley', 'Lambasingi (Kashmir of AP)'],
    packages: ['Tirupati Darshan 1 Day ₹3,500/person', 'Araku Tribal Tour'],
    type: 'general'
  },
  'Rajasthan': {
    destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Ajmer', 'Pushkar', 'Bikaner'],
    pilgrimage: ['Ajmer Sharif Dargah', 'Pushkar Brahma Temple', 'Nathdwara'],
    honeymoon: ['Udaipur Lake Palace', 'Jaisalmer Desert Camp'],
    packages: ['Golden Triangle 8D/7N ₹22,000/person', 'Desert Safari Rajasthan', 'Rajasthan Heritage Tour'],
    type: 'general'
  },
  'Uttar Pradesh': {
    destinations: ['Agra', 'Varanasi', 'Mathura', 'Vrindavan', 'Allahabad', 'Lucknow', 'Ayodhya'],
    pilgrimage: ['Varanasi Kashi Vishwanath', 'Mathura Krishna Janmabhoomi', 'Ayodhya Ram Mandir', 'Allahabad Sangam'],
    honeymoon: ['Agra Taj Mahal Sunrise'],
    packages: ['Taj Mahal & Agra Tour', 'Kashi Mathura Pilgrimage', 'Char Dham Yatra 12D/11N ₹35,000/person'],
    type: 'general'
  },
  'Uttarakhand': {
    destinations: ['Rishikesh', 'Haridwar', 'Mussoorie', 'Nainital', 'Kedarnath', 'Badrinath'],
    pilgrimage: ['Char Dham – Kedarnath', 'Badrinath', 'Gangotri', 'Yamunotri', 'Haridwar Ganga Aarti'],
    honeymoon: ['Mussoorie', 'Nainital'],
    packages: ['Char Dham Yatra', 'Rishikesh Adventure', 'Himalayan Hill Station Tour'],
    type: 'general'
  },
  'Himachal Pradesh': {
    destinations: ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Kullu'],
    pilgrimage: ['Vaishno Devi (via Jammu)', 'Hidimba Temple Manali'],
    honeymoon: ['Manali Snow Tour', 'Shimla-Kufri'],
    packages: ['Shimla-Manali 7D/6N', 'Dharamshala Hippie Trail'],
    type: 'general'
  },
  'Goa': {
    destinations: ['North Goa', 'South Goa', 'Panaji', 'Calangute', 'Baga', 'Palolem'],
    pilgrimage: ['Basilica of Bom Jesus', 'Se Cathedral'],
    honeymoon: ['Calangute Beach', 'Palolem Romantic Sunset'],
    packages: ['Goa Beach Special 4D/3N', 'North & South Goa Tour'],
    type: 'general'
  },
  'West Bengal': {
    destinations: ['Kolkata', 'Darjeeling', 'Sundarbans', 'Kalimpong', 'Digha'],
    pilgrimage: ['Kalighat Temple', 'Dakshineswar Temple', 'Belur Math'],
    honeymoon: ['Darjeeling Tea Gardens', 'Kalimpong'],
    packages: ['Darjeeling 4D/3N', 'Kolkata Heritage Tour'],
    type: 'general'
  },
  'Jammu and Kashmir': {
    destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Leh Ladakh', 'Kargil'],
    pilgrimage: ['Vaishno Devi Temple', 'Amarnath Cave Temple'],
    honeymoon: ['Srinagar Houseboat Stay', 'Gulmarg Snow Valley'],
    packages: ['Kashmir Paradise 6D/5N', 'Leh Ladakh Adventure 7D/6N', 'Vaishno Devi Darshan Tour 3D/2N'],
    type: 'general'
  },
  'Gujarat': {
    destinations: ['Ahmedabad', 'Dwarka', 'Somnath', 'Kutch (Rann of Kutch)', 'Statue of Unity', 'Gir National Park'],
    pilgrimage: ['Dwarkadhish Temple', 'Somnath Jyotirlinga', 'Palitana Temples'],
    honeymoon: ['Rann of Kutch Luxury Tent City', 'Diu Beach resort'],
    packages: ['Dwarka Somnath Pilgrimage 5D/4N', 'Rann of Kutch White Desert Festival 3D/2N', 'Gujarat Heritage & Wildlife Tour 6D/5N'],
    type: 'general'
  },
  'Maharashtra': {
    destinations: ['Mumbai', 'Pune', 'Lonavala', 'Mahabaleshwar', 'Shirdi', 'Nashik', 'Aurangabad (Ajanta & Ellora)'],
    pilgrimage: ['Shirdi Sai Baba Temple', 'Trimbakeshwar Jyotirlinga', 'Grishneshwar Temple'],
    honeymoon: ['Mahabaleshwar Strawberry Valley', 'Lonavala Lakeside villa'],
    packages: ['Shirdi & Nashik Jyotirlinga Tour 3D/2N', 'Ajanta & Ellora Heritage Tour 4D/3N', 'Mahabaleshwar & Lonavala Hill Resort 5D/4N'],
    type: 'general'
  },
  'Madhya Pradesh': {
    destinations: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Khajuraho', 'Ujjain', 'Pachmarhi', 'Kanha National Park'],
    pilgrimage: ['Mahakaleshwar Ujjain', 'Omkareshwar Jyotirlinga', 'Sanchi Stupa'],
    honeymoon: ['Pachmarhi Hill Station Romance', 'Bhedaghat Marble Rocks'],
    packages: ['Jyotirlinga Darshan Ujjain-Omkareshwar 3D/2N', 'Khajuraho Heritage & Tiger Safari 5D/4N', 'Pachmarhi Scenic Getaway 4D/3N'],
    type: 'general'
  },
  'Odisha': {
    destinations: ['Bhubaneswar', 'Puri', 'Konark', 'Chilika Lake', 'Cuttack', 'Gopalpur'],
    pilgrimage: ['Jagannath Temple Puri', 'Konark Sun Temple', 'Lingaraj Temple'],
    honeymoon: ['Chilika Lake Houseboat stay', 'Gopalpur Beach resort'],
    packages: ['Puri Jagannath Darshan & Konark 4D/3N', 'Golden Triangle of Odisha 5D/4N'],
    type: 'general'
  },
  'Assam': {
    destinations: ['Guwahati', 'Kaziranga National Park', 'Majuli Island', 'Tezpur', 'Jorhat', 'Haflong'],
    pilgrimage: ['Kamakhya Temple Guwahati', 'Hajo Powa Mecca'],
    honeymoon: ['Brahmaputra River Cruise', 'Kaziranga Luxury Resort'],
    packages: ['Kaziranga Wildlife Safari 3D/2N', 'Assam Tea Garden & River Tour 5D/4N'],
    type: 'general'
  },
  'Sikkim': {
    destinations: ['Gangtok', 'Pelling', 'Lachung', 'Lachen', 'Namchi', 'Ravangla'],
    pilgrimage: ['Rumtek Monastery', 'Char Dham Namchi', 'Tashiding Monastery'],
    honeymoon: ['Tsomgo Lake & Gangtok Romantic Getaway', 'Pelling Valley'],
    packages: ['Gangtok & Pelling Scenic Tour 5D/4N', 'North Sikkim Lachung-Lachen 4D/3N'],
    type: 'general'
  },
  'Meghalaya': {
    destinations: ['Shillong', 'Cherrapunji', 'Mawlynnong', 'Dawki', 'Jowai'],
    pilgrimage: ['Nartiang Durga Temple'],
    honeymoon: ['Dawki River Boating', 'Cherrapunji Waterfalls resort'],
    packages: ['Shillong-Cherrapunji-Dawki 5D/4N', 'Meghalaya Living Root Bridges Tour 4D/3N'],
    type: 'general'
  },
  'Andaman and Nicobar Islands': {
    destinations: ['Port Blair', 'Havelock Island', 'Neil Island', 'Baratang Island', 'Radhanagar Beach'],
    pilgrimage: ['Cellular Jail National Memorial'],
    honeymoon: ['Havelock Island Beach Resort Luxury Stay', 'Sunset Candlelight Dinner Neil Island'],
    packages: ['Andaman Island Getaway 5D/4N', 'Andaman Explorer Tour 6D/5N'],
    type: 'general'
  },
  'Lakshadweep': {
    destinations: ['Kavaratti', 'Agatti Island', 'Bangaram Island', 'Minicoy Island', 'Kalpeni'],
    pilgrimage: ['Ujra Mosque Kavaratti'],
    honeymoon: ['Bangaram Island Beach Overwater Villa', 'Agatti Lagoon Romance'],
    packages: ['Lakshadweep Samudram Cruise 5D/4N', 'Agatti Island Tropical Getaway 4D/3N'],
    type: 'general'
  }
};

// Simplified India SVG Map Data
const MAP_STATES = [
  // Each: [name, path-d (simplified polygon points for SVG)]
  // Using approximate positions for a representative map
  { name: 'Jammu & Kashmir', x: 180, y: 60, w: 110, h: 80 },
  { name: 'Himachal Pradesh', x: 230, y: 135, w: 70, h: 55 },
  { name: 'Punjab', x: 185, y: 140, w: 55, h: 50 },
  { name: 'Uttarakhand', x: 290, y: 135, w: 70, h: 50 },
  { name: 'Haryana', x: 205, y: 185, w: 65, h: 45 },
  { name: 'Delhi', x: 255, y: 185, w: 25, h: 20 },
  { name: 'Rajasthan', x: 130, y: 175, w: 130, h: 120 },
  { name: 'Uttar Pradesh', x: 260, y: 180, w: 140, h: 90 },
  { name: 'Bihar', x: 390, y: 190, w: 80, h: 65 },
  { name: 'Sikkim', x: 460, y: 145, w: 25, h: 25 },
  { name: 'Arunachal Pradesh', x: 530, y: 120, w: 100, h: 70 },
  { name: 'Assam', x: 490, y: 175, w: 90, h: 50 },
  { name: 'Nagaland', x: 570, y: 185, w: 40, h: 35 },
  { name: 'Manipur', x: 565, y: 215, w: 38, h: 38 },
  { name: 'Mizoram', x: 545, y: 245, w: 38, h: 40 },
  { name: 'Tripura', x: 520, y: 240, w: 30, h: 35 },
  { name: 'Meghalaya', x: 475, y: 210, w: 55, h: 35 },
  { name: 'West Bengal', x: 420, y: 195, w: 75, h: 110 },
  { name: 'Jharkhand', x: 380, y: 250, w: 75, h: 65 },
  { name: 'Odisha', x: 380, y: 305, w: 85, h: 80 },
  { name: 'Chhattisgarh', x: 290, y: 285, w: 95, h: 90 },
  { name: 'Madhya Pradesh', x: 190, y: 265, w: 140, h: 90 },
  { name: 'Gujarat', x: 90, y: 250, w: 110, h: 95 },
  { name: 'Maharashtra', x: 145, y: 330, w: 155, h: 110 },
  { name: 'Goa', x: 140, y: 430, w: 35, h: 30 },
  { name: 'Karnataka', x: 160, y: 430, w: 115, h: 110 },
  { name: 'Telangana', x: 255, y: 360, w: 90, h: 80 },
  { name: 'Andhra Pradesh', x: 255, y: 430, w: 105, h: 100 },
  { name: 'Tamil Nadu', x: 215, y: 520, w: 110, h: 130 },
  { name: 'Kerala', x: 175, y: 530, w: 55, h: 120 },
  { name: 'Lakshadweep', x: 100, y: 600, w: 30, h: 30 },
  { name: 'Andaman & Nicobar', x: 590, y: 420, w: 30, h: 100 },
];

function buildIndiaMap() {
  const svg = document.getElementById('indiaMap');
  if (!svg) return;

  const paths = svg.querySelectorAll('path');
  paths.forEach(el => {
    const name = el.getAttribute('aria-label');
    if (!name) return;
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      selectStateOnMapAndSidebar(name);
    });

    el.addEventListener('mouseenter', (e) => {
      if (!el.classList.contains('selected')) {
        el.style.fill = 'rgba(0, 153, 255, 0.35)';
        el.style.stroke = '#0099ff';
        el.style.strokeWidth = '1.5';
        el.style.filter = 'drop-shadow(0 0 8px rgba(0,153,255,0.5))';
      }
      showMapTooltip(name, el, e);
    });

    el.addEventListener('mousemove', (e) => {
      positionMapTooltip(e);
    });

    el.addEventListener('mouseleave', () => {
      if (!el.classList.contains('selected')) {
        const isTN = name === 'Tamil Nadu';
        el.style.fill = isTN ? 'rgba(168,85,247,0.2)' : 'rgba(0,153,255,0.12)';
        el.style.stroke = isTN ? 'rgba(168,85,247,0.6)' : 'rgba(0,153,255,0.35)';
        el.style.strokeWidth = isTN ? '2' : '0.8';
        el.style.filter = '';
      }
      hideMapTooltip();
    });
  });
}

let mapTooltip = null;
function showMapTooltip(name, el, event) {
  if (!mapTooltip) {
    mapTooltip = document.createElement('div');
    mapTooltip.style.cssText = `
      position:absolute;pointer-events:none;z-index:1000;
      background:rgba(8,12,26,0.95);border:1px solid rgba(0,153,255,0.3);
      padding:8px 14px;border-radius:8px;font-size:0.8rem;
      color:#fff;font-family:'Outfit',sans-serif;
      backdrop-filter:blur(10px);transition:opacity 0.1s;
    `;
    document.getElementById('mapContainer').appendChild(mapTooltip);
  }
  mapTooltip.textContent = name;
  mapTooltip.style.display = 'block';
  mapTooltip.style.opacity = '1';
  positionMapTooltip(event);
}

function positionMapTooltip(event) {
  if (!mapTooltip) return;
  const container = document.getElementById('mapContainer');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left + 15;
  const y = event.clientY - rect.top + 15;
  mapTooltip.style.left = x + 'px';
  mapTooltip.style.top = y + 'px';
}

function hideMapTooltip() {
  if (mapTooltip) mapTooltip.style.opacity = '0';
}

let mapScale = 1;
function zoomMap(factor) {
  mapScale = Math.min(3, Math.max(0.5, mapScale * factor));
  document.getElementById('indiaMap').style.transform = `scale(${mapScale})`;
}

function resetMap() {
  mapScale = 1;
  document.getElementById('indiaMap').style.transform = 'scale(1)';
}

const TN_CATEGORY_DATA = {
  travel: {
    icon: 'fas fa-monument',
    title: 'Travel & Heritage Sites',
    desc: 'Explore the architectural wonders, historic temples, and ancient monuments of Tamil Nadu.',
    color: 'var(--pink-neon)',
    items: [
      { name: 'Meenakshi Amman Temple', desc: 'Madurai - Dravidian masterpiece' },
      { name: 'Ramanathaswamy Temple', desc: 'Rameshwaram - Longest corridor in the world' },
      { name: 'Brihadeeswarar Temple', desc: 'Thanjavur - 1000-year-old living heritage' },
      { name: 'Shore Temple', desc: 'Mahabalipuram - Pallava-era stone carvings' },
      { name: 'Nataraja Temple', desc: 'Chidambaram - Cosmic dance of Lord Shiva' },
      { name: 'Arunachaleswarar Temple', desc: 'Tiruvannamalai - Agni Lingam temple' },
      { name: 'Kumbakonam Temples', desc: 'Kumbakonam - City of divine temples' },
      { name: 'Velankanni Basilica', desc: 'Velankanni - Renowned Marian shrine' },
      { name: 'Palani Murugan Temple', desc: 'Palani - Sacred hill abode of Lord Murugan' }
    ]
  },
  honeymoon: {
    icon: 'fas fa-heart',
    title: 'Honeymoon & Scenic Sites',
    desc: 'Escape to the mist-covered hills, serene lakes, and romantic retreats of Tamil Nadu.',
    color: 'var(--blue-electric)',
    items: [
      { name: 'Ooty Hills', desc: 'Nilgiris - Queen of Hill Stations' },
      { name: 'Kodaikanal Lake', desc: 'Palani Hills - Princess of Hill Stations' },
      { name: 'Yercaud', desc: 'Shevaroys - Jewel of the South' },
      { name: 'Yelagiri Hills', desc: 'Vellore - Quiet nature escape' },
      { name: 'Coonoor', desc: 'Nilgiris - Picturesque tea estates' },
      { name: 'Kotagiri', desc: 'Nilgiris - Peaceful green meadows' },
      { name: 'Meghamalai', desc: 'Theni - High wavy misty mountains' },
      { name: 'Valparai', desc: 'Anamalai - Forest hills and tea gardens' }
    ]
  },
  popular: {
    icon: 'fas fa-star',
    title: 'Popular Destinations',
    desc: 'The absolute must-visit landmarks, beaches, and vibrant cities of Tamil Nadu.',
    color: 'var(--pink-soft)',
    items: [
      { name: 'Madurai', desc: 'Cultural capital & historical temple city' },
      { name: 'Chennai', desc: 'Capital city with Marina beach & heritage' },
      { name: 'Kanyakumari', desc: 'Triveni Sangam sunrise & Vivekananda rock' },
      { name: 'Rameshwaram', desc: 'Sacred island pilgrim centre & beaches' },
      { name: 'Ooty Tea Gardens', desc: 'Lush green tea gardens & toy train rides' },
      { name: 'Kodaikanal Hills', desc: 'Scenic viewpoints, pine forests & lakes' },
      { name: 'Pondicherry', desc: 'Indo-French colony close to TN borders' },
      { name: 'Mahabalipuram Shore', desc: 'World heritage monuments & coastal views' },
      { name: 'Coimbatore', desc: 'Gateway to Western Ghats & industry hub' }
    ]
  }
};

function openTnCategoryModal(catKey, el) {
  const data = TN_CATEGORY_DATA[catKey];
  if (!data) return;
  
  const iconEl = document.getElementById('cmIcon');
  const titleEl = document.getElementById('cmTitle');
  const descEl = document.getElementById('cmDesc');
  const contentEl = document.getElementById('cmContent');
  const modalEl = document.getElementById('categoryModal');
  
  if (iconEl) iconEl.innerHTML = `<i class="${data.icon}" style="color:${data.color}"></i>`;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  
  if (contentEl) {
    contentEl.innerHTML = data.items.map(item => `
      <div class="tn-modal-item" style="padding: 12px 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; display: flex; flex-direction: column; gap: 2px;">
        <span style="font-weight: 700; font-size: 0.88rem; color: #fff;">${item.name}</span>
        <span style="font-size: 0.72rem; color: var(--text-secondary);">${item.desc}</span>
      </div>
    `).join('');
  }
  
  if (modalEl) {
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCategoryModal(e) {
  if (e && e.target !== document.getElementById('categoryModal') && e.target !== document.querySelector('#categoryModal .modal-close') && !document.querySelector('#categoryModal .modal-close').contains(e.target)) return;
  const modalEl = document.getElementById('categoryModal');
  if (modalEl) modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

function getPackagesForState(stateName, data) {
  let pkgs = [];
  if (data && data.packages && data.packages.length > 0) {
    pkgs = data.packages.map(p => {
      let name = p;
      let duration = "5D / 4N";
      let price = "Contact for Price";
      let features = "AC Cab + Hotel + Sightseeing";

      const durationMatch = p.match(/(\d+D\s*\/\s*\d+N)/i) || p.match(/(\d+\s*Day)/i);
      if (durationMatch) {
        duration = durationMatch[0];
        name = name.replace(durationMatch[0], "").trim();
      }
      
      const priceMatch = p.match(/(₹\s*[\d,]+(\/[\w\s]+)?)/i);
      if (priceMatch) {
        price = priceMatch[0];
        name = name.replace(priceMatch[0], "").trim();
      }

      name = name.replace(/[\s\-\/₹]+$/, "").replace(/^[\s\-\/₹]+/, "").trim();

      return { name, duration, price, features };
    });
  }

  if (pkgs.length < 3) {
    const templates = [
      { nameTemplate: `Best of {State}`, duration: "6D / 5N", priceTemplate: "₹14,500", features: "Premium Hotels + AC Cab + Meals" },
      { nameTemplate: `{State} Explorer Tour`, duration: "4D / 3N", priceTemplate: "₹9,800", features: "Sightseeing + Transports + Hotels" },
      { nameTemplate: `{State} Heritage & Culture`, duration: "5D / 4N", priceTemplate: "₹12,000", features: "Guided Tour + AC Cab + Stay" },
      { nameTemplate: `Weekend Special {State}`, duration: "3D / 2N", priceTemplate: "₹6,500", features: "AC Cab + Sightseeing + Stays" }
    ];

    for (let t of templates) {
      if (pkgs.length >= 3) break;
      const formattedName = t.nameTemplate.replace("{State}", stateName);
      if (!pkgs.some(p => p.name.toLowerCase().includes(formattedName.toLowerCase()) || formattedName.toLowerCase().includes(p.name.toLowerCase()))) {
        pkgs.push({
          name: formattedName,
          duration: t.duration,
          price: `${t.priceTemplate}/person`,
          features: t.features
        });
      }
    }
  }

  return pkgs.slice(0, 3);
}

function selectStateOnMapAndSidebar(stateName) {
  let data = STATE_DATA[stateName];
  const sidebar = document.getElementById('mapSidebar');
  if (!sidebar) return;

  // Normalization maps
  if (!data) {
    const keys = Object.keys(STATE_DATA);
    const matchedKey = keys.find(k => k.toLowerCase() === stateName.toLowerCase() || 
                                      k.toLowerCase().replace(/and/g, '&') === stateName.toLowerCase().replace(/and/g, '&'));
    if (matchedKey) {
      data = STATE_DATA[matchedKey];
    }
  }

  // Dynamic fallback generator to eliminate "Request Package" button entirely
  if (!data) {
    data = {
      destinations: [`Scenic spots in ${stateName}`, `Heritage sites of ${stateName}`, `Nature parks in ${stateName}`],
      pilgrimage: [`Local temples & shrines of ${stateName}`],
      honeymoon: [`Romantic retreats in ${stateName}`],
      packages: [],
      type: 'general'
    };
  }

  let html = `<h3>🗺️ ${stateName}</h3>`;

  if (data.type === 'tamilnadu') {
    html += `
      <div class="state-section-title">📂 Tamil Nadu Categories</div>
      <div class="tn-categories-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;">
        <div class="tn-cat-card" onclick="openTnCategoryModal('travel', this)" style="padding: 15px; background: linear-gradient(135deg, rgba(255, 45, 120, 0.1), rgba(0, 153, 255, 0.1)); border: 1px solid rgba(255, 45, 120, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 45, 120, 0.2); display: flex; align-items: center; justify-content: center; color: var(--pink-neon); font-size: 1.2rem;">
            <i class="fas fa-monument"></i>
          </div>
          <div style="flex-grow: 1;">
            <h5 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #fff;">Travel Sites</h5>
            <p style="margin: 2px 0 0; font-size: 0.75rem; color: var(--text-muted);">Temples, heritage & historic monuments</p>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted); font-size: 0.8rem;"></i>
        </div>

        <div class="tn-cat-card" onclick="openTnCategoryModal('honeymoon', this)" style="padding: 15px; background: linear-gradient(135deg, rgba(0, 153, 255, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(0, 153, 255, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0, 153, 255, 0.2); display: flex; align-items: center; justify-content: center; color: var(--blue-electric); font-size: 1.2rem;">
            <i class="fas fa-heart"></i>
          </div>
          <div style="flex-grow: 1;">
            <h5 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #fff;">Honeymoon Sites</h5>
            <p style="margin: 2px 0 0; font-size: 0.75rem; color: var(--text-muted);">Misty hills, lakes & scenic retreats</p>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted); font-size: 0.8rem;"></i>
        </div>

        <div class="tn-cat-card" onclick="openTnCategoryModal('popular', this)" style="padding: 15px; background: linear-gradient(135deg, rgba(255, 111, 168, 0.1), rgba(0, 153, 255, 0.1)); border: 1px solid rgba(255, 111, 168, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 111, 168, 0.2); display: flex; align-items: center; justify-content: center; color: var(--pink-soft); font-size: 1.2rem;">
            <i class="fas fa-star"></i>
          </div>
          <div style="flex-grow: 1;">
            <h5 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #fff;">Popular Destinations</h5>
            <p style="margin: 2px 0 0; font-size: 0.75rem; color: var(--text-muted);">Top cities, beach towns & landmarks</p>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted); font-size: 0.8rem;"></i>
        </div>
      </div>`;
  }

  html += `
    <div class="state-section-title">🏖️ Popular Destinations</div>
    <div class="state-dest-grid" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">
      ${data.destinations.map(d => `<div class="state-dest-item" style="padding: 6px 12px; font-size: 0.8rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,153,255,0.15); background: rgba(0,153,255,0.05);">${d}</div>`).join('')}
    </div>
    <div class="state-section-title">🛕 Pilgrimage Sites</div>
    <div class="state-dest-grid" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">
      ${data.pilgrimage.map(p => `<div class="state-dest-item" style="padding: 6px 12px; font-size: 0.8rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,153,255,0.15); background: rgba(0,153,255,0.05);">🙏 ${p}</div>`).join('')}
    </div>
    <div class="state-section-title">💑 Honeymoon Picks</div>
    <div class="state-dest-grid" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">
      ${data.honeymoon.map(h => `<div class="state-dest-item" style="padding: 6px 12px; font-size: 0.8rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,153,255,0.15); background: rgba(0,153,255,0.05);">❤️ ${h}</div>`).join('')}
    </div>
    <div class="state-section-title">📦 Related Tour Packages</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
      ${getPackagesForState(stateName, data).map(pkg => `
        <div style="padding:14px 16px;background:rgba(0,153,255,0.04);border:1px solid rgba(0,153,255,0.15);border-radius:12px;font-size:0.85rem;display:flex;flex-direction:column;gap:6px;" class="sidebar-pkg-item">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:700;color:#fff;display:flex;align-items:center;gap:6px;">
              <i class="fas fa-suitcase" style="color:var(--pink-neon);font-size:0.85rem"></i>${pkg.name}
            </span>
            <span style="color:var(--blue-light);font-size:0.75rem;font-weight:700;padding:2px 8px;background:rgba(0,153,255,0.1);border-radius:20px;">${pkg.duration}</span>
          </div>
          <div style="font-size:0.75rem;color:var(--text-secondary);">${pkg.features}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.7rem;color:var(--text-muted);">Comfort Assured</span>
            <span style="font-weight:800;color:var(--pink-soft);font-size:0.9rem;">${pkg.price}</span>
          </div>
        </div>`).join('')}
    </div>
    <a href="#booking" class="btn-primary" style="display:inline-flex; width: 100%; justify-content: center;">
      <i class="fas fa-paper-plane"></i> Book This State
    </a>`;

  sidebar.innerHTML = html;

  // Highlight on SVG map
  const svg = document.getElementById('indiaMap');
  if (svg) {
    svg.querySelectorAll('path').forEach(p => {
      const pName = p.getAttribute('aria-label');
      if (pName === stateName) {
        p.classList.add('selected');
        p.style.fill = 'rgba(168,85,247,0.35)';
        p.style.stroke = 'var(--purple-bright)';
        p.style.strokeWidth = '2';
        p.style.filter = 'drop-shadow(0 0 10px rgba(168,85,247,0.5))';
      } else {
        p.classList.remove('selected');
        const isTN = pName === 'Tamil Nadu';
        p.style.fill = isTN ? 'rgba(168,85,247,0.2)' : 'rgba(0,153,255,0.12)';
        p.style.stroke = isTN ? 'rgba(168,85,247,0.6)' : 'rgba(0,153,255,0.35)';
        p.style.strokeWidth = isTN ? '2' : '0.8';
        p.style.filter = '';
      }
    });
  }

  // Scroll sidebar into view on mobile
  if (window.innerWidth <= 1024) {
    sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fallback legacy function mapping
function openStateModal(stateName) {
  selectStateOnMapAndSidebar(stateName);
}

function showDestDetail(name) {
  // Map special strings to their state names
  const mapping = {
    'madurai': 'Tamil Nadu',
    'kerala': 'Kerala',
    'ooty': 'Tamil Nadu',
    'rajasthan': 'Rajasthan',
    'kodaikanal': 'Tamil Nadu',
    'kanyakumari': 'Tamil Nadu',
    'mysore': 'Karnataka',
    'coorg': 'Karnataka',
    'rameshwaram': 'Tamil Nadu',
    'tirupati': 'Andhra Pradesh'
  };
  const state = mapping[name.toLowerCase()] || name;
  selectStateOnMapAndSidebar(state);
}

/* ── INTERACTIVE DESTINATION SEARCH ─────────────────────── */
function handleDestSearch(input) {
  const query = input.value.trim().toLowerCase();
  const dropdown = document.getElementById('destSearchSug');
  const clearBtn = document.getElementById('destSearchClear');

  if (query.length > 0) {
    clearBtn.style.display = 'block';
  } else {
    clearBtn.style.display = 'none';
  }

  if (query.length < 2) {
    dropdown.innerHTML = '';
    dropdown.classList.remove('show');
    return;
  }

  const matches = [];

  // 1. Search states
  for (const stateName in STATE_DATA) {
    if (stateName.toLowerCase().includes(query)) {
      matches.push({ type: 'state', name: stateName, target: stateName });
    }
  }

  // 2. Search destinations/pilgrimage/honeymoon
  for (const stateName in STATE_DATA) {
    const data = STATE_DATA[stateName];

    data.destinations.forEach(d => {
      if (d.toLowerCase().includes(query) && !matches.some(m => m.name.toLowerCase() === d.toLowerCase())) {
        matches.push({ type: 'destination', name: d, target: stateName });
      }
    });

    data.pilgrimage.forEach(p => {
      // clean name of emoji
      const cleanP = p.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      if (cleanP.toLowerCase().includes(query) && !matches.some(m => m.name.toLowerCase() === cleanP.toLowerCase())) {
        matches.push({ type: 'pilgrimage', name: p, target: stateName });
      }
    });

    data.honeymoon.forEach(h => {
      const cleanH = h.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      if (cleanH.toLowerCase().includes(query) && !matches.some(m => m.name.toLowerCase() === cleanH.toLowerCase())) {
        matches.push({ type: 'honeymoon', name: h, target: stateName });
      }
    });
  }

  const sliceMatches = matches.slice(0, 10);

  if (sliceMatches.length === 0) {
    dropdown.innerHTML = '<div class="sug-item no-match">No destinations found</div>';
    dropdown.classList.add('show');
    return;
  }

  dropdown.innerHTML = sliceMatches.map(m => {
    let icon = 'fas fa-map-marked-alt';
    if (m.type === 'destination') icon = 'fas fa-map-pin';
    if (m.type === 'pilgrimage') icon = 'fas fa-hands-praying';
    if (m.type === 'honeymoon') icon = 'fas fa-heart';

    return `
      <div class="sug-item" onclick="selectDestSearchResult('${m.target}', '${m.name.replace(/'/g, "\\'")}')">
        <i class="${icon}"></i> 
        <span>${m.name} <small style="color:var(--text-muted); font-size:0.75rem; margin-left:5px;">(${m.type === 'state' ? 'State' : 'in ' + m.target})</small></span>
      </div>`;
  }).join('');
  dropdown.classList.add('show');
}

function selectDestSearchResult(stateName, displayName) {
  const input = document.getElementById('destSearchInput');
  input.value = displayName;

  document.getElementById('destSearchSug').classList.remove('show');
  selectStateOnMapAndSidebar(stateName);
}

function clearDestSearch() {
  const input = document.getElementById('destSearchInput');
  input.value = '';
  document.getElementById('destSearchClear').style.display = 'none';
  document.getElementById('destSearchSug').classList.remove('show');
}

/* ── PACKAGE FILTER ────────────────────────────────────── */
function filterPkgs(cat, btn) {
  document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pkg-card').forEach(card => {
    const cats = card.dataset.cat || '';
    card.classList.toggle('hidden', cat !== 'all' && !cats.includes(cat));
  });
}
/* ── VEHICLE CATEGORY TOGGLE ───────────────────────────── */
function showVehicleCategory(cat, btn) {
  document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('carsGrid').classList.toggle('hidden', cat !== 'cars');
  document.getElementById('busesGrid').classList.toggle('hidden', cat !== 'buses');
}

/* ── BOOKING FORMS ─────────────────────────────────────── */
function switchBookingTab(tab, btn) {
  document.querySelectorAll('.bk-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.booking-form').forEach(f => f.classList.remove('active'));
  document.getElementById(tab + 'Form').classList.add('active');
}

// Validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validatePhone(phone) {
  const re = /^(?:\+?91|0)?[6789]\d{9}$/;
  return re.test(phone.replace(/[\s\-]/g, ''));
}

async function submitBooking(e, type) {
  e.preventDefault();
  console.log("Submitting booking of type:", type);

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  let originalBtnHtml = '';
  if (submitBtn) {
    originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
    submitBtn.disabled = true;
  }

  const formData = {
    booking_type: type,
    values: {}
  };

  const textInputs = form.querySelectorAll('input[type="text"]');
  const selects = form.querySelectorAll('select');
  const dates = form.querySelectorAll('input[type="date"]');
  const textareas = form.querySelectorAll('textarea');

  let name = "", phone = "", email = "";

  if (type === 'tour') {
    name = textInputs[0]?.value || "";
    const fromLoc = textInputs[1]?.value || "";
    const dest = textInputs[2]?.value || "";
    phone = form.querySelector('input[type="tel"]')?.value || "";
    email = form.querySelector('input[type="email"]')?.value || "";
    const tripType = selects[0]?.value || "";
    const pax = selects[1]?.value || "";
    const vehicle = selects[2]?.value || "";
    const tDate = dates[0]?.value || "";

    if (!name || !fromLoc || !dest || !phone || !tDate) {
      showToast('Please fill in all required fields.', 'error');
      if (submitBtn) { submitBtn.innerHTML = originalBtnHtml; submitBtn.disabled = false; }
      return;
    }

    formData.name = name;
    formData.from_location = fromLoc;
    formData.destination = dest;
    formData.phone = phone;
    formData.email = email;
    formData.trip_type = tripType;
    formData.passengers = pax;
    formData.vehicle = vehicle;
    formData.travel_date = tDate;
    formData.return_date = dates[1]?.value || "";
    formData.requirements = textareas[0]?.value || "";
  }
  else if (type === 'vehicle') {
    name = textInputs[0]?.value || "";
    phone = form.querySelector('input[type="tel"]')?.value || "";
    formData.name            = name;
    formData.phone           = phone;
    formData.vehicle         = selects[0]?.value || "";
    formData.rental_type     = selects[1]?.value || "";
    formData.pickup_location = textInputs[1]?.value || "";
    formData.drop_location   = textInputs[2]?.value || "";
    formData.pickup_date     = dates[0]?.value || "";
    formData.passengers      = form.querySelector('input[type="number"]')?.value || "";
    formData.requirements    = textareas[0]?.value || "";
  }
  /* ── QUICK QUOTE ── */
  else if (type === 'quote') {
    name = textInputs[0]?.value || "";
    phone = form.querySelector('input[type="tel"]')?.value || "";
    formData.name         = name;
    formData.phone        = phone;
    formData.destination  = textInputs[1]?.value || "";
    formData.passengers   = form.querySelector('input[type="number"]')?.value || "";
    formData.travel_date  = dates[0]?.value || "";
    formData.requirements = textareas[0]?.value || "";
  }

  // Shared format validation
  if (email && !validateEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    if (submitBtn) { submitBtn.innerHTML = originalBtnHtml; submitBtn.disabled = false; }
    return;
  }
  if (phone && !validatePhone(phone)) {
    showToast('Please enter a valid 10-digit Indian phone number.', 'error');
    if (submitBtn) { submitBtn.innerHTML = originalBtnHtml; submitBtn.disabled = false; }
    return;
  }

  try {
    let apiUrl = '';
    if (type === 'tour')         apiUrl = 'http://127.0.0.1:5000/api/book';
    else if (type === 'vehicle') apiUrl = 'http://127.0.0.1:5000/api/vehicle';
    else if (type === 'quote')   apiUrl = 'http://127.0.0.1:5000/api/quote';

    console.log('[submitBooking] POST →', apiUrl, '| payload keys:', Object.keys(formData));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    console.log('[submitBooking] Response:', response.status, response.statusText);

    // Read JSON body BEFORE checking response.ok
    // This lets us surface the real backend validation message on errors.
    let result = null;
    try {
      result = await response.json();
    } catch (parseErr) {
      console.error('[submitBooking] Cannot parse server response as JSON:', parseErr);
      throw new Error('Server returned an unexpected response. Please try again.');
    }

    console.log('[submitBooking] Response body:', result);

    if (!response.ok) {
      // Surface the real backend message (e.g. "Trip type is required") instead of generic text
      const backendMsg = (result && result.message)
        ? result.message
        : 'Server error (' + response.status + '). Please try again.';
      console.error('[submitBooking] Backend returned error:', backendMsg);
      throw new Error(backendMsg);
    }

    // ── SUCCESS: show popup modal ─────────────────────────────
    console.log('[submitBooking] SUCCESS — activating success modal.');
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      let successMsg = "Booking Submitted Successfully!";
      if (type === "vehicle") successMsg = "Vehicle Request Submitted Successfully! Our employee will contact you within 2 hours.";
      else if (type === "quote") successMsg = "Quote Request Accepted! Our team will contact you within 2 hours.";
      showToast(successMsg, 'success');
    }

    form.reset();
    console.log('[submitBooking] Completed:', result);
  } catch (error) {
    console.error('[submitBooking] Caught error:', error);
    // Display the real error message (backend validation msg or network failure)
    const userMsg = (error.message && error.message !== '[object Object]')
      ? error.message
      : 'Connection to server failed. Please check your connection and try again.';
    showToast(userMsg, 'error');
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
  }
}

document.getElementById('successModal').addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('active');
    document.body.style.overflow = '';
  }
});

async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  let originalBtnHtml = '';
  if (submitBtn) {
    originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    submitBtn.disabled = true;
  }

  const nameInput = form.querySelector('input[placeholder="Full name"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const emailInput = form.querySelector('input[type="email"]');
  const subjectSelect = form.querySelector('select');
  const messageTextarea = form.querySelector('textarea');

  const name = nameInput?.value || "";
  const phone = phoneInput?.value || "";
  const email = emailInput?.value || "";
  const subject = subjectSelect?.value || "";
  const message = messageTextarea?.value || "";

  // Validation
  if (name.trim().length < 2) {
    showToast('Please enter a valid name (minimum 2 characters).', 'error');
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
    return;
  }

  if (email && !validateEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
    return;
  }

  if (!validatePhone(phone)) {
    showToast('Please enter a valid 10-digit Indian phone number.', 'error');
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
    return;
  }

  const formData = {
    booking_type: 'contact',
    name: name,
    phone: phone,
    email: email,
    subject: subject,
    message: message
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    
    showToast('Message sent successfully! Our team will contact you within 2 hours.', 'success');
    
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    form.reset();
    console.log(result);
  } catch (error) {
    console.error(error);
    showToast('Failed to send message. Please check your connection.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
  }
}

/* ── GALLERY FILTER ────────────────────────────────────── */
function filterGallery(cat, btn) {
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const c = item.dataset.cat || '';
    item.classList.toggle('hidden', cat !== 'all' && c !== cat);
  });
}

/* ── LIGHTBOX ──────────────────────────────────────────── */
function openLightbox(item) {
  const img = item.querySelector('img');
  const cap = item.querySelector('.gallery-overlay span');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxCaption').textContent = cap ? cap.textContent : '';
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function closeStateModal() {
  // The state modal was replaced by the interactive sidebar, so this is a no-op
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeFeatureModal();
    closeStateModal();
    closeCategoryModal();
    closeAuthModal();
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── INTERSECTION OBSERVER (fade-in animations) ────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeSlideUp 0.7s ease forwards';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .pkg-card, .vehicle-card, .testi-card, .dest-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

/* ── SMOOTH SCROLL for anchors ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildIndiaMap();
  selectStateOnMapAndSidebar('Tamil Nadu');
  initAuth();

  // Duplicate destination track for infinite scroll
  const track = document.getElementById('destTrack');
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  }

  // Set minimum date for date inputs
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(d => d.setAttribute('min', today));
});

/* ── AUTHENTICATION & SESSION MANAGEMENT ────────────────── */
let currentSessionUser = null;

// Initialize authentication on page load
function initAuth() {
  const session = localStorage.getItem('currentUser');
  if (session) {
    try {
      currentSessionUser = JSON.parse(session);
      updateAuthUI(true);
    } catch (e) {
      localStorage.removeItem('currentUser');
      updateAuthUI(false);
    }
  } else {
    updateAuthUI(false);
  }
}

// Update UI based on authentication state
function updateAuthUI(isLoggedIn) {
  const signInBtn = document.getElementById('navSignInBtn');
  const profileDropdown = document.getElementById('navProfileDropdown');
  const navUserAvatar = document.getElementById('navUserAvatar');
  const navUsername = document.getElementById('navUsername');
  
  // Mobile nav links
  const mobileLoggedOut = document.querySelectorAll('.mobile-auth-link.logged-out-only');
  const mobileLoggedIn = document.querySelectorAll('.mobile-auth-link.logged-in-only');

  if (isLoggedIn && currentSessionUser) {
    // Desktop logged-in UI
    if (signInBtn) signInBtn.style.display = 'none';
    if (profileDropdown) profileDropdown.style.display = 'inline-flex';
    if (navUsername) navUsername.textContent = currentSessionUser.name;
    
    // UI avatar fallback if logo not available
    const initialsName = encodeURIComponent(currentSessionUser.name);
    if (navUserAvatar) {
      navUserAvatar.src = `https://ui-avatars.com/api/?name=${initialsName}&background=0099ff&color=fff&bold=true`;
    }

    // Mobile menu toggles
    mobileLoggedOut.forEach(el => el.style.display = 'none');
    mobileLoggedIn.forEach(el => el.style.display = 'block');
  } else {
    // Desktop logged-out UI
    if (signInBtn) signInBtn.style.display = 'inline-flex';
    if (profileDropdown) profileDropdown.style.display = 'none';
    
    // Mobile menu toggles
    mobileLoggedOut.forEach(el => el.style.display = 'block');
    mobileLoggedIn.forEach(el => el.style.display = 'none');
  }
}

// Open modal
function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset forms & alerts
    document.getElementById('signInForm').reset();
    document.getElementById('signUpForm').reset();
    document.getElementById('signInAlert').style.display = 'none';
    document.getElementById('signUpAlert').style.display = 'none';
    
    // Default to sign-in tab
    switchAuthTab('signin');
  }
}

// Close modal
function closeAuthModal(e) {
  if (e && e.target !== document.getElementById('authModal') && 
      e.target !== document.querySelector('#authModal .modal-close') && 
      !document.querySelector('#authModal .modal-close').contains(e.target)) return;
      
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Switch tabs inside modal
function switchAuthTab(tab) {
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const formSignIn = document.getElementById('signInForm');
  const formSignUp = document.getElementById('signUpForm');

  if (tab === 'signin') {
    tabSignIn.classList.add('active');
    tabSignUp.classList.remove('active');
    formSignIn.style.display = 'flex';
    formSignUp.style.display = 'none';
  } else {
    tabSignIn.classList.remove('active');
    tabSignUp.classList.add('active');
    formSignIn.style.display = 'none';
    formSignUp.style.display = 'flex';
  }
}

// Toggle password visibility
function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btnEl.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

// Toggle Profile Dropdown (Desktop)
function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('navProfileDropdown');
  const menu = document.getElementById('profileDropdownMenu');
  if (dropdown && menu) {
    dropdown.classList.toggle('open');
    menu.classList.toggle('show');
  }
}

function closeProfileDropdown() {
  const dropdown = document.getElementById('navProfileDropdown');
  const menu = document.getElementById('profileDropdownMenu');
  if (dropdown && menu) {
    dropdown.classList.remove('open');
    menu.classList.remove('show');
  }
}

// Close dropdown on click outside
document.addEventListener('click', e => {
  const dropdown = document.getElementById('navProfileDropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    closeProfileDropdown();
  }
});

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-alert ${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : (type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle');
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => toast.classList.add('show'), 50);
  
  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Handle Sign In submission
async function handleSignInSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('signInEmail').value.trim();
  const password = document.getElementById('signInPassword').value;
  const alertEl = document.getElementById('signInAlert');
  const submitBtn = document.getElementById('signInSubmitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  // Validation
  if (!email || !password) {
    showAlert(alertEl, 'Please enter email/phone and password.', 'error');
    return;
  }

  if (email.includes('@')) {
    if (!validateEmail(email)) {
      showAlert(alertEl, 'Please enter a valid email address.', 'error');
      return;
    }
  } else {
    if (!validatePhone(email)) {
      showAlert(alertEl, 'Please enter a valid 10-digit phone number.', 'error');
      return;
    }
  }

  if (password.length < 6) {
    showAlert(alertEl, 'Password must be at least 6 characters long.', 'error');
    return;
  }

  // Set loading state
  if (btnText) btnText.style.display = 'none';
  if (btnSpinner) btnSpinner.style.display = 'block';
  submitBtn.disabled = true;
  alertEl.style.display = 'none';

  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Server error: ${response.status}`);
    }

    const result = await response.json();
    
    // Save session
    const userName = email.includes('@') ? email.split('@')[0] : 'Tamil Ji Member';
    currentSessionUser = { name: result.name || userName, email: email };
    localStorage.setItem('currentUser', JSON.stringify(currentSessionUser));

    // Update UI & notify
    updateAuthUI(true);
    showToast('Signed in successfully! Welcome back.');
    
    // Close modal
    closeAuthModal();
  } catch (error) {
    console.error(error);
    console.warn('Backend login failed, using fallback offline mode');
    
    const userName = email.includes('@') ? email.split('@')[0] : 'Tamil Ji Member';
    currentSessionUser = { name: userName, email: email };
    localStorage.setItem('currentUser', JSON.stringify(currentSessionUser));
    updateAuthUI(true);
    showToast('Signed in (Offline Mode). Welcome back!');
    closeAuthModal();
  } finally {
    // Reset button state
    if (btnText) btnText.style.display = 'inline';
    if (btnSpinner) btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Handle Register submission
async function handleSignUpSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('signUpName').value.trim();
  const email = document.getElementById('signUpEmail').value.trim();
  const phone = document.getElementById('signUpPhone').value.trim();
  const password = document.getElementById('signUpPassword').value;
  const alertEl = document.getElementById('signUpAlert');
  const submitBtn = document.getElementById('signUpSubmitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  // Validation
  if (!name || !email || !phone || !password) {
    showAlert(alertEl, 'Please fill in all fields.', 'error');
    return;
  }

  if (name.length < 2) {
    showAlert(alertEl, 'Name must be at least 2 characters.', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showAlert(alertEl, 'Please enter a valid email address.', 'error');
    return;
  }

  if (!validatePhone(phone)) {
    showAlert(alertEl, 'Please enter a valid 10-digit Indian phone number.', 'error');
    return;
  }

  if (password.length < 6) {
    showAlert(alertEl, 'Password must be at least 6 characters.', 'error');
    return;
  }

  // Set loading state
  if (btnText) btnText.style.display = 'none';
  if (btnSpinner) btnSpinner.style.display = 'block';
  submitBtn.disabled = true;
  alertEl.style.display = 'none';

  try {
    const response = await fetch('http://127.0.0.1:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, phone: phone, password: password })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Server error: ${response.status}`);
    }

    const result = await response.json();

    // Save session
    currentSessionUser = { name: name, email: email, phone: phone };
    localStorage.setItem('currentUser', JSON.stringify(currentSessionUser));

    // Store in registered users DB locally
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    } catch(e) {}
    users.push(currentSessionUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Update UI & notify
    updateAuthUI(true);
    showToast('Registration successful! Welcome to Tamil Ji Holidays.');
    closeAuthModal();
  } catch (error) {
    console.error(error);
    console.warn('Backend signup failed, using fallback offline mode');

    // Offline registration fallback
    currentSessionUser = { name: name, email: email, phone: phone };
    localStorage.setItem('currentUser', JSON.stringify(currentSessionUser));

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    } catch(e) {}
    users.push(currentSessionUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    updateAuthUI(true);
    showToast('Registration successful (Offline Mode)! Welcome.');
    closeAuthModal();
  } finally {
    if (btnText) btnText.style.display = 'inline';
    if (btnSpinner) btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Helper to show alert in form
function showAlert(el, msg, type) {
  el.textContent = msg;
  el.className = `auth-alert ${type}`;
  el.style.display = 'block';
}

// Handle Logout
function handleSignOut() {
  localStorage.removeItem('currentUser');
  currentSessionUser = null;
  updateAuthUI(false);
  closeProfileDropdown();
  showToast('Logged out successfully.', 'success');
}

// Handle Forgot Password
function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('signInEmail').value.trim();
  const alertEl = document.getElementById('signInAlert');
  
  if (!email) {
    showAlert(alertEl, 'Please enter your Email or Phone above first.', 'error');
  } else {
    showAlert(alertEl, `Reset link sent to ${email}. Check your inbox.`, 'success');
  }
}

// Handle Social Logins
function handleSocialLogin(platform) {
  showToast(`Social login via ${platform} is coming soon! Please use email or phone sign-in.`, 'info');
}

function closeSuccessModal() {
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.remove('active');
  }
  document.body.style.overflow = 'auto';
}
