# Measurement files and reporting rules

These empty CSVs are ready for authorized fieldwork. They contain headers only; there are no participant or payment records. Keep contact details outside these files and use pseudonymous IDs. A blank means unknown/not yet observed; enter zero only when it is a real measured zero.

| File | Unit of observation |
|---|---|
|[participant-register.csv](participant-register.csv)|One qualified or screened research participant; keep disqualification reasons and actual device/subsegment |
|[offer-and-payment-log.csv](offer-and-payment-log.csv)|One exact priced offer to one person; link real charges, refunds and bank settlement to it |
|[usage-and-support-log.csv](usage-and-support-log.csv)|One actual opportunity, completed task, correction or support interaction |
|[channel-cost-log.csv](channel-cost-log.csv)|One cost/source/period record, including labor and failed acquisition attempts |

Record dates in ISO format and currency as numeric USD. Keep sums in a separate analysis copy. Do not put names, sensitive employer details, identifiable booking numbers, payment-card data or raw health records in the logs. Evidence references should point to approved, access-controlled research artifacts with a deletion date.

## Calculate matching denominators

- Offer conversion = unique real purchasers / unique qualified people who saw that exact offer. Show bundle and component separately. Visits, impressions and invitations are separate counts.
- Refunds = refunded value / original gross charges, plus purchaser counts. Use the original purchase cohort and allow the full refund window; late refunds do not belong to a new acquisition cohort.
- Completion = customers completing the declared outcome / customers whose opportunity and observation window have elapsed. Report delayed starts, cancellations and right-censored customers separately; also report the original enrolled denominator so attrition is visible.
- Repeat useful use = distinct eligible subsequent occasions that led to confirmed action. State the number of customers and occasions; do not equate opens with value.
- Cash CAC = attributable placement/referral/other cash acquisition costs / unique gross purchasers. Fully costed CAC adds acquisition labor hours × stated rate. Report all failed placements and cross-channel duplicates.
- Contribution = actual expected net fees/refunds minus all expert, support, AI, infrastructure, content and acquisition costs for that service. Cost founder delivery/rescue time at a stated replacement rate separately from actual bank cash. Avoid counting the same labor both here and in salary.
- Bank recovery = settled customer receipts − all project cash paid, including required founder coverage. Keep payment receivables and the remaining service obligation visible. Do not use gross charges as bank receipts.

For economic summaries use actual arithmetic, not averages of channel conversion or CAC percentages. A repeat customer is not a new unique acquisition. Interview incentives are research expense and compensated participants must not be mixed into fresh full-price demand claims.

## Weekly decision note

Record the stage, exact eligible sample, actual vs proposed activity, contradictory cases, results against predeclared gates, costs, and the next allowed action. Do not change a threshold after seeing the result without recording the reason and treating the new rule as a future test. Use the master validation plan's thresholds; individual research-track suggestions are historical alternatives.

For every purchase ask whether the reason was the connected outcome, the component, the human expert, accountability, convenience, curiosity or something else. Keep the customer's words and the researcher's interpretation separate. If a satisfied buyer paid mainly for the person, that is valuable service evidence and weak evidence for replacing that person with an app.

No aggregate from these small purposive cohorts should be described as national prevalence, stable lifetime value, or a scientifically established treatment effect. The purpose is to decide whether the next investment is justified and what remains uncertain.
