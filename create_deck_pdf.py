# Name: Vivek Kumar 
# Enroll: 23125038
# Email: vivek_k@mfs.iitr.ac.in
# Copyright (c) 2026 Vivek Kumar. All rights reserved.

import os
from fpdf import FPDF

class SlideDeck(FPDF):
    def header(self):
        # Top branding header accent bar (Swiggy Orange)
        self.set_fill_color(252, 128, 25) # Swiggy Orange
        self.rect(0, 0, 297, 13, 'F')
        
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'B', 9.5)
        self.set_y(3.5)
        self.set_x(10)
        self.cell(140, 6, "SWIGGY REIMAGINED  |  AI GROUP ORDERING CASE DECK", align='L')
        self.set_x(147)
        self.cell(140, 6, "Vivek Kumar (23125038) | vivek_k@mfs.iitr.ac.in", align='R')
        
    def footer(self):
        # Bottom Charcoal border bar
        self.set_fill_color(27, 33, 50) # Swiggy Charcoal
        self.rect(0, 203, 297, 7, 'F')
        
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'I', 7.5)
        self.set_y(203.5)
        self.set_x(10)
        self.cell(140, 5, f"Slide {self.page_no()} of 6  |  Copyright (c) 2026 Vivek Kumar. All rights reserved.", align='L')
        self.set_x(147)
        self.cell(140, 5, "Open Project 2026 Strategy Submission (NotebookLM Verified)   ", align='R')

    def slide_title(self, title):
        self.set_y(18)
        self.set_text_color(27, 33, 50)
        self.set_font('Helvetica', 'B', 18)
        self.cell(0, 8, title, ln=True)
        self.ln(2)

    def draw_card(self, x, y, w, h, title, bg_color=(248, 249, 250), border_color=(220, 224, 230)):
        # 1. Draw Card Background
        self.set_fill_color(*bg_color)
        self.set_draw_color(*border_color)
        self.set_line_width(0.3)
        self.rect(x, y, w, h, 'DF')
        
        # 2. Draw Orange Left Border Accent
        self.set_fill_color(252, 128, 25)
        self.rect(x, y, 1.5, h, 'F')
        
        # 3. Draw Card Title
        self.set_xy(x + 5, y + 4)
        self.set_text_color(27, 33, 50)
        self.set_font('Helvetica', 'B', 11)
        self.cell(w - 10, 5, title, ln=True)
        
        # Draw small separator line
        self.set_draw_color(232, 236, 240)
        self.set_line_width(0.2)
        self.line(x + 5, y + 10, x + w - 5, y + 10)
        
        # Restore position inside card
        self.set_xy(x + 5, y + 12)

    def draw_bullet(self, card_x, bold_text, reg_text, width_limit, line_height=4.2):
        self.set_x(card_x + 5)
        self.set_font('Helvetica', 'B', 8.5)
        self.set_text_color(252, 128, 25)
        self.cell(3, line_height, "-", ln=False)
        self.set_text_color(27, 33, 50)
        
        # Save old left margin and set temporary margin for multi_cell wrapping
        old_margin = self.l_margin
        self.l_margin = card_x + 8
        
        # Calculate width of bold prefix
        b_width = self.get_string_width(bold_text) + 1
        
        # Draw the bold prefix and regular body text
        if b_width < width_limit - 12:
            self.cell(b_width, line_height, bold_text, ln=False)
            self.set_font('Helvetica', '', 8.5)
            self.multi_cell(width_limit - 3 - b_width, line_height, reg_text)
        else:
            self.cell(width_limit - 5, line_height, bold_text, ln=True)
            self.set_x(card_x + 8)
            self.set_font('Helvetica', '', 8.5)
            self.multi_cell(width_limit - 8, line_height, reg_text)
            
        # Restore original margin
        self.l_margin = old_margin
        self.ln(1)

    def draw_row(self, x, widths, texts, aligns, is_header=False, line_height=4.2):
        # 1. Determine max lines
        max_lines = 1
        for w, t in zip(widths, texts):
            lines = self.multi_cell(w, line_height, t, dry_run=True, output='LINES')
            if len(lines) > max_lines:
                max_lines = len(lines)
        
        # Enforce minimum row height of 7.5mm for better cell spacing/padding
        row_h = max(max_lines * line_height, 7.5)
        
        # 2. Draw backgrounds, borders, and text
        y = self.get_y()
        curr_x = x
        self.set_draw_color(200, 204, 212)
        
        for w, t, align in zip(widths, texts, aligns):
            self.set_xy(curr_x, y)
            if is_header:
                self.set_fill_color(235, 238, 243)
                self.cell(w, row_h, "", border=1, ln=0, fill=True)
            else:
                self.cell(w, row_h, "", border=1, ln=0)
            
            # Print text centered vertically in cell
            lines = self.multi_cell(w, line_height, t, dry_run=True, output='LINES')
            text_h = len(lines) * line_height
            offset_y = (row_h - text_h) / 2
            
            self.set_xy(curr_x, y + offset_y)
            
            # Font size and weight
            self.set_font('Helvetica', 'B' if is_header else '', 8.5 if is_header else 8)
            
            # Custom text coloring for key words
            if t == "High":
                self.set_text_color(220, 50, 50)
                self.set_font('Helvetica', 'B', 8)
            elif t == "Medium":
                self.set_text_color(200, 120, 20)
                self.set_font('Helvetica', 'B', 8)
            else:
                self.set_text_color(27, 33, 50)
                
            self.multi_cell(w, line_height, t, border=0, align=align)
            curr_x += w
            
        self.set_xy(x, y + row_h)

# Initialize FPDF
pdf = SlideDeck(orientation='landscape', unit='mm', format='A4')
pdf.set_margins(10, 15, 10)
pdf.set_auto_page_break(False)

# ====================================================
# SLIDE 1: Problem Introduction + Impact + User Breakdown
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 1: Problem Introduction, Impact & User Breakdown")

# Card 1: Left Top (THE CORE GROUP ORDERING PROBLEM)
pdf.draw_card(10, 28, 135, 81, "THE GROUP ORDERING PAIN POINTS")
pdf.draw_bullet(10, "The Endless Debate:", "73% of groups take 15+ minutes just to decide WHERE to order from because consensus is hard to reach.", 125)
pdf.draw_bullet(10, "Forgotten Preferences:", "Dietary restrictions (e.g. allergies, pure veg) get overlooked, leading to wasted food and guest frustration.", 125)
pdf.draw_bullet(10, "The Budget Mismatch:", "Different budgets create awkward ordering dynamics, with junior members often overpaying.", 125)
pdf.draw_bullet(10, "The Default Dictator:", "One host takes over, resulting in individual choices that leave other members unsatisfied.", 125)

# Card 2: Left Bottom (RESEARCH HYPOTHESES)
pdf.draw_card(10, 115, 135, 81, "CORE ASSUMPTIONS & HYPOTHESES")
pdf.draw_bullet(10, "H1: Decision Speed:", "AI-mediated group ordering will reduce final checkout decision times by 70%+.", 125)
pdf.draw_bullet(10, "H2: Trust & Satisfaction:", "Transparent AI consensus will increase group satisfaction scores from 55% to 85%+.", 125)
pdf.draw_bullet(10, "H3: Commercial Value:", "Smart group recommendation cards will drive a 25-35% uplift in Average Order Value (AOV).", 125)
pdf.ln(1)
pdf.set_font('Helvetica', 'I', 8)
pdf.set_text_color(100, 100, 100)
pdf.set_x(15)
pdf.multi_cell(125, 4.5, "Insight: Shifting the cognitive load of decision-making from the user to the AI agent eliminates choice paralysis completely.")

# Card 3: Right Top (BUSINESS & USER IMPACT METRICS)
pdf.draw_card(152, 28, 135, 81, "BUSINESS & USER IMPACT METRICS")
# Draw table inside Card 3
pdf.draw_row(157, [48, 24, 53], ["Metric", "Current State", "Problem Impact"], ['L', 'C', 'L'], is_header=True)

data_metrics = [
    ("Group order abandonment", "~40%", "Lower AOV & high checkout cart drops"),
    ("Average decision time", "15-25 min", "Ordering from safe, repetitive choices"),
    ("Member satisfaction", "~55%", "At least one member is unhappy with the choice"),
    ("Repeat group orders", "2.3x/month", "Suboptimal frequency due to high friction")
]
for row in data_metrics:
    pdf.draw_row(157, [48, 24, 53], [row[0], row[1], row[2]], ['L', 'C', 'L'])

pdf.ln(1.5)
pdf.set_font('Helvetica', 'I', 7.5)
pdf.set_text_color(100, 100, 100)
pdf.set_x(157)
pdf.multi_cell(125, 4, "*Note: High abandonment directly reduces Swiggy's potential AOV conversion rate and increases platform acquisition costs.", align='L')

# Card 4: Right Bottom (USER SEGMENTS BREAKDOWN)
pdf.draw_card(152, 115, 135, 81, "TARGET USER SEGMENTS BREAKDOWN")
# Draw table inside Card 4
pdf.draw_row(157, [30, 20, 20, 55], ["Segment", "TAM Share", "Pain Level", "Key Scenario & Need"], ['L', 'C', 'C', 'L'], is_header=True)

segments = [
    ("Office Teams", "35% Share", "High", "Daily office lunch for 4-8 colleagues"),
    ("Friend Groups", "40% Share", "Medium-High", "Weekend hangouts, parties & movie nights"),
    ("Families", "20% Share", "Medium", "Dinners with strict multi-generation diet gaps"),
    ("PG / Hostels", "5% Share", "High", "Budget-conscious students sharing bills")
]
for row in segments:
    pdf.draw_row(157, [30, 20, 20, 55], [row[0], row[1], row[2], row[3]], ['L', 'C', 'C', 'L'])

pdf.ln(1)
pdf.set_font('Helvetica', 'I', 7.5)
pdf.set_text_color(100, 100, 100)
pdf.set_x(157)
pdf.multi_cell(125, 4, "Key Focus: GenAI consensus caters specifically to the Office and Friend segments, which represent 75% of the total addressable market.", align='L')


# ====================================================
# SLIDE 2: Why GenAI?
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 2: Why Generative AI?")

# Card 1: Top Column (COMPARATIVE TECHNOLOGY MATRIX) - Fills top half
pdf.draw_card(10, 28, 277, 81, "TECHNOLOGY COMPARISON: TRADITIONAL SYSTEMS VS. GENERATIVE AI")
pdf.draw_row(15, [42, 110, 115], ["Capability", "Traditional Rules-Based Systems (Static ML)", "Generative AI Agent Approach (Consensus Engine)"], ['L', 'L', 'L'], is_header=True)

comparison = [
    ("Preference Capture", "Relies on fixed filters, tags, and static dropdown menus. Cannot parse unstructured custom requests or descriptive cravings.", "Natural Language Processing parses complex sentences like 'I want something spicy but not too heavy' or 'comfort food' directly."),
    ("Dietary Constraints", "Limits selections strictly to binary tags (e.g. Veg/Non-veg). Ignores complex ingredient exclusions.", "Context-aware: Recognizes granular constraints like 'No onion-garlic, but dairy cheese and ghee are perfectly fine for us'."),
    ("Consensus Building", "Imposes standard majority voting or default hosts' choices, creating unhappy members and higher cart drop rates.", "Intelligent multi-objective optimization: weighs constraint matches across all users to select the most compatible venue."),
    ("Decision Transparency", "No explanations provided. Users cannot see why a specific restaurant was suggested, leading to trust gaps.", "Generates transparent, personalized natural explanations: 'Rahul gets Spicy Chicken Biryani, Priya gets Veg Biryani'.")
]
for row in comparison:
    pdf.draw_row(15, [42, 110, 115], [row[0], row[1], row[2]], ['L', 'L', 'L'])

# Card 2: Bottom Left (TRADITIONAL LIMITATIONS)
pdf.draw_card(10, 115, 135, 81, "WHY TRADITIONAL APPROACHES ARE INSUFFICIENT")
pdf.draw_bullet(10, "Static Interfaces:", "Users experience click-fatigue when forced to fill out repetitive multi-step forms just to express dinner cravings.", 125)
pdf.draw_bullet(10, "Collaborative Filtering Limits:", "Traditional recommendation models only optimize for individual habits, completely failing in dynamic group dynamics.", 125)
pdf.draw_bullet(10, "Zero-compromise Voting:", "Standard voting creates winners and losers, leading to cart dropouts or friction among friends.", 125)
pdf.draw_bullet(10, "Form Fatigue:", "Static forms add friction and fail to capture conversational, contextual, or mood-based preference nuances.", 125)

# Card 3: Bottom Right (GENAI ADVANTAGES)
pdf.draw_card(152, 115, 135, 81, "THE VALUE PROPOSITION OF GENERATIVE AI")
pdf.draw_bullet(152, "Nuanced Semantic Search:", "GenAI reads between the lines of human craving declarations, matching dish descriptions to complex user moods.", 125)
pdf.draw_bullet(152, "Conversational Interface:", "Replaces complex surveys with simple chat loops, making input fast, social, and intuitive.", 125)
pdf.draw_bullet(152, "Soft & Hard Constraint Balancing:", "Weighs dietary needs as hard limits while treating budget thresholds as soft guidelines.", 125)
pdf.draw_bullet(152, "Transparent Reasoning:", "Surfacing AI explanations (why this venue is recommended) reduces group friction and builds strong system trust.", 125)


# ====================================================
# SLIDE 3: User Segments + Solution Overview
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 3: User Segments & Solution Overview")

# Card 1: Left Column (TARGET PERSONAS IN DETAIL) - Fills left half
pdf.draw_card(10, 28, 135, 168, "TARGET PERSONAS & DOCK PROFILES")
pdf.draw_bullet(10, "Office Teams (35% Share):", " Colleagues ordering daily. Host rotation is highly frustrating; selection is slow due to diverse dietary restrictions. Require speed, fairness, and variety.", 125)
pdf.ln(1.5)
pdf.draw_bullet(10, "Friend Groups (40% Share):", " Friends ordering for weekend movie nights. Social friction from long WhatsApp debates and decision delays. Require an interactive, engaging flow.", 125)
pdf.ln(1.5)
pdf.draw_bullet(10, "Families (20% Share):", " Multi-generational families ordering dinners. Severe preference splits between health-oriented parents and kids' fast-food cravings. Require safety checks.", 125)
pdf.ln(1.5)
pdf.draw_bullet(10, "PG & Hostel Groups (5% Share):", " Roommates splitting weekend meals. Extremely budget-conscious. Require transparent per-person splitting to avoid payment friction.", 125)
pdf.ln(2)
pdf.set_font('Helvetica', 'I', 8)
pdf.set_text_color(100, 100, 100)
pdf.set_x(15)
pdf.multi_cell(125, 4.2, "Strategy: By mapping conversational preferences to strict dietary tags, the AI Consensus engine meets the safety needs of families and the speed demands of office teams.")

# Card 2: Right Top (CORE INSIGHT CALLOUT BOX)
pdf.draw_card(152, 28, 135, 54, "CORE DESIGN INSIGHT")
# Quote block
pdf.set_fill_color(254, 240, 229) # Very light Swiggy Orange tint
pdf.rect(157, 40, 125, 36, 'F')
pdf.set_xy(160, 43)
pdf.set_font('Helvetica', 'B', 9.5)
pdf.set_text_color(252, 128, 25)
pdf.cell(0, 5, "THE GROUP CONSENSUS PHILOSOPHY", ln=True)
pdf.set_font('Helvetica', 'I', 9)
pdf.set_text_color(27, 33, 50)
pdf.set_x(160)
pdf.multi_cell(120, 4.5, '"The best group order isn\'t the one everyone loves - it is the one that no one hates. GenAI minimizes group friction rather than maximizing individual bias."')

# Card 3: Right Bottom (DORAEMON-INSPIRED GADGETS) - Fills right bottom
pdf.draw_card(152, 88, 135, 108, "AI GADGETS TOOLKIT (DORAEMON METAPHOR)")
pdf.draw_bullet(152, "Consensus Bread (AI Recommendations):", "Processes all members' preferences to output the optimal dining venue matching everyone's constraints.", 125)
pdf.draw_bullet(152, "Cravings Megaphone (NLP Cravings Parser):", "Translates unstructured speech (like 'something spicy but light') into clean catalog search tags.", 125)
pdf.draw_bullet(152, "Group Cart Copier (Auto-Cart Assembly):", "Automatically populates individual items for each user, removing checkout errors.", 125)
pdf.draw_bullet(152, "Equal Split Wallet (Split-Bill System):", "Dynamically splits final totals (taxes, fees, and items) to resolve reimbursement arguments.", 125)


# ====================================================
# SLIDE 4: Solution Deep Dive
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 4: Solution Deep Dive & Product Flows")

# Card 1: Top Row (VISUAL CORE USER FLOW) - Fills top section
pdf.draw_card(10, 28, 277, 40, "STEP-BY-STEP USER INTERACTION FLOW")

flow_steps = [
    ("1. CREATE GROUP", "Host sets name/budget", 10, 41),
    ("2. ADD MEMBERS", "Invite code/link share", 66, 41),
    ("3. AI COLLECT PREFS", "Conversational loops", 122, 41),
    ("4. AI CONSENSUS", "Top picks + reasoning", 178, 41),
    ("5. CART / BILL SPLIT", "One-click checkout", 234, 41)
]
for name, desc, x_pos, y_pos in flow_steps:
    pdf.set_fill_color(240, 243, 246)
    pdf.set_draw_color(200, 204, 212)
    pdf.rect(x_pos, y_pos, 44, 18, 'DF')
    
    # 1. Draw Title
    pdf.set_xy(x_pos + 1, y_pos + 3)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(252, 128, 25)
    pdf.cell(42, 4, name, align='C')
    
    # 2. Draw Description
    pdf.set_xy(x_pos + 1, y_pos + 9)
    pdf.set_font('Helvetica', '', 7.5)
    pdf.set_text_color(27, 33, 50)
    pdf.cell(42, 4, desc, align='C')
    
    # Draw arrow to next step if not final
    if x_pos < 234:
        pdf.set_xy(x_pos + 44, y_pos + 6)
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(150, 150, 150)
        pdf.cell(12, 5, "-->", align='C')

# Card 2: Bottom Left (AI INTERACTION LAYER)
pdf.draw_card(10, 74, 135, 122, "THE AI INTERACTION LAYER")
pdf.draw_bullet(10, "Semantic Cravings Parsing:", " AI reads unstructured phrases (e.g. 'something hot and soupy') and maps them directly to menu item tags.", 125)
pdf.draw_bullet(10, "Hard Constraints Filtering:", " Dietary boundaries (allergies, pure veg, religious rules) act as absolute binary search filters to keep recommendations 100% safe.", 125)
pdf.draw_bullet(10, "Conflict Resolution Algorithm:", " If user preferences conflict (e.g. pizza vs curry), the AI searches menus containing top-rated items for both tastes.", 125)
pdf.draw_bullet(10, "Dynamic Persona Weights:", " Weighs individual member requests against group profiles to prevent repetitive restaurant choices over time.", 125)

# Card 3: Bottom Right (KEY PRODUCT FEATURES & UX)
pdf.draw_card(152, 74, 135, 122, "KEY PRODUCT FEATURES & UX ENHANCEMENTS")
pdf.draw_bullet(152, "Smart Quick Replies:", " AI dynamically offers context-aware replies matching user order histories, allowing one-click preferences submission.", 125)
pdf.draw_bullet(152, "Satisfaction Compatibility Bars:", " Clean UI indicators show users exactly how compatible each restaurant suggestion is with each member's taste.", 125)
pdf.draw_bullet(152, "Auto-Cart Construction:", " AI automatically adds selected dishes for all group members, completely eliminating manual order coordination errors.", 125)
pdf.draw_bullet(152, "Transparent Split Receipt:", " Displays individual breakdowns (subtotal, delivery, taxes) and split contributions directly on the final payment page.", 125)


# ====================================================
# SLIDE 5: Success Metrics
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 5: Success Metrics & Business Goals")

# Card 1: Left Column (KPI TABLE) - Fills left half
pdf.draw_card(10, 28, 135, 168, "PRIMARY KEY PERFORMANCE INDICATORS (KPIS)")
pdf.draw_row(15, [40, 22, 22, 41], ["Success Metric", "Baseline", "Target", "Business Impact"], ['L', 'C', 'C', 'L'], is_header=True)

kpis = [
    ("Group Order AOV", "Rs. 650 avg", "Rs. 850 (+31%)", "Higher basket sizes & revenue conversion"),
    ("Decision Time", "18 min avg", "4 min avg (-78%)", "Lower cart abandonment rates"),
    ("Order Frequency", "2.3x/month", "4.1x/month (+78%)", "Increased customer lifetime value (LTV)"),
    ("Member Satisfaction", "55% satisfied", "88% satisfied", "Boosts organic referral & virality"),
    ("Funnel Abandonment", "40% drops", "12% drops (-70%)", "Improves checkout conversion rates")
]
for row in kpis:
    pdf.draw_row(15, [40, 22, 22, 41], [row[0], row[1], row[2], row[3]], ['L', 'C', 'C', 'L'])

pdf.ln(1.5)
pdf.set_x(15)
pdf.set_font('Helvetica', 'I', 7.5)
pdf.set_text_color(100, 100, 100)
pdf.multi_cell(125, 4, "*Note: baseline values are pulled from traditional Swiggy group cart checkouts without conversational consensus.", align='L')

# Card 2: Right Top (SECONDARY KPIS)
pdf.draw_card(152, 28, 135, 81, "SECONDARY PRODUCT METRICS")
pdf.draw_bullet(152, "AI Recommendation Acceptance:", " Aim for >75% of groups to accept the top AI recommendation without manual overrides.", 125)
pdf.draw_bullet(152, "Invite Link Click Conversion:", " Target >50% of shared invite link recipients to join the active group session.", 125)
pdf.draw_bullet(152, "Split Bill Payment Time:", " Target all members completing equal split payments within 5 minutes of order placement.", 125)

# Card 3: Right Bottom (REVENUE GENERATION STRATEGY)
pdf.draw_card(152, 115, 135, 81, "BUSINESS REVENUE GENERATION STRATEGY")
pdf.draw_bullet(152, "Consolidated AOV Expansion:", " Group carts aggregate multiple individual orders, driving higher average order values and delivery efficiencies.", 125)
pdf.draw_bullet(152, "Sponsored Consensus Ads:", " Restaurants pay premium rates for transparent placement inside the AI recommendations grid.", 125)
pdf.draw_bullet(152, "Swiggy One Renewals:", " Bundle AI Group Ordering into Swiggy One subscriptions to drive renewal rates and lower user churn.", 125)


# ====================================================
# SLIDE 6: Pitfalls + Workarounds
# ====================================================
pdf.add_page()
pdf.slide_title("Slide 6: Pitfalls, Mitigations & Workarounds")

# Card 1: Top Row (RISKS & MITIGATIONS TABLE) - Fills top section
pdf.draw_card(10, 28, 277, 100, "RISK MATURITY ASSESSMENT & MITIGATION STRATEGY")
pdf.draw_row(15, [45, 22, 105, 95], ["Risk Concern", "Risk Level", "Mitigation Strategy", "Technical Workaround"], ['L', 'C', 'L', 'L'], is_header=True)

risks = [
    ("AI Hallucinations", "High", "Constrain recommendations strictly to active menus.", "Implement schema validation checks that block non-existent items."),
    ("Privacy & Consent", "Medium", "Keep dietary/health profiles local and encrypted.", "Enforce data encryption at rest; auto-wipe preference histories post-checkout."),
    ("Response Latency", "Medium", "Keep response delays below 2 seconds to prevent user dropouts.", "Pre-fetch compatibility metrics; run consensus processing asynchronously."),
    ("User Trust Barriers", "Medium", "Surfaces the transparent logic behind each recommendation.", "Displays a 'Why this?' breakdown mapping each member's needs explicitly."),
    ("Recommendation Bias", "Medium", "Audit recommendation scores to prevent brand favoritism.", "Equally weight all compatible restaurants before applying sponsored overlays."),
    ("Adoption Friction", "Low", "Provide single-click guest ordering via web link.", "Allow guests to join group sessions on web view without app downloads.")
]
for row in risks:
    pdf.draw_row(15, [45, 22, 105, 95], [row[0], row[1], row[2], row[3]], ['L', 'C', 'L', 'L'])

# Card 2: Bottom Row (DEFENSE IN DEPTH FRAMEWORK)
pdf.draw_card(10, 134, 277, 62, "DEFENSE-IN-DEPTH FAILSAFE SYSTEM")
pdf.set_font('Helvetica', '', 8.5)
pdf.set_text_color(27, 33, 50)
pdf.multi_cell(0, 4.5, "To ensure 100% operational reliability, the GenAI integration uses a multi-layered safety net:")
pdf.ln(1)

pdf.draw_bullet(10, "Layer 1 (Hard Boundaries):", " The LLM operates on a highly constrained prompt scope, validating all outputs against live API menu items.", 267)
pdf.draw_bullet(10, "Layer 2 (User Overrides):", " The host has final veto power. Any AI consensus card can be manually altered, overridden, or rebuilt.", 267)
pdf.draw_bullet(10, "Layer 3 (Feedback Loops):", " Post-order satisfaction ratings are logged to continuously optimize recommendation weights.", 267)

# Save the PDF presentation file
pdf.output("c:/Users/vivam/Downloads/socbiz/strategy-deck.pdf")
print("New Strategy Deck PDF generated successfully!")
