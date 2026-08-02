// Bump this whenever a mentor photo file is replaced in place (same filename,
// new content) so browsers don't keep serving a stale cached copy.
const MENTOR_PHOTO_VERSION = 3;

// ===== Pill Carousel content (edit this array to change the moving chips) =====
const PILL_TEXT = [
  'Foreign Bar License without Foreign Degree',
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
  {
    location: 'Punjab and Haryana',
    lines: [
      'High Court',
      'Criminal Law | White Collar Crime | Government Litigation | Constitutional & Writ Matters | Consumer Law | Public Interest Litigation | Commercial Disputes | RERA | Matrimonial Disputes',
    ],
    photo: 'assets/images/mentors/11.jpeg',
  },
  {
    location: 'Internships Mentor',
    lines: [
      'NLU alumnus with business law specialisation | Delhi High Court',
    ],
    photo: 'assets/images/mentors/12.jpeg',
  },
];

const CARDS_PER_VIEW = 5;

function renderMentorCard(mentor) {
  const descriptionMarkup = mentor.lines
    .map((line) => `<span class="mentor-bio-line">${line}</span>`)
    .join('');

  return `
    <article class="mentor-card">
      <img src="${mentor.photo}?v=${MENTOR_PHOTO_VERSION}" alt="" class="mentor-photo" />
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

  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  function update() {
    if (isMobile()) {
      // Mobile lets the viewport scroll natively instead of paging via transform.
      track.style.transform = '';
      return;
    }

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

// ===== Mobile hamburger menu =====
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPills();
  initGlobalNetworkCarousel();
  initMobileNav();
});
