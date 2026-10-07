import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_presentation(output_path="MissionX_Presentation.pptx"):
    prs = Presentation()
    # 16:9 Widescreen format
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette - Sleek Cyberpunk / Modern Dark Tech
    BG_DARK = RGBColor(10, 15, 29)          # #0A0F1D
    BG_CARD = RGBColor(18, 26, 44)          # #121A2C
    BG_CARD_ALT = RGBColor(24, 35, 58)      # #18233A
    CYAN = RGBColor(0, 240, 255)            # #00F0FF (Primary brand)
    BLUE = RGBColor(59, 130, 246)           # #3B82F6
    PURPLE = RGBColor(168, 85, 247)         # #A855F7
    EMERALD = RGBColor(16, 185, 129)        # #10B981 (Success/Safe)
    AMBER = RGBColor(245, 158, 11)          # #F59E0B (Warning)
    ROSE = RGBColor(244, 63, 94)            # #F43F5E (Critical/Alarm)
    TEXT_WHITE = RGBColor(248, 250, 252)    # #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184)    # #94A3B8
    BORDER_CYAN = RGBColor(0, 180, 216)     # #00B4D8
    BORDER_SUBTLE = RGBColor(40, 53, 76)    # #28354C

    def apply_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category="MISSIONX PLATFORM", subtitle_text=""):
        # Category Badge
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(11.7), Inches(0.32))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = tf_cat.margin_top = tf_cat.margin_right = tf_cat.margin_bottom = 0
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = f"●  {category.upper()}"
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = CYAN
        p_cat.font.name = "Segoe UI"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.78), Inches(11.7), Inches(0.55))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.font.name = "Segoe UI"

        # Subtitle
        if subtitle_text:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.36), Inches(11.7), Inches(0.35))
            tf_sub = sub_box.text_frame
            tf_sub.word_wrap = True
            tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_right = tf_sub.margin_bottom = 0
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = subtitle_text
            p_sub.font.size = Pt(12)
            p_sub.font.color.rgb = TEXT_MUTED
            p_sub.font.name = "Segoe UI"

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

    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_background(s1)

    # Decorative accent card behind
    draw_card(s1, Inches(1.0), Inches(1.2), Inches(11.333), Inches(5.1), fill_color=BG_CARD, border_color=BORDER_CYAN)

    # Title box
    tbox = s1.shapes.add_textbox(Inches(1.5), Inches(1.7), Inches(10.333), Inches(4.0))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "MISSIONX : AI & IOT EDUCATIONAL PLATFORM"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = CYAN
    p0.font.name = "Segoe UI"

    p1 = tf1.add_paragraph()
    p1.text = "Experiential Learning & Live IoT Telemetry Engine"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE
    p1.font.name = "Segoe UI"
    p1.space_before = Pt(8)

    p2 = tf1.add_paragraph()
    p2.text = "Bridging Computer Science Theory with Real-World Physical Sensor Feedback & Virtual Hardware Simulation"
    p2.font.size = Pt(15)
    p2.font.color.rgb = TEXT_MUTED
    p2.font.name = "Segoe UI"
    p2.space_before = Pt(10)

    # Tech stack pills
    p3 = tf1.add_paragraph()
    p3.text = "STACK: Next.js 14  |  Node.js / Express  |  MongoDB  |  ESP32 Firmware  |  DHT22 Telemetry  |  Wokwi Cloud Simulation"
    p3.font.size = Pt(11)
    p3.font.bold = True
    p3.font.color.rgb = EMERALD
    p3.font.name = "Segoe UI"
    p3.space_before = Pt(28)

    p4 = tf1.add_paragraph()
    p4.text = "Presented for Project & Viva Voce Evaluation  •  Academic Engineering Edition"
    p4.font.size = Pt(11)
    p4.font.color.rgb = TEXT_MUTED
    p4.font.name = "Segoe UI"
    p4.space_before = Pt(12)

    # =========================================================================
    # SLIDE 2: WHAT IS MISSIONX? (PROBLEM & SOLUTION)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_background(s2)
    add_header(s2, "What is MissionX? Project Concept & Objective", category="PROJECT OVERVIEW",
               subtitle_text="Transforming passive computer science learning into an active, hardware-integrated escape challenge.")

    # Left Column: The Problem
    draw_card(s2, Inches(0.8), Inches(1.85), Inches(5.6), Inches(5.0), border_color=BORDER_SUBTLE)
    pb = s2.shapes.add_textbox(Inches(1.1), Inches(2.05), Inches(5.0), Inches(4.5))
    tf_pb = pb.text_frame
    tf_pb.word_wrap = True

    p = tf_pb.paragraphs[0]
    p.text = "THE PROBLEM IN COMPUTER SCIENCE EDUCATION"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = ROSE
    p.font.name = "Segoe UI"

    bullets_p = [
        ("Passive Memorization", "Students memorize concepts (trees, indexing, OSI layers, scheduling) without real application or stakes."),
        ("No Real-World Context", "Coding problems exist in isolated web terminals without physical system dependencies or telemetry."),
        ("Hardware-Software Silos", "Students learn software and IoT hardware as separate subjects, rarely seeing them interact dynamically."),
        ("Low Engagement & Retention", "Traditional quiz portals lack immersion, excitement, and realistic operational pressure.")
    ]
    for title, desc in bullets_p:
        p_t = tf_pb.add_paragraph()
        p_t.text = f"•  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(10)
        p_d = tf_pb.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED

    # Right Column: The MissionX Solution
    draw_card(s2, Inches(6.8), Inches(1.85), Inches(5.7), Inches(5.0), border_color=BORDER_CYAN)
    sol_b = s2.shapes.add_textbox(Inches(7.1), Inches(2.05), Inches(5.1), Inches(4.5))
    tf_sol = sol_b.text_frame
    tf_sol.word_wrap = True

    p = tf_sol.paragraphs[0]
    p.text = "THE MISSIONX SOLUTION"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN
    p.font.name = "Segoe UI"

    bullets_s = [
        ("Gamified Escape Room Model", "Transforms academic syllabi into high-stakes mission puzzles with timers, penalties, and objectives."),
        ("Physical & Simulated IoT Nodes", "Live environmental sensors (temperature & humidity) directly influence platform alert states."),
        ("Real-Time Mission Control", "Sleek glassmorphism command dashboard providing telemetry streams and student progress meters."),
        ("Zero-Hardware Accessibility", "Equipped with an interactive virtual hardware lab workbench and Wokwi simulation integration.")
    ]
    for title, desc in bullets_s:
        p_t = tf_sol.add_paragraph()
        p_t.text = f"✔  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = CYAN
        p_t.space_before = Pt(10)
        p_d = tf_sol.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 3: WHY IOT? (CORE RATIONALE & PURPOSE)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_background(s3)
    add_header(s3, "Why Did We Include IoT? Purpose & Technical Rationale", category="IOT MOTIVATION",
               subtitle_text="Understanding why sensor telemetry is fundamental to modern cyber-physical system design.")

    reasons = [
        ("1. Real-World Datacenter Realism",
         "Production data centers, high-performance computing clusters, and embedded systems fail if ambient conditions exceed thermal limits. Introducing temperature & humidity sensors mirrors real server infrastructure monitoring.",
         CYAN),
        ("2. Dynamic Challenge Constraints",
         "Instead of static quiz questions, environmental telemetry introduces operational urgency. Overheating conditions (> 28°C) trigger system warnings and visual sirens, creating an authentic escape room emergency.",
         AMBER),
        ("3. Hardware-Software Co-Design",
         "Demonstrates the entire cyber-physical lifecycle: Microcontroller C++ code ➔ 1-Wire Digital Bus ➔ JSON Serialization ➔ HTTP/MQTT Ingestion ➔ Full-Stack Web Display.",
         EMERALD),
        ("4. Automated Actuator Feedback Loops",
         "Sensors do not just display data—they trigger physical actuators! When temperature crosses safe thresholds, alert LEDs illuminate, alarms buzz, and dashboard telemetry flags 'CRITICAL'.",
         ROSE),
    ]

    for i, (rtitle, rdesc, color) in enumerate(reasons):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.85 + row * 2.5)

        draw_card(s3, left, top, Inches(5.75), Inches(2.25), border_color=BORDER_SUBTLE)
        rbox = s3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.25), Inches(1.85))
        tf_r = rbox.text_frame
        tf_r.word_wrap = True

        p_head = tf_r.paragraphs[0]
        p_head.text = rtitle
        p_head.font.size = Pt(13)
        p_head.font.bold = True
        p_head.font.color.rgb = color
        p_head.font.name = "Segoe UI"

        p_body = tf_r.add_paragraph()
        p_body.text = rdesc
        p_body.font.size = Pt(10.5)
        p_body.font.color.rgb = TEXT_MUTED
        p_body.font.name = "Segoe UI"
        p_body.space_before = Pt(6)

    # =========================================================================
    # SLIDE 4: IOT HARDWARE ARCHITECTURE & CIRCUIT NODE
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_background(s4)
    add_header(s4, "IoT Hardware Architecture & Edge Sensor Node", category="EMBEDDED HARDWARE",
               subtitle_text="Technical specifications of the ESP32 microcontroller, DHT22 sensor, and actuator circuit.")

    # Left Box: Hardware Components Overview (5.5 inches)
    draw_card(s4, Inches(0.8), Inches(1.85), Inches(5.6), Inches(5.0), border_color=BORDER_SUBTLE)
    hwb = s4.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.1), Inches(4.5))
    tf_hw = hwb.text_frame
    tf_hw.word_wrap = True

    p = tf_hw.paragraphs[0]
    p.text = "HARDWARE COMPONENT SPECIFICATIONS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN
    p.font.name = "Segoe UI"

    hw_specs = [
        ("ESP32 DevKit V1 Microcontroller", "Tensilica Xtensa Dual-Core 32-bit LX6 @ 240MHz, 520 KB SRAM, integrated 2.4 GHz 802.11 b/g/n Wi-Fi & Bluetooth."),
        ("DHT22 / AM2302 Sensor", "Digital capacitive humidity & NTC thermistor sensor. Measures -40°C to +80°C (±0.5°C) and 0-100% RH (±2% RH) via 1-Wire protocol."),
        ("Blue Status Indicator LED", "Connected to GPIO 2. Heartbeat flash and packet transmission indicator."),
        ("Red Alert Indicator LED", "Connected to GPIO 15. Activates immediately when temperature exceeds 28.0°C."),
        ("Piezo Acoustic Buzzer", "Connected to GPIO 13. Emits 1kHz audio pulse when thermal levels reach CRITICAL (> 32.0°C).")
    ]
    for title, desc in hw_specs:
        p_t = tf_hw.add_paragraph()
        p_t.text = f"•  {title}"
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(8)
        p_d = tf_hw.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Right Box: Circuit Pinout Table (5.8 inches)
    draw_card(s4, Inches(6.75), Inches(1.85), Inches(5.75), Inches(5.0), border_color=BORDER_CYAN)
    tbl_title = s4.shapes.add_textbox(Inches(7.0), Inches(2.05), Inches(5.2), Inches(0.4))
    tf_tt = tbl_title.text_frame
    tf_tt.paragraphs[0].text = "CIRCUIT WIRING & PIN INTERFACE MAP"
    tf_tt.paragraphs[0].font.size = Pt(13)
    tf_tt.paragraphs[0].font.bold = True
    tf_tt.paragraphs[0].font.color.rgb = CYAN

    # Table
    rows, cols = 7, 3
    table_shape = s4.shapes.add_table(rows, cols, Inches(7.0), Inches(2.55), Inches(5.25), Inches(3.2))
    table = table_shape.table
    table.columns[0].width = Inches(1.8)
    table.columns[1].width = Inches(1.2)
    table.columns[2].width = Inches(2.25)

    headers = ["Component", "ESP32 Pin", "Signal / Function"]
    pin_data = [
        ["DHT22 VCC (Pin 1)", "3V3 (3.3V)", "Power Supply (+)"],
        ["DHT22 DATA (Pin 2)", "GPIO 4", "1-Wire Digital Telemetry"],
        ["DHT22 GND (Pin 4)", "GND", "Common Ground (-)"],
        ["Status LED (Anode)", "GPIO 2", "WiFi Heartbeat / TX Pulse"],
        ["Alert LED (Anode)", "GPIO 15", "Overheat Warning (> 28°C)"],
        ["Piezo Buzzer (+)", "GPIO 13", "Acoustic Alarm (> 32°C)"],
    ]

    for c, h in enumerate(headers):
        cell = table.cell(0, c)
        cell.text = h
        cell.fill.solid()
        cell.fill.fore_color.rgb = BG_CARD_ALT
        for prg in cell.text_frame.paragraphs:
            prg.font.bold = True
            prg.font.size = Pt(10)
            prg.font.color.rgb = CYAN

    for r, row in enumerate(pin_data):
        for c, val in enumerate(row):
            cell = table.cell(r + 1, c)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = BG_CARD
            for prg in cell.text_frame.paragraphs:
                prg.font.size = Pt(9.5)
                prg.font.color.rgb = TEXT_WHITE if c < 2 else TEXT_MUTED

    # Bottom Callout
    callout = s4.shapes.add_textbox(Inches(7.0), Inches(5.95), Inches(5.25), Inches(0.75))
    tf_c = callout.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = "⚡ Built-in 10kΩ pull-up resistor stabilizes the digital 1-Wire bus on GPIO 4."
    p_c.font.size = Pt(10)
    p_c.font.bold = True
    p_c.font.color.rgb = EMERALD

    # =========================================================================
    # SLIDE 5: VIRTUAL IOT SIMULATION (ZERO-HARDWARE WORKBENCH)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_background(s5)
    add_header(s5, "Virtual Hardware Simulation: Two Zero-Hardware Options", category="VIRTUAL SIMULATOR",
               subtitle_text="How we test and demonstrate IoT hardware without requiring physical electronic components.")

    # Option 1: Built-in MissionX Web Workbench
    draw_card(s5, Inches(0.8), Inches(1.85), Inches(5.6), Inches(5.0), border_color=BORDER_CYAN)
    w1 = s5.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.1), Inches(4.5))
    tf_w1 = w1.text_frame
    tf_w1.word_wrap = True

    p = tf_w1.paragraphs[0]
    p.text = "OPTION 1: BUILT-IN WEB WORKBENCH (/simulator)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = CYAN

    features_w1 = [
        ("Visual Circuit Breadboard", "Realistic animated visual rendering of the ESP32 board, DHT22 sensor, jumper wiring, and OLED screen."),
        ("Interactive Environmental Dials", "Sliders for Temperature (15°C to 48°C) and Humidity (10% to 95% RH) with instant feedback."),
        ("Demo Scenario Presets", "One-click triggers for Normal Lab (22°C), Warm Warning (28°C), Overheat Alarm (34°C), and Meltdown (45°C)."),
        ("Real-Time Platform Sync", "Directly invokes POST /api/sensor/override; updates the live dashboard and database immediately!"),
        ("Live 115200 Baud Serial Terminal", "Accurately logs ESP32 bootup sequence, WiFi connection, and JSON telemetry transmission packets.")
    ]
    for title, desc in features_w1:
        p_t = tf_w1.add_paragraph()
        p_t.text = f"✔  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(10.5)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(7)
        p_d = tf_w1.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Option 2: Wokwi Cloud Simulation
    draw_card(s5, Inches(6.75), Inches(1.85), Inches(5.75), Inches(5.0), border_color=BORDER_SUBTLE)
    w2 = s5.shapes.add_textbox(Inches(7.0), Inches(2.05), Inches(5.2), Inches(4.5))
    tf_w2 = w2.text_frame
    tf_w2.word_wrap = True

    p = tf_w2.paragraphs[0]
    p.text = "OPTION 2: WOKWI CLOUD SIMULATOR (wokwi.com)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = EMERALD

    features_w2 = [
        ("Academic & Industry Standard", "Browser-based full ESP32 AVR/Xtensa cycle-accurate hardware emulator; requires zero software installation."),
        ("Authentic C++ Arduino Firmware", "Pre-packaged in firmware/esp32_sensor_sim.ino with DHT sensor library, WiFi client, and JSON serialization."),
        ("Declarative Circuit (diagram.json)", "Standard Wokwi JSON wiring specification connecting ESP32 pins to DHT22, LEDs, and buzzer."),
        ("Interactive Sensor Slider", "Evaluators can click the virtual DHT22 in Wokwi to change temperature and hear the buzzer activate in real time!"),
        ("Viva Voce Ready", "Provides undeniable proof that firmware and circuit logic are production-ready for physical breadboard deployment.")
    ]
    for title, desc in features_w2:
        p_t = tf_w2.add_paragraph()
        p_t.text = f"⚡  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(10.5)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(7)
        p_d = tf_w2.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 6: SYSTEM ARCHITECTURE & TELEMETRY PIPELINE
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_background(s6)
    add_header(s6, "System Architecture & End-to-End Data Pipeline", category="SYSTEM ARCHITECTURE",
               subtitle_text="Multi-tier architecture bridging edge hardware sensors, backend microservices, and reactive web UI.")

    layers = [
        ("1. EDGE IOT LAYER", "ESP32 DevKit V1", "Reads DHT22 on GPIO 4 every 3000ms. Evaluates thresholds. Packs data into JSON payload.", CYAN),
        ("2. TRANSPORT LAYER", "HTTP REST / MQTT", "Dispatches POST /api/sensor/reading or publishes to MQTT topic (Port 1883). Low-latency bridge.", BLUE),
        ("3. BACKEND API", "Express.js Engine", "Ingests telemetry, executes sensorService validation, and maintains rolling 30-sample history buffer.", PURPLE),
        ("4. DATABASE LAYER", "MongoDB & Mongoose", "Stores persistent documents: SensorReading, User, Subject, Question, and Student Progress.", AMBER),
        ("5. CLIENT DASHBOARD", "Next.js 14 & React", "Glassmorphism UI. Polls every 3s. Renders live sensor gauges, status badges, and quizzes.", EMERALD)
    ]

    card_width = Inches(2.2)
    card_gap = Inches(0.18)
    for i, (lname, tech, desc, col) in enumerate(layers):
        left = Inches(0.8 + i * (2.2 + 0.18))
        draw_card(s6, left, Inches(1.9), card_width, Inches(4.8), border_color=col)
        lbox = s6.shapes.add_textbox(left + Inches(0.12), Inches(2.1), card_width - Inches(0.24), Inches(4.3))
        tf_l = lbox.text_frame
        tf_l.word_wrap = True

        p1 = tf_l.paragraphs[0]
        p1.text = lname
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf_l.add_paragraph()
        p2.text = tech
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE
        p2.space_before = Pt(8)

        p3 = tf_l.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(10)
        p3.font.color.rgb = TEXT_MUTED
        p3.space_before = Pt(12)

    # =========================================================================
    # SLIDE 7: ACADEMIC CURRICULUM & CHALLENGE DOMAINS
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_background(s7)
    add_header(s7, "Educational Domain Curriculum & Quiz Engine", category="ACADEMIC CURRICULUM",
               subtitle_text="Pre-seeded with university-standard engineering questions across 4 core CS disciplines.")

    domains = [
        ("Data Structures (DSA)",
         "Covers Arrays, Stacks, Queues, Binary Trees, Heaps, and Graph algorithms. Evaluates algorithmic complexity (Big-O time and space trade-offs).",
         CYAN, "5 Questions • 80% Initial Seed"),
        ("DBMS (Database Systems)",
         "Relational schemas, Normalization (1NF through BCNF), SQL Joins, ACID transactions, and Indexing architectures.",
         BLUE, "5 Questions • 60% Initial Seed"),
        ("Operating Systems (OS)",
         "Process scheduling (Round Robin, SRTF), Deadlocks & Banker's algorithm, Paging, Virtual Memory, and Thrashing resolution.",
         AMBER, "5 Questions • 40% Initial Seed"),
        ("Computer Networks (CN)",
         "OSI 7-Layer Architecture, TCP vs UDP handshakes, IP Subnetting (CIDR/VLSM), Routing protocols, and DNS/DHCP infrastructure.",
         EMERALD, "5 Questions • 20% Initial Seed")
    ]

    for i, (dname, ddesc, dcol, dmeta) in enumerate(domains):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.85 + row * 2.5)

        draw_card(s7, left, top, Inches(5.75), Inches(2.25), border_color=BORDER_SUBTLE)
        dbox = s7.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.25), Inches(1.85))
        tf_d = dbox.text_frame
        tf_d.word_wrap = True

        p_h = tf_d.paragraphs[0]
        p_h.text = f"📚  {dname}"
        p_h.font.size = Pt(13)
        p_h.font.bold = True
        p_h.font.color.rgb = dcol

        p_b = tf_d.add_paragraph()
        p_b.text = ddesc
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(6)

        p_m = tf_d.add_paragraph()
        p_m.text = f"Status: {dmeta}"
        p_m.font.size = Pt(10)
        p_m.font.bold = True
        p_m.font.color.rgb = TEXT_WHITE
        p_m.space_before = Pt(8)

    # =========================================================================
    # SLIDE 8: PLATFORM UI & USER EXPERIENCE WALKTHROUGH
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_background(s8)
    add_header(s8, "MissionX Web Application & Feature Walkthrough", category="PLATFORM WALKTHROUGH",
               subtitle_text="Intuitive cyberpunk-themed interface designed for both students and instructors.")

    ui_features = [
        ("Mission Dashboard (/dashboard)",
         "Centralized overview hub featuring student welcome greetings, live compact sensor telemetry widgets, progress bars for all 4 subjects, and instant quick-launch actions.",
         CYAN),
        ("Live Sensor Console (/sensor)",
         "Dedicated telemetry diagnostics center displaying primary sensor dial, 3-second live refresh intervals, hardware specifications, and an 8-sample rolling historical telemetry table.",
         EMERALD),
        ("Hardware Simulator (/simulator)",
         "Full cybernetic workbench with visual ESP32 breadboard, DHT22 sensor, interactive dials, stress test presets, live 115200 baud serial monitor, and Arduino C++ code viewer.",
         AMBER),
        ("Subject Challenge Quizzes (/quiz/[id])",
         "Interactive quiz engine with option selection, immediate validation feedback, detailed technical explanations, scoring engine, and progress persistence to MongoDB.",
         BLUE)
    ]

    for i, (ftitle, fdesc, fcol) in enumerate(ui_features):
        left = Inches(0.8)
        top = Inches(1.85 + i * 1.25)
        draw_card(s8, left, top, Inches(11.733), Inches(1.1), border_color=BORDER_SUBTLE)
        fbox = s8.shapes.add_textbox(left + Inches(0.25), top + Inches(0.12), Inches(11.2), Inches(0.85))
        tf_f = fbox.text_frame
        tf_f.word_wrap = True

        p1 = tf_f.paragraphs[0]
        p1.text = ftitle
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = fcol

        p2 = tf_f.add_paragraph()
        p2.text = fdesc
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_MUTED
        p2.space_before = Pt(3)

    # =========================================================================
    # SLIDE 9: SUMMARY, IMPACT & FUTURE ROADMAP
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_background(s9)
    add_header(s9, "Project Summary, Academic Impact & Future Roadmap", category="CONCLUSION",
               subtitle_text="Bridging software, hardware, and gamified education for future-ready engineers.")

    # Left Box: Key Accomplishments
    draw_card(s9, Inches(0.8), Inches(1.85), Inches(5.6), Inches(5.0), border_color=BORDER_CYAN)
    c1 = s9.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.1), Inches(4.5))
    tf_c1 = c1.text_frame
    tf_c1.word_wrap = True

    p = tf_c1.paragraphs[0]
    p.text = "KEY PROJECT ACHIEVEMENTS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN

    achievements = [
        ("Full-Stack Cyber-Physical System", "Working integration of Next.js 14, Node/Express, MongoDB, and simulated ESP32 hardware telemetry."),
        ("Zero-Hardware Accessibility", "Solved the component availability limitation via an embedded Web Workbench and Wokwi cloud simulation."),
        ("Real-Time Telemetry Pipeline", "Continuous 3s polling, dynamic threshold warnings (>28°C), and acoustic critical alerts (>32°C)."),
        ("Gamified CS Pedagogy", "Demonstrated measurable student progress tracking across Data Structures, DBMS, OS, and Networks.")
    ]
    for title, desc in achievements:
        p_t = tf_c1.add_paragraph()
        p_t.text = f"✔  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(10.5)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(8)
        p_d = tf_c1.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Right Box: Future Roadmap
    draw_card(s9, Inches(6.75), Inches(1.85), Inches(5.75), Inches(5.0), border_color=BORDER_SUBTLE)
    c2 = s9.shapes.add_textbox(Inches(7.0), Inches(2.05), Inches(5.2), Inches(4.5))
    tf_c2 = c2.text_frame
    tf_c2.word_wrap = True

    p = tf_c2.paragraphs[0]
    p.text = "FUTURE EXPANSION ROADMAP"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD

    roadmap = [
        ("Physical Hardware Testbed", "Flash firmware to physical ESP32 boards with RC522 RFID scanners and Solenoid door locks."),
        ("Multi-Sensor Sensor Grid", "Integrate Ultrasonic distance sensors, PIR motion detectors, and MQ-2 gas/smoke sensors."),
        ("AI Dynamic Hint Engine", "LLM-powered micro-engine that provides context-aware hints with time penalty tradeoffs."),
        ("Multiplayer Escape Room Co-op", "WebSocket room synchronization allowing student teams to collaborate on multi-terminal missions.")
    ]
    for title, desc in roadmap:
        p_t = tf_c2.add_paragraph()
        p_t.text = f"🚀  {title}:"
        p_t.font.bold = True
        p_t.font.size = Pt(10.5)
        p_t.font.color.rgb = TEXT_WHITE
        p_t.space_before = Pt(8)
        p_d = tf_c2.add_paragraph()
        p_d.text = f"    {desc}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Save presentation
    prs.save(output_path)
    print(f"Presentation generated successfully: {output_path} with {len(prs.slides)} slides.")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "MissionX_Presentation.pptx"
    build_presentation(out_file)
