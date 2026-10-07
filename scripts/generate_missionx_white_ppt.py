import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def build_white_presentation(output_path="MissionX_Presentation.pptx"):
    prs = Presentation()
    # 16:9 Widescreen layout
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # --- Modern Light Theme Palette ---
    BG_WHITE = RGBColor(255, 255, 255)       # Pure White
    BG_LIGHT = RGBColor(248, 250, 252)       # Soft Off-White / Slate 50
    CARD_BG = RGBColor(255, 255, 255)        # Crisp Card White
    CARD_BG_ALT = RGBColor(241, 245, 249)    # Light Slate 100
    
    # Accent colors
    PRIMARY = RGBColor(37, 99, 235)          # Electric Blue (#2563EB)
    TEAL = RGBColor(13, 148, 136)            # Modern Teal (#0D9488)
    CYAN = RGBColor(2, 132, 199)             # Deep Cyan (#0284C7)
    EMERALD = RGBColor(16, 149, 106)         # Emerald (#10956A)
    AMBER = RGBColor(217, 119, 6)            # Amber (#D97706)
    ROSE = RGBColor(225, 29, 72)             # Crimson Rose (#E11D48)
    PURPLE = RGBColor(124, 58, 237)          # Purple (#7C3AED)

    # Text colors (High Contrast)
    TEXT_MAIN = RGBColor(15, 23, 42)         # Deep Navy (#0F172A)
    TEXT_BODY = RGBColor(51, 65, 85)         # Slate 700 (#334155)
    TEXT_MUTED = RGBColor(100, 116, 139)     # Slate 500 (#64748B)
    
    # Border colors
    BORDER_LIGHT = RGBColor(226, 232, 240)   # Slate 200
    BORDER_PRIMARY = RGBColor(191, 219, 254) # Blue 200
    BORDER_TEAL = RGBColor(153, 246, 228)    # Teal 200

    def apply_white_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_WHITE
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category="MISSIONX PLATFORM", subtitle_text=""):
        # Category Tag
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(11.7), Inches(0.3))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = tf_cat.margin_top = tf_cat.margin_right = tf_cat.margin_bottom = 0
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = PRIMARY
        p_cat.font.name = "Segoe UI"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.7), Inches(0.55))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_MAIN
        p_title.font.name = "Segoe UI"

        # Subtitle
        if subtitle_text:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.30), Inches(11.7), Inches(0.35))
            tf_sub = sub_box.text_frame
            tf_sub.word_wrap = True
            tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_right = tf_sub.margin_bottom = 0
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = subtitle_text
            p_sub.font.size = Pt(11)
            p_sub.font.color.rgb = TEXT_MUTED
            p_sub.font.name = "Segoe UI"

    def draw_card(slide, left, top, width, height, fill_color=CARD_BG, border_color=BORDER_LIGHT):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = fill_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.2)
        else:
            card.line.fill.background()
        return card

    def add_badge(slide, left, top, text, bg_color=CARD_BG_ALT, text_color=TEXT_MAIN, font_size=9):
        # Approximated badge shape
        width = Inches(len(text) * 0.085 + 0.35)
        height = Inches(0.28)
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        badge.fill.solid()
        badge.fill.fore_color.rgb = bg_color
        badge.line.fill.background()
        tf = badge.text_frame
        tf.word_wrap = False
        tf.margin_top = tf.margin_bottom = tf.margin_left = tf.margin_right = 0
        p = tf.paragraphs[0]
        p.text = text
        p.alignment = PP_ALIGN.CENTER
        p.font.size = Pt(font_size)
        p.font.bold = True
        p.font.color.rgb = text_color
        p.font.name = "Segoe UI"
        return badge

    # =========================================================================
    # SLIDE 1: HERO / TITLE SLIDE (Clean White Minimalist)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s1)

    # Large Center Hero Container
    draw_card(s1, Inches(1.0), Inches(1.0), Inches(11.333), Inches(5.5), fill_color=BG_LIGHT, border_color=BORDER_PRIMARY)

    # Inner decorative bar
    bar = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.0), Inches(11.333), Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = PRIMARY
    bar.line.fill.background()

    # Title Text Frame
    tbox = s1.shapes.add_textbox(Inches(1.6), Inches(1.6), Inches(10.1), Inches(3.6))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "NEXT-GENERATION EXPERIENTIAL LEARNING"
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = PRIMARY
    p0.font.name = "Segoe UI"

    p1 = tf1.add_paragraph()
    p1.text = "MissionX: AI & IoT Escape Room Platform"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_MAIN
    p1.font.name = "Segoe UI"
    p1.space_before = Pt(8)

    p2 = tf1.add_paragraph()
    p2.text = "Bridging Computer Science Education with Real-Time Physical Sensor Telemetry"
    p2.font.size = Pt(15)
    p2.font.color.rgb = TEXT_BODY
    p2.font.name = "Segoe UI"
    p2.space_before = Pt(8)

    # Visual Feature Badges
    badge_data = [
        ("ESP32 DevKit V1", RGBColor(239, 246, 255), PRIMARY),
        ("DHT22 Sensor Bus", RGBColor(240, 253, 250), TEAL),
        ("Wokwi Virtual Lab", RGBColor(254, 243, 199), AMBER),
        ("Next.js 14 Dashboard", RGBColor(243, 232, 255), PURPLE),
        ("MongoDB Cloud", RGBColor(236, 253, 245), EMERALD),
    ]
    cur_x = Inches(1.6)
    for btext, bbg, btc in badge_data:
        add_badge(s1, cur_x, Inches(3.8), btext, bg_color=bbg, text_color=btc, font_size=10)
        cur_x += Inches(len(btext) * 0.085 + 0.55)

    # Footer note
    ftr = s1.shapes.add_textbox(Inches(1.6), Inches(4.5), Inches(9.5), Inches(1.2))
    tf_f = ftr.text_frame
    tf_f.word_wrap = True
    p_f = tf_f.paragraphs[0]
    p_f.text = "Prepared for Academic Capstone & Project Viva Evaluation  •  Engineering Edition"
    p_f.font.size = Pt(11)
    p_f.font.color.rgb = TEXT_MUTED
    p_f.font.name = "Segoe UI"

    # =========================================================================
    # SLIDE 2: WHAT IS MISSIONX? (Visual Problem vs Solution)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s2)
    add_header(s2, "What is MissionX? Concept & Core Objective", category="PROJECT OVERVIEW",
               subtitle_text="A gamified SaaS platform replacing passive quiz portals with interactive mission challenges.")

    # Left Visual Box: The Problem (Red tint)
    draw_card(s2, Inches(0.8), Inches(1.85), Inches(5.6), Inches(4.9), fill_color=RGBColor(255, 241, 242), border_color=RGBColor(254, 205, 211))
    
    t_prob = s2.shapes.add_textbox(Inches(1.1), Inches(2.05), Inches(5.0), Inches(4.4))
    tf_p = t_prob.text_frame
    tf_p.word_wrap = True
    p = tf_p.paragraphs[0]
    p.text = "THE PROBLEM: PASSIVE EDUCATION"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ROSE

    prob_items = [
        ("Rote Memorization", "Students memorize algorithms without real systems context."),
        ("No Physical Stakes", "Code runs in vacuum terminals without hardware feedback."),
        ("Isolated Silos", "Software engineering and IoT hardware taught as separate topics."),
        ("Low Student Engagement", "Traditional multiple-choice portals lack excitement.")
    ]
    for h, d in prob_items:
        p_h = tf_p.add_paragraph()
        p_h.text = f"✕  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = TEXT_MAIN
        p_h.space_before = Pt(10)
        p_d = tf_p.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # Right Visual Box: The Solution (Blue/Teal tint)
    draw_card(s2, Inches(6.8), Inches(1.85), Inches(5.7), Inches(4.9), fill_color=RGBColor(240, 249, 255), border_color=RGBColor(186, 230, 253))
    
    t_sol = s2.shapes.add_textbox(Inches(7.1), Inches(2.05), Inches(5.1), Inches(4.4))
    tf_s = t_sol.text_frame
    tf_s.word_wrap = True
    p = tf_s.paragraphs[0]
    p.text = "THE SOLUTION: MISSIONX PLATFORM"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = PRIMARY

    sol_items = [
        ("Escape Room Challenge", "Gamifies CS curriculum into timed mission scenarios."),
        ("Live IoT Sensor Telemetry", "Ambient laboratory temperature sets dynamic puzzle urgency."),
        ("Mission Control Dashboard", "Real-time command center tracking team skills and telemetry."),
        ("Zero-Hardware Simulator", "Full virtual lab workbench accessible from any browser.")
    ]
    for h, d in sol_items:
        p_h = tf_s.add_paragraph()
        p_h.text = f"✔  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = PRIMARY
        p_h.space_before = Pt(10)
        p_d = tf_s.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # =========================================================================
    # SLIDE 3: WHY IOT? (4 Visual Core Drivers)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s3)
    add_header(s3, "Why Did We Include IoT? Technical Rationale", category="IOT MOTIVATION",
               subtitle_text="How physical telemetry bridges real-world engineering constraints with software logic.")

    drivers = [
        ("1. Datacenter Realism",
         "Physical data centers fail if thermal levels exceed operating limits. Introducing real ambient telemetry reflects actual IT infrastructure constraints.",
         PRIMARY, RGBColor(239, 246, 255)),
        ("2. Dynamic Challenge Urgency",
         "Elevated temperature (> 28°C) activates warning alarms and clock penalties, transforming flat quiz questions into an emergency escape scenario.",
         AMBER, RGBColor(254, 243, 199)),
        ("3. Cyber-Physical Co-Design",
         "Teaches end-to-end systems engineering: C++ Microcontroller Firmware ➔ 1-Wire Digital Bus ➔ JSON Packets ➔ Web Dashboard.",
         TEAL, RGBColor(240, 253, 250)),
        ("4. Automated Actuator Loops",
         "Telemetry drives hardware actuators! Red alert LEDs illuminate and acoustic buzzers beep automatically when temperature breaches safety limits.",
         ROSE, RGBColor(255, 241, 242)),
    ]

    for i, (title, desc, col_accent, col_bg) in enumerate(drivers):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.85 + row * 2.5)

        draw_card(s3, left, top, Inches(5.75), Inches(2.25), fill_color=col_bg, border_color=BORDER_LIGHT)
        
        # Color bar indicator on left
        ind = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top + Inches(0.2), Inches(0.08), Inches(1.85))
        ind.fill.solid()
        ind.fill.fore_color.rgb = col_accent
        ind.line.fill.background()

        ibox = s3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.85))
        tf_i = ibox.text_frame
        tf_i.word_wrap = True

        p_h = tf_i.paragraphs[0]
        p_h.text = title
        p_h.font.size = Pt(13)
        p_h.font.bold = True
        p_h.font.color.rgb = col_accent

        p_b = tf_i.add_paragraph()
        p_b.text = desc
        p_b.font.size = Pt(10.5)
        p_b.font.color.rgb = TEXT_BODY
        p_b.space_before = Pt(6)

    # =========================================================================
    # SLIDE 4: IOT HARDWARE ARCHITECTURE & EDGE NODE
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s4)
    add_header(s4, "IoT Hardware Architecture & Edge Sensor Node", category="EMBEDDED HARDWARE",
               subtitle_text="Technical specifications of the ESP32 microcontroller, DHT22 sensor, and actuator circuit.")

    # Left: Visual Hardware Components (5.5 in)
    draw_card(s4, Inches(0.8), Inches(1.85), Inches(5.5), Inches(4.9), fill_color=BG_LIGHT, border_color=BORDER_LIGHT)
    hw_box = s4.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.0), Inches(4.4))
    tf_hw = hw_box.text_frame
    tf_hw.word_wrap = True

    p = tf_hw.paragraphs[0]
    p.text = "HARDWARE COMPONENT ROSTER"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = PRIMARY

    components = [
        ("ESP32 DevKit V1", "Dual-Core Xtensa 240MHz, 520KB SRAM, 2.4GHz Wi-Fi."),
        ("DHT22 (AM2302) Sensor", "Digital temp (-40°C to 80°C) & humidity on 1-Wire bus."),
        ("Status Blue LED (GPIO 2)", "Flashes on heartbeat & packet transmissions."),
        ("Alert Red LED (GPIO 15)", "Automatically illuminates when temp > 28.0°C."),
        ("Piezo Buzzer (GPIO 13)", "Acoustic warning pulses when temp > 32.0°C.")
    ]
    for comp, cdesc in components:
        p_c = tf_hw.add_paragraph()
        p_c.text = f"•  {comp}"
        p_c.font.bold = True
        p_c.font.size = Pt(10.5)
        p_c.font.color.rgb = TEXT_MAIN
        p_c.space_before = Pt(8)
        p_d = tf_hw.add_paragraph()
        p_d.text = f"    {cdesc}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # Right: Circuit Pinout Table (5.8 in)
    draw_card(s4, Inches(6.7), Inches(1.85), Inches(5.8), Inches(4.9), fill_color=CARD_BG, border_color=BORDER_PRIMARY)
    tbl_hdr = s4.shapes.add_textbox(Inches(6.95), Inches(2.05), Inches(5.3), Inches(0.35))
    tbl_hdr.text_frame.paragraphs[0].text = "CIRCUIT WIRING & PIN INTERFACE MAP"
    tbl_hdr.text_frame.paragraphs[0].font.size = Pt(12)
    tbl_hdr.text_frame.paragraphs[0].font.bold = True
    tbl_hdr.text_frame.paragraphs[0].font.color.rgb = PRIMARY

    table_shape = s4.shapes.add_table(7, 3, Inches(6.95), Inches(2.5), Inches(5.3), Inches(3.2))
    tbl = table_shape.table
    tbl.columns[0].width = Inches(1.8)
    tbl.columns[1].width = Inches(1.3)
    tbl.columns[2].width = Inches(2.2)

    headers = ["Component Pin", "ESP32 Pin", "Signal / Function"]
    pin_data = [
        ["DHT22 VCC (Pin 1)", "3V3 (3.3V)", "Power Rail (+)"],
        ["DHT22 DATA (Pin 2)", "GPIO 4", "Digital 1-Wire Data"],
        ["DHT22 GND (Pin 4)", "GND", "Common Ground (-)"],
        ["Status LED Anode", "GPIO 2", "WiFi TX Indicator"],
        ["Alert LED Anode", "GPIO 15", "Overheat Warning (>28°C)"],
        ["Buzzer Positive", "GPIO 13", "Acoustic Alarm (>32°C)"],
    ]

    for c, h in enumerate(headers):
        cell = tbl.cell(0, c)
        cell.text = h
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(239, 246, 255)
        for prg in cell.text_frame.paragraphs:
            prg.font.bold = True
            prg.font.size = Pt(9.5)
            prg.font.color.rgb = PRIMARY

    for r, row in enumerate(pin_data):
        for c, val in enumerate(row):
            cell = tbl.cell(r + 1, c)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = BG_WHITE if r % 2 == 0 else BG_LIGHT
            for prg in cell.text_frame.paragraphs:
                prg.font.size = Pt(9)
                prg.font.color.rgb = TEXT_MAIN if c < 2 else TEXT_BODY

    # Pull-up note
    note = s4.shapes.add_textbox(Inches(6.95), Inches(5.9), Inches(5.3), Inches(0.6))
    p_n = note.text_frame.paragraphs[0]
    p_n.text = "⚡ Built-in 10kΩ pull-up resistor stabilizes the digital 1-Wire bus."
    p_n.font.size = Pt(9.5)
    p_n.font.bold = True
    p_n.font.color.rgb = TEAL

    # =========================================================================
    # SLIDE 5: VIRTUAL IOT SIMULATION (Zero-Hardware Lab Bench)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s5)
    add_header(s5, "Virtual Hardware Simulation: Two Zero-Hardware Options", category="VIRTUAL SIMULATOR",
               subtitle_text="Testing and demonstrating real-time IoT hardware without physical breadboards.")

    # Option 1: Built-in MissionX Web Workbench
    draw_card(s5, Inches(0.8), Inches(1.85), Inches(5.6), Inches(4.9), fill_color=RGBColor(240, 253, 250), border_color=BORDER_TEAL)
    t_w1 = s5.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.1), Inches(4.4))
    tf_w1 = t_w1.text_frame
    tf_w1.word_wrap = True
    p = tf_w1.paragraphs[0]
    p.text = "OPTION 1: BUILT-IN WORKBENCH (/simulator)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = TEAL

    w1_items = [
        ("Visual Circuit Breadboard", "Realistic animated view of ESP32, DHT22, wiring & OLED."),
        ("Interactive Sliders", "Real-time dials for Temp (15°C–48°C) and Humidity (10%–95%)."),
        ("One-Click Presets", "Normal (22°C), Warm (28°C), Overheat (34°C), Meltdown (45°C)."),
        ("Live Serial Monitor", "115200 baud console emulating Arduino IDE serial logs."),
        ("Instant Dashboard Sync", "Overriding values immediately propagates to live dashboard!")
    ]
    for h, d in w1_items:
        p_h = tf_w1.add_paragraph()
        p_h.text = f"✔  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(10.5)
        p_h.font.color.rgb = TEXT_MAIN
        p_h.space_before = Pt(7)
        p_d = tf_w1.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # Option 2: Wokwi Cloud Simulation
    draw_card(s5, Inches(6.75), Inches(1.85), Inches(5.75), Inches(4.9), fill_color=RGBColor(239, 246, 255), border_color=BORDER_PRIMARY)
    t_w2 = s5.shapes.add_textbox(Inches(7.0), Inches(2.05), Inches(5.2), Inches(4.4))
    tf_w2 = t_w2.text_frame
    tf_w2.word_wrap = True
    p = tf_w2.paragraphs[0]
    p.text = "OPTION 2: WOKWI CLOUD SIMULATOR (wokwi.com)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = PRIMARY

    w2_items = [
        ("Industry Standard", "Cycle-accurate browser ESP32 emulator with zero setup."),
        ("Real Arduino C++ Sketch", "Ready-to-compile esp32_sensor_sim.ino with DHT library."),
        ("Declarative Wiring", "Configured via diagram.json linking ESP32 to DHT22 & LEDs."),
        ("Interactive Sensor Drag", "Click on the virtual DHT22 to adjust temp and trigger alarms."),
        ("Viva-Ready Proof", "Proves firmware and circuit logic are 100% production-ready.")
    ]
    for h, d in w2_items:
        p_h = tf_w2.add_paragraph()
        p_h.text = f"⚡  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(10.5)
        p_h.font.color.rgb = TEXT_MAIN
        p_h.space_before = Pt(7)
        p_d = tf_w2.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # =========================================================================
    # SLIDE 6: SYSTEM ARCHITECTURE & DATA FLOW PIPELINE (Visual Chevrons)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s6)
    add_header(s6, "System Architecture & End-to-End Data Pipeline", category="SYSTEM ARCHITECTURE",
               subtitle_text="Seamless data pipeline connecting edge telemetry to the reactive web application.")

    pipeline = [
        ("1. EDGE IOT NODE", "ESP32 + DHT22", "Reads 1-Wire sensor bus every 3000ms. Builds JSON payload.", PRIMARY),
        ("2. TRANSPORT", "HTTP / MQTT", "Transmits to Express API or publishes on MQTT Port 1883.", TEAL),
        ("3. BACKEND API", "Express.js Engine", "Validates thresholds & stores 30-sample rolling history.", PURPLE),
        ("4. DATABASE", "MongoDB Cloud", "Persists sensor readings, users, subjects, and quiz scores.", AMBER),
        ("5. WEB DASHBOARD", "Next.js 14 Client", "Polls every 3s. Renders live gauges and challenge meters.", EMERALD),
    ]

    card_w = Inches(2.2)
    gap = Inches(0.18)
    for i, (step_num, title, desc, col) in enumerate(pipeline):
        left = Inches(0.8 + i * (2.2 + 0.18))
        draw_card(s6, left, Inches(1.9), card_w, Inches(4.7), fill_color=BG_LIGHT, border_color=BORDER_LIGHT)

        # Top Accent Header Strip
        strip = s6.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, Inches(1.9), card_w, Inches(0.1))
        strip.fill.solid()
        strip.fill.fore_color.rgb = col
        strip.line.fill.background()

        sbox = s6.shapes.add_textbox(left + Inches(0.12), Inches(2.1), card_w - Inches(0.24), Inches(4.2))
        tf_st = sbox.text_frame
        tf_st.word_wrap = True

        p1 = tf_st.paragraphs[0]
        p1.text = step_num
        p1.font.size = Pt(10)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf_st.add_paragraph()
        p2.text = title
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_MAIN
        p2.space_before = Pt(8)

        p3 = tf_st.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(9.5)
        p3.font.color.rgb = TEXT_BODY
        p3.space_before = Pt(12)

    # Bottom summary callout
    bot_callout = s6.shapes.add_textbox(Inches(0.8), Inches(6.75), Inches(11.733), Inches(0.4))
    p_bc = bot_callout.text_frame.paragraphs[0]
    p_bc.text = "🔄 Sub-second bidirectional loop: Manual slider injection immediately updates all web clients."
    p_bc.font.size = Pt(10)
    p_bc.font.bold = True
    p_bc.font.color.rgb = PRIMARY

    # =========================================================================
    # SLIDE 7: ACADEMIC CURRICULUM & CORE SUBJECTS
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s7)
    add_header(s7, "Academic Curriculum & Interactive Quiz Engine", category="CURRICULUM MODULES",
               subtitle_text="Pre-seeded with university-standard engineering questions across 4 core CS subjects.")

    subjs = [
        ("Data Structures (DSA)",
         "Arrays, Stacks, Queues, Binary Trees, Heaps, and Graph algorithms. Evaluates Big-O time and space complexity.",
         PRIMARY, "5 Questions • 80% Seed Score"),
        ("Database Systems (DBMS)",
         "Relational schemas, Normalization (1NF–BCNF), SQL Joins, ACID transactions, and Indexing optimizations.",
         TEAL, "5 Questions • 60% Seed Score"),
        ("Operating Systems (OS)",
         "Process scheduling, CPU dispatching, Deadlocks, Paging, Virtual Memory, and Thrashing prevention.",
         AMBER, "5 Questions • 40% Seed Score"),
        ("Computer Networks (CN)",
         "OSI 7 Layers, TCP/IP handshakes, VLSM Subnetting, Routing protocols, and DNS/DHCP infrastructure.",
         PURPLE, "5 Questions • 20% Seed Score"),
    ]

    for i, (title, desc, col, meta) in enumerate(subjs):
        col_idx = i % 2
        row_idx = i // 2
        left = Inches(0.8 + col_idx * 5.95)
        top = Inches(1.85 + row_idx * 2.5)

        draw_card(s7, left, top, Inches(5.75), Inches(2.25), fill_color=BG_LIGHT, border_color=BORDER_LIGHT)

        # Indicator tag
        ind = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.2), top + Inches(0.2), Inches(0.08), Inches(1.85))
        ind.fill.solid()
        ind.fill.fore_color.rgb = col
        ind.line.fill.background()

        sbox = s7.shapes.add_textbox(left + Inches(0.4), top + Inches(0.2), Inches(5.1), Inches(1.85))
        tf_sb = sbox.text_frame
        tf_sb.word_wrap = True

        p_t = tf_sb.paragraphs[0]
        p_t.text = f"📚  {title}"
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = col

        p_d = tf_sb.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_BODY
        p_d.space_before = Pt(6)

        p_m = tf_sb.add_paragraph()
        p_m.text = f"Status: {meta}"
        p_m.font.size = Pt(9.5)
        p_m.font.bold = True
        p_m.font.color.rgb = TEXT_MAIN
        p_m.space_before = Pt(8)

    # =========================================================================
    # SLIDE 8: PLATFORM WALKTHROUGH & LIVE ROUTES
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s8)
    add_header(s8, "MissionX Web Application & Feature Walkthrough", category="PLATFORM WALKTHROUGH",
               subtitle_text="Intuitive, modern web application designed for students and evaluators.")

    routes = [
        ("Dashboard (/dashboard)",
         "Unified command center with live sensor widgets, 4-subject learning progress meters, and quick actions.",
         PRIMARY),
        ("Live Sensor Console (/sensor)",
         "Primary sensor dial, 3-second live sampling loop, technical specifications, and rolling 8-sample history.",
         TEAL),
        ("Hardware Simulator (/simulator)",
         "Full breadboard visualizer, temp/humidity sliders, presets, 115200 baud serial monitor, and C++ sketch viewer.",
         AMBER),
        ("Subject Challenge Quizzes (/quiz/[id])",
         "Interactive quiz engine with option selection, immediate validation feedback, explanations, and score persistence.",
         EMERALD),
    ]

    for i, (title, desc, col) in enumerate(routes):
        top = Inches(1.85 + i * 1.25)
        draw_card(s8, Inches(0.8), top, Inches(11.733), Inches(1.1), fill_color=BG_LIGHT, border_color=BORDER_LIGHT)

        # Icon pill
        pill = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.05), top + Inches(0.25), Inches(0.6), Inches(0.6))
        pill.fill.solid()
        pill.fill.fore_color.rgb = col
        pill.line.fill.background()

        rbox = s8.shapes.add_textbox(Inches(1.85), top + Inches(0.15), Inches(10.4), Inches(0.8))
        tf_r = rbox.text_frame
        tf_r.word_wrap = True

        p1 = tf_r.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf_r.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_BODY
        p2.space_before = Pt(3)

    # =========================================================================
    # SLIDE 9: SUMMARY, ACADEMIC IMPACT & FUTURE ROADMAP
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_white_bg(s9)
    add_header(s9, "Project Summary, Academic Impact & Future Scope", category="CONCLUSION",
               subtitle_text="Demonstrating cyber-physical systems engineering with zero hardware barriers.")

    # Left: Key Achievements
    draw_card(s9, Inches(0.8), Inches(1.85), Inches(5.6), Inches(4.9), fill_color=RGBColor(240, 253, 250), border_color=BORDER_TEAL)
    t_c1 = s9.shapes.add_textbox(Inches(1.05), Inches(2.05), Inches(5.1), Inches(4.4))
    tf_c1 = t_c1.text_frame
    tf_c1.word_wrap = True
    p = tf_c1.paragraphs[0]
    p.text = "KEY PROJECT ACHIEVEMENTS"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = TEAL

    achievements = [
        ("Full-Stack Cyber-Physical System", "Working integration of Next.js 14, Node/Express, MongoDB, and ESP32 telemetry."),
        ("Zero-Hardware Accessibility", "Solves component shortages via built-in Web Workbench & Wokwi simulation."),
        ("Real-Time Telemetry Pipeline", "Continuous 3s sampling, threshold warnings (>28°C), and acoustic alarms (>32°C)."),
        ("Gamified CS Pedagogy", "Measurable student progress tracking across Data Structures, DBMS, OS, and Networks.")
    ]
    for h, d in achievements:
        p_h = tf_c1.add_paragraph()
        p_h.text = f"✔  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(10.5)
        p_h.font.color.rgb = TEXT_MAIN
        p_h.space_before = Pt(8)
        p_d = tf_c1.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # Right: Future Expansion Roadmap
    draw_card(s9, Inches(6.75), Inches(1.85), Inches(5.75), Inches(4.9), fill_color=RGBColor(239, 246, 255), border_color=BORDER_PRIMARY)
    t_c2 = s9.shapes.add_textbox(Inches(7.0), Inches(2.05), Inches(5.2), Inches(4.4))
    tf_c2 = t_c2.text_frame
    tf_c2.word_wrap = True
    p = tf_c2.paragraphs[0]
    p.text = "FUTURE EXPANSION ROADMAP"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = PRIMARY

    roadmap = [
        ("Physical Testbed Deployment", "Flash firmware to physical ESP32 boards with RFID readers & Solenoid locks."),
        ("Multi-Sensor Sensor Grid", "Add Ultrasonic proximity sensors, PIR motion detectors, and MQ-2 smoke sensors."),
        ("AI Dynamic Hint Engine", "LLM-driven hint generation with dynamic time penalty trade-offs."),
        ("Multiplayer Co-op Rooms", "WebSocket room synchronization for multi-student collaborative escape rooms.")
    ]
    for h, d in roadmap:
        p_h = tf_c2.add_paragraph()
        p_h.text = f"🚀  {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(10.5)
        p_h.font.color.rgb = TEXT_MAIN
        p_h.space_before = Pt(8)
        p_d = tf_c2.add_paragraph()
        p_d.text = f"    {d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = TEXT_BODY

    # Save presentation
    prs.save(output_path)
    print(f"White presentation generated successfully: {output_path} with {len(prs.slides)} slides.")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "MissionX_Presentation.pptx"
    build_white_presentation(out_file)
