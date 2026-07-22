# NEXORA — DESIGN_SYSTEM.md
## AI Financial Intelligence Platform — Design System
### Version 1.0 | Brand & Visual Specification

---

## 0. Design System Overview

### 0.1 Purpose

This document defines the complete visual and interaction language for Nexora — a premium AI Financial Intelligence Platform. It serves as the single source of truth for all product design decisions, ensuring consistency across the dashboard, reports, conversational AI interface, and all user touchpoints.

### 0.2 Design Principles

| Principle | Definition | Application |
|---|---|---|
| **Calm Intelligence** | The product feels serene, never frantic | Generous spacing, restrained motion, quiet color palette |
| **Narrative-First** | Understanding precedes data | Every screen leads with a sentence, not a chart |
| **Trust by Design** | Every claim is traceable and verifiable | Source evidence is always accessible; AI and computed facts are visually distinct |
| **Progressive Disclosure** | Simple by default, depth on demand | One click reveals detail; no information overload |
| **Consistent Voice** | One coherent tone across all surfaces | Dashboard, Report, and Chat share the same explanatory rhythm |
| **Quiet FinTech** | Professional, not hype-driven | Aesthetic closer to Stripe/Revolut than crypto-native neon |

### 0.3 Design Tokens Foundation

All visual decisions below derive from a single token system — color, typography, spacing, and motion are not independent but scale together.

---

## 1. Brand Identity

### 1.1 Brand Essence

**One-line brand statement:**
> Nexora is the interpretive layer of on-chain finance — turning data into understanding.

**Brand Pillars:**
- **Clarity** — We cut through the noise
- **Trust** — Every claim is verifiable
- **Intelligence** — AI that actually helps
- **Calm** — No hype, no anxiety

### 1.2 Brand Personality

| Attribute | Description |
|---|---|
| **Tone** | Calm, competent, honest, quietly intelligent |
| **Voice** | Plain-spoken and specific; never jargon-heavy or generic |
| **Character** | The most trustworthy person in the room — never hype-driven, never alarmist, never condescending |
| **Energy** | Low-frequency, high-signal |

### 1.3 Brand Archetype

**The Sage** — Nexora is the wise advisor that helps users understand complex financial realities with clarity and confidence. It doesn't sell excitement; it sells understanding.

### 1.4 Brand Messaging Framework

| Layer | Description |
|---|---|
| **Promise** | We turn your blockchain activity into financial understanding |
| **Reason to Believe** | Deterministic math + AI narrative with source traceability |
| **Emotional Benefit** | Confidence, control, peace of mind |
| **Functional Benefit** | Know what's happening, why it matters, and what to do next |
| **Brand Essence** | Clarity over completeness |

---

## 2. Visual Direction

### 2.1 Aesthetic Positioning

Nexora lives at the intersection of three design traditions:

```
    Premium FinTech
    (Banking apps, wealth management)
           │
    ┌──────┼──────┐
    │      │      │
    │      │      │
AI Product   Web3 / Crypto
(Language    (Non-custodial,
models,      read-only,
conversational)  blockchain-native)
```

**The resulting aesthetic:**
- **Restrained, not cold** — Professional minimalism with warmth
- **Intelligent, not flashy** — Typography-led hierarchy over decorative graphics
- **Confidence-inspiring, not dull** — Precision and care in every detail
- **Modern, not trendy** — Timeless design that ages well

### 2.2 Mood Board Direction

**Visual References:**
- **Linear** — Clean typography, generous spacing, functional minimalism
- **Stripe** — Restrained color palette, clarity of hierarchy, trust signals
- **Revolut** — Consumer FinTech polish, accessible but premium
- **Coinbase (recent)** — Web3-native but mature, professional credibility
- **Apple (Financial)** — Precision, calm, human-centered

**What Nexora is NOT:**
- Not a trading terminal (dense, overwhelming)
- Not a "crypto" app (neon, gradient-heavy, gamified)
- Not a generic dashboard (passive data display)
- Not a chatbot-style product (conversational but structured)

### 2.3 Visual Metaphor

**Interpretive Layer** — Nexora sits between raw data and understanding. The visual language communicates this through:
- Layers of information (foreground narrative, background supporting data)
- Clarity of hierarchy (what matters most is always most prominent)
- Subtle depth cues (cards, elevation, progressive disclosure)

---

## 3. Color Palette

### 3.1 Color Philosophy

Nexora's color system is **restrained and purposeful** — every color has a functional role, not decorative intent. The palette supports the brand's calm, trustworthy character while providing clear signaling for risk, growth, and states.

- **Neutral base** — Confidence, stability, professionalism
- **Single accent** — Primary actions, key signals, restrained usage
- **Signal colors** — Risk, caution, stable — used sparingly and always paired with text labels
- **Dark/Light modes** — Both supported with equal care

### 3.2 Dark Mode Palette (Primary)

Nexora's default experience is dark mode — the standard for FinTech and crypto products — creating a premium, focused, "quiet" environment.

| Role | Color | HEX | Usage |
|---|---|---|---|
| **Background Primary** | Deep Space | `#0A0A0F` | Main app background |
| **Background Secondary** | Surface Dark | `#13131A` | Cards, widgets, panels |
| **Background Elevated** | Surface Elevated | `#1C1C26` | Hover states, elevated cards |
| **Background Input** | Input Dark | `#242433` | Form fields, search bars |
| **Border Subtle** | Border Dim | `#2A2A3A` | Dividers, subtle borders |
| **Border Default** | Border Base | `#38384A` | Cards, active borders |
| **Text Primary** | White | `#FFFFFF` | Primary copy, headlines |
| **Text Secondary** | Light Gray | `#A0A0B8` | Supporting text, metadata |
| **Text Tertiary** | Muted Gray | `#6B6B80` | Placeholders, disabled states |
| **Text Inverse** | Dark | `#0A0A0F` | On accent backgrounds |

### 3.3 Accent Palette

| Role | Color | HEX | Usage |
|---|---|---|---|
| **Accent Primary** | Aurora Blue | `#4A7BFF` | Primary CTA, key links, active states |
| **Accent Hover** | Aurora Blue Bright | `#5A8BFF` | Hover states on primary actions |
| **Accent Subtle** | Aurora Blue Dim | `#1A2B4A` | Background highlights, selected states |
| **Accent Secondary** | Soft Indigo | `#6C5CE7` | Secondary actions, emphasis |
| **Accent Glow** | Aurora Glow | `#4A7BFF / 20%` | Soft glow effects (risk alerts, highlights) |

### 3.4 Signal Palette

Signals are used sparingly — always paired with text labels (never color alone), consistent with accessibility and trust principles.

| Role | Color | HEX | Usage |
|---|---|---|---|
| **Risk** | Signal Red | `#E54D5A` | Risk severity alerts, dangerous flags |
| **Risk Background** | Signal Red Dim | `#3A1A1E` | Risk alert backgrounds |
| **Caution** | Signal Amber | `#E8A838` | Caution severity, attention needed |
| **Caution Background** | Signal Amber Dim | `#3A2A1A` | Caution alert backgrounds |
| **Stable / Positive** | Signal Green | `#3DBD7A` | Stable status, positive performance |
| **Stable Background** | Signal Green Dim | `#1A2A22` | Stable alert backgrounds |
| **Neutral / Info** | Signal Blue | `#4A7BFF` | Informational states |

### 3.5 Light Mode Palette

| Role | Color | HEX | Usage |
|---|---|---|---|
| **Background Primary** | White | `#FFFFFF` | Main app background |
| **Background Secondary** | Light Gray | `#F5F5F7` | Cards, widgets |
| **Background Elevated** | Gray | `#EDEDF0` | Hover states |
| **Border Subtle** | Border Light | `#E5E5E8` | Dividers |
| **Text Primary** | Dark | `#1A1A24` | Primary copy |
| **Text Secondary** | Medium Gray | `#6B6B80` | Supporting text |
| **Text Tertiary** | Muted Gray | `#A0A0B8` | Placeholders |

### 3.6 Gradient System

| Gradient | Colors | Usage |
|---|---|---|
| **Primary Glow** | `#4A7BFF` → `#6C5CE7` | Hero accents, subtle backgrounds |
| **Signal Risk** | `#E54D5A` → `#C0392B` | Risk emphasis |
| **Signal Stable** | `#3DBD7A` → `#2ECC71` | Positive states |

---

## 4. Typography

### 4.1 Typography Philosophy

Nexora is a **reading product** — the primary deliverable is a sentence, not a chart. Typography is therefore the most important visual element. We prioritize:

- **Legibility** — High contrast, generous line height, appropriate size
- **Hierarchy** — Clear, consistent visual hierarchy without guesswork
- **Tone** — Professional, approachable, never loud
- **Performance** — Fast-loading system fonts with fallbacks

### 4.2 Font Stack

**Primary Typeface:** SF Pro / SF Pro Display (Apple system font)

Reason: SF Pro is the most legible, refined system font available, with excellent readability at all sizes and deep support for both Dark and Light modes. It conveys precision, modernity, and trust.

```
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
```

**Fallback Stack:**
- macOS: San Francisco
- Windows: Segoe UI, Helvetica Neue, Arial
- Linux: system-ui

### 4.3 Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| **Display** | 56px | 700 | 64px | -0.5px | Landing page hero, major headlines |
| **Heading 1** | 40px | 700 | 48px | -0.3px | Section headlines, Report titles |
| **Heading 2** | 28px | 600 | 36px | -0.2px | Widget headers, sub-sections |
| **Heading 3** | 22px | 600 | 30px | 0px | Card titles, insight headlines |
| **Body Large** | 18px | 400 | 28px | 0px | Primary narrative text, Report copy |
| **Body** | 16px | 400 | 24px | 0px | Standard copy, descriptions |
| **Body Small** | 14px | 400 | 20px | 0px | Metadata, secondary text |
| **Caption** | 12px | 500 | 16px | 0.5px | Labels, badges, timestamps |
| **Overline** | 11px | 600 | 14px | 1px | Section labels, categories |

### 4.4 Font Weights

| Weight | Value | Usage |
|---|---|---|
| **Regular** | 400 | Body text, paragraphs |
| **Medium** | 500 | Labels, metadata, emphasis |
| **Semibold** | 600 | Subheadings, navigation |
| **Bold** | 700 | Headlines, primary titles |

### 4.5 Text Styles by Context

**Dashboard:**
- Health Card status: Heading 2 (28px, 600)
- Health explanation: Body (16px, 400)
- Widget titles: Heading 3 (22px, 600)
- Insight items: Body (16px, 400)
- Metadata: Caption (12px, 500)

**AI Financial Report:**
- Report title: Heading 1 (40px, 700)
- Section titles: Heading 2 (28px, 600)
- Narrative text: Body Large (18px, 400)
- Supporting numbers: Body Large (18px, 600)
- Source evidence: Body Small (14px, 400)

**Ask Nexora:**
- User question: Body Large (18px, 500)
- AI response: Body Large (18px, 400)
- Response facts: Body Large (18px, 600)
- Suggestions: Body (16px, 400)

### 4.6 Accessibility

- Minimum contrast ratio: 4.5:1 for all text (WCAG 2.1 AA)
- Never use color alone to convey meaning (always paired with text labels)
- Large text (18px+) maintains at least 3:1 contrast
- Responsive scaling for smaller screens

---

## 5. Spacing & Layout

### 5.1 Spacing System

Based on a 4px grid system for precision and consistency.

| Token | Value | Usage |
|---|---|---|
| **space-1** | 4px | Minimal spacing, icon-to-text |
| **space-2** | 8px | Compact spacing, inline elements |
| **space-3** | 12px | Tight spacing, small components |
| **space-4** | 16px | Standard spacing, body text |
| **space-5** | 20px | Medium spacing |
| **space-6** | 24px | Large spacing, sections |
| **space-8** | 32px | Extra large spacing, major dividers |
| **space-10** | 40px | Section spacing |
| **space-12** | 48px | Page-level spacing |
| **space-16** | 64px | Major layout dividers |

### 5.2 Layout Principles

**Generous whitespace** — The product breathes. Never pack information; let it breathe.

**Clear hierarchy** — Every page has one primary element, one secondary, and supporting detail.

**Progressive disclosure** — Summary → expanded → detail. Never show all at once.

**Consistent rhythm** — Vertical rhythm aligns to 4px grid, horizontal rhythm to 8px grid.

### 5.3 Grid System

**Desktop:**
- 12-column grid
- 1200px max-width container
- 24px column gutter
- 80px margins

**Tablet:**
- 8-column grid
- 100% width with 24px margins
- 16px column gutter

**Mobile:**
- 4-column grid
- 100% width with 16px margins
- 12px column gutter

### 5.4 Component Spacing

| Component | Padding | Margin |
|---|---|---|
| **Card** | 24px | 16px bottom |
| **Widget** | 20px | 16px bottom |
| **Button** | 12px 24px | 8px |
| **Input** | 12px 16px | 8px |
| **Section** | — | 40px bottom |

---

## 6. Iconography

### 6.1 Icon Philosophy

Icons serve a **functional** purpose — they support comprehension and navigation. They should be:

- **Recognizable** — Clear, simple, familiar symbols
- **Consistent** — Same style, weight, and proportions across all icons
- **Minimal** — No decorative icons; every icon has a job
- **Accessible** — Always paired with text labels when representing actions

### 6.2 Icon Style

**Style:** Line-art, rounded corners, consistent 2px stroke

**Visual attributes:**
- 24x24px standard size
- 2px stroke width
- Rounded stroke caps and joins
- Monochromatic (except signal icons like risk)
- Filled state for active/toggled icons

### 6.3 Key Icons by Category

**Navigation:**
- Dashboard: Grid / Home
- Portfolio: Pie chart / Wallet
- Transactions: Clock / List
- Report: Document / File
- Ask: Chat / Speech bubble
- Alerts: Bell / Flag
- Settings: Gear / Sliders

**Financial:**
- Fee: Dollar / Coin stack
- Risk: Shield / Warning
- Growth: Arrow up
- Decline: Arrow down
- Stable: Check / Shield check
- Swap: Arrows exchanged

**Actions:**
- Expand: Chevron down
- Collapse: Chevron up
- View details: Arrow right
- Connect: Link / Plug
- Disconnect: Unlink
- Search: Magnifying glass
- Filter: Funnel / Sliders

### 6.4 Icon Colors

| Context | Color |
|---|---|
| **Primary navigation** | Text Secondary |
| **Active navigation** | Accent Primary |
| **Actions** | Accent Primary |
| **Signal (Risk)** | Signal Red |
| **Signal (Caution)** | Signal Amber |
| **Signal (Stable)** | Signal Green |

---

## 7. Core Components

### 7.1 Component Philosophy

Components are **reusable, purposeful, and consistent**. Every component in Nexora follows the same design principles:

- **Functional** — Every component solves a specific problem
- **Consistent** — Same component, same behavior, everywhere
- **Accessible** — Keyboard, screen-reader, and color-contrast compliant
- **Calm** — No flashing, no movement without purpose

### 7.2 Component: Primary Narrative Block

The fundamental unit of Nexora's UI — a computed fact paired with an AI explanation.

```
┌─────────────────────────────────────┐
│  [Computed Fact]                     │
│  • 80% of your portfolio is in XLM  │
│  • This is up from 65% last month   │
│                                      │
│  [AI Narrative]                      │
│  "Your portfolio is heavily         │
│   concentrated in one asset. This   │
│   could mean higher volatility      │
│   risk."                            │
│                                      │
│  [Source Evidence Link]              │
│  See transactions that support this │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Computed fact: Body Large, 600, Text Primary
- AI narrative: Body Large, 400, Text Secondary
- Evidence link: Body Small, 400, Accent Primary, underline on hover
- Padding: 16px 20px
- Background: Background Secondary
- Border radius: 8px

### 7.3 Component: KPI Card

Single important number with context.

```
┌─────────────────────────────────────┐
│  [Label]          [Icon]            │
│  "Portfolio Value"                   │
│                                      │
│  [Value]                             │
│  $12,450.20                          │
│                                      │
│  [Context]                           │
│  ▲ 4.2% this month                   │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Label: Caption (12px, 500), Text Tertiary
- Value: Heading 2 (28px, 700), Text Primary
- Context: Body Small (14px, 500), Signal Green or Signal Red
- Padding: 20px 24px
- Background: Background Secondary
- Border radius: 8px
- Min-width: 160px

### 7.4 Component: Widget

Self-contained module with summary + expansion.

```
┌─────────────────────────────────────┐
│  [Widget Title]       [Action Link] │
│  "Allocation Breakdown"   "See All" │
│  ────────────────────────────────── │
│                                      │
│  [Widget Content]                    │
│  • Donut/Bar chart                  │
│  • AI annotation                    │
│                                      │
│  [Expansion — hidden by default]    │
│  • Detailed breakdown               │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Title: Heading 3 (22px, 600), Text Primary
- Action link: Body Small (14px, 500), Accent Primary
- Background: Background Secondary
- Border: 1px Border Subtle
- Border radius: 12px
- Padding: 20px 24px 24px 24px
- Gap between sections: 16px

### 7.5 Component: Insight Item

AI observation with timestamp and source evidence.

```
┌─────────────────────────────────────┐
│  [Severity Badge]   [Timestamp]     │
│  RISK              2 hours ago     │
│                                      │
│  [Headline]                          │
│  "Your portfolio is 80% concentrated│
│   in XLM"                            │
│                                      │
│  [Narrative]                         │
│  "This is 15% above your historical │
│   baseline. This concentration      │
│   means..."                          │
│                                      │
│  [Source]  [Ask]  [Dismiss]         │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Severity badge: Caption (12px, 600), signal color background
- Timestamp: Caption (12px, 400), Text Tertiary
- Headline: Body Large (18px, 600), Text Primary
- Narrative: Body (16px, 400), Text Secondary
- Actions: Body Small (14px, 500), Accent Primary
- Background: Background Secondary
- Border radius: 8px
- Padding: 16px 20px

### 7.6 Component: Button

**Primary Button:**
```
┌─────────────────────┐
│  Connect Wallet      │
└─────────────────────┘
```
- Background: Accent Primary
- Text: White, Body (16px, 600)
- Padding: 12px 28px
- Border radius: 8px
- Hover: Background → Accent Hover
- Active: Scale 98%

**Secondary Button:**
```
┌─────────────────────┐
│  See Details        │
└─────────────────────┘
```
- Background: Transparent
- Text: Accent Primary, Body (16px, 500)
- Border: 1px Border Default
- Padding: 10px 24px
- Border radius: 8px
- Hover: Background → Background Elevated

**Ghost Button:**
```
See transactions that support this
```
- Text: Accent Primary, Body Small (14px, 500)
- Underline on hover
- No background, no padding

### 7.7 Component: Input Field

```
┌─────────────────────────────────────┐
│  [Label]                             │
│  "Wallet Address"                    │
│  ┌─────────────────────────────────┐ │
│  │  GABCD...                       │ │
│  └─────────────────────────────────┘ │
│  [Helper text / Error]               │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Label: Body Small (14px, 500), Text Secondary
- Input: Body (16px, 400), Text Primary
- Background: Background Input (dark) / Background Secondary (light)
- Border: 1px Border Default, focus → Accent Primary
- Padding: 12px 16px
- Border radius: 8px
- Error: Border → Signal Red, error text → Signal Red

### 7.8 Component: Toggle / Switch

```
┌─────────────────────────────────────┐
│  [Label]                 [Switch]   │
│  "Receive weekly reports"           │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Track width: 40px, height: 22px
- Track radius: 11px
- Thumb size: 18px
- Thumb radius: 9px
- Track off: Background Tertiary
- Track on: Accent Primary
- Thumb: White

### 7.9 Component: Badge / Tag

```
┌──────────┐
│  Payment  │
└──────────┘
```

**Visual attributes:**
- Text: Caption (12px, 600)
- Padding: 4px 10px
- Border radius: 4px
- Background: Background Elevated
- Color: Text Secondary

### 7.10 Component: Card

```
┌─────────────────────────────────────┐
│  [Card Content]                      │
│                                      │
│  • Title                            │
│  • Body                             │
│  • Actions                          │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Background: Background Secondary
- Border: 1px Border Subtle
- Border radius: 12px
- Padding: 24px
- Shadow: none (flat design) or subtle elevation

### 7.11 Component: Alert Banner

```
┌─────────────────────────────────────┐
│  [Icon]  [Message]       [Dismiss]  │
│  ⚠️  "Concentration risk detected"  │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Background: Signal Red Dim (risk) / Signal Amber Dim (caution) / Signal Green Dim (stable)
- Text: Signal Red (risk) / Signal Amber (caution) / Signal Green (stable)
- Padding: 12px 20px
- Border radius: 8px

### 7.12 Component: Source Evidence

```
┌─────────────────────────────────────┐
│  [Source Evidence — expanded]       │
│  ────────────────────────────────── │
│  Transaction 1                      │
│  • Date: 2026-03-10                │
│  • Amount: 50 XLM                   │
│  • Type: Payment                    │
│                                      │
│  Transaction 2                      │
│  • Date: 2026-03-08                │
│  • Amount: 100 XLM                  │
│  • Type: Swap                       │
└─────────────────────────────────────┘
```

**Visual attributes:**
- Background: Background Elevated
- Padding: 16px 20px
- Border radius: 8px
- Text: Body Small (14px, 400)

---

## 8. Dashboard Style

### 8.1 Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│  Nexora  Dashboard  Portfolio  Transactions  ...   │
│  ───────────────────────────────────────────────── │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Quick Ask Bar]    Ask Nexora something... │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Portfolio Health Card]                    │   │
│  │  "Stable"   Score 84/100                   │   │
│  │  "Your portfolio is well-diversified..."    │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │  [Performance]│  │  [Allocation]│               │
│  │  Chart       │  │  Donut       │               │
│  │  ▲ 4.2%      │  │  60% XLM     │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Recent Insights Feed]                     │   │
│  │  • Fee spend 20% above average...          │   │
│  │  • XLM price movement affected...           │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Fee Summary Card]                         │   │
│  │  Total fees: $2.10 this month              │   │
│  │  "Fees are in line with your average..."    │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 8.2 Dashboard Widget Order

1. **Portfolio Health Card** — Primary anchor, always first
2. **Performance Snapshot** — Trend view
3. **Allocation Breakdown** — Composition
4. **Recent Insights Feed** — What's new
5. **Fee Summary Card** — Supplementary

### 8.3 Health Card Design

```
┌─────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────┐   │
│  │  [Status: Stable]    [Score: 84/100]       │   │
│  │                                             │   │
│  │  "Your portfolio is well-diversified across │   │
│  │   4 assets. You're not over-exposed to any │   │
│  │   single asset. Your fee spend is in line  │   │
│  │   with your historical average."            │   │
│  │                                             │   │
│  │  See Details →                             │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Visual attributes:**
- Status badge: Signal Green (Stable) / Signal Amber (Caution) / Signal Red (Risk)
- Score: Display font size (56px), weight 700
- Explanation: Body Large (18px), Text Secondary
- Background: Background Secondary
- Border radius: 12px
- Padding: 32px

---

## 9. AI Assistant Interface

### 9.1 Ask Nexora Layout

```
┌─────────────────────────────────────────────────────┐
│  Nexora  Dashboard  Portfolio  ...  Ask Nexora    │
│  ───────────────────────────────────────────────── │
│                                                     │
│  Ask Nexora                                        │
│  Ask anything about your finances                  │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [User]                                     │   │
│  │  "How much did I lose to fees this month?"  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Nexora]                                   │   │
│  │  [Computed Fact]                           │   │
│  │  Total fees: 5.2 XLM ($2.10)              │   │
│  │                                             │   │
│  │  [AI Narrative]                            │   │
│  │  "This is 12% above your average monthly   │   │
│  │   fee spend. The increase is primarily from │   │
│  │   three swaps you executed this week."     │   │
│  │                                             │   │
│  │  [Source Evidence Link]                    │   │
│  │  See the transactions →                     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Suggested Questions]                     │   │
│  │  How much XLM do I hold?                   │   │
│  │  Show me my activity over the last 30 days │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Ask Nexora something...           [Send]  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 9.2 Message Bubbles

**User Message:**
- Align right
- Background: Accent Primary Dim
- Text: Text Primary
- Border radius: 12px 12px 0 12px
- Padding: 12px 16px

**System (Nexora) Message:**
- Align left
- Background: Background Secondary
- Text: Text Primary
- Border radius: 12px 12px 12px 0
- Padding: 16px 20px

### 9.3 Quick Ask Bar (Persistent)

```
┌─────────────────────────────────────────────────────┐
│  💬  Ask Nexora something...                [Send] │
└─────────────────────────────────────────────────────┘
```

**Visual attributes:**
- Background: Background Input
- Text: Body (16px, 400), Text Tertiary (placeholder)
- Border: 1px Border Subtle
- Border radius: 8px
- Padding: 10px 16px
- Persistent across all screens

### 9.4 Suggestions

```
┌─────────────────────────────────────────────────────┐
│  Try asking:                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │  How much XLM do I hold?                    │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  What were my total fees this month?        │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  Show me my activity over the last 30 days  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 10. Charts & Data Visualization

### 10.1 Visualization Philosophy

- **Minimal, not max** — Show only what matters
- **High signal, low noise** — No 3D, no gradients, no decorative elements
- **Always paired with narrative** — Every chart has a plain-language explanation
- **Consistent styling** — Same color palette, same grid, same axis

### 10.2 Chart Types

**Line Chart — Performance Over Time:**
- Single line (portfolio value)
- Smooth curve
- X-axis: Time (date intervals)
- Y-axis: Value (USD)
- Fill below line: Subtle gradient (20% opacity)
- Grid lines: Subtle, Border Subtle
- Point markers: Only on hover

**Donut Chart — Allocation Breakdown:**
- Single ring (asset allocation)
- Segment colors: Accent Primary, Soft Indigo, Signal Green, Signal Amber
- Center: Total value
- Hover: Segment expands slightly, shows % and value

**Bar Chart — Fee Comparison:**
- Horizontal or vertical bars
- Current period vs. historical average
- Colors: Accent Primary (current), Text Tertiary (average)

**KPI Charts — Compact:**
- Single number with delta indicator
- Sparkline (mini trend line) optional

### 10.3 Chart Colors

| Element | Color |
|---|---|
| **Portfolio value line** | Accent Primary |
| **Portfolio value fill** | Accent Primary / 20% |
| **XLM** | Accent Primary |
| **USDC** | Signal Green |
| **Other asset** | Soft Indigo |
| **Grid lines** | Border Subtle |
| **Labels** | Text Tertiary |
| **Positive delta** | Signal Green |
| **Negative delta** | Signal Red |

### 10.4 Chart Responsive Behavior

- **Desktop:** Full-width, detailed axis labels
- **Tablet:** Reduced padding, simplified labels
- **Mobile:** Full-width, compact, horizontal scrolling for multi-bar charts

### 10.5 No-Data State

```
┌─────────────────────────────────────────────┐
│  ┌───────────────────────────────────────┐  │
│  │  [Empty chart placeholder]           │  │
│  │                                       │  │
│  │  "Waiting for data"                  │  │
│  │                                       │  │
│  │  "Once your wallet has activity,     │  │
│  │   charts will appear here."          │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 11. Wallet Experience

### 11.1 Wallet Connection Flow

**Step 1: Method Selection**
```
┌─────────────────────────────────────────────────────┐
│  Connect Your Stellar Wallet                       │
│  Read-only access — we never touch funds          │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  ○ Enter public address                     │   │
│  │  ○ Connect with Freighter                   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Address Input Field]                     │   │
│  │  GABCDE...                                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ✅ I understand Nexora can read my public data    │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Connect & Analyze                         │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Step 2: Consent & Connection**
- Explicit consent confirmation required
- Visual indication: "Read-only" badge prominently displayed
- Security messaging: "Never enter your private key"

### 11.2 Wallet Security Indicators

**Connected Wallet Display:**
```
┌─────────────────────────────────────────────────────┐
│  🔒  Connected: GABC...1234                        │
│  Status: Active                                     │
│  Connected: March 10, 2026                         │
└─────────────────────────────────────────────────────┘
```

**Security badges:**
- "Read-Only" badge — Green, reassuring
- "No Private Keys" badge — Trust signal

### 11.3 Wallet Disconnect & Deletion

**Disconnect Confirmation:**
```
┌─────────────────────────────────────────────────────┐
│  Disconnect Wallet?                                │
│                                                     │
│  Your reports will remain available. Data          │
│  ingestion will stop immediately.                  │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐                 │
│  │  Cancel     │  │  Disconnect │                 │
│  └─────────────┘  └─────────────┘                 │
└─────────────────────────────────────────────────────┘
```

**Delete Data Confirmation (More prominent):**
```
┌─────────────────────────────────────────────────────┐
│  ⚠️  Delete All Derived Data?                       │
│                                                     │
│  This is permanent and irreversible.                │
│                                                     │
│  All reports, insights, and analysis will be       │
│  permanently removed.                               │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐                 │
│  │  Cancel     │  │  Delete Data│                 │
│  └─────────────┘  └─────────────┘                 │
└─────────────────────────────────────────────────────┘
```

---

## 12. Responsive Rules

### 12.1 Breakpoints

| Breakpoint | Min Width | Max Width | Layout |
|---|---|---|---|
| **Mobile** | 320px | 767px | Single column, 4-column grid |
| **Tablet** | 768px | 1023px | 8-column grid |
| **Desktop** | 1024px | 1439px | 12-column grid |
| **Wide** | 1440px | — | 12-column grid, max-width 1200px |

### 12.2 Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Navigation** | Bottom bar / drawer | Horizontal bar | Horizontal bar |
| **Dashboard widgets** | Stack vertically | 2-column grid | 2-column grid |
| **Health Card** | Full-width | Full-width | Full-width |
| **Performance chart** | Full-width | Full-width | Full-width |
| **Allocation chart** | Full-width | Side-by-side with list | Side-by-side with list |
| **Transaction feed** | Full-width, single column | Full-width | Full-width, 2-column |
| **Ask Nexora** | Full-width, input at bottom | Full-width | Full-width |
| **Report** | Full-width, linear | Full-width, linear | Full-width, linear |
| **Modal dialogs** | Full-screen | Modal overlay | Modal overlay |

### 12.3 Mobile-Specific Considerations

**Navigation:**
- 5-6 primary items visible in bottom bar
- Remaining items in overflow menu
- Quick Ask Bar persists at top

**Content:**
- Widget stack priority order maintained
- Charts: Horizontal scrolling for multi-bar charts
- Charts: Simplified labels (fewer ticks)
- Fonts: Slight reduction in display sizes

**Interactive Elements:**
- Touch targets: minimum 44px
- Gestures: Swipe for navigation (where appropriate)
- Keyboard: Automatically shows on input focus

---

## 13. Animation & Motion

### 13.1 Motion Philosophy

- **Purposeful, not decorative** — Every animation supports comprehension
- **Subtle, not flashy** — Motion should be felt, not noticed
- **Fast, not jarring** — Quick transitions maintain flow
- **Accessible** — Reduced motion preference respected

### 13.2 Timing

| Duration | Usage |
|---|---|
| **50ms** | Micro-interactions, hover states |
| **150ms** | Transitions, expansion, collapse |
| **300ms** | Page transitions, modal opens |
| **500ms** | Progressive loading, count-up effects |

### 13.3 Easing

- **Standard:** `cubic-bezier(0.2, 0, 0, 1)` — For most interactions
- **Accelerate:** `cubic-bezier(0.4, 0, 1, 1)` — Exiting elements
- **Decelerate:** `cubic-bezier(0, 0, 0.2, 1)` — Entering elements

### 13.4 Key Animations

**Progress Disclosure (Expand/Collapse):**
- Content expands from top (not from center)
- 200ms duration
- Standard easing

**Count-Up Numbers:**
- Numbers count up from 0 to final value
- 500ms duration
- Decelerate easing

**Chart Updates:**
- New data transitions in
- 300ms duration
- Standard easing

**Alert/Notification Entry:**
- Slide in from top or right
- 300ms duration
- Decelerate easing

**Loading States:**
- Subtle shimmer effect
- Pulsing opacity
- No spinning indicators except for primary loading

### 13.5 Reduced Motion

Users who prefer reduced motion:
- Disable all animations and transitions
- Show data directly without transitions
- No count-up effects
- Simplified loading states

---

## 14. Accessibility

### 14.1 WCAG 2.1 AA Compliance

All design decisions must comply with WCAG 2.1 AA as a baseline.

| Requirement | Standard | Implementation |
|---|---|---|
| **Color contrast** | 4.5:1 min | All text meets minimum, large text 3:1 min |
| **Focus indicators** | Visible | 2px border on focus, high contrast |
| **Keyboard navigation** | Full | All interactions keyboard-accessible |
| **Screen readers** | Full | Semantic HTML, ARIA labels, proper hierarchy |
| **Color meaning** | Not color-only | Always paired with text labels |
| **Motion** | Reduce on preference | Respects `prefers-reduced-motion` |

### 14.2 Color Contrast

| Text type | Minimum | Nexora |
|---|---|---|
| **Body text** | 4.5:1 | 15:1 (white on dark) |
| **Large text** | 3:1 | 15:1 (white on dark) |
| **Secondary text** | 4.5:1 | 10:1 (light gray on dark) |
| **Accent links** | 4.5:1 | 5:1 (accent on dark) |

### 14.3 Focus Indicators

- **Standard focus:** 2px solid Accent Primary
- **Focus offset:** 2px from element
- **Focus radius:** 4px
- **All interactive elements:** Keyboard focus visible

### 14.4 Semantic Hierarchy

- Use heading levels correctly (h1 → h2 → h3, never skip)
- ARIA labels on all interactive elements without visible labels
- Proper tab order for all interactive elements

---

## 15. Dark & Light Mode

### 15.1 Mode Philosophy

Both modes are **first-class** citizens — no mode is an afterthought. Users can choose or system default.

### 15.2 Mode Switching

- Automatic: Follow system preference
- Manual: Toggle in Settings

### 15.3 Mode-Specific Design

**Dark Mode (Default):**
- Deep, immersive background
- Content floats on dark surfaces
- Subtle glow for accents

**Light Mode:**
- Clean, bright background
- Content on light cards
- More visible borders (subtle shadows)

### 15.4 Mode Consistency

- **Font weights:** Same across modes
- **Spacing:** Same across modes
- **Components:** Same behavior across modes
- **Animation:** Same timing and easing across modes

---

## 16. Writing Style & Tone

### 16.1 Tone Guidelines

| Do | Don't |
|---|---|
| Use plain, clear language | Use jargon or technical terms without explanation |
| State what happened and why it matters | State only what happened without meaning |
| Be calm and reassuring | Be alarmist or hype-driven |
| Be honest about uncertainty | Smooth over uncertainty or fake confidence |
| Use "you" and "your" | Use generic third-person language |

### 16.2 Voice Examples

**Good:**
> "Your portfolio is heavily concentrated in XLM. This could mean higher volatility risk compared to a more diversified portfolio."

**Bad:**
> "Your XLM concentration is 80% vs. 65% benchmark — risk elevated. Rebalance recommended."

**Good:**
> "You paid 5.2 XLM in fees this month. This is 12% above your average. The increase comes from three swaps you executed this week."

**Bad:**
> "Fee spend: 5.2 XLM (+12% MoM) — swap activity flagged."

### 16.3 Formatting Rules

- **Numbers:** Always formatted with appropriate precision (2 decimals for USD, 4 decimals for XLM)
- **Currency:** Include both crypto and fiat values where available
- **Time:** Use "today," "yesterday," "this month," "this week" where possible
- **Dates:** Use `March 10, 2026` format

---

## 17. Grid & Layout Examples

### 17.1 Dashboard Desktop Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Nexora  Dashboard  Portfolio  Transactions  Report  Ask  Alerts  │
│  ───────────────────────────────────────────────────────────────── │
│  [Quick Ask Bar — Full width]                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  [Portfolio Health Card — Full width]                         ││
│  │  "Stable"  Score 84/100                                       ││
│  │  "Your portfolio is well-diversified..."                      ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐│
│  │  [Performance Snapshot]      │  │  [Allocation Breakdown]      ││
│  │  Chart                       │  │  Donut chart                  ││
│  │  ▲ 4.2%                      │  │  60% XLM                     ││
│  └──────────────────────────────┘  └──────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  [Recent Insights Feed]                                        ││
│  │  • Fee spend 20% above average...                             ││
│  │  • XLM price movement affected...                             ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  [Fee Summary Card]                                            ││
│  │  Total fees: $2.10 this month                                 ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### 17.2 Dashboard Mobile Layout

```
┌─────────────────┐
│  Nexora          │
│  ────────────── │
│  Ask Nexora...  │
│  ────────────── │
│  [Health Card]   │
│  "Stable" 84/100 │
│  ────────────── │
│  [Performance]   │
│  Chart           │
│  ▲ 4.2%         │
│  ────────────── │
│  [Allocation]    │
│  Donut           │
│  60% XLM        │
│  ────────────── │
│  [Insights Feed] │
│  • Fee spend...  │
│  ────────────── │
│  [Fee Summary]   │
│  $2.10           │
│  ────────────── │
│  [Bottom Nav]    │
│  Home Portfolio  │
│  ...             │
└─────────────────┘
```

---

## 18. Component Usage Map

| Component | Dashboard | Portfolio | Transactions | Report | Ask | Alerts | Settings |
|---|---|---|---|---|---|---|---|
| Primary Narrative | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| KPI Card | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Widget | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Insight Item | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Button (Primary) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Button (Secondary) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Badge | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Card | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Alert Banner | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Source Evidence | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Toggle | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 19. Complete Design Tokens Reference

### 19.1 Colors (Dark Mode)

| Token | Value |
|---|---|
| `--color-bg-primary` | `#0A0A0F` |
| `--color-bg-secondary` | `#13131A` |
| `--color-bg-elevated` | `#1C1C26` |
| `--color-bg-input` | `#242433` |
| `--color-border-subtle` | `#2A2A3A` |
| `--color-border-default` | `#38384A` |
| `--color-text-primary` | `#FFFFFF` |
| `--color-text-secondary` | `#A0A0B8` |
| `--color-text-tertiary` | `#6B6B80` |
| `--color-accent-primary` | `#4A7BFF` |
| `--color-accent-hover` | `#5A8BFF` |
| `--color-accent-subtle` | `#1A2B4A` |
| `--color-accent-secondary` | `#6C5CE7` |
| `--color-signal-risk` | `#E54D5A` |
| `--color-signal-risk-bg` | `#3A1A1E` |
| `--color-signal-caution` | `#E8A838` |
| `--color-signal-caution-bg` | `#3A2A1A` |
| `--color-signal-stable` | `#3DBD7A` |
| `--color-signal-stable-bg` | `#1A2A22` |

### 19.2 Typography

| Token | Value |
|---|---|
| `--font-family` | SF Pro, system fonts |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-size-display` | 56px |
| `--font-size-h1` | 40px |
| `--font-size-h2` | 28px |
| `--font-size-h3` | 22px |
| `--font-size-body-lg` | 18px |
| `--font-size-body` | 16px |
| `--font-size-body-sm` | 14px |
| `--font-size-caption` | 12px |

### 19.3 Spacing

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### 19.4 Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |

### 19.5 Shadow

| Token | Value |
|---|---|
| `--shadow-sm` | 0 2px 8px rgba(0,0,0,0.2) |
| `--shadow-md` | 0 4px 16px rgba(0,0,0,0.3) |
| `--shadow-lg` | 0 8px 32px rgba(0,0,0,0.4) |
| `--shadow-xl` | 0 16px 64px rgba(0,0,0,0.5) |

---

*End of Document — Nexora DESIGN_SYSTEM.md v1.0*