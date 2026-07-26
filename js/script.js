// ===== Pill Carousel content (edit this array to change the moving chips) =====
const PILL_TEXT = [
  'Foreign Bar license with Foreign Law Degree',
  'Law Careers in India',
  'Guidance for Judiciary and other government exams',
  'Become an International Legal professional',
  'Litigation or Corporate Law',
  'Is Law really for me?',
];

function renderPills() {
  const track = document.getElementById('pill-track');
  const build = () =>
    PILL_TEXT.map((text) => `<span class="pill">${text}</span>`).join('');
  // duplicate content once for a seamless CSS-driven loop
  track.innerHTML = build() + build();
}

// ===== Global Network mentor data =====
const MENTORS = [
  {
    location: 'Italy, Europe',
    lines: [
      'LL.M (Transnational Crime and Justice)',
      'International Human Rights Lawyer | Researcher in Statelessness, Citizenship & Forced Migration',
    ],
    photo: 'assets/images/mentors/1.jpeg',
  },
  {
    location: 'Canada',
    lines: [
      'Barrister and Solicitor',
      'Practicing in Family Law, Civil Litigation and Administrative Law',
    ],
    photo: 'assets/images/mentors/2.jpeg',
  },
  {
    location: 'Dubai',
    lines: [
      'International civil/commercial accredited Mediator | Arbitration Associate | Negotiator| Dispute Resolution Specialist',
    ],
    photo: 'assets/images/mentors/3.jpeg',
  },
  {
    location: 'India',
    lines: [
      'Commercial Lawyer | Contract Negotiation | Arbitration | Regulatory Advisory | Legal Research Criminal Law',
    ],
    photo: 'assets/images/mentors/4.jpeg',
  },
  {
    location: 'California, USA',
    lines: [
      'California Bar licensed attorney | Insurance Defense specialist',
    ],
    photo: 'assets/images/mentors/5.jpeg',
  },
  {
    location: 'Wales, England',
    lines: [
      'Solicitor',
      'LLM and BALLB(Hons)',
    ],
    photo: 'assets/images/mentors/6.jpeg',
  },
  {
    location: 'Canada',
    lines: [
      'Solicitor and Barrister',
      'Commercial/Corporate Law | Residential Real estate law | Secured lending laws',
    ],
    photo: 'assets/images/mentors/7.jpeg',
  },
  {
    location: 'India',
    lines: [
      'High Court litigation | Service law Expert| Public Interest Litigation| Consumer law',
    ],
    photo: 'assets/images/mentors/8.jpeg',
  },
  {
    location: 'Dubai and UK',
    lines: [
      'Dispute Resolution | Legal Learning and Development | Business Development | International Mediator',
    ],
    photo: 'assets/images/mentors/9.jpeg',
  },
  {
    location: 'India',
    lines: [
      'Advocate',
      'Arbitration and Construction disputes',
    ],
    photo: 'assets/images/mentors/10.jpeg',
  },
];

const CARDS_PER_VIEW = 5;

function renderMentorCard(mentor) {
  const descriptionMarkup = mentor.lines
    .map((line) => `<span class="mentor-bio-line">${line}</span>`)
    .join('');

  return `
    <article class="mentor-card">
      <img src="${mentor.photo}" alt="" class="mentor-photo" />
      <div class="mentor-body">
        <span class="mentor-country">${mentor.location}</span>
        <p class="mentor-bio">${descriptionMarkup}</p>
      </div>
    </article>
  `;
}

function initGlobalNetworkCarousel() {
  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  track.innerHTML = MENTORS.map(renderMentorCard).join('');

  const pageCount = Math.ceil(MENTORS.length / CARDS_PER_VIEW);
  let currentPage = 0;

  dotsWrap.innerHTML = Array.from({ length: pageCount })
    .map((_, i) => `<button class="carousel-dot" data-page="${i}" aria-label="Go to page ${i + 1}"></button>`)
    .join('');
  const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

  function update() {
    const cardWidth = track.children[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = currentPage * CARDS_PER_VIEW * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pageCount - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage -= 1;
      update();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < pageCount - 1) {
      currentPage += 1;
      update();
    }
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentPage = Number(dot.dataset.page);
      update();
    });
  });

  window.addEventListener('resize', update);
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPills();
  initGlobalNetworkCarousel();
});
