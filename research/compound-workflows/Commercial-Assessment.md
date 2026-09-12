# Commercial comparison and December cash test

September 12, 2026. Compare **C2 Work return** and **C3 Active trip** as alternatives, not two businesses to launch together. No price, acquisition cost, human rate, founder draw, budget or customer volume has been validated. The workbook's blue inputs are editable; rates for payment rails are sourced but account eligibility is unverified.

Use [Commercial-Model.xlsx](Commercial-Model.xlsx) for live assumptions and calculations. [Unit economics](commercial-unit-economics.csv), [cash flow](commercial-cash-flow.csv), [inputs](commercial-inputs.csv) and [sensitivity results](commercial-sensitivity.csv) are static numeric exports of the dated model. The sensitivity sheet contains labeled captures from rerunning one build, not live results that change with every workbook edit. The supporting builder can regenerate them.

## Packaging and first-purchase economics

The desk evidence fits limited outcomes more closely than perpetual subscriptions. A finished work-return or trip-preparation program can be successful even when the customer leaves. Base repeat purchase is zero. Annual prepayment is a separate stress case, not a recommended way to claim cash positivity.

| Assumed input / result per original purchase | Work return digital pass | Active-trip digital pass |
|---|---:|---:|
| Price and delivery period |$149 / one modeled month|$199 / two modeled months|
| Refund provision |8%|8%|
| Store fee, conditional enrolled Apple rate |15% after refunds|15% after refunds|
| Net after refunds and store fee |$116.518|$155.618|
| Expert time/rate |30 min ×$60/hour = $30|45 min ×$80/hour = $60|
| Support time/rate |15 min ×$30/hour = $7.50|30 min ×$30/hour = $15|
| AI budget per whole episode |$2|$3|
| Infrastructure per episode |$1.50|$2|
| Per-buyer content/license allowance |$5|$8|
| Full variable delivery |**$46**|**$88**|
| CAC, including attributable partner fees and acquisition labor |$30|$40|
| Contribution after acquisition and full delivery |**$40.518**|**$27.618**|

The prices are tests, not willingness-to-pay evidence. The largest necessary change from concierge delivery is lower human time at acceptable quality. Refunded purchasers retain the full variable delivery allowance in the model, conservatively allowing for refunds after work has been done. Error correction and exceptional support must be measured.

**Real concierge test, separate service:** W$199 with 90 minutes expert work and 30 support minutes costs $113.50 to deliver; T$299 with 120 expert minutes and 30 support minutes costs $188. Domestic card fees and 8% refunds leave $177.009/$266.109, so after $30/$45 acquisition the contributions are **$33.509/$33.109**. Ten buyers yield just $335.09/$331.09 before fixed research costs. That may buy useful evidence; it does not fund a native business or establish demand for less human service.

## Recheck the old assumptions

The old `$99 × .95 × .85 −12 −20 = $47.9425` calculation is correct, as are 167/595 fully settled purchases for the $8,000/$28,500 hurdles. What was not validated was price acceptance,5% refunds,$20 CAC,$12 annual delivery or either overhead envelope. The new human allowances alone exceed the old annual variable reserve.

The current official Apple Small Business Program supports 15% for eligible enrolled accounts, with an effective-date delay and associated-account rules.30% is the stress case, not an assertion that this account pays 30%. Stripe's published domestic card rate is 2.9%+$0.30; original processing fees are retained on refunds. Therefore:

`Store net = price × (1 − refunds) × (1 − commission)`

`Card net = price × (1 − refunds) − price × card_rate − card_fixed`

`Contribution = net − full episode delivery − acquisition`

[Apple program, E02](https://developer.apple.com/app-store/small-business-program/), [Stripe fees, E04](https://stripe.com/pricing), [refund terms, E06](https://support.stripe.com/questions/understanding-fees-for-refunded-payments).

Direct-card service economics are an independent web-acquisition case, not permission to avoid app-store rules on app-origin digital purchases. No subscription-billing vendor is selected; one-time card offers need not assume a recurring-billing fee. Add any chosen tooling/revenue share explicitly before committing. For example, an additional 1% of gross price would remove $1.49/$1.99 per purchase from the base contribution.

The AI budgets are assumptions. Current standard short-context prices are Luna $0.20 input/$1.20 output and Astra $10/$50 per million tokens. Sixty transformations with 3,000 input and 500 billable output tokens each cost about $0.072 or $3.30 respectively, before images, retries, extra reasoning, voice, retrieval and storage. That is illustrative usage, not a tested workload. An all-Astra path could exceed the proposed episode budgets. Capability, correction time and the expensive usage tail need measurement; a cheaper model is not automatically suitable. [Official API pricing, E07](https://developers.openai.com/api/docs/pricing).

## Fixed costs and founder compensation

The following breaks down the workbook's total planning envelopes. These are unquoted amounts to replace with actual terms, not vendor commitments or permission to spend.

| Startup item | Work return | Active trip |
|---|---:|---:|
| Recruitment/research allocation |$1,200|$1,200|
| Initial expert program/content rights |$1,800|$3,500|
| Privacy, terms and professional scope review |$1,200|$2,300|
| Design/development tools or limited contractor help |$2,500|$4,000|
| Contingency |$1,300|$1,000|
| **Startup total** |**$8,000**|**$12,000**|
| Monthly tools/admin |$350|$400|
| Monthly content/quality updates |$250|$500|
| Monthly risk/insurance/review allowance |$200|$350|
| Monthly general operations |$200|$250|
| **Monthly fixed, before founder pay** |**$1,000**|**$1,500**|
| Required founder coverage scenario |$3,000/month|$3,000/month|

Startup is aggregated as an October outflow for the cash model; actual earlier project expenses must be included when known. The expensive panel-recruitment fallback in the validation plan can exceed the $1,200 allocation. Replace that allocation or reduce research scope/access cost; do not charge the excess outside the model. The envelopes exclude a fully outsourced native build and do not represent full market compensation for founder development. Founder time/cash needs remain unknown. A$3,000 draw is a scenario, not the user's requirement or a tax/payroll calculation.

Variable delivery assumes paid expert/support labor separate from founder general work. If the founder performs delivery, report both actual cash and replacement-cost contribution; do not simultaneously double-charge the same hours as contractor cost and founder wage. Additional platform/backend/native QA, expert licensing, insurance or payroll quotes may materially increase the hurdle. Taxes on profits are excluded; modeled customer prices assume any applicable sales tax is additional/remitted appropriately. Tax-inclusive pricing requires adjustment.

| Fixed/startup hurdle and all-settled purchase requirement | Work return | Active trip |
|---|---:|---:|
| Startup + Q4 fixed, founder unpaid |$11,000 / **272** purchases|$16,500 / **598** purchases|
| Same plus $9,000 founder coverage |$20,000 / **494** purchases|$25,500 / **924** purchases|

`Required purchases = ceiling(hurdle / contribution)` only when contribution is positive. These counts assume every purchase's proceeds are collected and its full variable obligation reserved. They are necessary arithmetic, not evidence that the channels can deliver the sales.

## Three distinct outcomes

1. **December earned operating result:** the part of services delivered in December, net of expected refund/fee deductions, minus December delivery, acquisition and fixed operating expense. Founder coverage is shown separately, then deducted for the commercial decision. This is a management view, not a full audited income statement.
2. **Cumulative bank-cash recovery:** actual customer collections minus startup, acquisition, variable payments, fixed expense and required founder draw. Starting capital is financing, not revenue. Receivables are not bank cash.
3. **Cash recovery after unserved-delivery provision:** subtract the remaining variable work owed to prepaid customers. Report future fixed obligations separately; a delivery reserve is not a full future operating budget.

The monthly model assumes same-month delivery for W; for T, revenue is spread 50/50 over two months and variable cost 75/25, representing 50% upfront plus remaining costs over delivery. Programs are aligned to model months; exact real service dates require a dated cohort schedule. January/February show **runoff of Q4 customers only**, with no new sales or ongoing fixed-cost forecast. Do not call the runoff balance 2027 profitability.

## December result under the illustrative native base

Assume 0 new purchases in October,40 in November and 80 in December, for each alternative. This is unvalidated volume, not sourced SOM. A conservative two-calendar-month payment lag models Apple exposure; it is not Apple's actual fiscal calendar. Officially, qualifying Apple proceeds arrive within 45 days of fiscal month end, subject to account requirements. Exact account/fiscal payout dates have not been obtained. [Apple payment terms, E03](https://developer.apple.com/help/app-store-connect/getting-paid/overview-of-receiving-payments/).

| Base result by December 31 | Work return | Active trip |
|---|---:|---:|
| Gross purchasers / gross billings |120 /$17,880|120 /$23,880|
| December earned operating result before founder coverage |+$2,241.44|−$1,522.92|
| December after $3,000 founder coverage |**−$758.56**|**−$4,522.92**|
| Customer collections received |$0|$0|
| Outstanding net payment receivable |$13,982.16|$18,674.16|
| Cumulative cash recovery |−$29,120|−$39,100|
| Remaining variable delivery reserve |$0|$1,760|
| **Cash recovery after reserve** |**−$29,120**|**−$40,860**|

The first concept can show positive December operations before founder coverage while still being deeply cash-negative. With a one-month lag, its after-reserve cash remains−$24,459; T remains−$34,635. An early 40/80/120 acquisition case does not rescue cumulative cash under either one- or two-month lags. A late-December card pilot can also settle in January. Stripe says first payouts typically take 7–14 days and may take longer; an early-October same-month case is only a favorable timing approximation. [Stripe payouts, E05](https://docs.stripe.com/payouts).

## Sensitivities that can change the decision

| Change, holding other assumptions fixed | Work contribution/purchase | Trip contribution/purchase |
|---|---:|---:|
| Base |$40.518|$27.618|
|30% store commission |$19.956|$0.156|
|15% refunds |$31.653|$15.778|
|$20 more CAC |$20.518|$7.618|
|50% more human minutes |$21.768|**−$9.882**|
|25% lower accepted price |$11.389|**−$11.287**|
|25% higher accepted price |$69.648|$66.523|

Higher price does not preserve conversion by assumption. The separate channel construction already produces $53.33/$46.83 illustrative CAC, above the base targets. No measured customer behavior selects a favorable row.

`Maximum CAC before fixed cost = net − full delivery` gives $70.518/$67.618. That is a unit ceiling, not a spending target. At total salesN and receiptsC received by the deadline:

`Deadline CAC ceiling = (C − startup − Q4 fixed − founder coverage − full delivery reserve for all N) / N`

With no base collections the ceiling is negative. Even free acquisition cannot recover the assumed fixed/startup envelope by December in that timing case. For working capital, fund actual interim cash deficits plus unserved obligations and contingency, not merely startup cost.

## Annual and repeat-purchase restraint

The workbook preserves the old $99 annual case, and separately tests $249 annual with 8% refunds,15% store fee,$96 full-year variable reserve and $40 CAC: **$58.718** contribution before unspecified future fixed costs. It is not an offer recommendation or validated price. An annual sale cannot be counted as monthly recurring cash; unserved net revenue and variable/fixed obligations remain after December.

The repeat sensitivity assumes at most one additional future purchase with the same CAC and delivery cost:0%,20% or 40% probability. At 20%, modeled contribution becomes $48.622/$33.142 per initial buyer across the two possible episodes. This is a speculative arithmetic extension outside Q4, not LTV. No travel rebooking, assessment completion, enthusiastic interview or prepaid entitlement validates that probability.

## Commercial judgment

C2 has more room at the illustrative costs, but even it lacks a verified paid native path to December cash recovery. C3 is particularly sensitive to qualified human time. Advance only a bounded field comparison, then replace assumptions with actual payment, completion, support, acquisition and settlement evidence. If the deadline is firm and validation consumes most of Q4, reject a new native launch as the means of meeting it unless substantially different verified economics/access emerge. A paid program may still be useful research or a smaller service business; disclose that change rather than manufacturing app traction.

Verification: the author recalculated 14 scenarios, checked missing-input/zero/negative-margin boundaries, reconciled revenue/receivables and delivery/reserves, exported/reopened the workbook and visually inspected all five sheets. An independent Astra reviewer recomputed 224 scenario values without mismatch and found no formula errors after one annual break-even guard was corrected. Microsoft Excel's desktop engine was not tested.
