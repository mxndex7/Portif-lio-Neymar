
document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 100);
    updateActiveMenuOnScroll();
  });

  function updateActiveMenuOnScroll() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  const ctx = document.getElementById('goalsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Gols',
        data: [14, 42, 43, 43, 29, 39, 31, 31, 28, 23, 13, 19, 13, 15],
        backgroundColor: '#379e00',
        borderColor: '#379e00',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#fff' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#ddd' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: '#ddd' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });

  const galleryLightbox = document.querySelector('.gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeLightbox = document.querySelector('.close-lightbox');
  const galleryTabs = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  function openLightbox(img, caption) {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    galleryLightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption').textContent;
    item.addEventListener('click', () => openLightbox(img, caption));
  });

  closeLightbox.addEventListener('click', () => {
    galleryLightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  galleryLightbox.addEventListener('click', function(e) {
    if (e.target === galleryLightbox) {
      galleryLightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      galleryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      galleryItems.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

  const trophiesContainer = document.querySelector('.trophies-container');
  
  const trophies = [
    {
      name: 'Champions League',
      icon: 'fas fa-trophy',
      year: '2015',
      description: 'Conquistada pelo FC Barcelona, formando o trio MSN com Messi e Suárez.'
    },
    {
      name: 'Copa Libertadores',
      icon: 'fas fa-award',
      year: '2011',
      description: 'Principal título continental com o Santos, sendo o grande destaque da equipe.'
    },
    {
      name: 'Campeonato Espanhol',
      icon: 'fas fa-medal',
      year: '2015, 2016',
      description: 'Dois títulos da La Liga pelo FC Barcelona com atuações memoráveis.'
    },
    {
      name: 'Campeonato Francês',
      icon: 'fas fa-medal',
      year: '2018, 2019, 2020, 2022',
      description: 'Quatro títulos da Ligue 1 pelo Paris Saint-Germain como grande estrela do time.'
    },
    {
      name: 'Copa do Brasil',
      icon: 'fas fa-trophy',
      year: '2010',
      description: 'Conquistada com o Santos em início de ascensão na carreira.'
    },
    {
      name: 'Olimpíadas',
      icon: 'fas fa-medal',
      year: '2016',
      description: 'Medalha de ouro nos Jogos Olímpicos do Rio como capitão da seleção brasileira.'
    }
  ];

  function renderTrophies() {
    trophiesContainer.innerHTML = '';
    
    trophies.forEach(trophy => {
      const trophyCard = document.createElement('div');
      trophyCard.className = 'trophy-card';
      trophyCard.innerHTML = `
        <div class="trophy-icon"><i class="${trophy.icon}"></i></div>
        <h3 class="trophy-name">${trophy.name}</h3>
        <div class="trophy-year">${trophy.year}</div>
        <p class="trophy-description">${trophy.description}</p>
      `;
      
      trophiesContainer.appendChild(trophyCard);
    });
  }

  renderTrophies();

  const animatedElements = document.querySelectorAll('.timeline-item, .stats-box, .trophy-card');
  
  function checkScroll() {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }
    });
  }
  
  animatedElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});
