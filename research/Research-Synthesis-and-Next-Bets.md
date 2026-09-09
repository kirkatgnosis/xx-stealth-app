# Research synthesis and next app bets

Prepared for Kirk, September 9, 2026. Four parallel GPT-6 Astra agents at High reasoning researched problems, adjacent markets, competitive economics, and UI/UX. This memo reconciles their findings; agreement between agents is not independent market validation.

## Decision

Keep perimenopause as the lead territory. The strongest initial product direction is **a dependable HRT routine companion that produces a useful history for appointments**. Validate the routine and appointment jobs separately before deciding how much belongs in the first release. Midlife strength continuity is the strongest adjacent contender, conditional on access to a qualified coach and a credible audience.

Kirk's observation about weak-looking small competitors matters: a category can contain many apps and still offer room for a much better product. The research does not establish that these apps were generated with AI, nor does it establish their usability from ratings alone. It does establish that Crest's US listing had 3 ratings averaging 3.7, while Stabilize had 18 averaging 4.6 on the research date. Their mere presence should not disqualify the opportunity. [Crest](https://apps.apple.com/us/app/crest-menopause-hrt-tracker/id6756198333), [Stabilize](https://apps.apple.com/us/app/stabilize-menopause-tracker/id6756078202).

## What changed our assessment

1. **The operational problem is more concrete than general awareness.** Public accounts describe remembering whether a patch was changed, reconstructing treatment changes, correcting missed entries, and bringing scattered records to a consultation. These are specific jobs software can help with. Their prevalence and paid demand remain uncertain. [Problem research](Perimenopause-Problems-and-Opportunities.md).
2. **Existing features do not equal a satisfactory experience.** Current apps advertise most of the obvious feature set. Our advantage would need to be a faster, more understandable, more reliable complete workflow. Historical reviews must be checked against repairs: backdating in HRT Patch Tracker and medication-entry issues in Stabilize were explicitly addressed. [Competitive review](Competition-Monetization-and-Distribution.md).
3. **Baseline tracking faces platform competition.** Apple announced perimenopause and menopause support in Cycle Tracking for fall 2026. This is an announced capability, not a claim that it is universally available today. The product should remain useful when the phone handles basic tracking. [Apple, June 8, 2026](https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/).
4. **Pain does not automatically produce subscription demand.** In a 2024 study of 826 UK respondents, 63.8% said they would not pay for the proposed menopause mental-health assessment app. That is not a verdict on all menopause apps, but it directly cautions against treating symptom burden as payment validation. [Study](https://formative.jmir.org/2024/1/e60434).
5. **A visible audience does not prove a viable business.** Rosy's first-party site announced closure in November 2025 despite reporting substantial reach. Its remaining App Store prices should not be mistaken for current offers. The closure reason is unknown. [Rosy](https://meetrosy.com/).

## Ranked bets

These rankings are founder judgments based on observed jobs and practical constraints. They are not numerical estimates of success.

| Priority | Bet | First customer | Reason to choose us | Main unresolved question |
|---|---|---|---|---|
| 1 | HRT routine companion | A person whose prescribed routine still produces uncertainty despite alarms | See the next action and last confirmed action together; correct history easily; handle real schedules clearly | Does this outperform correctly configured Apple Health enough to earn payment? |
| 2 | Appointment-ready history | A person with a booked consultation or recent clinician-directed treatment change | Brief capture becomes a clear record of priorities, changes, questions and missing data | Does the finished report repay the effort of keeping records? |
| 3 | Midlife strength continuity | A woman already training who keeps losing momentum after disrupted weeks | Short and full versions of a coherent program, clear substitutions and easy resumption | Can we compete without an established coach's audience and trust? |
| Reserve | Primary-caregiver handoff notebook | The family member repeatedly reconstructing a parent's care updates | A useful handoff without requiring everyone to adopt another family app | Does it remove work rather than create duplicate records? |

Sleep remains a meaningful research territory, but credible content, appropriate scope and competition from both free tools and coached services increase the operating burden. Intimate-health and surgical-menopause routines deserve targeted conversations, not an immediate broad app.

## The first concept to test

Working description: **a clear record of your routine and what changed**. This is a proposition, not a final name or validated promise.

A small prototype would demonstrate five complete tasks:

1. Enter an existing prescribed schedule without the app making medical decisions.
2. See what is due and when the last action was confirmed.
3. Record, undo or correct an action, including a forgotten earlier entry.
4. Record a few chosen symptoms or daily impacts without a long questionnaire.
5. Prepare and review a concise history for an appointment.

Do not include a content feed, community, clinician dashboard, speculative hormone score or diagnostic chatbot in this first test. These are scope choices, not assumptions that those features lack value. The first build should resolve one repeated job exceptionally well.

The routine companion and appointment product may eventually be one app, but merging them immediately would obscure which job attracts customers and earns payment. Start each prototype at its own moment of need, then see whether users want the other workflow.

## Design direction

The UX agent visually inspected archived Flo, Clue and Oura flows through Mobbin. It distinguished those observations from published user studies and from recommendations. No evidence establishes a universal aesthetic preferred by women. A specific audience and context should determine the visual identity.

Recommended first direction: **Clear record**. A light interface, navy text, a restrained cobalt accent, readable native typography, a date-led history and generous grouped rows. Contrast pairings remain to be checked in design. Compare it with the report's more editorial direction using identical tasks and content, so stylistic preference is not confounded by different features.

The strongest recurring principles are:

- First use produces a useful record before requesting extensive setup.
- Users choose relevant concerns and can skip inapplicable life-stage questions.
- Logging stays brief, editable and explicit about the date.
- Missing data are distinguished from an absence of symptoms.
- Charts answer a question and expose their supporting records.
- Sharing shows an exact preview with exclusions under the user's control.
- Pricing, trial expiry, renewal and cancellation are understandable.
- Larger text, one-handed interaction, discreet notifications and error recovery are designed from the beginning.

See [UX research and visual references](Womens-App-UX-and-Design-Patterns.md) for inspected screen links, research sample sizes, three proposed visual directions and full flow recommendations.

## Payment and acquisition hypotheses

Do not decide on subscriptions just because the founder wants recurring revenue. A reminder utility, an appointment preparation pass and an ongoing training program can have different appropriate payment models.

| Product | First price experiment, USD | Initial route to customers | Why the test might fail |
|---|---|---|---|
| HRT routine | $9.99 one-time core utility versus $24.99 annual with justified ongoing value | Demonstrations through relevant educators; targeted app-search experiment | Free tools are sufficient or switching effort outweighs benefit |
| Appointment history | $19–$29 preparation pass before testing annual access | Upcoming-consultation recruitment and practitioner/educator referrals | Free templates or Balance deliver comparable value |
| Strength continuity | $39 program versus $14.99 monthly | One qualified coach and a small existing audience | People buy coaching personality rather than software |

These are test prices, not observed willingness to pay. No acquisition costs, revenue estimates or retention rates were obtained for the proposed products.

For a transparent small-business reference point, 375 subscribers paying $8 monthly produce $3,000 monthly gross billings. Assuming an eligible 15% store fee, that becomes $2,550 before refunds, taxes where applicable, hosting, support, content, acquisition and founder time. The 15% fee requires eligibility and enrollment; the example is arithmetic, not a forecast. A $25 annual utility needs 1,440 active annual subscriptions for $36,000 annual gross billings, and its annual cash receipts should not be represented as monthly subscription billing. [Apple Small Business Program](https://developer.apple.com/app-store/small-business-program/).

## Bounded next sprint

The following are proposed operating rules, not scientific validation thresholds or industry benchmarks.

**Round 1: task evidence.** Recruit 6–8 people with recent routine confusion and 6–8 with an upcoming consultation. Ask them to demonstrate their current setup and last difficult occasion. Include satisfied users of alternatives. We have not contacted anyone or conducted interviews.

**Round 2: two narrow prototypes.** Compare equivalent tasks against each participant's existing method. Measure errors, recovery, time, record accuracy, comprehension and preference. Separately compare the two visual directions. Include a small number of clinicians in testing the readability of synthetic appointment reports.

**Round 3: real use and payment.** Give the stronger workflow to a small cohort for two to four weeks. Offer a clearly described paid continuation. A provisional continuation signal is five independent payments plus repeated useful use without extensive founder prompting. It is directional evidence; it does not validate scalable acquisition.

**Round 4: distribution.** Test one reachable channel with an explicit budget only after authorization. Track costs through activation, payment, refunds and continued use. Do not run ads or outreach merely because they appear in this plan.

Reconsider the bet if existing tools perform equally well, the real problem is access to care, record-keeping adds burden, or users prefer a one-time artifact. Move strength continuity ahead only if expert and audience access are stronger than the perimenopause recruitment path.

## Research boundaries and maintenance

No private revenue data, purchases, interviews, clinical outcomes, hands-on competitor installations or advertising experiments were obtained. Small samples and older reports are labeled in the individual memos. App Store catalogs can contain legacy prices; Caria's first-party free positioning and subscription entries require checkout verification before being treated as a current price. Mobbin screenshots establish observed interface conventions, not causal evidence about conversion or satisfaction.

Preserve disagreement between the reports. The adjacent-opportunity memo ranks strength first within its scope; the problem memo favors routines; the commercial memo favors appointment preparation. The synthesis favors testing the first two jobs separately and retaining strength as a genuine alternative. Future evidence should change this order when warranted.
