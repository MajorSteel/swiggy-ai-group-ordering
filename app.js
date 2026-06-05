/**
 * Swiggy Reimagined — AI-Powered Smart Group Ordering
 * Main Application Logic (Integrated with design system)
 */

(function () {
  'use strict';

  /* ─── STATE ──────────────────────────────────────────────── */
  const state = {
    currentPage: 'home',
    selectedRestaurant: null,
    cart: [],
    groupOrder: {
      active: false,
      step: 0,
      members: [],
      aiMessages: [],
      currentMemberIndex: 0,
      consensus: null,
      selectedRecommendation: null,
      groupName: 'Friday Lunch Gang',
      budget: 350,
    },
    searchQuery: '',
    activeFilters: new Set(),
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ─── INIT ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    renderBanners();
    renderCategories();
    renderFilters();
    renderRestaurants();
    bindNavigation();
    bindSearch();
    bindFAB();
    addScrollEffects();
  });

  /* ═══════════════════════════════════════════════════════════
     HOME PAGE RENDERS
     ═══════════════════════════════════════════════════════════ */

  function renderBanners() {
    const container = $('#bannersScroll');
    if (!container || !window.AppData) return;
    container.innerHTML = window.AppData.promotionalBanners.map(b => `
      <div class="banner-card" style="background:${b.bgColor}">
        <div class="banner-content">
          <span class="banner-icon">${b.icon}</span>
          <div class="banner-text">
            <h3>${b.title}</h3>
            <p>${b.subtitle}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderCategories() {
    const container = $('#categoryCarousel');
    if (!container || !window.AppData) return;
    container.innerHTML = window.AppData.categories.map(c => `
      <div class="category-item" data-category="${c.name}">
        <div class="category-item__icon">${c.image}</div>
        <span class="category-item__label">${c.name}</span>
      </div>
    `).join('');
    container.addEventListener('click', e => {
      const item = e.target.closest('.category-item');
      if (item) filterByCategory(item.dataset.category);
    });
  }

  function renderFilters() {
    const container = $('#filterChips');
    if (!container || !window.AppData) return;
    container.innerHTML = window.AppData.filters.map(f => `
      <button class="filter-chip" data-filter="${f.id}">
        ${f.icon ? `<span class="filter-chip__icon">${f.icon}</span>` : ''}
        ${f.label}
      </button>
    `).join('');
    container.addEventListener('click', e => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      chip.classList.toggle('filter-chip--active');
      toggleFilter(chip.dataset.filter);
    });
  }

  function renderRestaurants(list) {
    const container = $('#restaurantGrid');
    if (!container || !window.AppData) return;
    const restaurants = list || window.AppData.restaurants;
    container.innerHTML = restaurants.map((r, i) => `
      <div class="restaurant-card animate-fadeInUp delay-${Math.min(i + 1, 6)}" data-id="${r.id}">
        <div class="restaurant-card__image">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px; background:linear-gradient(135deg,${grad(r.cuisines[0])})">
            <span>${emoji(r.cuisines[0])}</span>
          </div>
          ${r.promoted ? '<span class="restaurant-card__promoted">Ad</span>' : ''}
          ${r.discount ? `<div class="restaurant-card__discount">${r.discount}<span>Offers active</span></div>` : ''}
        </div>
        <div class="restaurant-card__details">
          <h3 class="restaurant-card__name">${r.name}</h3>
          <div class="restaurant-card__rating">
            <span class="material-icons star" style="font-size: 10px; margin-right: 2px;">star</span>${r.rating}
          </div>
          <div class="restaurant-card__cuisines">${r.cuisines.join(', ')}</div>
          <div class="restaurant-card__meta">
            <span>₹${r.priceForTwo} for two</span>
            <span class="dot"></span>
            <span>${r.deliveryTime}</span>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.restaurant-card').forEach(card => {
      card.addEventListener('click', () => openRestaurant(card.dataset.id));
    });
  }

  /* ═══════════════════════════════════════════════════════════
     RESTAURANT DETAIL
     ═══════════════════════════════════════════════════════════ */
  function openRestaurant(id) {
    const restaurant = window.AppData.restaurants.find(r => r.id === id);
    if (!restaurant) return;
    state.selectedRestaurant = restaurant;

    $('#restaurantDetail').innerHTML = `
      <div class="restaurant-hero">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 72px; background:linear-gradient(135deg,${grad(restaurant.cuisines[0])})">
          <span>${emoji(restaurant.cuisines[0])}</span>
        </div>
        <div class="restaurant-hero__overlay"></div>
        <button class="restaurant-hero__back" id="restBackBtn"><span class="material-icons-round">arrow_back</span></button>
      </div>
      <div class="restaurant-info">
        <h1 class="restaurant-info__name">${restaurant.name}</h1>
        <p class="restaurant-info__cuisines">${restaurant.cuisines.join(' • ')}</p>
        <div class="restaurant-info__row">
          <div class="restaurant-info__stat">
            <span class="material-icons star icon" style="color: var(--color-rating-bg)">star</span>
            <span>${restaurant.rating} (${restaurant.ratingCount})</span>
          </div>
          <div class="restaurant-info__stat">
            <span class="material-icons icon">schedule</span>
            <span>${restaurant.deliveryTime}</span>
          </div>
          <div class="restaurant-info__stat">
            <span class="material-icons icon">payments</span>
            <span>₹${restaurant.priceForTwo} for two</span>
          </div>
        </div>
        ${restaurant.discount ? `<div class="offer-tag" style="margin-top: 12px"><span class="material-icons offer-tag__icon">local_offer</span> <span>${restaurant.discount}</span></div>` : ''}
      </div>

      <div class="menu-section">
        <div class="menu-search-bar" style="margin: 12px 0;">
          <span class="material-icons-round">search</span>
          <input type="text" placeholder="Search within menu" id="menuSearchInput">
        </div>
        ${restaurant.menu.map(cat => `
          <div class="menu-section__header menu-section__header--open">
            <h3 class="menu-section__title">${cat.category}</h3>
            <span class="menu-section__count">${cat.items.length} items</span>
          </div>
          <div class="menu-items-list" style="margin-bottom: 24px;">
            ${cat.items.map(item => `
              <div class="menu-item">
                <div class="menu-item__info">
                  <span class="${item.veg ? 'veg-indicator' : 'nonveg-indicator'}"></span>
                  <h4 class="menu-item__name">${item.name}</h4>
                  ${item.bestseller ? '<span class="bestseller-tag" style="font-size: 10px; background: #FFF0E6; color: #FC8019; padding: 2px 6px; border-radius: 4px; font-weight: 600; display: inline-block; margin-bottom: 4px;">★ Bestseller</span>' : ''}
                  <div class="menu-item__price">₹${item.price}</div>
                  <p class="menu-item__desc">${item.description}</p>
                </div>
                <div class="menu-item__image-wrap">
                  <div class="menu-item__image" style="width: 100%; height: 100%; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 36px; background:linear-gradient(135deg,${grad(restaurant.cuisines[0])})">
                    <span>${itemEmoji(item.name)}</span>
                  </div>
                  <button class="menu-item__add-btn add-btn" data-item-id="${item.id}" data-rest-id="${restaurant.id}">ADD</button>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="menu-divider"></div>
        `).join('')}
      </div>
    `;

    $('#restBackBtn').addEventListener('click', () => navigateTo('home'));
    $$('.add-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        addToCart(btn.dataset.restId, btn.dataset.itemId);
        btn.innerHTML = '✓';
        btn.classList.add('added');
        setTimeout(() => { btn.innerHTML = 'ADD'; btn.classList.remove('added'); }, 1200);
      });
    });
    navigateTo('restaurant');
  }

  /* ═══════════════════════════════════════════════════════════
     CART
     ═══════════════════════════════════════════════════════════ */
  function addToCart(restId, itemId) {
    const rest = window.AppData.restaurants.find(r => r.id === restId);
    if (!rest) return;
    let item = null;
    for (const c of rest.menu) { item = c.items.find(i => i.id === itemId); if (item) break; }
    if (!item) return;
    const ex = state.cart.find(c => c.itemId === itemId);
    if (ex) { ex.qty++; } else { state.cart.push({ restId, restName: rest.name, itemId, name: item.name, price: item.price, veg: item.veg, qty: 1 }); }
    updateCartBar();
    showToast(`${item.name} added to cart! 🛒`);
  }

  function updateCartBar() {
    const bar = $('#cartBar');
    const n = state.cart.reduce((s, c) => s + c.qty, 0);
    const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
    if (n > 0) {
      bar.style.display = 'flex';
      requestAnimationFrame(() => bar.classList.add('visible'));
      $('#cartCount').textContent = `${n} item${n > 1 ? 's' : ''}`;
      $('#cartTotal').textContent = `₹${total}`;
    } else {
      bar.classList.remove('visible');
      setTimeout(() => bar.style.display = 'none', 300);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     GROUP ORDER FLOW
     ═══════════════════════════════════════════════════════════ */
  function bindFAB() {
    $('#groupOrderFAB')?.addEventListener('click', startGroupOrder);
  }

  function startGroupOrder() {
    state.groupOrder = { active: true, step: 0, members: [], aiMessages: [], currentMemberIndex: 0, consensus: null, selectedRecommendation: null, groupName: 'Friday Lunch Gang', budget: 350 };
    renderGroupOrderStep();
    navigateTo('groupOrder');
  }

  function renderGroupOrderStep() {
    const c = $('#groupOrderContainer');
    if (!c) return;
    const s = state.groupOrder.step;
    const labels = ['Create', 'Members', 'Chat', 'Consensus', 'Order'];

    let html = `
      <div class="go-header">
        <button class="back-btn" id="goBackBtn" style="color: var(--text-primary);"><span class="material-icons-round">arrow_back</span></button>
        <h2>AI Group Order</h2>
        <div class="ai-badge"><span class="material-icons-round" style="font-size: 12px;">auto_awesome</span> AI</div>
      </div>
      <div class="step-progress">
        ${labels.map((l, i) => `
          <div class="step-progress__step ${i < s ? 'step-progress__step--done' : ''} ${i === s ? 'step-progress__step--active' : ''}">
            <div class="step-progress__circle">${i < s ? '✓' : i + 1}</div>
            <span class="step-progress__label">${l}</span>
          </div>
          ${i < labels.length - 1 ? `<div class="step-progress__line ${i < s ? 'step-progress__line--done' : i === s ? 'step-progress__line--active' : ''}"></div>` : ''}
        `).join('')}
      </div>`;

    switch (s) {
      case 0: html += stepCreate(); break;
      case 1: html += stepMembers(); break;
      case 2: html += stepChat(); break;
      case 3: html += stepConsensus(); break;
      case 4: html += stepFinalOrder(); break;
    }
    c.innerHTML = html;
    bindStepEvents();
  }

  /* ── Step 0: Create Group ──────────────────────────────── */
  function stepCreate() {
    return `
    <div class="go-step fade-in">
      <div class="go-card">
        <div class="go-card-icon"><span class="material-icons-round">groups</span></div>
        <h3>Start a Group Order</h3>
        <p class="go-card-desc">Let our AI help everyone decide what to eat. No more endless debates!</p>
        <div class="go-form">
          <div class="input-group">
            <label>Group Name</label>
            <input type="text" id="groupName" value="${state.groupOrder.groupName}" placeholder="e.g., Lunch with friends">
          </div>
          <div class="input-group">
            <label>Per Person Budget</label>
            <div class="budget-row">
              <input type="range" id="groupBudget" min="100" max="800" value="${state.groupOrder.budget}" step="50">
              <span class="budget-val" id="budgetVal">₹${state.groupOrder.budget}</span>
            </div>
          </div>
        </div>
        <button class="btn btn--primary btn--lg btn--block" id="createGroupBtn"><span class="material-icons-round">bolt</span> Create Group</button>
      </div>
    </div>`;
  }

  /* ── Step 1: Add Members ───────────────────────────────── */
  function stepMembers() {
    const m = window.AppData.groupMembers;
    return `
    <div class="go-step fade-in">
      <div class="ai-msg-bubble">
        <span class="ai-avatar">🤖</span>
        <div class="ai-bubble">
          <p>Great! Your group "<strong>${state.groupOrder.groupName}</strong>" is created! I've loaded demo members for you.</p>
        </div>
      </div>
      <div class="group-members" style="padding: 0;">
        ${m.map((mb, i) => `
          <div class="group-member" data-mid="${mb.id}">
            <div class="group-member__avatar">${mb.avatar}</div>
            <div class="group-member__info">
              <h4 class="group-member__name">${mb.name}</h4>
              <p class="group-member__status">${mb.dietaryRestrictions.length ? mb.dietaryRestrictions.join(', ') : 'No restrictions'}</p>
            </div>
            <div class="group-member__status-dot group-member__status-dot--online" style="margin-left: auto;"></div>
            ${i === 0 ? '<span class="group-member__host-badge">Host</span>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="share-section" style="margin-top: 16px;">
        <p class="share-label">Or share invite link:</p>
        <div class="share-box">
          <span>swiggy.com/group/xK9mQ2</span>
          <button class="copy-btn" id="copyBtn"><span class="material-icons-round" style="font-size: 16px;">content_copy</span></button>
        </div>
      </div>
      <button class="btn btn--primary btn--lg btn--block" id="toPrefsBtn"><span class="material-icons-round">auto_awesome</span> Let AI Collect Preferences</button>
    </div>`;
  }

  /* ── Step 2: AI Chat ───────────────────────────────────── */
  function stepChat() {
    const members = window.AppData.groupMembers;
    const idx = state.groupOrder.currentMemberIndex;
    const cur = members[idx];
    const msgs = state.groupOrder.aiMessages;

    if (msgs.length === 0) {
      msgs.push({ from: 'ai', text: `Hey! I'm Swiggy's AI food assistant 🍕 I'll chat with each member to find the perfect meal. Let's start with **${cur.name}**!` });
      msgs.push({ from: 'ai', text: `Hi ${cur.name}! ${cur.avatar} What are you craving today? Describe your mood, cuisine preference, or specific dishes!` });
    }

    return `
    <div class="chat-step fade-in" style="display: flex; flex-direction: column;">
      <div class="member-tabs">
        ${members.map((m, i) => `
          <div class="member-tab ${i === idx ? 'active' : ''} ${i < idx ? 'done' : ''}">
            <span>${m.avatar}</span>
            <span class="tab-name">${m.name}</span>
            ${i < idx ? '<span class="material-icons-round tab-done">check_circle</span>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="chat-container">
        <div class="chat-messages" id="chatMessages">
          ${msgs.map(m => `
            <div class="chat-bubble ${m.from === 'ai' ? 'chat-bubble--ai' : 'chat-bubble--user'}">
              <div class="chat-bubble__sender">${m.from === 'ai' ? '🤖 Swiggy AI' : cur.name}</div>
              <div>${md(m.text)}</div>
            </div>
          `).join('')}
          <div class="typing-indicator" id="typingInd" style="display:none; align-self: flex-start; margin: 10px 0;">
            <div class="typing-indicator__dots">
              <span class="typing-indicator__dot"></span>
              <span class="typing-indicator__dot"></span>
              <span class="typing-indicator__dot"></span>
            </div>
            <span class="typing-indicator__label">Swiggy AI is typing...</span>
          </div>
        </div>
        
        <div class="chat-input-wrapper">
          <div class="chat-suggestions">
            ${quickReplies(cur).map(r => `<button class="chat-suggestion-chip qr-btn">${r}</button>`).join('')}
          </div>
          <div class="chat-input">
            <input type="text" class="chat-input__field" id="chatInput" placeholder="Tell me what you'd like to eat..." autocomplete="off">
            <button class="chat-input__send" id="sendBtn"><span class="material-icons-round">send</span></button>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ── Step 3: Consensus ─────────────────────────────────── */
  function stepConsensus() {
    if (!state.groupOrder.consensus && window.AIEngine) {
      state.groupOrder.consensus = window.AIEngine.findConsensus(window.AppData.groupMembers, window.AppData.restaurants);
    }
    const recs = state.groupOrder.consensus || [];
    return `
    <div class="go-step fade-in">
      <div class="consensus-header">
        <div class="consensus-header__badge"><span class="material-icons-round" style="font-size: 14px; margin-right: 4px;">auto_awesome</span> AI Consensus</div>
        <h2 class="consensus-header__title">Top Picks for Your Group</h2>
        <p class="consensus-header__subtitle">Based on cuisine, dietary restrictions, and budget</p>
      </div>
      <div class="consensus-container" style="padding: 0;">
        ${recs.map((rec, i) => `
          <div class="recommendation-card ${i === 0 ? 'recommendation-card--top-pick' : ''}" data-idx="${i}">
            <div class="recommendation-card__body">
              <div class="recommendation-card__restaurant">
                <div class="recommendation-card__restaurant-img" style="display: flex; align-items: center; justify-content: center; font-size: 32px; background:linear-gradient(135deg,${grad(rec.restaurant.cuisines[0])})">
                  <span>${emoji(rec.restaurant.cuisines[0])}</span>
                </div>
                <div>
                  <h3 class="recommendation-card__restaurant-name">${rec.restaurant.name}</h3>
                  <p class="recommendation-card__restaurant-meta">${rec.restaurant.cuisines.join(', ')} • Match score: ${rec.score}%</p>
                </div>
              </div>
              <div class="recommendation-card__reasoning">
                <div class="recommendation-card__reasoning-label">
                  <span class="material-icons-round" style="font-size: 14px;">auto_awesome</span> AI Reasoning
                </div>
                <p class="recommendation-card__reasoning-text">${rec.reasoning}</p>
              </div>
              <h4 style="font-size: 12px; margin-bottom: 8px; font-weight: 600; color: var(--text-secondary);">Member Satisfaction</h4>
              <div class="recommendation-card__scores" style="margin-bottom: 16px;">
                ${Object.entries(rec.memberSatisfaction).map(([name, d]) => `
                  <div class="recommendation-card__score">
                    <span>${getAvatar(name)} ${name}</span>
                    <div class="recommendation-card__score-bar">
                      <div class="recommendation-card__score-fill" style="width:${d.score}%; background:${d.score > 70 ? 'var(--color-success)' : d.score > 40 ? 'var(--color-warning)' : 'var(--color-error)'}"></div>
                    </div>
                    <span>${d.score}%</span>
                  </div>
                `).join('')}
              </div>
              <h4 style="font-size: 12px; margin-bottom: 8px; font-weight: 600; color: var(--text-secondary);">Suggested Dishes</h4>
              <div style="margin-bottom: 16px; font-size: 12px; color: var(--text-secondary);">
                ${rec.suggestedItems.map(si => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span><strong>${si.memberName}</strong>: ${si.dishes.join(', ')}</span>
                    <span>₹${si.totalPrice}</span>
                  </div>
                `).join('')}
              </div>
              <button class="btn btn--primary btn--block select-rec-btn" data-idx="${i}">
                ${i === 0 ? '🎯 Select AI Top Pick' : 'Select This Option'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  /* ── Step 4: Final Order ───────────────────────────────── */
  function stepFinalOrder() {
    const idx = state.groupOrder.selectedRecommendation ?? 0;
    const rec = state.groupOrder.consensus[idx];
    const r = rec.restaurant;
    const itemTotal = rec.suggestedItems.reduce((s, si) => s + si.totalPrice, 0);
    const gst = Math.round(itemTotal * 0.05);
    const grand = itemTotal + 5 + gst;
    const n = rec.suggestedItems.length;

    return `
    <div class="go-step fade-in" style="padding: 0;">
      <div style="background: var(--bg-primary); border-radius: var(--radius-xl); padding: var(--space-5); box-shadow: var(--shadow-lg); text-align: center; margin-bottom: var(--space-4); border: 1px solid var(--border-light);">
        <div class="animate-bounceIn" style="color: var(--color-success); font-size: 48px; margin-bottom: 12px; font-weight: bold;">✓</div>
        <h2 style="font-size: var(--font-xl); font-weight: 700; color: var(--text-primary); margin-bottom: 4px; margin-top: 0;">Order Assembled! 🎉</h2>
        <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: 20px;">AI has put together the perfect group order</p>
        
        <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-secondary); border-radius: var(--radius-md); text-align: left; margin-bottom: 20px;">
          <div style="width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 28px; background:linear-gradient(135deg,${grad(r.cuisines[0])})">
            <span>${emoji(r.cuisines[0])}</span>
          </div>
          <div>
            <h3 style="font-size: var(--font-base); font-weight: 600; color: var(--text-primary); margin: 0;">${r.name}</h3>
            <p style="font-size: var(--font-xs); color: var(--text-secondary); margin: 0; margin-top: 2px;">${r.cuisines.join(', ')} • ${r.deliveryTime}</p>
          </div>
        </div>
        
        <div style="text-align: left; margin-bottom: 20px;">
          <h4 style="font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">Order Summary</h4>
          ${rec.suggestedItems.map(si => `
            <div style="margin-bottom: var(--space-3); background: var(--bg-tertiary); padding: var(--space-3); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 13px; color: var(--text-primary); margin-bottom: 6px;">
                <span>${getAvatar(si.memberName)}</span>
                <span>${si.memberName}</span>
              </div>
              ${si.dishes.map(d => `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 2px;">
                  <span>🟢 ${d}</span>
                </div>
              `).join('')}
              <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--color-primary); margin-top: 4px; padding-top: 4px; border-top: 1px dashed var(--border-light);">
                <span>Subtotal:</span>
                <span>₹${si.totalPrice}</span>
              </div>
            </div>`).join('')}
        </div>
        
        <div style="text-align: left; background: var(--bg-secondary); padding: var(--space-3); border-radius: var(--radius-md); font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Item Total</span><span>₹${itemTotal}</span></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Delivery Fee</span><span style="color: var(--color-success); font-weight: 600;">FREE</span></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Platform Fee</span><span>₹5</span></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>GST & Restaurant Charges</span><span>₹${gst}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: var(--font-base); font-weight: 700; color: var(--text-primary); border-top: 1px dashed var(--border-light); padding-top: 8px;">
            <span>Grand Total</span>
            <span style="color: var(--color-primary);">₹${grand}</span>
          </div>
        </div>
        
        <div style="text-align: left; border: 1.5px solid var(--border-medium); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: 24px;">
          <h4 style="font-size: var(--font-sm); font-weight: 600; color: var(--text-primary); margin-top: 0; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span class="material-icons-round" style="color: var(--color-primary); font-size: 18px;">receipt_long</span> Split Bill (Equal)
          </h4>
          ${rec.suggestedItems.map(si => `
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span>${getAvatar(si.memberName)}</span>
                <span>${si.memberName}</span>
              </div>
              <span style="font-weight: 600; color: var(--text-primary);">₹${Math.round(si.totalPrice + (5 + gst) / n)}</span>
            </div>
          `).join('')}
        </div>
        
        <button class="btn btn--success btn--lg btn--block place-order-btn" id="placeOrderBtn">
          <span class="material-icons-round" style="font-size: 18px;">shopping_cart</span> Place Group Order — ₹${grand}
        </button>
      </div>
    </div>`;
  }

  /* ─── STEP EVENT BINDINGS ───────────────────────────────── */
  function bindStepEvents() {
    $('#goBackBtn')?.addEventListener('click', () => {
      if (state.groupOrder.step > 0) { state.groupOrder.step--; renderGroupOrderStep(); }
      else { navigateTo('home'); state.groupOrder.active = false; }
    });

    const bs = $('#groupBudget'), bv = $('#budgetVal');
    if (bs && bv) bs.addEventListener('input', () => { bv.textContent = `₹${bs.value}`; state.groupOrder.budget = +bs.value; });

    $('#createGroupBtn')?.addEventListener('click', () => {
      const nameInput = $('#groupName');
      if (nameInput) state.groupOrder.groupName = nameInput.value || 'Friday Lunch Gang';
      state.groupOrder.step = 1;
      renderGroupOrderStep();
    });

    $('#copyBtn')?.addEventListener('click', () => showToast('Invite link copied! 📋'));

    $('#toPrefsBtn')?.addEventListener('click', () => {
      state.groupOrder.step = 2;
      state.groupOrder.members = [...window.AppData.groupMembers];
      state.groupOrder.aiMessages = [];
      state.groupOrder.currentMemberIndex = 0;
      renderGroupOrderStep();
      scrollChat();
    });

    $('#sendBtn')?.addEventListener('click', sendChat);
    $('#chatInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
    $$('.qr-btn').forEach(b => b.addEventListener('click', () => { $('#chatInput').value = b.textContent; sendChat(); }));

    $$('.select-rec-btn').forEach(b => b.addEventListener('click', () => {
      state.groupOrder.selectedRecommendation = +b.dataset.idx;
      state.groupOrder.step = 4;
      renderGroupOrderStep();
    }));

    $('#placeOrderBtn')?.addEventListener('click', () => { showToast('🎉 Group order placed!'); showOrderSuccess(); });

    scrollChat();
  }

  /* ─── CHAT LOGIC ────────────────────────────────────────── */
  function sendChat() {
    const input = $('#chatInput');
    if (!input || !input.value.trim()) return;
    const msg = input.value.trim();
    const members = window.AppData.groupMembers;
    const cur = members[state.groupOrder.currentMemberIndex];

    state.groupOrder.aiMessages.push({ from: 'user', text: msg });
    input.value = '';
    renderGroupOrderStep();
    scrollChat();

    const tip = $('#typingInd');
    if (tip) tip.style.display = 'flex';

    setTimeout(() => {
      if (tip) tip.style.display = 'none';
      const resp = aiReply(msg, cur);
      state.groupOrder.aiMessages.push({ from: 'ai', text: resp.text });

      if (resp.next) {
        setTimeout(() => {
          if (state.groupOrder.currentMemberIndex < members.length - 1) {
            state.groupOrder.currentMemberIndex++;
            const nx = members[state.groupOrder.currentMemberIndex];
            state.groupOrder.aiMessages.push({ from: 'ai', text: `✅ Got ${cur.name}'s preferences! Now let's hear from **${nx.name}** ${nx.avatar}` });
            state.groupOrder.aiMessages.push({ from: 'ai', text: `Hey ${nx.name}! What would you like to eat today? 😋` });
          } else {
            state.groupOrder.aiMessages.push({ from: 'ai', text: `🎉 All preferences collected! Let me find the perfect restaurant for your group...` });
            setTimeout(() => { state.groupOrder.step = 3; renderGroupOrderStep(); }, 1000);
          }
          renderGroupOrderStep();
          scrollChat();
        }, 650);
      }
      renderGroupOrderStep();
      scrollChat();
    }, 450 + Math.random() * 250);
  }

  function aiReply(msg, member) {
    const m = msg.toLowerCase();
    const food = /biryani|pizza|burger|paneer|chicken|rice|noodle|curry|thali|dosa|idli|roll|wrap|salad|bowl|sandwich|naan|dal|roti|paratha|kebab|tandoori|chinese|italian|spicy|mild|sweet|healthy|cheese|fries|momos|shawarma|pasta|soup|north indian|south indian|ice cream|dessert|veg|non.?veg/i;
    const hasFood = food.test(m);
    const long = m.split(' ').length >= 3;

    if (hasFood || long) {
      const cravings = extractCravings(m);
      const replies = [
        `Love it! 😋 ${member.name} wants **${cravings}**. ${member.dietaryRestrictions.length ? `I'll ensure ${member.dietaryRestrictions.join(' & ')} compatibility!` : ''} Got it!`,
        `Yum! 🤤 **${cravings}** — noted for ${member.name}. ${member.budget ? `Budget ~₹${member.budget} — perfect!` : ''} Moving on!`,
        `Great taste! 👨‍🍳 ${member.name}'s cravings: **${cravings}**. I'll find the best match!`,
      ];
      return { text: replies[Math.floor(Math.random() * replies.length)], next: true };
    }
    return { text: `Could you be more specific? 🤔 What cuisine or dishes are you craving? (e.g., "spicy biryani", "pizza", "something healthy")`, next: false };
  }

  function extractCravings(msg) {
    const words = msg.match(/biryani|pizza|burger|paneer|chicken|rice|noodles?|curry|thali|dosa|rolls?|wraps?|salad|bowls?|sandwich|naan|dal|roti|paratha|kebab|tandoori|chinese|italian|spicy|mild|healthy|cheese|fries|momos|shawarma|pasta|soup|north indian|south indian|mughlai|ice cream|dessert/gi);
    return words ? [...new Set(words.map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()))].join(', ') : msg.slice(0, 40);
  }

  function quickReplies(member) {
    const p = member.preferences.toLowerCase();
    const q = [];
    if (p.includes('biryani') || p.includes('spicy')) q.push('🌶️ Spicy Biryani');
    if (p.includes('paneer') || p.includes('vegetarian')) q.push('🧀 Paneer dishes');
    if (p.includes('pizza') || p.includes('burger')) q.push('🍕 Pizza or Burgers');
    if (p.includes('health') || p.includes('salad')) q.push('🥗 Something healthy');
    q.push('🍛 North Indian', '🍜 Chinese');
    return q.slice(0, 4);
  }

  /* ═══════════════════════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════════════════════ */
  function navigateTo(page) {
    const map = { home: 'homePage', restaurant: 'restaurantPage', groupOrder: 'groupOrderPage' };
    $$('.page').forEach(p => p.classList.remove('active'));
    const el = $(`#${map[page]}`);
    if (el) { el.classList.add('active'); el.scrollTop = 0; }
    const fab = $('#groupOrderFAB');
    const bnav = $('#bottomNav');
    if (fab) fab.style.display = page === 'home' ? 'flex' : 'none';
    if (bnav) bnav.style.display = page === 'home' ? 'flex' : 'none';
    state.currentPage = page;
  }

  function bindNavigation() {
    $$('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        $$('.nav-item').forEach(i => {
          i.classList.remove('active');
          i.classList.remove('bottom-nav__item--active');
        });
        item.classList.add('active');
        item.classList.add('bottom-nav__item--active');
        if (item.dataset.page === 'food') navigateTo('home');
        else showToast(`${item.querySelector('.bottom-nav__label').textContent} coming soon!`);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     SEARCH & FILTERS
     ═══════════════════════════════════════════════════════════ */
  function bindSearch() {
    const input = $('#searchInput');
    if (!input) return;
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = input.value.toLowerCase().trim();
        if (q) {
          const f = window.AppData.restaurants.filter(r => r.name.toLowerCase().includes(q) || r.cuisines.some(c => c.toLowerCase().includes(q)));
          renderRestaurants(f);
        } else renderRestaurants();
      }, 250);
    });
  }

  function filterByCategory(cat) {
    const f = window.AppData.restaurants.filter(r => r.cuisines.some(c => c.toLowerCase().includes(cat.toLowerCase())));
    renderRestaurants(f.length ? f : window.AppData.restaurants);
    showToast(`Showing ${cat} restaurants`);
  }

  function toggleFilter(id) {
    const filter = window.AppData.filters.find(f => f.id === id);
    if (!filter) return;
    const label = filter.label.toLowerCase();
    if (label.includes('veg')) renderRestaurants(window.AppData.restaurants.filter(r => r.veg));
    else if (label.includes('rating')) renderRestaurants(window.AppData.restaurants.filter(r => r.rating >= 4.0));
    else if (label.includes('offer')) renderRestaurants(window.AppData.restaurants.filter(r => r.discount));
    else if (label.includes('price')) renderRestaurants([...window.AppData.restaurants].sort((a, b) => a.priceForTwo - b.priceForTwo));
    else if (label.includes('delivery')) renderRestaurants([...window.AppData.restaurants].sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)));
  }

  /* ═══════════════════════════════════════════════════════════
     UTILITIES
     ═══════════════════════════════════════════════════════════ */
  function addScrollEffects() {
    window.addEventListener('scroll', () => {
      const nb = $('#navbar');
      if (nb) nb.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  function showToast(msg, type = 'success') {
    const t = $('#toast');
    if (!t) return;
    t.innerHTML = `<span class="material-icons-round toast__icon">${type === 'success' ? 'check_circle' : 'info'}</span><span class="toast__message">${msg}</span>`;
    t.className = `toast toast--${type} visible`;
    setTimeout(() => {
      t.classList.add('toast--hiding');
      setTimeout(() => {
        t.className = 'toast';
      }, 300);
    }, 2200);
  }

  function showOrderSuccess() {
    const ov = $('#modalOverlay');
    ov.style.display = 'flex';
    ov.innerHTML = `
      <div class="success-modal animate-bounceIn">
        <div class="success-icon"><span class="material-icons-round">check_circle</span></div>
        <h2>Order Placed! 🎉</h2>
        <p>Your group order has been placed successfully!</p>
        <p class="order-eta">Estimated delivery: <strong>30-35 min</strong></p>
        <div class="tracking-row">
          <div class="track-step active"><span class="material-icons-round">receipt</span><span>Confirmed</span></div>
          <div class="track-line"></div>
          <div class="track-step"><span class="material-icons-round">restaurant</span><span>Preparing</span></div>
          <div class="track-line"></div>
          <div class="track-step"><span class="material-icons-round">delivery_dining</span><span>On the way</span></div>
        </div>
        <button class="btn btn--primary btn--lg btn--block" id="backHomeBtn">Back to Home</button>
      </div>`;
    ov.querySelector('#backHomeBtn').addEventListener('click', () => {
      ov.style.display = 'none';
      navigateTo('home');
    });
  }

  function scrollChat() {
    setTimeout(() => {
      const c = $('#chatMessages');
      if (c) c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
    }, 50);
  }

  function md(t) { return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>'); }

  function getAvatar(name) {
    const m = window.AppData?.groupMembers?.find(m => m.name === name);
    return m ? m.avatar : '👤';
  }

  function grad(cuisine) {
    const g = { Biryani:'#ff9a56,#ff6b35', Pizza:'#ff6b6b,#ee5a24', Italian:'#ff6b6b,#ee5a24', Burgers:'#f0932b,#e55039', American:'#f0932b,#e55039', 'Fast Food':'#f0932b,#e55039', Chinese:'#eb4d4b,#c0392b', 'North Indian':'#ff9f43,#ee5a24', 'South Indian':'#f8c291,#e55039', Desserts:'#fd79a8,#e84393', 'Ice Cream':'#a29bfe,#6c5ce7', Beverages:'#55efc4,#00b894', Snacks:'#ffeaa7,#fdcb6e', Healthy:'#55efc4,#00b894', Bowls:'#00cec9,#0984e3', Kebabs:'#e17055,#d63031', Mughlai:'#e17055,#d63031' };
    return g[cuisine] || '#fc8019,#fe5200';
  }

  function emoji(cuisine) {
    const e = { Biryani:'🍚', Pizza:'🍕', Italian:'🍕', Burgers:'🍔', American:'🍔', 'Fast Food':'🍟', Chinese:'🥡', 'North Indian':'🍛', 'South Indian':'🫕', Desserts:'🍰', 'Ice Cream':'🍨', Beverages:'☕', Snacks:'🍿', Healthy:'🥗', Bowls:'🥣', Kebabs:'🍢', Mughlai:'🍖' };
    return e[cuisine] || '🍽️';
  }

  function itemEmoji(name) {
    const n = name.toLowerCase();
    const map = [['biryani','🍚'],['pizza','🍕'],['burger','🍔'],['naan','🫓'],['roti','🫓'],['paneer','🧀'],['chicken','🍗'],['dal','🍲'],['rice','🍚'],['ice cream','🍨'],['cake','🎂'],['fries','🍟'],['wrap','🌯'],['roll','🌯'],['salad','🥗'],['soup','🍜'],['noodle','🍜'],['momos','🥟'],['shake','🥤'],['coffee','☕'],['chai','☕'],['tea','☕'],['kebab','🍢'],['tikka','🍢'],['paratha','🫓'],['dosa','🫕'],['idli','🫕'],['thali','🍽️'],['samosa','🥟'],['puff','🥐'],['vada','🍩'],['sundae','🍨'],['brownie','🍫'],['nachos','🌮'],['taco','🌮'],['wings','🍗'],['nugget','🍗'],['mojito','🍹'],['cola','🥤'],['pepsi','🥤'],['coca','🥤']];
    for (const [k,v] of map) if (n.includes(k)) return v;
    return '🍽️';
  }

})();
