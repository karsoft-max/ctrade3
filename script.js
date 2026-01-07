async function fetchCryptoPrices() {
            try {
                let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
                let data = await response.json();

                let cryptoHTML = '';
                data.slice(0, 10).forEach(coin => {
                    let priceChange = coin.price_change_percentage_24h.toFixed(2);
                    let priceClass = priceChange >= 0 ? 'green' : 'red';

                    cryptoHTML += `
                        <div class="crypto-card">
                            <img src="${coin.image}" alt="${coin.name}">
                            <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
                            <p> <i class="fa-solid fa-dollar-sign"></i> ${coin.current_price.toFixed(2)}</p>
                            <p class="${priceClass}">📈 ${priceChange}%</p>
                        </div>
                    `;
                });

                document.getElementById("cryptoList").innerHTML = cryptoHTML;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        //step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

        fetchCryptoPrices();
        setInterval(fetchCryptoPrices, 30000); // Refresh every 30 seconds

const animateNumbers = () => {
    const stats = document.querySelectorAll('.statsh1[data-target]');
    const speed = 2000; // Duration in milliseconds

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const endValue = parseInt(targetEl.getAttribute('data-target'));
                const originalText = targetEl.textContent;
                const numberPattern = /\d+/; // Regex to find the number part
                let startTime = null;

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / speed, 1);
                    const currentValue = Math.floor(progress * endValue);
                    
                    // Replace only the number part in the H1 with the current count
                    targetEl.textContent = originalText.replace(numberPattern, currentValue);

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(targetEl); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 }); // Triggers when 50% of the element is visible

    stats.forEach(stat => observer.observe(stat));
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', animateNumbers);  
