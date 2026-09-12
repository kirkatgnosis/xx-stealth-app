# Evidence ledger: provenance and interpretation

Prepared September 12, 2026, America/Chicago. Read with [Evidence-Ledger.csv](Evidence-Ledger.csv), the [research audit](Existing-Research-Audit.md), and the three track reports. This ledger records what the sources support; it is not a vote count for a product.

## Assembly and checks

The ledger merges **55 records**: ten common records E01–E10, fifteen midlife records M01–M15, fifteen work-return records W01–W15, and fifteen active-trip records T01–T15. Input files remain unchanged. All original cell values, including qualifications, quotations and mixed company-reporting labels, were preserved. The sole schema normalization is `confidence (in supported claim)` in the midlife file becoming `confidence`. CSV quoting is standardized; re-reading the merged file reproduces the source cell strings exactly.

Checks passed: 55 unique IDs; 12 populated columns per record; all access dates September 12, 2026; 55 syntactically valid HTTPS URLs; no exact duplicate URLs. URLs are retained as supplied for traceability. This assembly review did not reopen every page or independently replicate every investigator's research. Distinct URLs do **not** establish independent observations.

No firsthand interviews, participant observations, customer purchases, billing verification or hands-on product comparisons were performed. There is no representative sample of any complete proposed joint segment, verified founder channel access, or measured payment premium for the connecting workflow. Proposed fieldwork in the reports has not occurred.

## Evidence classes

These classes apply to a claim, not automatically to every sentence on a page. A record can contain several classes.

| Class | Records or examples | Permitted interpretation |
|---|---|---|
| Public observation / source-derived context | E01 population cells; E02–E09 official rules, timing and pricing documents; W13 government working paper | The reported number, rule or published statement exists within its stated scope. Population is not demand; platform eligibility and candidate legal coverage remain unassessed. |
| Vendor offer | E10 current WW plans; competitor price/features throughout M, W and T; notably M01–M02, M04, M06–M10, W01–W04, W06–W08, W12, T02–T04, T07–T09 | Advertised availability or price. No resulting purchase, delivery quality, retention or commercial success follows. |
| Payment self-report | W02, W04, W05 and M13 | Selected people describe spending, upgrades or repeat purchases. Receipts, identities and the complete target cohort are unverified. W04 is hosted by the seller; W05 is an independent public platform. |
| Company revenue / paid scale | M03; M11 with a weaker attribution | M03 reports company financial/operating metrics. M11's investor-host introduction reports Ladder ARR and paying members; it is interested-party reporting, not an audited disclosure. Neither isolates the proposed segment or coordination premium. |
| Company-reported activity or engagement | M05 pilot assessment completion; T05 clients served; T10 and T15 repeat travel accounts | Some service use or travel behavior is reported. A final questionnaire is not a renewal; a served client is not necessarily paid; repeat travel is not repeat preparation-app buying. |
| Customer problem or workaround report | W09–W10; M12 and M15 | A selected account describes a difficulty, current combination or switching behavior. Usage and stated renewal intentions are not necessarily verified payments. No population prevalence or causal effect follows. |
| Analyst inference | General AI as a substitute; likely episode-based billing; possible channel fit; connection-versus-component judgments | A reasoned interpretation to test. Confidence in a competitor's feature does not transfer to the inference. |
| Assumption | Joint-sizing conditional fractions, proposed prices, acquisition/retention rates, human minutes and costs | A declared planning input. Calculated outputs remain scenarios; arithmetic cannot turn the input into evidence. |
| Proposed fieldwork | Recruitment samples, comparison conditions, payment offers and continue/reject thresholds | A future decision procedure, not an observation, permission, secured participant pool or validated conversion benchmark. |

`confidence` always concerns the **narrow supported claim**. “High for advertised price” does not mean high confidence that buyers exist, that the price is obtainable at checkout, or that the candidate business will work. `company_reported` is intentionally not normalized to a Boolean: mixed source pages and interested-party interview reporting need their original qualifications.

## Dependence: do not count repeated pages as replication

| Source cluster | Dependence to retain |
|---|---|
| E10 and M01–M03, Weight Watchers | Plans page, announcement, operating guide and financial release concern one company's services. M01/M02 corroborate the same integration; M03 cannot attribute subscriber changes to that integration. |
| M04–M05, Respin | One provider's offer and pilot. They are not independent tests of efficacy or paid retention. |
| M07–M08, HHF | One supplier's subscription and coaching menu; different price points do not establish two independently measured markets. |
| M09–M12 and M15, Ladder | Product/pricing and investor-host scale report overlap in supplier. Reddit threads provide separate selected accounts, but identity independence and representative sampling are unverified. |
| W01–W04 and W15, Indyx | Several pages establish one ecosystem. Current prices, legacy prices and hosted reviews must remain distinct. The same customer may appear in more than one surface or review; do not add review totals or infer a repeat rate. W05 adds a public purchaser account, not a second market estimate. |
| T03–T06, Trailblazer Wellness | Direct pricing, partner pricing, testimonials and operator services describe one provider and relationship. They are not four independent paid-demand observations. |
| T07–T09, Fit For Trips/HikeStrong | Legacy coaching, successor app positioning and an app listing share a service lineage. Historical trained-client counts are not app subscribers. |
| T01–T02; T10–T11; T04/T06/T15 | Repeated pages from Wild Women, Backroads or the AdventureWomen/coach relationship. An itinerary, prep advice and booking testimonial measure different things within overlapping suppliers. |
| W14 and T14, general AI | Two pages support one broadly available free substitute. Neither is evidence that a target customer used it successfully. |

No sample sizes or source counts should be summed across these groups to produce demand, conversion, willingness-to-pay or an independent confirmation count.

## Currency and scope issues to carry into decisions

- **WW current plans:** E10's displayed Core $12/month and Core+ $22/month require a 12-month commitment. Med+ lists $25 for the first month, then $74/month with a 12-month plan or $84/month with a six-month plan; medications are excluded. These are not ordinary cancel-any-month prices, app-only clinical prices, or verified checkout charges. The Pvolve full-library upgrade price remains unverified.
- **Indyx:** use W01/W02 and the specific W04 booking offer for their current advertised prices. W03 has incompatible legacy styling prices and uncertain current cataloguing availability. W15 still describes the Feed while a W04 customer says it was removed. Feed availability and current price remain unresolved; historical monthly rates cannot be presented as current.
- **Whering:** W06 says free with in-app purchases. Weather/wardrobe suggestions are advertised, but exact entitlements were not tested. “Everything is free” is unsupported.
- **Trailblazer:** T03 direct and T04 partner prices do not reconcile with the partner's stated discount. Preserve both observations; do not compute an executable discount or average them.
- **Fit For Trips:** T07 legacy paid offers remain visible while the site promotes HikeStrong. Continued bookability is unresolved. T09's five-versus-seven rating snapshots are not a meaningful adoption trend.
- **Respin and customer retrieval:** M04/M05 used indexed primary-page content where direct rendering was an iframe; M13 used indexed post text after direct retrieval failed. These retrieval limits are retained, not silently upgraded to checkout or firsthand verification.
- **Dates:** undated pages mean observed on the access date, not launched then. W02/W04–W06 include relative or incomplete dates; do not invent calendar days. T10 was published in May 2025, so its account of 2025 bookings must not be relabeled completed full-year 2025 performance. E01's directory timestamp is publication-context evidence, not a separately verified release day.
- **Comparison rules:** the track reports contain different illustrative sample sizes and gates. A common validation plan should explicitly supersede these examples where it needs comparable candidates; their thresholds are not empirical market estimates.

## Census extraction and limits

[sources/census-extracted.csv](sources/census-extracted.csv) records seven individual cells and three checked sums from [the downloaded source workbook](sources/Census-NC-EST2025-AGESEX.xlsx). It was read using `openpyxl` in read-only, data-only mode; the workbook was not authored or altered. Header rows identify column V as Female, July 1, 2025.

| Context band | Source cells | Sum |
|---|---|---:|
| Female ages 30–59 | `NC-EST2025-AGESEX!V13:V18` | 65,148,606 |
| Female ages 45–64 | `NC-EST2025-AGESEX!V16:V19` | 41,750,741 |
| Female ages 40–64 | `NC-EST2025-AGESEX!V15:V19` | 52,932,884 |

Workbook SHA-256: `d92892cb64eb68ecfd6493f7f8319f99f30482813f80c8a62523e37d172937c0`.

These are 2025 population estimates under Census sex classifications, not 2026 counts or a full measure of gender identity. The statistical bands also differ from approximate recruitment language: midlife roughly 40–60 versus context 40–64; active trip roughly 45–65 versus context 45–64. They are explicit context proxies. No return event, booked trip, wardrobe problem, paid training, desire for help or software budget is observed in these cells. Applying conditional scenario filters does not establish their joint frequency or a paying SAM.
