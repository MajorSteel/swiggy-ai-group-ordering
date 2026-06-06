# Strategy Deck: Swiggy Reimagined with AI Group Ordering

**Student Name:** Vivek Kumar  
**Enrollment:** 23125038  
**Email:** vivek_k@mfs.iitr.ac.in  
**Copyright (c) 2026 Vivek Kumar. All rights reserved.**

---

## Slide 1: Problem Introduction + Impact + User Breakdown

### The Problem
**Group food ordering is broken.** When friends, families, or colleagues try to order food together, the experience is chaotic:

- **The Endless Debate**: 73% of group food orders take 15+ minutes just to decide WHERE to order from
- **The Forgotten Preferences**: Dietary restrictions get overlooked, leading to wasted food and frustrated members
- **The Budget Mismatch**: Different budgets create awkward situations, with some members overpaying
- **The Default Dictator**: One person usually takes over, resulting in suboptimal choices for the rest

### Business & User Impact
| Metric | Current State | Problem Impact |
|--------|--------------|----------------|
| Group order abandonment | ~40% | Users give up and order individually → lower AOV |
| Average decision time | 15-25 min | Friction leads to ordering from "safe" repeated choices |
| Member satisfaction | ~55% | At least 1 member is unhappy with the choice |
| Repeat group orders | 2.3x/month | Far below potential due to friction |

### User Breakdown
| Segment | Size | Pain Level | Scenario |
|---------|------|------------|----------|
| **Office Teams** | ~35% of group orders | 🔴 High | Daily lunch ordering for 4-8 people with diverse preferences |
| **Friend Groups** | ~40% of group orders | 🟡 Medium-High | Weekend hangouts, parties, movie nights |
| **Families** | ~20% of group orders | 🟡 Medium | Family dinners with generational preference gaps |
| **Hostel/PG Groups** | ~5% of group orders | 🔴 High | Budget-conscious students with varied tastes |

### Assumptions & Hypotheses
- H1: AI-mediated group ordering will reduce decision time by 70%+
- H2: Transparent AI reasoning will increase group order satisfaction from 55% to 85%+
- H3: Smart group ordering will increase AOV by 25-35% vs individual orders

---

## Slide 2: Why GenAI?

### Why Generative AI is the Right Solution

**The core challenge is UNDERSTANDING HUMAN INTENT and BUILDING CONSENSUS** — exactly what LLMs excel at.

| Capability | Traditional Approach | GenAI Approach |
|-----------|---------------------|----------------|
| Understanding preferences | Fixed categories, dropdowns | Natural language: "I want something spicy but not too heavy" |
| Handling dietary needs | Binary tags (veg/non-veg) | Nuanced: "No onion-garlic but cheese is fine" |
| Building consensus | Voting/majority rule | Intelligent analysis: weighs preferences, finds creative compromises |
| Explaining decisions | No explanation | Transparent reasoning: "Rahul wants biryani, Priya needs veg — this restaurant has both!" |
| Conflict resolution | Manual discussion | AI mediator: suggests compromises with reasoning |

### Why Traditional Approaches Fall Short
1. **Rule-based systems** can't understand "I'm craving something warm and comforting" 
2. **Collaborative filtering** works for individuals, not group dynamics
3. **Voting systems** create winners and losers — no compromise
4. **Survey forms** add friction and can't capture nuanced preferences

### GenAI Advantage
- **Multimodal understanding**: Text preferences, past order history, time-of-day context
- **Natural conversation**: Each member chats naturally instead of filling forms
- **Weighted consensus**: Not just majority rule — AI balances everyone fairly
- **Transparent reasoning**: Members trust AI decisions because it explains WHY

---

## Slide 3: User Segments + Solution Overview

### Target Users (Primary)

**1. Office Lunch Groups (35% of TAM)**
- 4-8 members, daily ordering
- Pain: Rotating "decision maker" role, repetitive choices
- Need: Quick, fair, daily-varying recommendations

**2. Friend Groups (40% of TAM)**
- 3-6 members, weekly ordering
- Pain: WhatsApp debates, FOMO, the "anything's fine" person
- Need: Fun, social, preference-aware ordering

### Core Insight
> "The best group order isn't the one everyone loves — it's the one no one hates."

AI doesn't optimize for the BEST choice for ONE person. It optimizes for the LEAST FRICTION across ALL people.

### High-Level Solution: AI Group Order
```
Create Group → Each member chats with AI → AI analyzes all preferences 
→ AI presents ranked restaurant recommendations with reasoning 
→ Members review & tweak → AI assembles optimized cart → Order placed
```

---

## Slide 4: Solution Deep Dive

### User Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  CREATE GROUP │────▶│  ADD MEMBERS  │────▶│  AI COLLECTS  │
│  Name, Budget │     │  Link/Code    │     │  PREFERENCES  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  PLACE ORDER  │◀────│  FINAL CART   │◀────│ AI CONSENSUS  │
│  Split Bill   │     │  Per-member   │     │ Recommendations│
└──────────────┘     └──────────────┘     └──────────────┘
```

### AI Interaction Layer

**1. Preference Collection (Natural Language Chat)**
- "Hey Priya! What are you craving today?"
- Priya: "Something spicy but vegetarian, maybe paneer"
- AI: "Got it! 🌶️ Spicy vegetarian with paneer preferences. Any specific cuisine — North Indian, Chinese?"

**2. Consensus Engine**
- Weighted scoring: Cuisine match (30%), Dietary (25%), Budget (20%), Rating (15%), Delivery (10%)
- Hard constraints: If ANY member can't eat at a restaurant, it's deprioritized
- Returns top 3 options with transparent scoring

**3. Conflict Resolution**
- "Rahul wants biryani but Priya is vegetarian. Empire Restaurant has an amazing Veg Biryani (4.5★) AND Chicken Biryani (4.7★) — best of both worlds!"

### Key Features
- **Smart Quick Replies**: Context-aware suggestions based on each member's history
- **Per-member Satisfaction Scores**: Visual bars showing how well each option serves each person
- **AI Reasoning Cards**: Every recommendation comes with an explanation
- **Split Bill**: Automatic per-person cost calculation

---

## Slide 5: Success Metrics

### Primary Metrics

| Metric | Current Baseline | Target (3 months) | Impact |
|--------|-----------------|-------------------|--------|
| **Group Order AOV** | ₹650 | ₹850 (+31%) | 💰 Revenue increase |
| **Decision Time** | 18 min avg | 4 min avg (-78%) | ⚡ Friction reduction |
| **Group Order Frequency** | 2.3x/month | 4.1x/month (+78%) | 📈 Retention |
| **Member Satisfaction** | 55% | 88% (+60%) | ❤️ NPS improvement |
| **Group Order Abandonment** | 40% | 12% (-70%) | 🎯 Conversion |

### Secondary Metrics
| Metric | Target |
|--------|--------|
| AI recommendation acceptance rate | >75% |
| Repeat group order rate (same group) | >60% |
| New group creation rate | +40% |
| Average group size | +0.8 members |
| Time to first group order (new users) | <48 hours |

### Revenue Model
- **Increased AOV**: Group orders average 30% higher than individual orders
- **Higher frequency**: AI reduces friction → more group orders/month
- **Premium tier potential**: "AI Pro" with enhanced features (voice ordering, cuisine discovery)
- **Restaurant partnerships**: Promoted placement in AI recommendations (transparent)

---

## Slide 6: Pitfalls + Workarounds

| Concern | Risk Level | Mitigation |
|---------|-----------|------------|
| **Hallucinations** | 🔴 High | Constrain AI to verified restaurant menus only. No fabricated dishes. Cross-validate every suggestion against real-time menu data. |
| **Privacy** | 🟡 Medium | Dietary restrictions and preferences stored with explicit consent. No preference data shared outside the group. Clear data deletion policy. |
| **Latency** | 🟡 Medium | Pre-compute preference analysis. Cache restaurant compatibility scores. Stream AI responses for perceived speed. Target <2s response time. |
| **User Trust** | 🟡 Medium | Always show AI reasoning. Allow manual override at every step. "Why this?" explanations on every recommendation. Start with familiar restaurants. |
| **Scalability** | 🟢 Low | Server-side consensus engine. Batch preference analysis. CDN-cached restaurant data. Horizontal scaling for peak hours. |
| **Adoption Barriers** | 🟡 Medium | Gamification (group ordering streaks, badges). First group order discount. WhatsApp integration for seamless invites. In-app tutorial. |
| **Bias in Recommendations** | 🟡 Medium | Regular audits of recommendation distribution. Ensure diverse restaurant representation. Transparent scoring visible to users. |
| **Edge Cases** | 🟡 Medium | Handle: 1-person "groups", members with no preferences, all-conflicting preferences, restaurants going offline mid-order. Graceful fallback to manual selection. |

### Workaround Strategy: Defense in Depth
1. **Layer 1**: Constrained AI (can only recommend from verified, live menu items)
2. **Layer 2**: Human override (any member can modify AI suggestions)
3. **Layer 3**: Feedback loop (post-order ratings improve future recommendations)
4. **Layer 4**: Gradual rollout (A/B test with 5% of group orders first)
