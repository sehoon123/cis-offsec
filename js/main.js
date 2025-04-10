// 오류 처리를 위한 래퍼 함수
function safeExecute(fn, fnName) {
  try {
    fn();
  } catch (error) {
    console.error(`Error in ${fnName}:`, error);
  }
}

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  safeExecute(initMobileMenu, 'initMobileMenu');
  safeExecute(initNotificationBanner, 'initNotificationBanner');
  safeExecute(initTalentManagementTabs, 'initTalentManagementTabs');
  safeExecute(initRolesTabs, 'initRolesTabs');
  safeExecute(initScrollAnimations, 'initScrollAnimations');
  safeExecute(initDropdownMenu, 'initDropdownMenu');
  safeExecute(initFloatingActionButton, 'initFloatingActionButton');
  safeExecute(initExchangeRateInfo, 'initExchangeRateInfo');
  safeExecute(initSyllabusToggle, 'initSyllabusToggle'); // 실라버스 토글 기능 추가
  safeExecute(initMobileAccordion, 'initMobileAccordion'); // 모바일/태블릿 뷰 역할 섹션 아코디언 기능 초기화

  // FontAwesome이 로드되었는지 확인 후 실행
  if (window.FontAwesome || document.querySelector('link[href*="fontawesome"]') || document.querySelector('script[src*="fontawesome"]')) {
    safeExecute(initHexagonAnimation, 'initHexagonAnimation');
  }

  // FAQ 아코디언 기능
  const faqItems = document.querySelectorAll('.faq-item');
  const faqToggles = document.querySelectorAll('.faq-toggle');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // 현재 클릭한 아이템이 이미 열려있는지 확인
      const isOpen = item.classList.contains('active');
      
      // 이미 열려있으면 닫고, 닫혀있으면 열기 (토글 기능)
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
  
  // + 버튼에 대한 별도의 클릭 이벤트 처리
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // 버튼 클릭 시 상위 요소로 이벤트 전파 방지
      e.stopPropagation();
      
      const item = toggle.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      
      // 이미 열려있으면 닫고, 닫혀있으면 열기 (토글 기능)
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
});

/**
 * 모바일 메뉴 토글 기능 초기화
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-list');
  
  if (menuButton && navMenu) {
    // 햄버거 버튼 클릭 핸들러
    const toggleMenu = () => {
      navMenu.classList.toggle('active');
      menuButton.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      
      // 햄버거 아이콘 애니메이션
      const bars = menuButton.querySelectorAll('.bar');
      if (bars.length > 0) {
        if (menuButton.classList.contains('active')) {
          bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (bars[1]) bars[1].style.opacity = '0';
          if (bars[2]) bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          bars[0].style.transform = 'none';
          if (bars[1]) bars[1].style.opacity = '1';
          if (bars[2]) bars[2].style.transform = 'none';
        }
      }
    };

    // 이벤트 리스너 강제 등록
    menuButton.onclick = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleMenu();
    };

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#nav-list') && !e.target.closest('#mobile-menu-toggle')) {
        navMenu.classList.remove('active');
        menuButton.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // ESC 키 감지
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  }
}

/**
 * 드롭다운 메뉴 기능 초기화
 */
function initDropdownMenu() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation(); // 이벤트 버블링 방지
      
      // 다른 모든 드롭다운 닫기
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove('active');
        }
      });
      
      // 현재 드롭다운 토글
      this.classList.toggle('active');
    });
  });
  
  // 문서 클릭 시 모든 드롭다운 닫기
  document.addEventListener('click', function() {
    dropdownToggles.forEach(toggle => {
      toggle.classList.remove('active');
    });
  });
}

/**
 * Floating Action Button 기능 초기화
 */
function initFloatingActionButton() {
  const fab = document.querySelector('.floating-action-button');
  
  if (fab) {
    // 스크롤 이벤트에 따른 FAB 표시/숨김
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        fab.style.opacity = '1';
        fab.style.transform = 'scale(1)';
      } else {
        fab.style.opacity = '0.8';
        fab.style.transform = 'scale(0.9)';
      }
    });
    
    // 초기 상태 설정
    if (window.scrollY > 300) {
      fab.style.opacity = '1';
      fab.style.transform = 'scale(1)';
    } else {
      fab.style.opacity = '0.8';
      fab.style.transform = 'scale(0.9)';
    }
  }
}

/**
 * 알림 배너 닫기 기능 초기화
 */
function initNotificationBanner() {
  const bannerDismiss = document.querySelector('.banner-dismiss');
  const notificationBanner = document.querySelector('.notification-banner');

  if (bannerDismiss && notificationBanner) {
    bannerDismiss.addEventListener('click', function() {
      notificationBanner.style.height = notificationBanner.offsetHeight + 'px';
      setTimeout(function() {
        notificationBanner.style.height = '0';
        notificationBanner.style.opacity = '0';
        notificationBanner.style.padding = '0';
        notificationBanner.style.margin = '0';
        notificationBanner.style.overflow = 'hidden';
        setTimeout(function() {
          notificationBanner.style.display = 'none';
        }, 500);
      }, 10);
    });
  }
}

/**
 * 인재 관리 섹션 탭 기능 초기화
 */
function initTalentManagementTabs() {
  const talentSteps = document.querySelectorAll('.talent-step');
  const talentPanels = document.querySelectorAll('[data-tab-content]');

  if (!talentSteps.length || !talentPanels.length) {
    console.warn('Talent management steps or panels not found.');
    return;
  }

  talentSteps.forEach(step => {
    step.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Remove active classes with animation
      talentSteps.forEach(s => {
        s.classList.remove('active');
        s.style.transition = 'all var(--transition-normal)';
      });
      talentPanels.forEach(p => p.classList.remove('active'));
      
      // Add active classes with animation
      this.classList.add('active');
      const targetPanel = document.querySelector(`.talent-panel[data-tab-content="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.animation = 'fadeIn 0.5s ease forwards';
      }
    });
  });

  // Activate first tab by default
  talentSteps[0].click();
}

/**
 * 역할별 교육 섹션 탭 기능 초기화 (동적 카드 업데이트 포함)
 */
function initRolesTabs() {
  // 데스크톱 뷰 타일 호버 및 클릭 효과
  const desktopTiles = document.querySelectorAll('.desktop-roles .tile');
  
  if (desktopTiles.length) {
    desktopTiles.forEach(tile => {
      // 호버 효과는 CSS로 처리됨
      
      // 클릭 이벤트 (필요한 경우 추가 기능 구현)
      tile.addEventListener('click', function(e) {
        if (this.tagName.toLowerCase() !== 'a') {
          e.preventDefault(); // 버튼 클릭 시 기본 동작 방지
          
          // 여기에 타일 클릭 시 추가 기능 구현 가능
          // 예: 상세 정보 표시, 모달 열기 등
          
          // 현재는 간단한 시각적 피드백만 제공
          this.classList.add('active');
          setTimeout(() => {
            this.classList.remove('active');
          }, 200);
        }
      });
    });
  }
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
  // 스크롤 애니메이션을 적용할 요소들을 매번 최신 상태로 가져오기 위해 함수 내부에서 쿼리
  function handleScrollAnimation() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop <= window.innerHeight * 0.9) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // 초기 애니메이션 트리거
  handleScrollAnimation();

  window.addEventListener('scroll', handleScrollAnimation);
}

/**
 * 육각형 아이콘 애니메이션 초기화
 */
function initHexagonAnimation() {
  const hexagonGrid = document.querySelector('.hexagon-grid');

  if (!hexagonGrid) return;

  try {
    const icons = [
      { icon: 'fa-eye', color: '#8A2BE2' },
      { icon: 'fa-shield-alt', color: '#00CED1' },
      { icon: 'fa-code', color: '#FF1493' },
      { icon: 'fa-bug', color: '#FF8C00' },
      { icon: 'fa-server', color: '#4CAF50' }
    ];

    const isFontAwesomeLoaded = (
      typeof FontAwesome !== 'undefined' ||
      document.querySelector('link[href*="fontawesome"]') || document.querySelector('script[src*="fontawesome"]')
    );

    if (!isFontAwesomeLoaded) {
      const fallbackIcons = ['👁️', '🛡️', '💻', '🐞', '🖥️'];
      icons.forEach((item, index) => {
        const hexagon = document.createElement('div');
        hexagon.className = 'hexagon';
        hexagon.style.backgroundColor = item.color;
        hexagon.textContent = fallbackIcons[index] || '•';
        hexagonGrid.appendChild(hexagon);
      });
      return;
    }

    icons.forEach((item) => {
      const hexagon = document.createElement('div');
      hexagon.className = 'hexagon';
      hexagon.style.backgroundColor = item.color;
      const icon = document.createElement('i');
      icon.className = `fas ${item.icon}`;
      hexagon.appendChild(icon);
      hexagonGrid.appendChild(hexagon);
      requestAnimationFrame(() => {
        hexagon.classList.add('fade-in');
      });
    });
  } catch (error) {
    console.error('Error in hexagon animation:', error);
    hexagonGrid.innerHTML = '<div class="hexagon" style="background-color: #8A2BE2;">•</div>';
  }
}

/**
 * 환율 정보 업데이트 기능 초기화
 */
function initExchangeRateInfo() {
  const currentDateElement = document.getElementById('current-date');
  
  if (currentDateElement) {
    // 현재 날짜 포맷팅 (한국어)
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // 요일 배열 (한국어)
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[now.getDay()];
    
    // 날짜 표시
    currentDateElement.textContent = `${year}년 ${month}월 ${day}일 ${weekday}요일`;
    
    // 실시간 환율 정보 가져오기
    fetchExchangeRate();
  }
}

/**
 * 실시간 환율 정보 가져오기
 */
function fetchExchangeRate() {
  const currentRateElement = document.getElementById('current-rate');
  
  // 환율 API URL (예: ExchangeRate-API)
  const apiUrl = 'https://open.er-api.com/v6/latest/USD';
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('환율 정보를 가져오는데 실패했습니다');
      }
      return response.json();
    })
    .then(data => {
      // KRW 환율 가져오기
      const exchangeRate = data.rates.KRW;
      
      // 환율 정보 표시
      if (currentRateElement) {
        currentRateElement.textContent = `$1 = ${Math.round(exchangeRate).toLocaleString()}원`;
      }
      
      // 가격표 업데이트
      updatePriceTable(exchangeRate);
    })
    .catch(error => {
      console.error('환율 정보 가져오기 오류:', error);
      
      // API 호출 실패 시 기본값 사용
      const fallbackRate = 1756;
      if (currentRateElement) {
        currentRateElement.textContent = `$1 = ${fallbackRate.toLocaleString()}원`;
      }
      
      // 기본 환율로 가격표 업데이트
      updatePriceTable(fallbackRate);
    });
}

/**
 * 가격표 업데이트
 * @param {number} exchangeRate - 현재 환율 ($1당 원화)
 */
function updatePriceTable(exchangeRate) {
  // 과정 정보 (USD 가격)
  const courses = [
    { name: 'PEN-200 ($1749)', usdPrice: 1749, krwPrice: 2560000 },
    { name: 'Bootcamp ($2499)', usdPrice: 2499, krwPrice: 3590000 }
  ];
  
  const priceContainer = document.getElementById('price-comparison-container');
  if (priceContainer) {
    // 컨테이너 초기화
    priceContainer.innerHTML = '';
    
    // 각 과정별 카드 추가
    courses.forEach(course => {
      // USD 가격을 원화로 변환 (실시간 환율 기준)
      const convertedPrice = Math.round(course.usdPrice * exchangeRate);
      
      // 가격 차이 계산 (CIS 가격 - 변환된 OffSec 가격)
      const priceDifference = course.krwPrice - convertedPrice;
      const savingsPercentage = Math.round((priceDifference / convertedPrice) * 100);
      
      // 카드 요소 생성
      const card = document.createElement('div');
      card.className = 'course-price-card';
      
      // 카드 내용 설정
      card.innerHTML = `
        <div class="course-name">${course.name}</div>
        <div class="price-comparison">
          <div class="price-item offsec">
            <div class="price-label">
              <i class="fas fa-dollar-sign"></i>
              OffSec 직접 결제
            </div>
            <div class="price-value">${convertedPrice.toLocaleString()}원</div>
          </div>
          <div class="price-item cis">
            <div class="price-label">
              <i class="fas fa-won-sign"></i>
              CIS 결제
            </div>
            <div class="price-value">${course.krwPrice.toLocaleString()}원</div>
          </div>
        </div>
        ${priceDifference > 0 ? 
          `<div class="price-difference">
            <span class="difference-badge negative">
              <i class="fas fa-arrow-up"></i> ${Math.abs(savingsPercentage)}%
            </span>
          </div>` : 
          `<div class="price-difference">
            <span class="difference-badge positive">
              <i class="fas fa-arrow-down"></i> ${Math.abs(savingsPercentage)}%
            </span>
          </div>`
        }
      `;
      
      // 카드를 컨테이너에 추가
      priceContainer.appendChild(card);
    });
    
    // 애니메이션 효과 추가
    const cards = priceContainer.querySelectorAll('.course-price-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }
}

/**
 * 드롭다운 메뉴 콘텐츠 생성
 */
function createDropdownMenus() {
  try {
    const coursesDropdown = document.querySelector('.nav-item:nth-child(1) .dropdown-menu');
    if (coursesDropdown) {
      coursesDropdown.innerHTML = `
        <div class="dropdown-section">
          <h4>Popular Courses</h4>
          <ul>
            <li><a href="#">PEN-200: Penetration Testing with Kali Linux</a></li>
            <li><a href="#">SOC-200: Security Operations & Defensive Analysis</a></li>
            <li><a href="#">WEB-300: Advanced Web Attacks and Exploitation</a></li>
            <li><a href="#">EXP-301: Windows Exploitation Techniques</a></li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h4>Learning Paths</h4>
          <ul>
            <li><a href="#">Offensive Security</a></li>
            <li><a href="#">Defensive Security</a></li>
            <li><a href="#">Secure Development</a></li>
          </ul>
        </div>
      `;
    }

    const whyDropdown = document.querySelector('.nav-item:nth-child(2) .dropdown-menu');
    if (whyDropdown) {
      whyDropdown.innerHTML = `
        <div class="dropdown-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Values</a></li>
            <li><a href="#">Leadership Team</a></li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h4>Success Stories</h4>
          <ul>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error creating dropdown menus:', error);
  }
}

/**
 * 모바일/태블릿 뷰 역할 섹션 아코디언 기능 초기화
 */
function initMobileAccordion() {
  const mobileLevelButtons = document.querySelectorAll('.mobile-roles .level-button'); // .mobile-roles 안의 버튼만 선택

  if (mobileLevelButtons.length) {
    mobileLevelButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentItem = this.closest('.level-item');
        const parentTile = currentItem.closest('.tile'); // 상위 타일 찾기

        if (!currentItem || !parentTile) return; // 안전 확인

        const isOpen = currentItem.getAttribute('data-open') === 'true';

        // 같은 타일 내의 모든 레벨 아이템 찾기
        const allItemsInTile = parentTile.querySelectorAll('.level-item');

        // 1. 만약 클릭한 아이템이 이미 열려있었다면, 그냥 닫기만 함
        if (isOpen) {
          currentItem.setAttribute('data-open', 'false');
          this.setAttribute('aria-checked', 'false');
        } else {
          // 2. 클릭한 아이템이 닫혀있었다면,
          //    먼저 같은 타일 내의 다른 모든 아이템들을 닫음
          allItemsInTile.forEach(item => {
            item.setAttribute('data-open', 'false');
            const otherButton = item.querySelector('.level-button');
            if (otherButton) {
              otherButton.setAttribute('aria-checked', 'false');
            }
          });

          //    그런 다음 클릭된 아이템을 염
          currentItem.setAttribute('data-open', 'true');
          this.setAttribute('aria-checked', 'true');
        }
      });
    });
  }
}

/**
 * 실라버스 토글 기능 초기화
 */
function initSyllabusToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-syllabus');
  
  if (toggleBtns.length > 0) {
    // 초기 상태: 모든 콘텐츠 숨김
    document.querySelectorAll('.syllabus-item-content').forEach(content => {
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
    });
    
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 현재 상태 토글
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        const toggleIcon = this.querySelector('.toggle-icon i');
        
        // 콘텐츠 토글
        if (this.classList.contains('active')) {
          // 요소의 스크롤 높이 + 여분의 여백을 추가하여 잘림 방지
          const scrollHeight = content.scrollHeight;
          content.style.maxHeight = (scrollHeight + 50) + 'px'; // 여유 공간 추가
          content.style.padding = '15px 10px 20px';
          
          // 혹시 모를 내용 잘림 방지를 위해 약간의 시간 후 높이 재조정
          setTimeout(() => {
            const newScrollHeight = content.scrollHeight;
            if(newScrollHeight > scrollHeight) {
              content.style.maxHeight = (newScrollHeight + 50) + 'px';
            }
          }, 50);
        } else {
          content.style.maxHeight = '0';
          content.style.padding = '0 10px';
        }
      });
    });
  }
}

/**
 * 페이지 로드 시 추가 초기화 작업
 */
window.addEventListener('load', function() {
  safeExecute(createDropdownMenus, 'createDropdownMenus');

  // 로딩 인디케이터가 있다면 숨김 처리
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }

  // 강제로 스크롤 이벤트를 발생시켜 애니메이션 적용
  window.dispatchEvent(new Event('scroll'));
});
