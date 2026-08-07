// --- EASY CONFIGURATION ---
const CONFIG = {
    girlfriendName: 'jana', 
    yourName: 'Manik',
    anniversaryDate: '2025-7-17',
    musicLink: 'assets/music/bgmusic.mp3',

    galleryImages: [
        { src: 'assets/images/photo1.jpeg', caption: '' },
        { src: 'assets/images/photo2.jpeg', caption: '' },
        { src: 'assets/images/photo3.jpeg', caption: '' },
        { src: 'assets/images/photo4.jpeg', caption: '' },
        { src: 'assets/images/photo5.jpeg', caption: '' },
        { src: 'assets/images/photo6.jpeg', caption: '' }
    ],

    polaroids: [
        { src: 'assets/images/photo7.jpeg', note:'في قلبي مدينه كل سكانها انتي' },
        { src: 'assets/images/photo8.jpeg', note: 'الكل  مر  من جانبي الا انت مررت من خلالي' },
        { src: 'assets/images/photo9.jpeg', note: 'في عينيك وطني و في قلبك  سلامي' },
        { src: 'assets/images/photo10.jpeg', note: 'احببتك حتي صار اسمك نبضا في قلبي' },
        { src: 'assets/images/photo11.jpeg', note: 'يكفيني من الحب انك انت' }
    ],

    songs: [
        { title: 'daisy lady', artist: 'Tir na nog', albumArt: 'assets/icons/daisy lady.jpeg', spotifyLink: 'https://open.spotify.com/track/3E6G7WqsnOh6rWanwcSO7w?si=c4837c7dc6ec43fd', youtubeLink: 'https://youtu.be/CwABFfdoWtQ?si=BBubnvpk-NWOOLP8' },
        { title: 'i love her', artist: 'the beatles', albumArt: 'assets/icons/iloveher.jpeg', spotifyLink: 'https://open.spotify.com/track/65vdMBskhx3akkG9vQlSH1?si=8f45159a2117481c', youtubeLink: 'https://youtu.be/5tc0gLSSU1M?si=Fc6vFR6hcM27wF4m' },
        { title: 'the Perfect pair ', artist: 'beabadoobee', albumArt: 'assets/icons/bebado.jpeg', spotifyLink: 'https://open.spotify.com/track/41P6Tnd8KIHqON0QIydx6a?si=78fd8338965b4435', youtubeLink: 'https://youtu.be/HwtEBQiuX-c?si=MZvtF1ChCaNZM0Zq' }
    ],

    favoriteMemories: [
        { src: 'assets/images/ph1.jpeg', story: '', date: '' },
        { src: 'assets/images/ph2.jpeg', story: '', date: '' },
        { src: 'assets/images/ph3.jpeg', story: '', date: '' }
    ],

    countdownTitle: 'Countdown to Our Special Day',
    finalQuote: '"In a sea of people, my eyes will always search for you."',
    finalMessageReveal: 'I love you more than words can say Thank you for being mine and always sticking by my side i hope i can always make you happy my beautifull baby you mean so much to me i cant imagine a life without your pretty eyes and perfect smile love youuu babyyyyy.'
};

// --- CORE UTILITIES ---
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const state = {
    musicPlaying: false,
    darkMode: false,
    currentPage: 0,
    currentMemory: 0,
    galleryPopulated: false,
    polaroidsPopulated: false,
    songsPopulated: false,
    memoriesPopulated: false
};

// --- LAZY LOADING OBSERVER ---
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('fade-in');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, { rootMargin: '0px 0px 50px 0px' }); 

// --- AMBIENT ELEMENTS ---
function initParticles() {
    const container = $('#particle-container');
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 10 : 25; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerHTML = Math.random() < 0.3 ? '🌸' : '❤️'; 

        const size = Math.random() * (20 - 10) + 10 + 'px';
        particle.style.fontSize = size;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * -100 + 'vh';
        particle.style.opacity = Math.random();
        particle.style.animation = `float ${Math.random() * (10 - 5) + 5}s linear infinite`;
        particle.style.animationDelay = `-${Math.random() * 10}s`;

        container.appendChild(particle);
    }
}

// --- SITE CONTROLS & UTILS ---
function initControls() {
    $('#dark-mode-toggle').addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        document.body.classList.toggle('dark-mode');
        $('#dark-mode-toggle').innerHTML = state.darkMode ? '☀️' : '🌓';
        const modal = $('#photo-modal');
        if (modal.classList.contains('open')) modal.classList.toggle('dark-mode');
    });

    const music = $('#bg-music');
    music.src = CONFIG.musicLink;
    $('#music-toggle').addEventListener('click', toggleMusic);

    window.addEventListener('scroll', updateScrollProgress);

    const bttButton = $('#back-to-top');
    bttButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) bttButton.classList.add('show');
        else bttButton.classList.remove('show');
    });
}

function toggleMusic() {
    const music = $('#bg-music');
    const button = $('#music-toggle');
    if (state.musicPlaying) {
        music.pause();
        state.musicPlaying = false;
        button.innerHTML = '🔇';
    } else {
        music.play().catch(e => {
            console.log('Music autoplay blocked.');
            button.innerHTML = '🔇';
            return;
        });
        state.musicPlaying = true;
        button.innerHTML = '🔊';
    }
}

function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    $('#scroll-progress').style.width = percent + '%';
}

// --- HYBRID PRELOADER WITH TIME LOCK ---
function initLoading() {
    // Preload UI assets only
    let assetsToLoad = [
        'assets/images/my-envelope.jpeg',
        'assets/images/flower1.png',
        'assets/images/flower2.png',
        'assets/images/flower3.png',
        'assets/backgrounds/vintage-parchment.jpg',
        'assets/backgrounds/paper-texture.png',
        'assets/backgrounds/love-photo.jpg'
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;
    
    let minTimePassed = false;
    let assetsFinished = false;
    let isLoaded = false;

    function checkReadyToStart() {
        if (minTimePassed && assetsFinished && !isLoaded) {
            isLoaded = true;
            const loadingScreen = $('#loading-screen');
            const firstPage = $('#page-1');
            
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                loadingScreen.style.display = 'none'; 
                firstPage.classList.add('active', 'fade-in');
                firstPage.style.display = 'flex'; 
                state.currentPage = 1;
            }, 800); 
        }
    }

    // LOCK 1: Force loading screen to stay for 2.5s
    setTimeout(() => {
        minTimePassed = true;
        checkReadyToStart();
    }, 2500);

    // LOCK 2: Ensure images are loaded
    if (totalAssets === 0) {
        assetsFinished = true;
        checkReadyToStart();
    } else {
        assetsToLoad.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => { loadedCount++; if (loadedCount >= totalAssets) { assetsFinished = true; checkReadyToStart(); } };
            img.onerror = () => { loadedCount++; if (loadedCount >= totalAssets) { assetsFinished = true; checkReadyToStart(); } };
        });
    }

    // FAILSAFE: 6 seconds max
    setTimeout(() => {
        if (!isLoaded) {
            minTimePassed = true;
            assetsFinished = true;
            checkReadyToStart();
        }
    }, 6000);
}

// --- PAGE TRANSITIONS ---
window.navigateToPage = function(pageNumber, skipTransition = false) {
    if (skipTransition) {
        executePageSwap(pageNumber);
        return;
    }
    triggerPageTransitionPour();
    
    setTimeout(() => {
        executePageSwap(pageNumber);
    }, 1400); 
};

function executePageSwap(pageNumber) {
    const current = $(`#page-${state.currentPage}`);
    const next = $(`#page-${pageNumber}`);

    if (current && next) {
        current.classList.remove('active', 'fade-out');
        current.style.display = 'none'; 

        next.classList.add('active', 'fade-in');
        next.style.display = 'flex'; 
        state.currentPage = pageNumber;
        window.scrollTo(0, 0); 

        if (pageNumber === 3 && !state.galleryPopulated) populateGallery();
        if (pageNumber === 4 && !state.polaroidsPopulated) populatePolaroids();
        if (pageNumber === 5 && !state.songsPopulated) populateSongs();
        if (pageNumber === 6) initCountdown();
        if (pageNumber === 7 && !state.memoriesPopulated) populateMemories();
        if (pageNumber === 9) initFinalMessage();
    }
}

// --- PAGE 1: ENVELOPE ---
function initEnvelope() {
    const envelope = $('.envelope-container');
    let isOpening = false; 

    envelope.addEventListener('click', () => {
        if (isOpening) return; 
        isOpening = true; 
        
        if (!state.musicPlaying) toggleMusic(); 
        
        envelope.classList.add('opening');
        triggerEnvelopeEruption(); 
        
        setTimeout(() => navigateToPage(2, true), 3500); 
    });
}

function triggerEnvelopeEruption() {
    const container = document.createElement('div');
    container.classList.add('flower-container');
    document.body.appendChild(container);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth <= 768;

    const flowerCount = isMobile ? 450 : 600; 
    const flowerImages = ['assets/images/flower1.png', 'assets/images/flower2.png', 'assets/images/flower3.png'];

    for(let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('img');
        flower.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        flower.classList.add('eruption-flower');

        const tx = (Math.random() * (screenWidth + 400) - (screenWidth / 2 + 200)) + 'px';
        const targetYRaw = Math.random() * (screenHeight + 150);
        const ty = (targetYRaw - (screenHeight / 2)) + 'px';
        
        const delayFactor = 1 - (targetYRaw / screenHeight); 
        const delay = (Math.max(0, delayFactor * 1.5) + Math.random() * 0.2) + 's'; 

        const s = isMobile ? (Math.random() * 1.0 + 0.5) : (Math.random() * 1.0 + 0.5); 
        const r = (Math.random() * 720 - 360) + 'deg'; 
        const duration = (Math.random() * 0.6 + 0.5) + 's'; 

        flower.style.width = isMobile ? '100px' : '200px'; 
        
        flower.style.setProperty('--tx', tx);
        flower.style.setProperty('--ty', ty);
        flower.style.setProperty('--s', s);
        flower.style.setProperty('--r', r);
        flower.style.setProperty('--duration', duration);
        flower.style.setProperty('--delay', delay);

        container.appendChild(flower);
    }

    setTimeout(() => {
        container.classList.add('drop-away');
        setTimeout(() => { container.remove(); }, 3500);
    }, 3200); 
}

function triggerPageTransitionPour() {
    const container = document.createElement('div');
    container.classList.add('flower-container');
    document.body.appendChild(container);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth <= 768;

    const flowerCount = isMobile ? 450 : 600; 
    const flowerImages = ['assets/images/flower1.png', 'assets/images/flower2.png', 'assets/images/flower3.png'];

    for(let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('img');
        flower.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        flower.classList.add('transition-flower');

        const tx = (Math.random() * (screenWidth + 400) - 200) + 'px';
        const targetYRaw = Math.random() * (screenHeight + 150);
        const ty = targetYRaw + 250 + 'px';
        
        const delayFactor = 1 - (targetYRaw / screenHeight); 
        const delay = (Math.max(0, delayFactor * 1.0) + Math.random() * 0.15) + 's'; 

        const s = isMobile ? (Math.random() * 1.0 + 0.5) : (Math.random() * 1.0 + 0.5); 
        const r = (Math.random() * 720 - 360) + 'deg'; 
        const duration = (Math.random() * 0.5 + 0.4) + 's'; 

        flower.style.width = isMobile ? '100px' : '200px'; 
        
        flower.style.setProperty('--tx', tx);
        flower.style.setProperty('--ty', ty);
        flower.style.setProperty('--s', s);
        flower.style.setProperty('--r', r);
        flower.style.setProperty('--duration', duration);
        flower.style.setProperty('--delay', delay);

        container.appendChild(flower);
    }

    setTimeout(() => {
        container.classList.add('drop-away');
        setTimeout(() => { container.remove(); }, 3500);
    }, 1800); 
}

// --- PAGE 2: LOVE LETTER ---
function initLoveLetter() {
    const letter = $('.letter-paper');
    const dear = $('.dear-message');
    const body = $('.main-letter-body');

    setTimeout(() => {
        letter.style.opacity = 1;
        letter.classList.add('fade-in');
        
        typewriterEffect(dear, `Dear ${CONFIG.girlfriendName},`);
        setTimeout(() => typewriterEffect(body, `Thank you for being my safe place, my biggest smile, and my favorite person to spend every ordinary day with. You deserve to feel loved today and every day after.`), 1500);

    }, 800); 
}

function typewriterEffect(element, text) {
    element.innerHTML = '';
    let i = 0;
    const speed = 40; 

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// --- PAGE 3: FILM REEL GALLERY ---
function populateGallery() {
    const scroll = $('#film-scroll');
    
    CONFIG.galleryImages.forEach((img) => {
        const frame = document.createElement('div');
        frame.classList.add('film-frame');
        
        const image = document.createElement('img');
        image.setAttribute('data-src', img.src); 
        image.alt = img.caption;
        
        image.onerror = function() {
            this.style.display = 'none';
        };

        lazyLoadObserver.observe(image); 
        
        frame.appendChild(image);
        frame.addEventListener('click', () => openPhotoModal(img));
        scroll.appendChild(frame);
    });

    state.galleryPopulated = true;
}

function openPhotoModal(imgData) {
    const modal = $('#photo-modal');
    const modalImg = $('#modal-img');
    const modalCaption = $('#modal-caption');

    modalImg.src = imgData.src;
    modalCaption.innerHTML = imgData.caption;
    modal.classList.add('open');
    if (state.darkMode) modal.classList.add('dark-mode');

    $('.close-modal').addEventListener('click', closePhotoModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePhotoModal();
    });
}

function closePhotoModal() {
    $('#photo-modal').classList.remove('open');
}

// --- PAGE 4: POLAROID WALL ---
let highestZ = 10; 

function populatePolaroids() {
    const wall = $('#polaroid-wall');
    const wallRect = wall.getBoundingClientRect();
    
    CONFIG.polaroids.forEach((item, index) => {
        const polaroid = document.createElement('div');
        polaroid.classList.add('polaroid');
        
        const randomX = Math.random() * (wallRect.width - 200);
        const randomY = Math.random() * (wallRect.height - 240);
        const randomRotate = (Math.random() - 0.5) * 40; 
        
        polaroid.style.left = `${Math.max(20, randomX)}px`;
        polaroid.style.top = `${Math.max(20, randomY)}px`;
        polaroid.style.transform = `rotate(${randomRotate}deg)`;
        
        polaroid.innerHTML = `
            <div class="polaroid-inner">
                <div class="polaroid-front">
                    <img data-src="${item.src}" alt="Polaroid" onerror="this.style.display='none'">
                </div>
                <div class="polaroid-back">
                    ${item.note}
                </div>
            </div>
        `;
        
        const imgEl = polaroid.querySelector('img');
        lazyLoadObserver.observe(imgEl);

        wall.appendChild(polaroid);
        makeDraggableAndFlippable(polaroid);
    });

    state.polaroidsPopulated = true;
}

function makeDraggableAndFlippable(el) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let wasDragged = false;
    
    el.addEventListener('mousedown', dragStart);
    el.addEventListener('touchstart', dragStart, {passive: false});
    
    function dragStart(e) {
        if (e.target.closest('button')) return; 
        
        initialX = el.offsetLeft;
        initialY = el.offsetTop;
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        
        isDragging = true;
        wasDragged = false;
        
        highestZ++;
        el.style.zIndex = highestZ;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', drag, {passive: false});
        document.addEventListener('touchend', dragEnd);
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault(); 
        
        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        
        const diffX = currentX - startX;
        const diffY = currentY - startY;
        
        if (Math.abs(diffX) > 3 || Math.abs(diffY) > 3) {
            wasDragged = true;
        }
        
        el.style.left = `${initialX + diffX}px`;
        el.style.top = `${initialY + diffY}px`;
    }
    
    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        if (!wasDragged) {
            el.classList.toggle('flipped');
        }
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', dragEnd);
    }
}

// --- PAGE 5: SONGS ---
function populateSongs() {
    const grid = $('#songs-grid');
    CONFIG.songs.forEach(song => {
        const card = document.createElement('div');
        card.classList.add('song-card', 'hover-shadow');
        card.innerHTML = `
            <div class="vinyl-container">
                <div class="vinyl-disc"></div>
                <div class="vinyl-label"><img data-src="${song.albumArt}" alt="${song.title} Album Art" onerror="this.style.display='none'"></div>
            </div>
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
            <div class="song-links">
                <a href="${song.spotifyLink}" target="_blank" rel="noopener" class="btn btn-primary spotify-btn">Spotify</a>
                <a href="${song.youtubeLink}" target="_blank" rel="noopener" class="btn btn-primary youtube-btn">YouTube</a>
            </div>
        `;
        
        const imgEl = card.querySelector('img');
        lazyLoadObserver.observe(imgEl);

        grid.appendChild(card);
    });
    state.songsPopulated = true;
}

// --- PAGE 6: COUNTDOWN ---
function initCountdown() {
    $('#countdown-title').innerHTML = CONFIG.countdownTitle;
    setInterval(updateCountdown, 1000); 
    updateCountdown(); 
}

function updateCountdown() {
    const now = new Date().getTime();
    const anniversary = new Date(CONFIG.anniversaryDate).getTime();
    
    const differenceTogether = now - anniversary;
    const daysTogether = Math.floor(differenceTogether / (1000 * 60 * 60 * 24));
    $('#together-days').innerHTML = daysTogether > 0 ? daysTogether : 0;

    let nextAnniversary = new Date(CONFIG.anniversaryDate);
    const currentYear = new Date().getFullYear();
    nextAnniversary.setFullYear(currentYear);
    
    if (now > nextAnniversary.getTime()) {
        nextAnniversary.setFullYear(currentYear + 1);
    }
    
    const differenceCountdown = nextAnniversary.getTime() - now;

    if (differenceCountdown <= 0) {
        $('#days').innerHTML = '00';
        $('#hours').innerHTML = '00';
        $('#minutes').innerHTML = '00';
        $('#seconds').innerHTML = '00';
        return; 
    }

    const days = Math.floor(differenceCountdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceCountdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceCountdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceCountdown % (1000 * 60)) / 1000);

    $('#days').innerHTML = formatTime(days);
    $('#hours').innerHTML = formatTime(hours);
    $('#minutes').innerHTML = formatTime(minutes);
    $('#seconds').innerHTML = formatTime(seconds);
}

function formatTime(time) { return time < 10 ? `0${time}` : time; }

// --- PAGE 7: MEMORIES ---
function populateMemories() {
    const slider = $('#memories-slider');
    CONFIG.favoriteMemories.forEach(mem => {
        const card = document.createElement('div');
        card.classList.add('memory-card', 'hover-shadow');
        card.innerHTML = `
            <div class="memory-img-frame">
                <img class="memory-img" data-src="${mem.src}" alt="${mem.story}" onerror="this.style.display='none'">
            </div>
            <div class="memory-story">${mem.story}</div>
            <div class="memory-meta">
                <span class="heart-icon">❤️</span>
                <span class="memory-date">${mem.date}</span>
            </div>
        `;
        
        const imgEl = card.querySelector('img');
        lazyLoadObserver.observe(imgEl);

        slider.appendChild(card);
    });
    state.memoriesPopulated = true;
    updateSliderPosition();
}

function initSlider() {
    $('#slider-prev').addEventListener('click', () => {
        if (state.currentMemory > 0) {
            state.currentMemory--;
            updateSliderPosition();
        }
    });
    $('#slider-next').addEventListener('click', () => {
        if (state.currentMemory < CONFIG.favoriteMemories.length - 1) {
            state.currentMemory++;
            updateSliderPosition();
        }
    });

    const slider = $('#memories-slider');
    let startX, moveX;
    slider.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    slider.addEventListener('touchmove', (e) => moveX = e.touches[0].clientX);
    slider.addEventListener('touchend', () => {
        if (startX - moveX > 50 && state.currentMemory < CONFIG.favoriteMemories.length - 1) { 
            state.currentMemory++;
            updateSliderPosition();
        } else if (moveX - startX > 50 && state.currentMemory > 0) { 
            state.currentMemory--;
            updateSliderPosition();
        }
    });
}

function updateSliderPosition() {
    const slider = $('#memories-slider');
    slider.style.transform = `translateX(-${state.currentMemory * 100}%)`;
    $('#slider-prev').style.opacity = state.currentMemory === 0 ? '0.3' : '1';
    $('#slider-next').style.opacity = state.currentMemory === CONFIG.favoriteMemories.length - 1 ? '0.3' : '1';
}

// --- PAGE 8: FINAL MESSAGE ---
window.triggerFinalReveal = function() {
    const message = $('.final-message');
    const quote = $('.final-quote');
    const button = $('#final-reveal');

    button.style.pointerEvents = 'none';

    quote.classList.add('fade-out');
    button.classList.add('fade-out');
    
    const music = $('#bg-music');
    if (state.musicPlaying && music) {
        let volume = music.volume;
        const targetVolume = Math.min(1.0, volume + 0.2);
        const fade = setInterval(() => {
            if (volume < targetVolume) {
                volume += 0.05;
                music.volume = Math.min(1.0, volume);
            } else {
                clearInterval(fade);
            }
        }, 100);
    }

    setTimeout(() => {
        button.style.display = 'none';
        quote.style.display = 'none';
        
        message.classList.remove('hidden');
        message.classList.add('reveal');
        
        triggerConfetti('#page-9'); 
    }, 800); 
};

// Final Confetti Generator for the Button
function triggerConfetti(targetSelector) {
    const confettiCount = 50;
    const container = $(targetSelector) || document.body;
    for (let i = 0; i < confettiCount; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti');
        piece.style.position = 'absolute'; 
        piece.style.width = '10px'; 
        piece.style.height = '10px';
        piece.style.left = Math.random() * 100 + 'vw'; 
        piece.style.top = Math.random() * -10 + 'vh';
        piece.style.backgroundColor = Math.random() < 0.5 ? 'var(--color-gold)' : 'var(--color-burgundy)';
        piece.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
        container.appendChild(piece);
        
        setTimeout(() => piece.remove(), 5000); 
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initControls();
    initLoading(); 
    initEnvelope();
    initLoveLetter();
    initSlider();
});
