// Epic 10-Stage Animation Engine for Mambo App Screenshots

const phone = document.getElementById('phone');
const dynamicBg = document.getElementById('dynamicBg');
const slidingPosters = document.getElementById('slidingPosters');
const floatingModals = document.getElementById('floatingModals');
const appMain = document.querySelector('.app-main');

const totalSections = 10;
const sections = [];
const images = [];

// Mobile Tracker
let isMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => isMobile = window.innerWidth <= 768);

for (let i = 1; i <= totalSections; i++) {
  sections.push(document.getElementById(`sec-${i}`));
  images.push(document.getElementById(`img-${i}`));
}

// Global target state for smooth interpolation
let currentRotX = 0; let currentRotY = 0; let currentRotZ = 0; let currentScale = 1;
let targetRotX = 0;  let targetRotY = 0;  let targetRotZ = 0;  let targetScale = 1;

// Color palette mapping based on 10 modes, scaled for profound depth (Liquid Glass)
const colors = [
  { r: 10,  g: 5,   b: 20 },  // 0: Auth (Dark Cinematic)
  { r: 40,  g: 15,  b: 80 },  // 1: Movie (Deep Violet)
  { r: 10,  g: 40,  b: 80 },  // 2: Series (Deep Blue)
  { r: 60,  g: 30,  b: 10 },  // 3: Anime (Deep Orange)
  { r: 10,  g: 60,  b: 50 },  // 4: Discover (Deep Teal)
  { r: 10,  g: 40,  b: 80 },  // 5: Search/Explore (Deep Blue)
  { r: 60,  g: 15,  b: 15 },  // 6: Reviews (Deep Crimson/Red)
  { r: 40,  g: 15,  b: 80 },  // 7: Messages (Deep Violet)
  { r: 60,  g: 30,  b: 10 },  // 8: Profile (Deep Orange)
  { r: 0,   g: 0,   b: 0 }    // 9: CTA (Pitch Black)
];

function lerpColor(c1, c2, factor) {
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updatePhoneTransformAndBg(progress) {
  const sectionSize = 1 / totalSections;
  
  const safeIndex = Math.min(Math.floor(progress / sectionSize), totalSections - 1);
  const localProgress = (progress - (safeIndex * sectionSize)) / sectionSize;

  // Background interpolation overlay between safeIndex and safeIndex+1 (clamped)
  const c1 = colors[safeIndex];
  const c2 = colors[Math.min(safeIndex + 1, colors.length - 1)];
  const bgColor = lerpColor(c1, c2, localProgress);
  dynamicBg.style.setProperty('--bg-grad', bgColor);

  // Activate Text
  sections.forEach((sec, i) => {
    if (sec) {
      if (i === safeIndex) sec.classList.add('active');
      else sec.classList.remove('active');
    }
  });

  // Toggle Parallax Background Ranges
  // Show sliding posters ONLY on Stage 6 (index 5)
  if (safeIndex === 5) slidingPosters.classList.add('active');
  else slidingPosters.classList.remove('active');

  // Show review floaters ONLY on Stage 7 (index 6)
  if (safeIndex === 6) floatingModals.classList.add('active');
  else floatingModals.classList.remove('active');

  // Hide phone temporarily on the CTA Section
  if (safeIndex === 9) phone.parentElement.style.opacity = '0.1';
  else phone.parentElement.style.opacity = '1';

  // Define Keyframes per state mapping
  switch(safeIndex) {
    case 0: // Auth
      targetRotX = 0; targetRotY = 0; targetRotZ = 0; targetScale = 1.0;
      activateImage(0);
      break;
    case 1: // Hero Movies
      targetRotX = 15; targetRotY = 25 - (localProgress * 10); targetRotZ = -5; targetScale = 1;
      activateImage(1);
      break;
    case 2: // Series
      targetRotX = 5; targetRotY = -20 - (localProgress * 10); targetRotZ = 5; targetScale = 1;
      activateImage(2);
      break;
    case 3: // Anime
      targetRotX = 10; targetRotY = 20 - (localProgress * 5); targetRotZ = -2; targetScale = 1;
      activateImage(3);
      break;
    case 4: // Discover
      targetRotX = -5; targetRotY = 0; targetRotZ = 0; targetScale = 1.05;
      activateImage(4);
      break;
    case 5: // Explore/Search
      targetRotX = 5; targetRotY = -15; targetRotZ = 2; targetScale = 1.05;
      activateImage(5);
      break;
    case 6: // Reviews & Discussions
      targetRotX = 5; targetRotY = 20; targetRotZ = -4; targetScale = 1.0;
      activateImage(6);
      break;
    case 7: // Messages
      targetRotX = -5; targetRotY = -15; targetRotZ = 3; targetScale = 1.0;
      activateImage(7);
      break;
    case 8: // Profile
      targetRotX = 0; targetRotY = -10; targetRotZ = 0; targetScale = 1.1;
      activateImage(8);
      break;
    case 9: // CTA (Flatten it out)
      targetRotX = 0; targetRotY = 0; targetRotZ = 0; targetScale = 0.9;
      activateImage(9); 
      break;
  }
}

function activateImage(index) {
  images.forEach((img, i) => {
    if (img) {
      if (i === index) img.classList.add('active');
      else img.classList.remove('active');
    }
  });
}

function animate() {
  const scrollY = window.scrollY;
  // Use appMain's height to calculate progress to trigger perfectly before the absolute footer
  const maxScroll = Math.max(1, appMain.scrollHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
  
  updatePhoneTransformAndBg(progress);
  
  // NATIVE 3D STACK SCROLL (NATIVE MOBILE CSS PARALLAX)
  if (isMobile) {
    // 3D physics removed as requested for smoother native feel
  }
  
  currentRotX = lerp(currentRotX, targetRotX, 0.08);
  currentRotY = lerp(currentRotY, targetRotY, 0.08);
  currentRotZ = lerp(currentRotZ, targetRotZ, 0.08);
  currentScale = lerp(currentScale, targetScale, 0.08);
  
  const displayScale = isMobile ? currentScale * 0.75 : currentScale;
  
  if (phone) {
    phone.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${currentRotZ}deg)`;
    phone.parentElement.style.top = isMobile ? '62%' : '50%';
    phone.parentElement.style.transform = `translate(-50%, -50%) scale(${displayScale})`;
  }
  
  requestAnimationFrame(animate);
}

animate();

// Handle global interactions (Mouse follow effect & Invite Reveal)
document.querySelectorAll('.invite-module').forEach(mod => {
  mod.addEventListener('click', function() {
    this.classList.add('revealed');
  });
});

// --- 3D Magnetic Tilt for Footer Creator Cards ---
document.querySelectorAll('.tilt-element').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    const rotateX = -yPct * 15;
    const rotateY = xPct * 15;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});
