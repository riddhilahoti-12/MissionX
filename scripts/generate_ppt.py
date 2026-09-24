import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # completely blank layout

    # Palette
    BG_DARK = RGBColor(10, 15, 29)         # #0A0F1D
    BG_CARD = RGBColor(22, 32, 50)         # #162032
    BG_CARD_LIGHT = RGBColor(30, 41, 65)   # #1E2941
    CYAN = RGBColor(0, 240, 255)           # #00F0FF
    PURPLE = RGBColor(168, 85, 247)        # #A855F7
    EMERALD = RGBColor(16, 185, 129)       # #10B981
    AMBER = RGBColor(245, 158, 11)         # #F59E0B
    RED = RGBColor(239, 68, 68)            # #EF4444
    TEXT_WHITE = RGBColor(248, 250, 252)   # #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184)   # #94A3B8
    BORDER_CYAN = RGBColor(0, 180, 216)    # #00B4D8
    BORDER_SUBTLE = RGBColor(51, 65, 85)   # #334155
    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category="MISSIONX PLATFORM", subtitle_text=""):
        # Category / Breadcrumb
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = tf_cat.margin_top = tf_cat.margin_right = tf_cat.margin_bottom = 0
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = CYAN
        p_cat.font.name = "Segoe UI"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.font.name = "Segoe UI"

        if subtitle_text:
            p_sub = tf_title.add_paragraph()
            p_sub.text = subtitle_text
            p_sub.font.size = Pt(12)
            p_sub.font.color.rgb = TEXT_MUTED
            p_sub.font.name = "Segoe UI"
            p_sub.space_before = Pt(4)

    def draw_card(slide, left, top, width, height, fill_color=BG_CARD, border_color=BORDER_SUBTLE):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = fill_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1)
        else:
            card.line.fill.background()
        return card

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Hero)
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    apply_bg(s1)

    # Accent decorative glow bar
    glow = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(1.5), Inches(0.08))
    glow.fill.solid()
    glow.fill.fore_color.rgb = CYAN
    glow.line.fill.background()

    # Badge: 100% Software Online Game
    badge = draw_card(s1, Inches(0.8), Inches(1.45), Inches(3.8), Inches(0.4), BG_CARD_LIGHT, CYAN)
    tf_b = badge.text_frame
    tf_b.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_b = tf_b.paragraphs[0]
    p_b.text = "★ 100% PURE SOFTWARE WEB GAME (ZERO HARDWARE)"
    p_b.alignment = PP_ALIGN.CENTER
    p_b.font.size = Pt(10)
    p_b.font.bold = True
    p_b.font.color.rgb = CYAN
    p_b.font.name = "Segoe UI"

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(2.0), Inches(11.7), Inches(2.0))
    tf = t_box.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "MissionX"
    p1.font.size = Pt(56)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE
    p1.font.name = "Segoe UI"

    p2 = tf.add_paragraph()
    p2.text = "AI-Powered Educational 3D Escape Room Platform"
    p2.font.size = Pt(28)
    p2.font.bold = True
    p2.font.color.rgb = CYAN
    p2.font.name = "Segoe UI"
    p2.space_before = Pt(8)

    p3 = tf.add_paragraph()
    p3.text = "Transforming Higher Computer Science Education Through Immersive, Gamified Web Simulation"
    p3.font.size = Pt(15)
    p3.font.color.rgb = TEXT_MUTED
    p3.font.name = "Segoe UI"
    p3.space_before = Pt(10)

    # 4 Feature Pills at bottom
    pills = [
        ("Next.js 14 & Three.js 3D", "Interactive WebGL Rooms"),
        ("Real-Time Multiplayer", "Sub-15ms WebSocket Sync"),
        ("Dual AI LLM Mentorship", "OpenAI GPT-4o & Gemini"),
        ("ABET CO1-CO6 Aligned", "Automated Skill Radar Reports")
    ]
    p_w = Inches(2.7)
    p_gap = Inches(0.3)
    p_left = Inches(0.8)
    p_top = Inches(4.9)
    for title, desc in pills:
        card = draw_card(s1, p_left, p_top, p_w, Inches(1.4), BG_CARD, BORDER_SUBTLE)
        tf_c = card.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_right = Inches(0.2)
        tf_c.margin_top = Inches(0.2)
        p_t = tf_c.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = CYAN
        p_t.font.name = "Segoe UI"
        p_d = tf_c.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.font.name = "Segoe UI"
        p_d.space_before = Pt(4)
        p_left += p_w + p_gap

    # Footer
    foot = s1.shapes.add_textbox(Inches(0.8), Inches(6.7), Inches(11.7), Inches(0.4))
    p_foot = foot.text_frame.paragraphs[0]
    p_foot.text = "Course Alignment: 25SC2008E (Full Stack Web Development) • Zero Hardware Required • Runs in Modern Browsers"
    p_foot.font.size = Pt(11)
    p_foot.font.color.rgb = TEXT_MUTED
    p_foot.font.name = "Segoe UI"

    # -------------------------------------------------------------
    # SLIDE 2: Problem Statement & Motivation
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    apply_bg(s2)
    add_header(s2, "The Pedagogical Dilemma in Computer Science Education", "PROBLEM STATEMENT", 
               "Why traditional lecture-based CS education struggles to build intuitive problem-solving skills.")

    prob_cards = [
        ("01. Passive & Rote Learning", 
         "Traditional lectures and static code memorization fail to engage modern engineering students.\n\n"
         "• Theoretical concepts (A* search, B-Trees, page replacement) feel abstract and disconnected from real crises.\n"
         "• Low knowledge retention (<25%) when students only read code rather than interact with living systems.\n"
         "• High drop-off rate during complex algorithmic topics."),
        ("02. Lack of Collaborative Stakes", 
         "Standard coding assignments are solitary and lack real-time cooperative dynamics.\n\n"
         "• Students don't learn critical team engineering dynamics or distributed problem-solving.\n"
         "• No real-time pressure or urgency to make sound architectural tradeoffs.\n"
         "• Lack of synchronized multi-agent troubleshooting environments in academic curriculums."),
        ("03. Assessment & Lab Overhead Friction", 
         "Physical labs and hardware experiments are costly, brittle, and difficult to standardize.\n\n"
         "• Physical hardware (microcontrollers, breadboards) breaks frequently and demands heavy lab maintenance.\n"
         "• Instructors lack automated, real-time analytics to pinpoint where teams get stuck.\n"
         "• Subjective grading fails to measure ABET non-technical competencies (critical thinking, adaptability).")
    ]

    c_w = Inches(3.68)
    c_gap = Inches(0.32)
    c_left = Inches(0.8)
    for title, body in prob_cards:
        card = draw_card(s2, c_left, Inches(1.8), c_w, Inches(4.8), BG_CARD, BORDER_SUBTLE)
        tf_c = card.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_right = Inches(0.3)
        tf_c.margin_top = Inches(0.3)
        
        p_t = tf_c.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = AMBER
        p_t.font.name = "Segoe UI"
        
        p_b = tf_c.add_paragraph()
        p_b.text = body
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(12)
        
        c_left += c_w + c_gap

    # -------------------------------------------------------------
    # SLIDE 3: The Solution – MissionX Platform
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    apply_bg(s3)
    add_header(s3, "The MissionX Solution: 100% Web-Based 3D Escape Room", "THE SOLUTION",
               "A cloud-hosted SaaS escape room platform bridging gamified simulations, multi-agent co-op, and AI tutoring.")

    # Left Column: Overview Card
    left_card = draw_card(s3, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), BG_CARD, CYAN)
    tf_l = left_card.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_right = Inches(0.35)
    tf_l.margin_top = Inches(0.35)

    p_lt = tf_l.paragraphs[0]
    p_lt.text = "What is MissionX?"
    p_lt.font.size = Pt(20)
    p_lt.font.bold = True
    p_lt.font.color.rgb = CYAN
    p_lt.font.name = "Segoe UI"

    p_lb = tf_l.add_paragraph()
    p_lb.text = ("MissionX transforms engineering learning into an interactive web-based 3D escape room game.\n\n"
                 "Students step into the shoes of Elite Cyber Operatives racing against a digital countdown clock to resolve system-critical failures across 7+ CS domains.\n\n"
                 "✓ 100% Online & Browser-Accessible: No downloads, no physical hardware setups, no OS barriers.\n"
                 "✓ Dual Interface Model:\n"
                 "   • Student WebGL Portal: 3D rooms, algorithmic consoles & team pings.\n"
                 "   • Game Master Command Center: Real-time room surveillance & timer controls.\n"
                 "✓ Procedural Audio & Voice: Web Audio synthesizer and AI narration.")
    p_lb.font.size = Pt(12.5)
    p_lb.font.color.rgb = TEXT_WHITE
    p_lb.font.name = "Segoe UI"
    p_lb.space_before = Pt(10)

    # Right Column: 3 Pillars
    pillars = [
        ("3D WebGL Virtual Rooms", 
         "Built with Three.js rendering cyberpunk server vaults, glowing terminals, and interactive raycasted inspection nodes.", CYAN),
        ("Multiplayer Co-Op Synchronization", 
         "Socket.io synchronizes team rosters, shared stage progression, teammate inspection targets, and live team chat pings.", PURPLE),
        ("AI-Powered Mentorship & Radar Analytics", 
         "Dual LLM engine (OpenAI & Gemini) providing scaffolded hints with time penalties and automated 15-skill ABET radar certificates.", EMERALD)
    ]
    r_top = Inches(1.8)
    for title, desc, col in pillars:
        card = draw_card(s3, Inches(6.7), r_top, Inches(5.8), Inches(1.45), BG_CARD, BORDER_SUBTLE)
        tf_r = card.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = tf_r.margin_right = Inches(0.3)
        tf_r.margin_top = Inches(0.2)
        p_t = tf_r.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_d = tf_r.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11.5)
        p_d.font.color.rgb = TEXT_WHITE
        p_d.font.name = "Segoe UI"
        p_d.space_before = Pt(4)
        r_top += Inches(1.68)

    # -------------------------------------------------------------
    # SLIDE 4: Methodology & Pedagogical Framework
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    apply_bg(s4)
    add_header(s4, "Pedagogical Methodology: Experiential Learning & ABET Alignment", "METHODOLOGY",
               "Built upon established cognitive learning theories and Outcome-Based Education (OBE).")

    # Kolb's Cycle 4 Cards
    kolb_steps = [
        ("1. Concrete Experience", "Immersion in 3D crisis scenarios with ticking clocks & alarm sirens.", CYAN),
        ("2. Reflective Observation", "Analyzing error logs, failed query rollbacks, or packet collision dumps.", PURPLE),
        ("3. Conceptualization", "Formulating algorithms, calculating CIDR masks, or balancing tree nodes.", AMBER),
        ("4. Active Testing", "Executing code fixes & virtual unlocks to restore critical server vaults.", EMERALD)
    ]
    k_w = Inches(2.7)
    k_gap = Inches(0.3)
    k_left = Inches(0.8)
    for step, desc, col in kolb_steps:
        card = draw_card(s4, k_left, Inches(1.8), k_w, Inches(1.7), BG_CARD, col)
        tf_k = card.text_frame
        tf_k.word_wrap = True
        tf_k.margin_left = tf_k.margin_right = Inches(0.2)
        tf_k.margin_top = Inches(0.2)
        p_t = tf_k.paragraphs[0]
        p_t.text = step
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_d = tf_k.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_WHITE
        p_d.font.name = "Segoe UI"
        p_d.space_before = Pt(6)
        k_left += k_w + k_gap

    # Bottom Table/Card: Course Alignment with 25SC2008E (CO1 - CO6)
    co_card = draw_card(s4, Inches(0.8), Inches(3.8), Inches(11.7), Inches(2.9), BG_CARD, BORDER_SUBTLE)
    tf_co = co_card.text_frame
    tf_co.word_wrap = True
    tf_co.margin_left = tf_co.margin_right = Inches(0.3)
    tf_co.margin_top = Inches(0.25)

    p_cot = tf_co.paragraphs[0]
    p_cot.text = "Direct Mapping to Course Outcomes (25SC2008E - Full Stack Web Development)"
    p_cot.font.size = Pt(15)
    p_cot.font.bold = True
    p_cot.font.color.rgb = CYAN
    p_cot.font.name = "Segoe UI"

    co_items = [
        "• CO1 (Responsive Design & 3D Spatial Canvas): Cyberpunk glassmorphism, dynamic layouts, and Three.js WebGL rendering.",
        "• CO2 (Asynchronous DOM & Multimedia Integration): Procedural Web Audio API sound generator and Web Speech API voice synthesis.",
        "• CO3 (State Management & Analytics Visualization): React hooks, contextual team state, and 15-metric Recharts Skill Radar.",
        "• CO4 (Scalable RESTful API Architecture): Modular Express.js services, JWT auth, Helmet headers, and centralized error logging.",
        "• CO5 (Real-Time Bidirectional Event Streaming): Socket.io multi-room co-op sync and virtual MQTT telemetry bus.",
        "• CO6 (Microservices, Containerization & CI/CD): Multi-stage Docker, Kubernetes Helm charts, and automated E2E testing scripts."
    ]
    for item in co_items:
        p = tf_co.add_paragraph()
        p.text = item
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_WHITE
        p.font.name = "Segoe UI"
        p.space_before = Pt(3)

    # -------------------------------------------------------------
    # SLIDE 5: Full-Stack Technology Stack
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    apply_bg(s5)
    add_header(s5, "Comprehensive Software Architecture & Tech Stack", "TECH STACK",
               "A decoupled, modern cloud-native stack optimized for sub-15ms real-time latency.")

    tech_layers = [
        ("Frontend & Presentation Layer",
         "• Next.js 14 (App Router) & React 18: High-performance modular architecture.\n"
         "• Tailwind CSS & Framer Motion: Cyberpunk aesthetics & smooth micro-animations.\n"
         "• Three.js (WebGL Canvas): Interactive 3D escape room environment.\n"
         "• Web Audio API & Web Speech API: Pure procedural sound FX and AI voice briefings.", CYAN),
        ("Backend & Real-Time Engine",
         "• Node.js & Express.js: Scalable RESTful API microservices with Morgan & Helmet.\n"
         "• Socket.io: Real-time team roster sync, shared stage unlocks, and chat pings.\n"
         "• MQTT.js (HiveMQ Broker): High-throughput virtual telemetry pub/sub channel.\n"
         "• Self-Healing Watchdog Engine: Background service auto-reconnecting dropouts.", PURPLE),
        ("Databases, AI & DevOps",
         "• MongoDB & Mongoose: Document store for missions, rooms, puzzles, and users.\n"
         "• Redis Cache: High-speed session caching and leaderboard rankings.\n"
         "• Dual AI LLM Service: OpenAI GPT-4o & Google Gemini API for hint generation.\n"
         "• Docker & Kubernetes (Helm): Containerized orchestration and multi-cloud deployment.", EMERALD)
    ]

    t_w = Inches(3.68)
    t_gap = Inches(0.32)
    t_left = Inches(0.8)
    for title, body, col in tech_layers:
        card = draw_card(s5, t_left, Inches(1.8), t_w, Inches(4.8), BG_CARD, col)
        tf_t = card.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = tf_t.margin_right = Inches(0.3)
        tf_t.margin_top = Inches(0.3)
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_b = tf_t.add_paragraph()
        p_b.text = body
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(12)
        t_left += t_w + t_gap

    # -------------------------------------------------------------
    # SLIDE 6: [DEDICATED SENSOR SLIDE] What We Are & Virtual Sensors
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    apply_bg(s6)
    add_header(s6, "What We Are & How 'Sensors' Work: 100% Software-Driven Simulation", "VIRTUAL SENSORS & ARCHITECTURE",
               "Clarifying our zero-hardware implementation and how physical escape room mechanics are simulated in software.")

    # Top Banner: Clarifying 100% Pure Software Online Game
    banner = draw_card(s6, Inches(0.8), Inches(1.75), Inches(11.7), Inches(0.9), BG_CARD_LIGHT, CYAN)
    tf_ban = banner.text_frame
    tf_ban.word_wrap = True
    tf_ban.margin_left = tf_ban.margin_right = Inches(0.3)
    tf_ban.margin_top = Inches(0.12)
    p_bt = tf_ban.paragraphs[0]
    p_bt.text = "★ CORE IDENTITY: 100% PURE SOFTWARE ONLINE GAME — ZERO HARDWARE SENSORS REQUIRED"
    p_bt.font.size = Pt(13)
    p_bt.font.bold = True
    p_bt.font.color.rgb = CYAN
    p_bt.font.name = "Segoe UI"
    p_bd = tf_ban.add_paragraph()
    p_bd.text = ("Our project runs entirely in web browsers without any physical breadboards, microcontrollers (ESP32), or wires. "
                 "All 'sensors' and 'locks' are implemented as software-simulated game mechanics, 3D raycasting events, and virtual MQTT messages.")
    p_bd.font.size = Pt(10.5)
    p_bd.font.color.rgb = TEXT_WHITE
    p_bd.font.name = "Segoe UI"
    p_bd.space_before = Pt(2)

    # 4 Software-Simulated Sensor Cards
    sensor_cards = [
        ("Virtual RFID Reader",
         "• How It Works: Completing algorithm puzzles (e.g. A* search) awards a virtual keycard hash (e.g. 'TAG_CARD_ASTAR_7').\n"
         "• In-Game Effect: Validating the keycard digitally disengages the stage lock and unlocks the next 3D chamber.", CYAN),
        ("Virtual Laser Security Grid",
         "• How It Works: Interactive laser beams rendered inside the Three.js 3D canvas.\n"
         "• In-Game Effect: Stepping into or misclicking a laser zone triggers a collision event, flashing red visual alarms and deducting 60s from the clock.", RED),
        ("Virtual Proximity (Ultrasonic)",
         "• How It Works: Software calculates player camera coordinates and raycasted distance to in-game 3D server racks.\n"
         "• In-Game Effect: Approaching terminals automatically activates holographic UI screens and decrypt consoles.", PURPLE),
        ("Virtual Actuator / Solenoid Lock",
         "• How It Works: Vault doors exist as animated 3D meshes controlled by a software state machine ('LOCKED' -> 'UNLOCKED').\n"
         "• In-Game Effect: Completing stage criteria dispatches an unlock command accompanied by Web Audio procedural chimes.", EMERALD)
    ]

    sc_w = Inches(2.7)
    sc_gap = Inches(0.3)
    sc_left = Inches(0.8)
    for title, body, col in sensor_cards:
        card = draw_card(s6, sc_left, Inches(2.8), sc_w, Inches(2.8), BG_CARD, col)
        tf_sc = card.text_frame
        tf_sc.word_wrap = True
        tf_sc.margin_left = tf_sc.margin_right = Inches(0.2)
        tf_sc.margin_top = Inches(0.2)
        p_t = tf_sc.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_b = tf_sc.add_paragraph()
        p_b.text = body
        p_b.font.size = Pt(10.5)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(6)
        sc_left += sc_w + sc_gap

    # Bottom Callout: Virtual Simulator & Future-Ready Architecture
    bot_card = draw_card(s6, Inches(0.8), Inches(5.8), Inches(11.7), Inches(1.1), BG_CARD, BORDER_SUBTLE)
    tf_bot = bot_card.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = Inches(0.3)
    tf_bot.margin_top = Inches(0.12)
    p_btt = tf_bot.paragraphs[0]
    p_btt.text = "Built-in Virtual Simulator (/simulator) & Future Hardware-Ready Extensibility"
    p_btt.font.size = Pt(12)
    p_btt.font.bold = True
    p_btt.font.color.rgb = AMBER
    p_btt.font.name = "Segoe UI"
    p_btb = tf_bot.add_paragraph()
    p_btb.text = ("1. Built-in Simulator: Allows instructors & testers to manually inject virtual sensor telemetry packets (RFID, PIR, Ultrasonic) to test room states.\n"
                  "2. Future-Ready Architecture: Because our backend listens to standard MQTT topics ('missionx/room/+/sensor'), physical ESP32 boards could be plugged in seamlessly in the future without changing any backend code!")
    p_btb.font.size = Pt(10)
    p_btb.font.color.rgb = TEXT_MUTED
    p_btb.font.name = "Segoe UI"
    p_btb.space_before = Pt(2)

    # -------------------------------------------------------------
    # SLIDE 7: Multi-Domain Interactive Mission Catalog
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    apply_bg(s7)
    add_header(s7, "Multi-Domain Mission Library & Interactive Puzzles", "CURRICULUM COVERAGE",
               "Covering 7+ core Computer Science domains through bespoke interactive visualizers.")

    domains = [
        ("Artificial Intelligence", "A* Pathfinding Grid visualizer (Manhattan heuristics) & Neural Network weight calibrator.", CYAN),
        ("Computer Networks", "VLSM CIDR Subnetting (/24-/28) router configurator & Breadth-First Search (BFS) packet routing.", PURPLE),
        ("Data Structures", "Self-Balancing AVL Tree Rotations (LL, RR, LR, RL) & 0/1 Knapsack Dynamic Programming matrix.", EMERALD),
        ("Operating Systems", "Virtual Memory Page Replacement Simulator (LRU, FIFO, Optimal) to clear memory thrashing.", AMBER),
        ("Databases & SQL", "Multi-table Relational SQL Join console (patients, vault_keys) and transaction rollback auditors.", CYAN),
        ("Cyber Security", "Bitwise XOR Cryptographic Ransomware Decryption & Zero-Knowledge Proofs (zk-SNARKs) passcodes.", RED)
    ]

    d_w = Inches(3.68)
    d_h = Inches(2.2)
    for i, (title, desc, col) in enumerate(domains):
        row = i // 3
        col_idx = i % 3
        c_x = Inches(0.8) + col_idx * (d_w + Inches(0.32))
        c_y = Inches(1.8) + row * (d_h + Inches(0.35))
        card = draw_card(s7, c_x, c_y, d_w, d_h, BG_CARD, col)
        tf_d = card.text_frame
        tf_d.word_wrap = True
        tf_d.margin_left = tf_d.margin_right = Inches(0.25)
        tf_d.margin_top = Inches(0.2)
        p_t = tf_d.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_b = tf_d.add_paragraph()
        p_b.text = desc
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(6)

    # -------------------------------------------------------------
    # SLIDE 8: AI Mentorship & Intelligent Micro-Engines
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    apply_bg(s8)
    add_header(s8, "AI Mentorship Micro-Engines: Scaffolded Learning with Penalties", "AI ENGINES",
               "Intelligent tutoring that guides students through crises without giving away direct answers.")

    ai_features = [
        ("3-Tier Context-Aware Hint Engine", 
         "Prevents game deadlock using adaptive, tiered guidance tied to clock penalties:\n\n"
         "• Tier 1 (Subtle Nudge): Points out conceptual focus areas. (0 min penalty)\n"
         "• Tier 2 (Technical Formula): Provides mathematical equations & theory. (-2 min penalty)\n"
         "• Tier 3 (Direct Solution Step): Actionable override code when severely stuck. (-5 min penalty)", CYAN),
        ("Dual-LLM AI Tutor Chatbot", 
         "In-game floating HUD co-pilot supporting multiple leading models:\n\n"
         "• OpenAI GPT-4o & Google Gemini 1.5 Pro/Flash integration via secure backend micro-services.\n"
         "• Context-Aware Prompting: The LLM knows the current room stage, failed attempts, and elapsed time.\n"
         "• Web Speech API integration for audible AI voice responses in the browser.", PURPLE),
        ("Automated AI Code Reviewer", 
         "Static algorithmic analysis of student submissions:\n\n"
         "• Evaluates student solutions for Big-O time and space complexity (e.g. validating O(N log N)).\n"
         "• Flags subtle security flaws, memory leaks, or unhandled edge cases.\n"
         "• Dynamic Difficulty Scaler: Dynamically adjusts puzzle distractors based on escape velocity.", EMERALD)
    ]

    ai_w = Inches(3.68)
    ai_gap = Inches(0.32)
    ai_left = Inches(0.8)
    for title, body, col in ai_features:
        card = draw_card(s8, ai_left, Inches(1.8), ai_w, Inches(4.8), BG_CARD, col)
        tf_ai = card.text_frame
        tf_ai.word_wrap = True
        tf_ai.margin_left = tf_ai.margin_right = Inches(0.3)
        tf_ai.margin_top = Inches(0.3)
        p_t = tf_ai.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_b = tf_ai.add_paragraph()
        p_b.text = body
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(10)
        ai_left += ai_w + ai_gap

    # -------------------------------------------------------------
    # SLIDE 9: Enterprise Infrastructure, Observability & Resilience
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    apply_bg(s9)
    add_header(s9, "Enterprise Cloud Architecture, Observability & Resilience", "DEVOPS & DEPLOYMENT",
               "Engineered for high availability, low latency, and zero downtime in production.")

    infra_cards = [
        ("Containerization & Orchestration",
         "• Multi-Stage Dockerfiles: Lightweight production images with multi-stage caching.\n"
         "• Docker Compose & Kubernetes (Helm): Automated deployment charts for Frontend, Backend, MongoDB, and HiveMQ.\n"
         "• Terraform IaC: Multi-cloud Infrastructure-as-Code templates for AWS EKS, GCP GKE, and Azure AKS.", CYAN),
        ("Service Mesh & Security",
         "• Istio Service Mesh & Envoy Proxies: Sidecar proxy routing with mutual TLS (mTLS) zero-trust encryption.\n"
         "• Circuit Breaker Policies: Protects backend from telemetry overload during concurrent classroom sessions.\n"
         "• Helmet & CORS Security Headers: Enforces strict HTTP policies and XSS protections.", PURPLE),
        ("Observability & Self-Healing",
         "• Prometheus & Grafana Dashboards: Live tracking of WebSocket room latency (<15ms) and MQTT message throughput.\n"
         "• Autonomous Self-Healing Watchdog: Background service automatically reconnecting dropped sockets and telemetry buses.\n"
         "• Chaos Engineering: Resilience validated with Chaos Mesh network latency and pod kill experiments.", EMERALD)
    ]

    inf_w = Inches(3.68)
    inf_gap = Inches(0.32)
    inf_left = Inches(0.8)
    for title, body, col in infra_cards:
        card = draw_card(s9, inf_left, Inches(1.8), inf_w, Inches(4.8), BG_CARD, col)
        tf_inf = card.text_frame
        tf_inf.word_wrap = True
        tf_inf.margin_left = tf_inf.margin_right = Inches(0.3)
        tf_inf.margin_top = Inches(0.3)
        p_t = tf_inf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.font.name = "Segoe UI"
        p_b = tf_inf.add_paragraph()
        p_b.text = body
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_WHITE
        p_b.font.name = "Segoe UI"
        p_b.space_before = Pt(10)
        inf_left += inf_w + inf_gap

    # -------------------------------------------------------------
    # SLIDE 10: Learning Analytics, Assessment & Conclusion
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    apply_bg(s10)
    add_header(s10, "Learning Analytics, ABET Skill Passports & Conclusion", "EVALUATION & CONCLUSION",
               "Automated verification of student learning outcomes and future platform roadmap.")

    # Left: 15-Skill Radar Card
    left_eval = draw_card(s10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), BG_CARD, CYAN)
    tf_le = left_eval.text_frame
    tf_le.word_wrap = True
    tf_le.margin_left = tf_le.margin_right = Inches(0.35)
    tf_le.margin_top = Inches(0.35)

    p_let = tf_le.paragraphs[0]
    p_let.text = "15-Metric Skill Radar & Certification"
    p_let.font.size = Pt(18)
    p_let.font.bold = True
    p_let.font.color.rgb = CYAN
    p_let.font.name = "Segoe UI"

    p_leb = tf_le.add_paragraph()
    p_leb.text = ("• Multi-Dimensional Competency Tracking:\n"
                  "   Tracks 15 technical and soft skills including Critical Thinking, Algorithmic Optimization, Decision Making, and Team Leadership.\n\n"
                  "• Official Verified Skill Radar Certificate:\n"
                  "   Generates verifiable student certificates with QR code authentication, cryptographic hash (e.g. 0x9F42A7), and ABET CO1-CO6 Outcome Matrices.\n\n"
                  "• Steam Workshop Educator Studio (/creator):\n"
                  "   Allows educators to configure custom rooms, narrative briefings, and puzzle logic without writing code.")
    p_leb.font.size = Pt(12)
    p_leb.font.color.rgb = TEXT_WHITE
    p_leb.font.name = "Segoe UI"
    p_leb.space_before = Pt(10)

    # Right: Summary & Key Takeaways
    right_eval = draw_card(s10, Inches(6.7), Inches(1.8), Inches(5.8), Inches(4.8), BG_CARD, EMERALD)
    tf_re = right_eval.text_frame
    tf_re.word_wrap = True
    tf_re.margin_left = tf_re.margin_right = Inches(0.35)
    tf_re.margin_top = Inches(0.35)

    p_ret = tf_re.paragraphs[0]
    p_ret.text = "Summary & Key Takeaways"
    p_ret.font.size = Pt(18)
    p_ret.font.bold = True
    p_ret.font.color.rgb = EMERALD
    p_ret.font.name = "Segoe UI"

    p_reb = tf_re.add_paragraph()
    p_reb.text = ("1. 100% Pure Software Online Game:\n"
                  "   Zero physical hardware required. Solves the friction of costly lab equipment and allows any student with a browser to play.\n\n"
                  "2. Experiential & Outcome-Driven:\n"
                  "   Proves that high-stakes gamified simulations dramatically boost retention and fulfill rigorous ABET CO1-CO6 engineering outcomes.\n\n"
                  "3. Future-Ready Architecture:\n"
                  "   Plug-and-play MQTT design enables future physical lab extensions or WebXR (Apple Vision Pro / Meta Quest) spatial computing.\n\n"
                  "Conclusion: MissionX turns abstract computer science education into an unforgettable, measurable team adventure.")
    p_reb.font.size = Pt(12)
    p_reb.font.color.rgb = TEXT_WHITE
    p_reb.font.name = "Segoe UI"
    p_reb.space_before = Pt(10)

    output_path = os.path.join(os.getcwd(), "MissionX_Presentation.pptx")
    prs.save(output_path)
    print(f"Presentation generated successfully at: {output_path}")

if __name__ == "__main__":
    create_deck()
