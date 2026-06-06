/**
 * ============================================================
 *  AI ENGINE — GenAI-Powered Consensus Engine for Group Ordering
 *  Author: Vivek Kumar (Enroll: 23125038, Email: vivek_k@mfs.iitr.ac.in)
 *  Copyright (c) 2026 Vivek Kumar. All rights reserved.
 * ============================================================
 *
 *  Simulates a generative-AI backend that:
 *    • Parses every member's food preferences
 *    • Scores restaurants with a weighted algorithm
 *    • Generates natural-language recommendations
 *    • Resolves conflicts between members
 *    • Provides context-aware chat responses
 *    • Assembles a final, split-cost group order
 *
 *  Exposed globally via  window.AIEngine
 * ============================================================
 */

window.AIEngine = (() => {
  'use strict';

  /* ──────────────────────────────────────────────
   *  CONSTANTS & LOOKUP TABLES
   * ────────────────────────────────────────────── */

  /** Scoring weights (must total 1.0) */
  const WEIGHTS = {
    cuisineMatch:         0.30,
    dietaryCompatibility: 0.25,
    budgetFit:            0.20,
    rating:               0.15,
    deliveryTime:         0.10,
  };

  /** Keyword → cuisine mapping for preference parsing */
  const CUISINE_KEYWORDS = {
    indian:    ['indian', 'curry', 'biryani', 'tandoori', 'naan', 'paneer', 'masala', 'dal', 'dosa', 'idli', 'sambar', 'tikka', 'korma', 'vindaloo', 'rogan josh', 'butter chicken', 'chole', 'paratha', 'thali', 'chaat'],
    chinese:   ['chinese', 'noodles', 'manchurian', 'fried rice', 'dim sum', 'momos', 'hakka', 'schezwan', 'szechuan', 'wonton', 'chow mein', 'spring roll', 'dumpling'],
    italian:   ['italian', 'pizza', 'pasta', 'lasagna', 'risotto', 'bruschetta', 'calzone', 'focaccia', 'gnocchi', 'penne', 'spaghetti', 'alfredo', 'carbonara', 'margherita'],
    mexican:   ['mexican', 'taco', 'burrito', 'quesadilla', 'nachos', 'guacamole', 'enchilada', 'fajita', 'salsa', 'chimichanga'],
    japanese:  ['japanese', 'sushi', 'ramen', 'tempura', 'teriyaki', 'miso', 'edamame', 'udon', 'sashimi', 'bento'],
    thai:      ['thai', 'pad thai', 'tom yum', 'green curry', 'red curry', 'thai basil', 'satay', 'papaya salad'],
    american:  ['burger', 'fries', 'steak', 'bbq', 'barbecue', 'wings', 'hot dog', 'sandwich', 'mac and cheese', 'grilled'],
    healthy:   ['salad', 'quinoa', 'avocado', 'smoothie', 'bowl', 'protein', 'grilled chicken', 'oats', 'granola', 'kale', 'acai'],
    dessert:   ['dessert', 'cake', 'ice cream', 'brownie', 'cookie', 'pastry', 'donut', 'cheesecake', 'waffle', 'pancake', 'gulab jamun', 'rasgulla'],
    southindian: ['dosa', 'idli', 'vada', 'uttapam', 'appam', 'sambhar', 'rasam', 'pongal', 'upma', 'medu vada', 'filter coffee'],
    streetfood: ['chaat', 'pani puri', 'golgappa', 'bhel', 'pav bhaji', 'vada pav', 'samosa', 'kachori', 'jalebi', 'chole bhature'],
  };

  /** Dietary restriction keywords */
  const DIETARY_KEYWORDS = {
    vegetarian:  ['vegetarian', 'veg', 'no meat', 'no chicken', 'no fish', 'plant based'],
    vegan:       ['vegan', 'no dairy', 'no eggs', 'no animal', 'plant based'],
    glutenFree:  ['gluten free', 'no gluten', 'celiac', 'coeliac'],
    jain:        ['jain', 'no onion', 'no garlic', 'no root vegetables'],
    halal:       ['halal'],
    keto:        ['keto', 'low carb', 'no carbs'],
    nutFree:     ['nut free', 'no nuts', 'peanut allergy', 'tree nut allergy'],
    lactoseIntolerant: ['lactose intolerant', 'no lactose', 'dairy free'],
  };

  /** Spice-level keywords */
  const SPICE_KEYWORDS = {
    mild:   ['mild', 'not spicy', 'no spice', 'plain', 'light'],
    medium: ['medium', 'moderate', 'some spice', 'balanced'],
    hot:    ['spicy', 'hot', 'extra spice', 'fiery', 'very spicy'],
  };

  /** Random enthusiastic food emojis & openers */
  const FOOD_EMOJIS  = ['🍕', '🍔', '🌮', '🍜', '🍱', '🥗', '🍛', '🧆', '🥘', '🍝', '🍣', '🥙'];
  const AI_OPENERS   = [
    "Great news! ",
    "Ooh, I love this! ",
    "Here's what I found! ",
    "Alright, team — ",
    "Perfect match alert! ",
    "After crunching the numbers… ",
  ];


  /* ──────────────────────────────────────────────
   *  HELPER UTILITIES
   * ────────────────────────────────────────────── */

  /**
   * Picks a random element from an array.
   * @param {Array} arr
   * @returns {*}
   */
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /**
   * Clamps a number between min and max.
   * @param {number} val
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  /**
   * Delays execution to simulate AI "thinking" time.
   * @param {number} ms - milliseconds
   * @returns {Promise<void>}
   */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Normalises a string for matching: lowercase, trim, collapse whitespace.
   * @param {string} str
   * @returns {string}
   */
  const normalise = (str) => (str || '').toLowerCase().trim().replace(/\s+/g, ' ');

  /**
   * Checks whether `text` contains any keyword from `keywords`.
   * @param {string} text   - normalised text
   * @param {string[]} keywords
   * @returns {boolean}
   */
  const containsAny = (text, keywords) =>
    keywords.some((kw) => text.includes(kw));

  /**
   * Returns which keywords from `keywords` appear in `text`.
   * @param {string} text   - normalised text
   * @param {string[]} keywords
   * @returns {string[]}
   */
  const findMatches = (text, keywords) =>
    keywords.filter((kw) => text.includes(kw));

  /**
   * Simple keyword extraction from a sentence.
   * Strips common stop-words and returns meaningful tokens.
   * @param {string} text
   * @returns {string[]}
   */
  const extractKeywords = (text) => {
    const STOP_WORDS = new Set([
      'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
      'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'can', 'may', 'might', 'shall', 'to', 'of', 'in', 'for',
      'on', 'with', 'at', 'by', 'from', 'as', 'into', 'about', 'like',
      'and', 'but', 'or', 'not', 'no', 'so', 'if', 'then', 'than',
      'that', 'this', 'what', 'which', 'who', 'whom', 'how', 'when',
      'where', 'why', 'all', 'each', 'every', 'some', 'any', 'few',
      'want', 'need', 'feel', 'looking', 'something', 'anything', 'really',
      'very', 'just', 'also', 'too', 'please', 'thanks', 'hi', 'hey',
      'hello', 'okay', 'ok', 'sure', 'right', 'yeah', 'yes', 'up',
      'get', 'got', 'go', 'going', 'let', 'lets', "let's", 'think',
      'today', 'tonight', 'now', 'eat', 'eating', 'food', 'order',
      'ordering', 'maybe', 'probably', 'much', 'more', 'dont', "don't",
    ]);
    return normalise(text)
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  };

  /**
   * Simplified sentiment analysis.
   * Returns a score from -1 (negative) to +1 (positive).
   * @param {string} text
   * @returns {number}
   */
  const sentimentScore = (text) => {
    const t = normalise(text);
    const POSITIVE = ['love', 'great', 'awesome', 'amazing', 'perfect', 'yum', 'delicious', 'fantastic', 'excellent', 'best', 'good', 'nice', 'happy', 'excited', 'favourite', 'favorite', 'craving', 'yes', 'definitely', 'absolutely', 'sure', 'recommend', 'tasty'];
    const NEGATIVE = ['hate', 'bad', 'worst', 'terrible', 'awful', 'disgusting', 'no', 'never', 'dislike', 'allergic', 'sick', 'boring', 'bland', 'expensive', 'too much', 'nah', 'meh', 'nope', 'avoid', 'gross'];
    let score = 0;
    POSITIVE.forEach((w) => { if (t.includes(w)) score += 0.15; });
    NEGATIVE.forEach((w) => { if (t.includes(w)) score -= 0.15; });
    return clamp(score, -1, 1);
  };

  /**
   * Detect user intent from a chat message.
   * @param {string} text
   * @returns {string} intent label
   */
  const detectIntent = (text) => {
    const t = normalise(text);
    if (/budget|expensive|cheap|cost|price|afford|spend/.test(t))       return 'budget_concern';
    if (/allerg|restrict|intoleran|diet|vegan|vegetarian|gluten|jain|halal|keto/.test(t)) return 'dietary_question';
    if (/menu|dish|item|what do they (have|serve)|options/.test(t))     return 'menu_question';
    if (/change|update|switch|instead|actually|wait/.test(t))           return 'preference_update';
    if (/recommend|suggest|best|popular|top|favourite|favorite/.test(t)) return 'recommendation';
    if (/ready|final|confirm|place order|done|let'?s order/.test(t))    return 'finalize';
    if (/time|deliver|how long|when|eta|minutes/.test(t))               return 'delivery_time';
    if (/hello|hi|hey|howdy|sup|what'?s up/.test(t))                    return 'greeting';
    if (/thank|thx|cheers|appreciate/.test(t))                          return 'thanks';
    if (/help|confused|how does|explain/.test(t))                       return 'help';
    return 'general';
  };


  /* ──────────────────────────────────────────────
   *  1.  ANALYZE PREFERENCES
   * ────────────────────────────────────────────── */

  /**
   * Parses an array of group members and produces a structured analysis.
   *
   * @param {Array<Object>} members
   *   Each member: { name, preferences (string), dietaryRestrictions (string[]),
   *                   budget (number|{min,max}), spicePreference? }
   * @returns {Object} analysisResult
   */
  function analyzePreferences(members) {
    const parsed = members.map((m) => {
      const prefText = normalise(m.preferences || '');

      /* ---- Cuisines ---- */
      const cuisines = [];
      for (const [cuisine, keywords] of Object.entries(CUISINE_KEYWORDS)) {
        if (containsAny(prefText, keywords)) cuisines.push(cuisine);
      }

      /* ---- Specific dishes mentioned ---- */
      const allDishKeywords = Object.values(CUISINE_KEYWORDS).flat();
      const specificDishes  = findMatches(prefText, allDishKeywords);

      /* ---- Spice level ---- */
      let spiceLevel = m.spicePreference || 'medium'; // default
      for (const [level, keywords] of Object.entries(SPICE_KEYWORDS)) {
        if (containsAny(prefText, keywords)) { spiceLevel = level; break; }
      }

      /* ---- Dietary restrictions ---- */
      const dietary = [...(m.dietaryRestrictions || [])];
      for (const [restriction, keywords] of Object.entries(DIETARY_KEYWORDS)) {
        if (containsAny(prefText, keywords) && !dietary.includes(restriction)) {
          dietary.push(restriction);
        }
      }

      /* ---- Budget ---- */
      let budgetMin = 0;
      let budgetMax = Infinity;
      if (typeof m.budget === 'number') {
        budgetMax = m.budget;
      } else if (m.budget && typeof m.budget === 'object') {
        budgetMin = m.budget.min || 0;
        budgetMax = m.budget.max || Infinity;
      }

      return {
        name: m.name,
        cuisines,
        specificDishes,
        spiceLevel,
        dietaryRestrictions: dietary,
        budgetRange: { min: budgetMin, max: budgetMax },
        sentimentScore: sentimentScore(m.preferences || ''),
        rawPreferences: m.preferences || '',
      };
    });

    /* ---- Aggregate analysis ---- */
    const allCuisines  = parsed.flatMap((p) => p.cuisines);
    const cuisineFreq  = {};
    allCuisines.forEach((c) => { cuisineFreq[c] = (cuisineFreq[c] || 0) + 1; });

    const commonCuisines = Object.entries(cuisineFreq)
      .filter(([, count]) => count >= Math.ceil(members.length / 2))
      .map(([cuisine]) => cuisine);

    const allDietary = [...new Set(parsed.flatMap((p) => p.dietaryRestrictions))];

    const budgetMin = Math.max(...parsed.map((p) => p.budgetRange.min));
    const budgetMax = Math.min(...parsed.map((p) => p.budgetRange.max));

    /* ---- Common-ground narrative ---- */
    let commonGround = '';
    if (commonCuisines.length > 0) {
      commonGround = `Most of the group enjoys ${commonCuisines.join(', ')} cuisine.`;
    } else {
      commonGround = 'The group has diverse tastes — a multi-cuisine restaurant may be best!';
    }

    if (allDietary.length > 0) {
      commonGround += ` Dietary considerations: ${allDietary.join(', ')}.`;
    }

    return {
      members: parsed,
      summary: {
        cuisineFrequency: cuisineFreq,
        commonCuisines,
        allDietaryRestrictions: allDietary,
        groupBudgetRange: {
          min: budgetMin,
          max: budgetMax === Infinity ? 'unlimited' : budgetMax,
        },
        commonGround,
        averageSentiment: parsed.reduce((s, p) => s + p.sentimentScore, 0) / parsed.length,
      },
    };
  }


  /* ──────────────────────────────────────────────
   *  2.  FIND CONSENSUS  (core scoring algorithm)
   * ────────────────────────────────────────────── */

  /**
   * Scores every restaurant against every member and returns the top 3.
   *
   * @param {Array<Object>} members     — same format as analyzePreferences
   * @param {Array<Object>} restaurants — each has:
   *   { id, name, cuisines (string[]), rating, deliveryTime (min),
   *     priceForTwo (number), menu (Array<{name,price,veg,tags[]}>),
   *     dietaryOptions (string[]) }
   * @returns {Array<Object>} top3 recommendations
   */
  function findConsensus(members, restaurants) {
    const analysis = analyzePreferences(members);
    const scored   = restaurants.map((rest) => scoreRestaurant(rest, analysis));

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Return top 3
    return scored.slice(0, 3).map((entry, idx) => ({
      rank:               idx + 1,
      restaurant:         entry.restaurant,
      score:              Math.round(entry.score),
      reasoning:          buildReasoning(entry, analysis),
      memberSatisfaction: entry.memberScores,
      suggestedItems:     suggestItems(entry.restaurant, analysis),
    }));
  }

  /**
   * Compute a 0-100 composite score for a single restaurant.
   * @private
   */
  function scoreRestaurant(restaurant, analysis) {
    const memberScores = {};
    let totalScore     = 0;

    const parsedMembers = analysis.members;

    parsedMembers.forEach((member) => {
      const scores = {};

      /* ---- Cuisine Match (0–100) ---- */
      const restCuisines = (restaurant.cuisines || []).map(normalise);
      const memberCuisines = member.cuisines;
      if (memberCuisines.length === 0) {
        scores.cuisineMatch = 60; // no strong preference → neutral
      } else {
        const matches = memberCuisines.filter((c) => restCuisines.includes(c));
        scores.cuisineMatch = (matches.length / memberCuisines.length) * 100;
      }

      /* ---- Dietary Compatibility (0 or 100, hard constraint) ---- */
      const dietaryOpts = (restaurant.dietaryOptions || []).map(normalise);
      const menu        = (restaurant.menu || []).flatMap((cat) => cat.items || []);
      let dietaryOk = true;

      member.dietaryRestrictions.forEach((restriction) => {
        const r = normalise(restriction);
        // Check if the restaurant explicitly supports this dietary option
        const supported = dietaryOpts.some((opt) => opt.includes(r));
        // Or check if there are suitable menu items
        const hasItems  = menu.some((item) => {
          if (r === 'vegetarian' || r === 'vegan') return item.veg;
          // check if no onion/garlic/gluten in name/description
          const nameLower = (item.name || '').toLowerCase();
          const descLower = (item.description || '').toLowerCase();
          if (r.includes('onion') && (nameLower.includes('onion') || descLower.includes('onion'))) return false;
          if (r.includes('garlic') && (nameLower.includes('garlic') || descLower.includes('garlic'))) return false;
          if (r.includes('gluten') && (nameLower.includes('wheat') || nameLower.includes('maida') || nameLower.includes('flour') || descLower.includes('wheat') || descLower.includes('maida') || descLower.includes('flour'))) return false;
          return item.veg;
        });
        if (!supported && !hasItems) dietaryOk = false;
      });

      scores.dietaryCompatibility = dietaryOk ? 100 : 10; // harsh penalty

      /* ---- Budget Fit (0–100) ---- */
      const perPersonCost = (restaurant.priceForTwo || 400) / 2;
      const maxBudget     = member.budgetRange.max === Infinity ? 9999 : member.budgetRange.max;
      if (perPersonCost <= maxBudget) {
        // Under budget → scale nicely (cheaper relative to budget = better)
        scores.budgetFit = clamp(100 - ((perPersonCost / maxBudget) * 40), 50, 100);
      } else {
        // Over budget → penalise proportionally
        const overBy = ((perPersonCost - maxBudget) / maxBudget) * 100;
        scores.budgetFit = clamp(60 - overBy, 0, 60);
      }

      /* ---- Rating (0–100) ---- */
      const rating = restaurant.rating || 4.0;
      scores.rating = (rating / 5) * 100;

      /* ---- Delivery Time (0–100) ---- */
      const dt = restaurant.deliveryTime || 30;
      if (dt <= 20) scores.deliveryTime = 100;
      else if (dt <= 30) scores.deliveryTime = 85;
      else if (dt <= 45) scores.deliveryTime = 65;
      else scores.deliveryTime = clamp(100 - dt, 10, 50);

      /* ---- Weighted composite for this member ---- */
      const composite =
        scores.cuisineMatch         * WEIGHTS.cuisineMatch +
        scores.dietaryCompatibility * WEIGHTS.dietaryCompatibility +
        scores.budgetFit            * WEIGHTS.budgetFit +
        scores.rating               * WEIGHTS.rating +
        scores.deliveryTime         * WEIGHTS.deliveryTime;

      memberScores[member.name] = {
        total: Math.round(composite),
        breakdown: scores,
        satisfied: composite >= 60,
      };

      totalScore += composite;
    });

    // Average across all members
    const avgScore = totalScore / parsedMembers.length;

    return {
      restaurant,
      score: avgScore,
      memberScores,
    };
  }

  /**
   * Build a human-readable reasoning string for a scored restaurant.
   * @private
   */
  function buildReasoning(entry, analysis) {
    const rest   = entry.restaurant;
    const scores = entry.memberScores;
    const names  = Object.keys(scores);

    const parts = [];

    // Cuisine overview
    const cuisineList = (rest.cuisines || []).join(', ');
    parts.push(`${rest.name} serves ${cuisineList} cuisine`);

    // Who benefits most
    const happiest = names.reduce((a, b) => scores[a].total > scores[b].total ? a : b);
    parts.push(`${happiest} will especially enjoy this`);

    // Dietary
    const dietaryIssues = names.filter((n) => scores[n].breakdown.dietaryCompatibility < 50);
    if (dietaryIssues.length === 0) {
      parts.push('it accommodates everyone\'s dietary needs');
    } else {
      parts.push(`note: limited dietary options for ${dietaryIssues.join(', ')}`);
    }

    // Budget
    const overBudget = names.filter((n) => scores[n].breakdown.budgetFit < 50);
    if (overBudget.length > 0) {
      parts.push(`may be slightly over budget for ${overBudget.join(', ')}`);
    } else {
      parts.push('fits within everyone\'s budget');
    }

    // Rating & delivery
    if (rest.rating >= 4.3) parts.push(`highly rated at ${rest.rating}⭐`);
    if (rest.deliveryTime <= 25) parts.push(`quick delivery in ~${rest.deliveryTime} min`);

    return parts.join('; ') + '.';
  }

  /**
   * Suggest specific menu items for each member.
   * @private
   */
  function suggestItems(restaurant, analysis) {
    const suggestions = [];
    const menu = (restaurant.menu || []).flatMap((cat) => cat.items || []);

    analysis.members.forEach((member) => {
      const items = [];

      // Filter menu items compatible with member's dietary needs
      const compatible = menu.filter((item) => {
        if (member.dietaryRestrictions.includes('vegetarian') || member.dietaryRestrictions.includes('vegan')) {
          return item.veg;
        }
        if (member.dietaryRestrictions.includes('jain') || member.dietaryRestrictions.includes('no onion') || member.dietaryRestrictions.includes('no garlic')) {
          const nameLower = (item.name || '').toLowerCase();
          const descLower = (item.description || '').toLowerCase();
          const hasOnionGarlic = nameLower.includes('onion') || nameLower.includes('garlic') || descLower.includes('onion') || descLower.includes('garlic');
          return item.veg && !hasOnionGarlic;
        }
        if (member.dietaryRestrictions.includes('gluten-free')) {
          const nameLower = (item.name || '').toLowerCase();
          const descLower = (item.description || '').toLowerCase();
          const hasGluten = nameLower.includes('wheat') || nameLower.includes('maida') || nameLower.includes('flour') || descLower.includes('wheat') || descLower.includes('maida') || descLower.includes('flour') || nameLower.includes('pizza') || nameLower.includes('burger') || nameLower.includes('bun') || nameLower.includes('bread') || nameLower.includes('pasta') || nameLower.includes('noodle');
          return !hasGluten;
        }
        return true;
      });

      const pool = compatible.length > 0 ? compatible : menu;

      // Try to match specific dish keywords first
      member.specificDishes.forEach((dish) => {
        const match = pool.find((item) => normalise(item.name).includes(dish));
        if (match && !items.includes(match)) items.push(match);
      });

      // Fill remaining with cuisine-matching or top-rated items
      if (items.length < 2) {
        const remaining = pool.filter((item) => !items.includes(item));
        // Prefer items whose names contain member's cuisines
        const cuisineMatched = remaining.filter((item) =>
          member.cuisines.some((c) => normalise(item.name).includes(c))
        );
        const fillFrom = cuisineMatched.length > 0 ? cuisineMatched : remaining;
        while (items.length < 2 && fillFrom.length > 0) {
          items.push(fillFrom.shift());
        }
        // If still under 2, take from remaining
        while (items.length < 2 && remaining.length > 0) {
          const nextItem = remaining.shift();
          if (!items.includes(nextItem)) items.push(nextItem);
        }
      }

      const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);

      suggestions.push({
        memberName: member.name,
        dishes: items.map(item => item.name),
        totalPrice: totalPrice,
        itemsList: items.map(item => ({
          name: item.name,
          price: item.price,
          veg: item.veg
        }))
      });
    });

    return suggestions;
  }


  /* ──────────────────────────────────────────────
   *  3.  GENERATE RECOMMENDATION TEXT
   * ────────────────────────────────────────────── */

  /**
   * Generates a friendly, natural-language recommendation blurb.
   *
   * @param {Object} recommendation — one entry from findConsensus()
   * @returns {string}
   */
  function generateRecommendationText(recommendation) {
    const rest    = recommendation.restaurant;
    const scores  = recommendation.memberSatisfaction;
    const items   = recommendation.suggestedItems;
    const names   = Object.keys(scores);

    const emoji   = pick(FOOD_EMOJIS);
    const opener  = pick(AI_OPENERS);
    const lines   = [];

    lines.push(`${emoji} ${opener}Based on everyone's preferences, I recommend **${rest.name}**! (Score: ${recommendation.score}/100)`);
    lines.push('');

    // Per-member callout
    names.forEach((name) => {
      const sat  = scores[name];
      const dish = (items[name] || []).map((d) => d.name).join(' and ');
      if (sat.satisfied) {
        lines.push(`• **${name}** — You'll love this! I'd suggest the ${dish || 'chef\'s specials'}. ${sat.total >= 80 ? '🤩' : '😊'}`);
      } else {
        lines.push(`• **${name}** — This might not be your first pick, but the ${dish || 'menu'} has some great options worth trying! 🙂`);
      }
    });

    lines.push('');

    // Trade-offs
    const tradeoffs = [];
    names.forEach((name) => {
      const b = scores[name].breakdown;
      if (b.budgetFit < 50) tradeoffs.push(`${name}'s budget is a bit tight`);
      if (b.dietaryCompatibility < 50) tradeoffs.push(`limited dietary options for ${name}`);
    });

    if (tradeoffs.length > 0) {
      lines.push(`⚠️ Trade-offs to consider: ${tradeoffs.join('; ')}.`);
    } else {
      lines.push('✅ No major trade-offs — this is a solid pick for the whole group!');
    }

    // Delivery & rating
    if (rest.deliveryTime) lines.push(`🕐 Estimated delivery: ${rest.deliveryTime} min`);
    if (rest.rating)       lines.push(`⭐ Rating: ${rest.rating}/5`);

    return lines.join('\n');
  }


  /* ──────────────────────────────────────────────
   *  4.  HANDLE CONFLICT
   * ────────────────────────────────────────────── */

  /**
   * Resolves a conflict between two members' preferences.
   *
   * @param {Object} member1Pref  — { name, preferences, dietaryRestrictions, budget }
   * @param {Object} member2Pref  — same shape
   * @returns {Object} { compromise, explanation }
   */
  function handleConflict(member1Pref, member2Pref) {
    const p1 = normalise(member1Pref.preferences || '');
    const p2 = normalise(member2Pref.preferences || '');

    const cuisines1 = [];
    const cuisines2 = [];

    for (const [cuisine, keywords] of Object.entries(CUISINE_KEYWORDS)) {
      if (containsAny(p1, keywords)) cuisines1.push(cuisine);
      if (containsAny(p2, keywords)) cuisines2.push(cuisine);
    }

    // Find common cuisines
    const common = cuisines1.filter((c) => cuisines2.includes(c));

    let compromise, explanation;

    if (common.length > 0) {
      compromise = {
        suggestedCuisines: common,
        strategy: 'common_ground',
      };
      explanation =
        `${pick(FOOD_EMOJIS)} Great news! Both ${member1Pref.name} and ${member2Pref.name} enjoy ${common.join(' and ')} food. ` +
        `I'd suggest picking a restaurant that specialises in ${common[0]} — everyone wins!`;
    } else {
      // No overlap → suggest multi-cuisine or ordering from different places
      compromise = {
        suggestedCuisines: [...new Set([...cuisines1, ...cuisines2])],
        strategy: 'multi_cuisine',
      };
      explanation =
        `${pick(FOOD_EMOJIS)} ${member1Pref.name} is craving ${cuisines1.join('/')} while ${member2Pref.name} prefers ${cuisines2.join('/')}. ` +
        `No worries! I'd recommend a multi-cuisine restaurant where both of you can pick dishes you love. ` +
        `Alternatively, you could each order from different restaurants — Swiggy makes that easy! 😄`;
    }

    // Budget conflict
    const b1 = typeof member1Pref.budget === 'number' ? member1Pref.budget : (member1Pref.budget?.max || Infinity);
    const b2 = typeof member2Pref.budget === 'number' ? member2Pref.budget : (member2Pref.budget?.max || Infinity);

    if (Math.abs(b1 - b2) > 200 && b1 !== Infinity && b2 !== Infinity) {
      const lower  = b1 < b2 ? member1Pref.name : member2Pref.name;
      const higher = b1 < b2 ? member2Pref.name : member1Pref.name;
      const midBudget = Math.round((b1 + b2) / 2);
      explanation +=
        `\n\n💰 Budget note: ${lower} is looking for something more affordable while ${higher} is open to spending more. ` +
        `A sweet spot around ₹${midBudget} per person should work for both!`;
      compromise.suggestedBudget = midBudget;
    }

    // Dietary conflict
    const d1 = (member1Pref.dietaryRestrictions || []).map(normalise);
    const d2 = (member2Pref.dietaryRestrictions || []).map(normalise);
    const allDietary = [...new Set([...d1, ...d2])];

    if (allDietary.length > 0) {
      explanation +=
        `\n\n🥬 Dietary heads-up: We need to ensure the restaurant covers ${allDietary.join(', ')} options. I'll filter for that!`;
      compromise.dietaryRequirements = allDietary;
    }

    return { compromise, explanation };
  }


  /* ──────────────────────────────────────────────
   *  5.  GENERATE CHAT RESPONSE
   * ────────────────────────────────────────────── */

  /**
   * Simulates an AI chat response with realistic typing delay.
   *
   * @param {string} userMessage — free-text from the user
   * @param {Object} context    — { stage, members, currentRecommendation, restaurants }
   * @returns {Promise<{message: string, action: string|null, data: object|null}>}
   */
  async function generateChatResponse(userMessage, context = {}) {
    // Simulate realistic AI thinking time (1–2 seconds)
    const thinkTime = 1000 + Math.random() * 1000;
    await delay(thinkTime);

    const intent  = detectIntent(userMessage);
    const stage   = context.stage || 'preferences';  // preferences | choosing | ordering | confirmed
    const members = context.members || [];
    const reco    = context.currentRecommendation || null;

    let message = '';
    let action  = null;
    let data    = null;

    switch (intent) {

      /* ---- Greeting ---- */
      case 'greeting':
        message = `Hey there! ${pick(FOOD_EMOJIS)} I'm your AI food buddy. ` +
          (members.length > 0
            ? `I see we have ${members.map((m) => m.name).join(', ')} in the group. Let's find something everyone loves!`
            : `Ready to help your group find the perfect meal. Tell me everyone's food preferences!`);
        break;

      /* ---- Budget concern ---- */
      case 'budget_concern': {
        const budgetMatch = userMessage.match(/(\d+)/);
        const amount      = budgetMatch ? parseInt(budgetMatch[1], 10) : null;
        if (amount) {
          message = `💰 Got it! I'll keep the per-person budget around ₹${amount}. Let me re-check our restaurant options with that in mind.`;
          action  = 'update_budget';
          data    = { budget: amount };
        } else {
          message = `💰 Budget matters! Could you give me a rough number? Like "under ₹300 per person" — I'll find the best options within that range.`;
        }
        break;
      }

      /* ---- Dietary question ---- */
      case 'dietary_question': {
        const detectedDietary = [];
        for (const [restriction, keywords] of Object.entries(DIETARY_KEYWORDS)) {
          if (containsAny(normalise(userMessage), keywords)) {
            detectedDietary.push(restriction);
          }
        }
        if (detectedDietary.length > 0) {
          message = `🥬 Noted! I've registered ${detectedDietary.join(', ')} as dietary requirements. ` +
            `I'll make sure every restaurant I recommend has suitable options. No compromises on this! ✅`;
          action = 'update_dietary';
          data   = { restrictions: detectedDietary };
        } else {
          message = `🥬 Could you specify the dietary restriction? For example: vegetarian, vegan, gluten-free, jain, halal, keto, nut-free, or lactose-intolerant.`;
        }
        break;
      }

      /* ---- Menu question ---- */
      case 'menu_question':
        if (reco) {
          const menuItems = (reco.restaurant.menu || []).flatMap(cat => cat.items || []).slice(0, 6);
          const menuList  = menuItems.map((i) => `  • ${i.name} — ₹${i.price} ${i.veg ? '🟢' : '🔴'}`).join('\n');
          message = `📋 Here are some highlights from ${reco.restaurant.name}:\n\n${menuList}\n\nWant me to suggest specific dishes for each person?`;
        } else {
          message = `📋 Let me first find a restaurant for your group, then I can walk you through the menu! Share everyone's preferences and I'll get started.`;
        }
        break;

      /* ---- Preference update ---- */
      case 'preference_update': {
        const keywords = extractKeywords(userMessage);
        message = `✏️ Updated! I've noted the new preference${keywords.length > 1 ? 's' : ''}: ${keywords.join(', ') || 'your changes'}. Let me recalculate the best options…`;
        action  = 'update_preferences';
        data    = { keywords };
        break;
      }

      /* ---- Recommendation ---- */
      case 'recommendation':
        if (stage === 'preferences') {
          message = `${pick(FOOD_EMOJIS)} I'd love to make a recommendation! Just need everyone's preferences first. ` +
            `Tell me what cuisines, dishes, or vibes each person is in the mood for!`;
        } else if (reco) {
          message = generateRecommendationText(reco);
        } else {
          message = `${pick(FOOD_EMOJIS)} Let me crunch the numbers and find the perfect spot for your group. One moment…`;
          action  = 'generate_recommendation';
        }
        break;

      /* ---- Finalize ---- */
      case 'finalize':
        if (reco) {
          message = `🎉 Awesome! Let's lock in the order from **${reco.restaurant.name}**! I'll put together the final order with everyone's dishes. Just a sec…`;
          action  = 'finalize_order';
        } else {
          message = `Hmm, we haven't picked a restaurant yet! Let me find the best options first, then we can finalize. 🍽️`;
        }
        break;

      /* ---- Delivery time ---- */
      case 'delivery_time':
        if (reco && reco.restaurant.deliveryTime) {
          message = `🕐 ${reco.restaurant.name} typically delivers in about ${reco.restaurant.deliveryTime} minutes. ` +
            `So your food should arrive by around ${estimateArrival(reco.restaurant.deliveryTime)}!`;
        } else {
          message = `🕐 Most restaurants deliver within 25–45 minutes. Once we pick a place, I can give you a more precise estimate!`;
        }
        break;

      /* ---- Thanks ---- */
      case 'thanks':
        message = `You're welcome! ${pick(FOOD_EMOJIS)} That's what I'm here for. Enjoy your meal, everyone! 🎉`;
        break;

      /* ---- Help ---- */
      case 'help':
        message =
          `🤖 Here's how I can help:\n\n` +
          `1️⃣ Tell me each person's food preferences\n` +
          `2️⃣ I'll find restaurants that work for everyone\n` +
          `3️⃣ I'll suggest dishes for each member\n` +
          `4️⃣ We finalize the order and split costs\n\n` +
          `You can also ask about budgets, dietary needs, menus, or delivery times. Just type naturally — I understand! 😊`;
        break;

      /* ---- General / fallback ---- */
      default: {
        const sentiment = sentimentScore(userMessage);
        const keywords  = extractKeywords(userMessage);

        // Check if there's food-related content
        const foodRelated = keywords.some((kw) =>
          Object.values(CUISINE_KEYWORDS).flat().includes(kw)
        );

        if (foodRelated) {
          message = `${pick(FOOD_EMOJIS)} Ooh, sounds delicious! I've noted: "${keywords.join(', ')}". ` +
            `Want me to find restaurants that serve these?`;
          action = 'update_preferences';
          data   = { keywords };
        } else if (sentiment > 0.2) {
          message = `Love the enthusiasm! ${pick(FOOD_EMOJIS)} Let's channel that into finding an amazing meal for the group!`;
        } else if (sentiment < -0.2) {
          message = `I hear you! Let me see if I can find something that works better. Any specific preferences or restrictions I should know about? 🤔`;
        } else {
          message = `Got it! ${pick(FOOD_EMOJIS)} Anything else you'd like me to consider for the group order?`;
        }
        break;
      }
    }

    return { message, action, data };
  }

  /**
   * Helper: estimate an arrival time string from minutes.
   * @private
   */
  function estimateArrival(minutes) {
    const arrival = new Date(Date.now() + minutes * 60000);
    return arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


  /* ──────────────────────────────────────────────
   *  6.  ASSEMBLE FINAL ORDER
   * ────────────────────────────────────────────── */

  /**
   * Creates a structured final order with per-person breakdown.
   *
   * @param {Object} recommendation — one entry from findConsensus()
   * @param {Array<Object>} members
   * @returns {Object} orderSummary
   */
  function assembleFinalOrder(recommendation, members) {
    const rest     = recommendation.restaurant;
    const items    = recommendation.suggestedItems || [];
    const memberOrders = [];
    let grandTotal = 0;

    members.forEach((member) => {
      const si = items.find(x => x.memberName === member.name) || { itemsList: [], totalPrice: 0 };
      const memberItems = si.itemsList || [];
      const subtotal    = si.totalPrice || 0;
      grandTotal += subtotal;

      memberOrders.push({
        memberName: member.name,
        items: memberItems,
        subtotal,
      });
    });

    // Platform & delivery charges (simulated)
    const deliveryFee   = rest.deliveryTime <= 25 ? 0 : 30;
    const platformFee   = 10;
    const gstPercent    = 5;
    const gst           = Math.round(grandTotal * gstPercent / 100);
    const totalWithTaxes = grandTotal + deliveryFee + platformFee + gst;

    // Per-person split (equal)
    const perPerson = Math.ceil(totalWithTaxes / members.length);

    return {
      restaurant: {
        name:         rest.name,
        rating:       rest.rating,
        deliveryTime: rest.deliveryTime,
        cuisines:     rest.cuisines,
      },
      memberOrders,
      billing: {
        itemsTotal:  grandTotal,
        deliveryFee,
        platformFee,
        gst,
        grandTotal:  totalWithTaxes,
        perPerson,
        splitMethod: 'equal',
      },
      estimatedDelivery: `${rest.deliveryTime || 30} min`,
      orderTime:         new Date().toLocaleString(),
      summary:
        `🎉 Order placed at **${rest.name}**!\n\n` +
        memberOrders
          .map((mo) => `• ${mo.memberName}: ${mo.items.map((i) => i.name).join(', ')} — ₹${mo.subtotal}`)
          .join('\n') +
        `\n\n💰 Total: ₹${totalWithTaxes} (₹${perPerson} per person)\n` +
        `🕐 ETA: ${rest.deliveryTime || 30} min`,
    };
  }


  /* ──────────────────────────────────────────────
   *  PUBLIC API
   * ────────────────────────────────────────────── */

  return {
    analyzePreferences,
    findConsensus,
    generateRecommendationText,
    handleConflict,
    generateChatResponse,
    assembleFinalOrder,

    // Expose helpers for external use / testing
    _helpers: {
      extractKeywords,
      sentimentScore,
      detectIntent,
      normalise,
      delay,
    },
  };
})();
