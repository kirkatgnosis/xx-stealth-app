import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';

const support = path.dirname(fileURLToPath(import.meta.url));
const out = path.dirname(support);
const wb = Workbook.create();
const names = ['Overview', 'Inputs', 'Unit economics', 'Cash flow', 'Sensitivity'];
const sheets = Object.fromEntries(names.map(n => [n, wb.worksheets.add(n)]));
const money = '#,##0.00;(#,##0.00);"-"';
const number = '#,##0;(#,##0);"-"';
const pct = '0.0%;(0.0%);"-"';
const source = {
  apple: 'https://developer.apple.com/app-store/small-business-program/',
  payment: 'https://developer.apple.com/help/app-store-connect/getting-paid/overview-of-receiving-payments/',
  stripe: 'https://stripe.com/pricing',
  payout: 'https://docs.stripe.com/payouts',
  refunds: 'https://support.stripe.com/questions/understanding-fees-for-refunded-payments',
};
function val(sh, addr, value) { sh.getRange(addr).values = [[value]]; }
function formula(sh, addr, value) { sh.getRange(addr).formulas = [[value]]; sh.getRange(addr).format.font.color = value.includes('!') ? '#008040' : '#20252B'; }
function cell(sh, addr) { return sh.getRange(addr).values[0][0]; }
function header(sh, row, labels, end='E') {
  sh.getRange(`C${row}:${end}${row}`).values = [labels];
  sh.getRange(`C${row}:${end}${row}`).format = { fill:'#243B53',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:27,verticalAlignment:'center'};
}
function note(sh,row,text) { val(sh,`C${row}`,text); sh.getRange(`C${row}`).format.font = { name:'Arial',size:10,italic:true,color:'#4B5563' }; }
function setup(sh,title,rows,end='H') {
  sh.showGridLines=false;
  sh.getRange(`A1:${end}${rows}`).format.font={name:'Arial',size:10,color:'#20252B'};
  sh.getRange(`A1:B${rows}`).format.columnWidth=2;
  sh.getRange(`C1:C${rows}`).format.columnWidth=57;
  sh.getRange(`D1:${end}${rows}`).format.columnWidth=20;
  sh.getRange(`A1:${end}${rows}`).format.rowHeight=22;
  sh.getRange(`A1:${end}${rows}`).format.verticalAlignment='center';
  val(sh,'C2',title); sh.getRange('C2').format.font={name:'Arial',size:15,bold:true,color:'#243B53'};
  val(sh,'C4','Case selected');
  if(sh.name!=='Inputs') formula(sh,'D4',"=CHOOSE('Inputs'!$D$4,\"Native base\",\"Native early\",\"Zero sales\",\"Pilot\")");
  sh.getRange(`D8:${end}${rows}`).setNumberFormat(money);
}
const inp=sheets.Inputs;
setup(inp,'Commercial assumptions',112,'G');
inp.tabColor='#627D98';
val(inp,'D4',1); inp.getRange('D4').format.font.color='#0000FF';
inp.getRange('D4').dataValidation={rule:{type:'list',values:['1','2','3','4']}};
note(inp,5,'1 Native base. 2 Native early. 3 Zero sales. 4 Pilot. Blue cells are editable.');
header(inp,8,['Driver','Work return C2','Active trip C3']);
const rows={}; const inputRecords=[]; let row=9;
function input(key,label,values,notes='Assumption',format=money) {
  const r=++row; rows[key]=r; val(inp,`C${r}`,label);
  inp.getRange(`D${r}:E${r}`).values=[values]; inp.getRange(`D${r}:E${r}`).format.font.color='#0000FF';
  inp.getRange(`D${r}:E${r}`).format.fill='#FFF8DA'; inp.getRange(`D${r}:E${r}`).setNumberFormat(format);
  val(inp,`G${r}`,notes); inputRecords.push({key,label,row:r,notes}); return r;
}
function group(key,label,native,pilot,format=money) {
  const r=++row; rows[key]=r; val(inp,`C${r}`,label+' — active');
  const rn=input(key+'Native',label+' — native',native,'Assumption',format);
  const rp=input(key+'Pilot',label+' — pilot',pilot,'Assumption; separate service offer',format);
  for(const c of ['D','E']) formula(inp,`${c}${r}`,`=IF($D$4=4,IF(COUNT(${c}${rp})=1,${c}${rp},"missing input"),IF(COUNT(${c}${rn})=1,${c}${rn},"missing input"))`);
  inp.getRange(`C${r}:E${r}`).format.fill='#E9EFF5'; inp.getRange(`D${r}:E${r}`).setNumberFormat(format);
}
group('price','Price USD',[149,199],[199,299]);
group('duration','Delivery months',[1,2],[1,2],number);
input('refund','Expected refund fraction',[.08,.08],'Assumption; full variable cost retained for refunded buyers',pct);
input('appleFee','Apple fee fraction',[.15,.15],'Conditional on approved Small Business enrollment. Source A.',pct);
input('cardFee','US card fee fraction',[.029,.029],'Domestic online cards standard pricing. Source C.',pct);
input('cardFixed','US card fixed fee USD',[.30,.30],'Original processing fees retained on refund. Sources C and E.');
group('rail','Payment rail code',[1,1],[2,2],number);
group('lag','Collection lag months',[2,2],[0,0],number);
input('front','Upfront variable fraction',[.5,.5],'Assumption; remaining half spread over service months',pct);
group('expertMin','Expert minutes',[30,45],[90,120],number);
input('expertRate','Expert hourly USD',[60,80],'Assumption; qualified human review cost');
group('supportMin','Support minutes',[15,30],[30,30],number);
input('supportRate','Support hourly USD',[30,30]);
input('ai','AI budget per buyer USD',[2,3],'Assumption, not a model/API benchmark');
input('infra','Infrastructure per buyer USD',[1.5,2]);
input('license','Content license per buyer USD',[5,8]);
group('cac','Acquisition per buyer USD',[30,40],[30,45]);
input('startup','Startup cash in October USD',[8000,12000],'Assumption; not a quote for fully outsourced native development');
input('fixed','Monthly fixed October–December USD',[1000,1500],'Excludes founder draw. January onward not specified.');
input('draw','Monthly founder draw October–December USD',[3000,3000],'Required compensation coverage shown separately from operating expense');
input('repeat','One additional purchase probability',[0,0],'Speculative; zero in Q4 cash; same CAC and variable cost per repeat',pct);
for(const [month,base,early,pilot] of [['Oct',0,40,10],['Nov',40,80,0],['Dec',80,120,0]]) {
  const r=++row; rows['units'+month]=r; val(inp,`C${r}`,month+' buyers — active');
  const refs=[];
  for(const [caseName,n] of [['Base',base],['Early',early],['Zero',0],['Pilot',pilot]]) refs.push(input('units'+month+caseName,month+' buyers — '+caseName,[n,n],'Assumed test volume; not a demand forecast',number));
  for(const c of ['D','E']) formula(inp,`${c}${r}`,`=CHOOSE($D$4,${refs.map(x=>`IF(COUNT(${c}${x})=1,${c}${x},"missing input")`).join(',')})`);
  inp.getRange(`C${r}:E${r}`).format.fill='#E9EFF5'; inp.getRange(`D${r}:E${r}`).setNumberFormat(number);
}
const srcStart=row+3;
header(inp,srcStart,['Payment sources','Accessed','Basis']);
Object.entries(source).forEach(([key,url],i)=>{val(inp,`C${srcStart+1+i}`,String.fromCharCode(65+i)+' '+key);val(inp,`D${srcStart+1+i}`,'2026-09-12');val(inp,`G${srcStart+1+i}`,url);});
note(inp,srcStart+7,'Apple lag: conservative calendar proxy, not Apple fiscal dates or a guaranteed bank date.');
note(inp,srcStart+8,'Pilot lag 0 assumes early-month sales and a favorable first payout within 14 days.');
note(inp,srcStart+9,'Tax, disputes, foreign card fees and fully paid founder development are excluded.');
note(inp,srcStart+10,'CAC includes acquisition labor and partner fees. No extra royalty is assumed.');
note(inp,srcStart+11,'Rail 1: Apple IAP. Rail 2: US domestic online card. This is not advice on digital checkout eligibility.');
note(inp,srcStart+12,'Apple pays within 45 days after fiscal month-end when its payment requirements are met.');
inp.getRange(`G1:G${srcStart+10}`).format.columnWidth=130;
inp.freezePanes.freezeRows(8);
for(const k of ['durationNative','durationPilot']) inp.getRange(`D${rows[k]}:E${rows[k]}`).dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:2}};
for(const k of ['lagNative','lagPilot']) inp.getRange(`D${rows[k]}:E${rows[k]}`).dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:2}};

const unit=sheets['Unit economics']; setup(unit,'Economics per outcome pass',48);
header(unit,7,['USD per gross buyer','Work return C2','Active trip C3']);
const ur={price:8,refund:9,fees:10,net:11,expert:13,support:14,ai:15,infra:16,license:17,variable:18,preCAC:20,cac:21,cm:22,margin:23,firstCost:25,laterCost:26,monthlyBE:28,drawBE:29,totalBE:30,maxCAC:32,volumeCAC:33,repeatCM:35};
const labels={price:'Gross price',refund:'Expected refunds',fees:'Payment fees',net:'Net sales after refunds and fees',expert:'Expert delivery cost',support:'Support delivery cost',ai:'AI budget',infra:'Infrastructure',license:'Content license',variable:'Full variable delivery cost',preCAC:'Contribution before acquisition',cac:'Acquisition cost',cm:'Contribution after acquisition',margin:'Contribution / gross price',firstCost:'Variable cost in sale month',laterCost:'Remaining delivery cost after sale month',monthlyBE:'Mature monthly buyers to cover fixed costs',drawBE:'Mature monthly buyers incl founder draw',totalBE:'Fully settled buyers to cover Q4/startup/draw',maxCAC:'Maximum CAC before fixed costs',volumeCAC:'Maximum CAC at Q4 volume, fully settled',repeatCM:'Expected contribution including one possible repeat'};
for(const [k,r] of Object.entries(ur)) val(unit,`C${r}`,labels[k]);
function I(c,k){return `'Inputs'!${c}${rows[k]}`;}
for(const c of ['D','E']) {
 const f={price:`=${I(c,'price')}`,refund:`=${c}8*${I(c,'refund')}`,fees:`=IF(${I(c,'rail')}=1,(${c}8-${c}9)*${I(c,'appleFee')},${c}8*${I(c,'cardFee')}+${I(c,'cardFixed')})`,net:`=${c}8-SUM(${c}9:${c}10)`,expert:`=${I(c,'expertMin')}/60*${I(c,'expertRate')}`,support:`=${I(c,'supportMin')}/60*${I(c,'supportRate')}`,ai:`=${I(c,'ai')}`,infra:`=${I(c,'infra')}`,license:`=${I(c,'license')}`,variable:`=SUM(${c}13:${c}17)`,preCAC:`=${c}11-${c}18`,cac:`=${I(c,'cac')}`,cm:`=${c}20-${c}21`,margin:`=${c}22/${c}8`,firstCost:`=${c}18*(${I(c,'front')}+(1-${I(c,'front')})/${I(c,'duration')})`,laterCost:`=${c}18-${c}25`,monthlyBE:`=IF(${c}22<=0,"n.a.",ROUNDUP(${I(c,'fixed')}/${c}22,0))`,drawBE:`=IF(${c}22<=0,"n.a.",ROUNDUP((${I(c,'fixed')}+${I(c,'draw')})/${c}22,0))`,totalBE:`=IF(${c}22<=0,"n.a.",ROUNDUP((${I(c,'startup')}+3*(${I(c,'fixed')}+${I(c,'draw')}))/${c}22,0))`,maxCAC:`=${c}20`,volumeCAC:`=IF(SUM(${I(c,'unitsOct')},${I(c,'unitsNov')},${I(c,'unitsDec')})=0,"n.a.",${c}20-(${I(c,'startup')}+3*(${I(c,'fixed')}+${I(c,'draw')}))/SUM(${I(c,'unitsOct')},${I(c,'unitsNov')},${I(c,'unitsDec')}))`,repeatCM:`=${c}22*(1+${I(c,'repeat')})`};
 for(const [k,x] of Object.entries(f)) formula(unit,`${c}${ur[k]}`,x);
}
unit.getRange('D23:E23').setNumberFormat(pct); unit.getRange('D28:E30').setNumberFormat(number);
note(unit,38,'Mature break-even assumes all delivery completed and collections received. It is not a deadline forecast.');
note(unit,39,'Repeat sensitivity allows at most one speculative extra purchase, with no CAC saving. It is outside Q4 cash.');
note(unit,40,'Refunded buyers retain full variable delivery costs and acquisition expense in every case.');

const flow=sheets['Cash flow']; setup(flow,'Monthly earned results and collected cash',80,'H');
const months=['D','E','F','G','H'];
flow.getRange('D7:H7').values=[[new Date('2026-10-01T12:00:00Z'),new Date('2026-11-01T12:00:00Z'),new Date('2026-12-01T12:00:00Z'),new Date('2027-01-01T12:00:00Z'),new Date('2027-02-01T12:00:00Z')]];
flow.getRange('D7:H7').setNumberFormat('mmm-yy'); flow.getRange('C7:H7').format.fill='#E9EFF5';
const fr={units:1,bookings:2,earned:3,collections:4,var:6,cac:7,fixed:8,op:9,draw:10,afterDraw:11,startup:13,cashChange:14,cumulative:15,receivable:17,deferred:18,reserve:19,reservedCash:20,checkAR:22,checkRev:23,checkCost:24};
const fl={units:'Gross buyers',bookings:'Net sales booked after refunds and fees',earned:'Net service revenue earned',collections:'Cash collections',var:'Variable delivery cost paid / incurred',cac:'Acquisition cost paid / expensed',fixed:'Fixed operating cost',op:'Earned operating result before founder draw',draw:'Founder draw',afterDraw:'Earned operating result after founder coverage',startup:'Startup cash',cashChange:'Net cash change this month',cumulative:'Cumulative net cash since October',receivable:'Payment receivable at month end',deferred:'Unserved service value at net-sales basis',reserve:'Unpaid delivery cost reserve',reservedCash:'Cumulative cash less delivery reserve',checkAR:'Check booked = collected + receivable',checkRev:'Check booked = earned + unserved value',checkCost:'Check variable booked = paid + reserve'};
const start={D:9,E:39};
for(const p of ['D','E']) {
 const s=start[p]; val(flow,`C${s}`,p==='D'?'Work return C2':'Active trip C3'); flow.getRange(`C${s}:H${s}`).format.fill='#DCE6EF';
 for(const [k,o]of Object.entries(fr))val(flow,`C${s+o}`,fl[k]);
 for(let m=0;m<5;m++) {
  const c=months[m], prev=months[m-1];
  const r=k=>s+fr[k], ref=k=>`${c}${r(k)}`;
  const cohorts=months.slice(0,m+1).map((col,j)=>({col,age:m-j}));
  const live=cohorts.map(x=>`IF(${I(p,'duration')}>${x.age},${x.col}${r('units')},0)`).join('+');
  formula(flow,ref('units'),m<3?`=${I(p,'units'+['Oct','Nov','Dec'][m])}`:'=0');
  formula(flow,ref('bookings'),`=${ref('units')}*'Unit economics'!${p}${ur.net}`);
  formula(flow,ref('earned'),`=(${live})*'Unit economics'!${p}${ur.net}/${I(p,'duration')}`);
  const coll=cohorts.map(x=>`IF(${I(p,'lag')}=${x.age},${x.col}${r('bookings')},0)`).join('+');
  formula(flow,ref('collections'),`=${coll}`);
  formula(flow,ref('var'),`=(${ref('units')}*${I(p,'front')}+(${live})*(1-${I(p,'front')})/${I(p,'duration')})*'Unit economics'!${p}${ur.variable}`);
  formula(flow,ref('cac'),`=${ref('units')}*'Unit economics'!${p}${ur.cac}`);
  formula(flow,ref('fixed'),m<3?`=${I(p,'fixed')}`:'=0');
  formula(flow,ref('op'),`=${ref('earned')}-SUM(${ref('var')}:${ref('fixed')})`);
  formula(flow,ref('draw'),m<3?`=${I(p,'draw')}`:'=0');
  formula(flow,ref('afterDraw'),`=${ref('op')}-${ref('draw')}`);
  formula(flow,ref('startup'),m===0?`=${I(p,'startup')}`:'=0');
  formula(flow,ref('cashChange'),`=${ref('collections')}-SUM(${ref('var')}:${ref('fixed')})-${ref('draw')}-${ref('startup')}`);
  formula(flow,ref('cumulative'),`=${m?prev+r('cumulative'):'0'}+${ref('cashChange')}`);
  formula(flow,ref('receivable'),`=${m?prev+r('receivable'):'0'}+${ref('bookings')}-${ref('collections')}`);
  formula(flow,ref('deferred'),`=${m?prev+r('deferred'):'0'}+${ref('bookings')}-${ref('earned')}`);
  formula(flow,ref('reserve'),`=${m?prev+r('reserve'):'0'}+${ref('units')}*'Unit economics'!${p}${ur.variable}-${ref('var')}`);
  formula(flow,ref('reservedCash'),`=${ref('cumulative')}-${ref('reserve')}`);
  formula(flow,ref('checkAR'),`=SUM(D${r('bookings')}:${ref('bookings')})-SUM(D${r('collections')}:${ref('collections')})-${ref('receivable')}`);
  formula(flow,ref('checkRev'),`=SUM(D${r('bookings')}:${ref('bookings')})-SUM(D${r('earned')}:${ref('earned')})-${ref('deferred')}`);
  formula(flow,ref('checkCost'),`=SUM(D${r('units')}:${ref('units')})*'Unit economics'!${p}${ur.variable}-SUM(D${r('var')}:${ref('var')})-${ref('reserve')}`);
 }
 flow.getRange(`D${s+1}:H${s+1}`).setNumberFormat(number);
 flow.getRange(`D${s+22}:H${s+24}`).setNumberFormat('0.00');
 flow.getRange(`D${s+22}:H${s+24}`).conditionalFormats.add('cellIs',{operator:'notBetween',formula:[-.005,.005],format:{fill:'#FDE8E8',font:{bold:true,color:'#A60000'}}});
}
note(flow,69,'January–February are runoff only: no new buyers, fixed costs or draw. Continued operations are not funded here.');
note(flow,70,'Revenue: 1/duration each month. Cost: upfront fraction plus remaining fraction/duration in each service month.');
note(flow,71,'Default W: all service/cost in sale month. T: revenue 50%/50%, variable cost 75%/25%.');
note(flow,72,'Net service value is a managerial obligation measure, not a GAAP deferred-revenue determination.');
flow.freezePanes.freezeRows(7); flow.freezePanes.freezeColumns(3);

const ov=sheets.Overview;setup(ov,'Commercial comparison to December 31, 2026',44);ov.tabColor='#243B53';
header(ov,7,['USD unless buyers','Work return C2','Active trip C3']);
const or={price:8,cm:9,buyers:10,decOp:12,decAfter:13,collections:15,cash:16,reserve:17,afterReserve:18,receivable:20,unserved:21,matureBE:23,deadlineCAC:24,pilotUnit:27,pilotCohort:28};
const ol={price:'Price per outcome pass',cm:'Full contribution after acquisition per buyer',buyers:'October–December gross buyers',decOp:'December earned operating result before draw',decAfter:'December earned result after founder coverage',collections:'Cash received by December 31',cash:'Cumulative cash incl startup and draw',reserve:'Delivery cost still to pay',afterReserve:'Cumulative cash after delivery reserve',receivable:'Payment receivable at December 31',unserved:'Unserved service value at December 31',matureBE:'Fully settled buyers covering Q4/startup/draw',deadlineCAC:'Max CAC at active volume and collection deadline',pilotUnit:'Separate pilot contribution per buyer',pilotCohort:'Pilot contribution for ten buyers before overhead'};
for(const[k,r]of Object.entries(or))val(ov,`C${r}`,ol[k]);
for(const p of ['D','E']) {
 const s=start[p], F=k=>`'Cash flow'!F${s+fr[k]}`;
 const f={price:`='Unit economics'!${p}8`,cm:`='Unit economics'!${p}22`,buyers:`=SUM('Cash flow'!D${s+1}:F${s+1})`,decOp:`=${F('op')}`,decAfter:`=${F('afterDraw')}`,collections:`=SUM('Cash flow'!D${s+4}:F${s+4})`,cash:`=${F('cumulative')}`,reserve:`=${F('reserve')}`,afterReserve:`=${F('reservedCash')}`,receivable:`=${F('receivable')}`,unserved:`=${F('deferred')}`,matureBE:`='Unit economics'!${p}30`,deadlineCAC:`=IF(${p}10=0,"n.a.",(${p}18+SUM('Cash flow'!D${s+7}:F${s+7}))/${p}10)`,pilotUnit:`=${I(p,'pricePilot')}*(1-${I(p,'refund')})-${I(p,'pricePilot')}*${I(p,'cardFee')}-${I(p,'cardFixed')}-(${I(p,'expertMinPilot')}/60*${I(p,'expertRate')}+${I(p,'supportMinPilot')}/60*${I(p,'supportRate')}+${I(p,'ai')}+${I(p,'infra')}+${I(p,'license')})-${I(p,'cacPilot')}`,pilotCohort:`=${p}27*10`};
 for(const[k,x]of Object.entries(f))formula(ov,`${p}${or[k]}`,x);
}
ov.getRange('D8:E28').format.font.color='#20252B'; ov.getRange('D10:E10').setNumberFormat(number);ov.getRange('D23:E23').setNumberFormat(number);
for(const r of [9,13,18,23,28])ov.getRange(`C${r}:E${r}`).format.fill='#E9EFF5';
note(ov,31,'All demand, prices and operating budgets are assumptions. Base 0/40/80 buyers is not a forecast.');
note(ov,32,'Negative cumulative cash is the funding needed from zero initial cash, not an existing bank balance.');
note(ov,33,'Cash positivity requires actual collections, full delivery reserve, startup, fixed costs and founder coverage.');
note(ov,34,'Apple lag 2 is conservative calendar timing. Eligibility, fiscal closing dates and bank timing must be checked.');
note(ov,35,'Pilot contribution excludes overhead here. Pilot cash case retains the full native cost envelope.');
note(ov,36,'Founder development time is not fully paid in startup costs. No annual renewal or repeat is in Q4 cash.');

const sens=sheets.Sensitivity;setup(sens,'Sensitivity tests captured September 12, 2026',80,'K');
note(sens,5,'Captured tests are not live. Edit assumptions in model-builder.mjs and rerun to regenerate these captures.');
header(sens,7,['Case','Product','Unit contribution','Dec before draw','Dec after draw','Cash Dec31','After reserve','Receivable','Reserve'],'K');
sens.getRange('C8:C60').format.columnWidth=35;sens.getRange('D8:D60').format.columnWidth=16;

function snapshot(label) {
 return ['D','E'].map(p=>({case:label,product:p==='D'?'Work return':'Active trip',unit_contribution:cell(ov,`${p}9`),december_operating_before_draw:cell(ov,`${p}12`),december_after_founder_coverage:cell(ov,`${p}13`),cash_dec31:cell(ov,`${p}16`),cash_after_delivery_reserve:cell(ov,`${p}18`),receivable:cell(ov,`${p}20`),delivery_reserve:cell(ov,`${p}17`),gross_buyers:cell(ov,`${p}10`),max_cac_deadline:cell(ov,`${p}24`)}));
}
const baseValues=new Map();
for(const record of inputRecords) for(const p of ['D','E'])baseValues.set(`${p}${record.row}`,cell(inp,`${p}${record.row}`));
const scenarios=[
 {name:'Native base lag 2',case:1}, {name:'Native early lag 2',case:2}, {name:'Native early lag 1',case:2,changes:{lagNative:[1,1]}},
 {name:'Native base lag 1',case:1,changes:{lagNative:[1,1]}}, {name:'Zero sales',case:3}, {name:'Founder draw zero',case:1,changes:{draw:[0,0]}},
 {name:'Apple fee 30%',case:1,changes:{appleFee:[.30,.30]}}, {name:'Refund 15%',case:1,changes:{refund:[.15,.15]}},
 {name:'CAC plus USD20',case:1,changes:{cacNative:[50,60]}}, {name:'Human minutes plus 50%',case:1,changes:{expertMinNative:[45,67.5],supportMinNative:[22.5,45]}},
 {name:'Price minus 25%',case:1,changes:{priceNative:[111.75,149.25]}}, {name:'Price plus 25%',case:1,changes:{priceNative:[186.25,248.75]}},
 {name:'Pilot October ten, early payout',case:4},
 {name:'Pilot Dec25 ten, Jan8 payout',case:4,changes:{unitsOctPilot:[0,0],unitsDecPilot:[10,10],lagPilot:[1,1]}},
];
const captures=[]; const checkResults=[];
function restore(){for(const[a,v]of baseValues)val(inp,a,v);val(inp,'D4',1);}
for(const sc of scenarios) {
 restore(); val(inp,'D4',sc.case);
 for(const[k,v]of Object.entries(sc.changes??{}))inp.getRange(`D${rows[k]}:E${rows[k]}`).values=[v];
 wb.recalculate(); const results=snapshot(sc.name); captures.push(...results);
 for(const p of ['D','E'])for(const key of ['checkAR','checkRev','checkCost'])for(const c of months)assert(Math.abs(cell(flow,`${c}${start[p]+fr[key]}`))<.00001,sc.name+' '+p+' '+key);
 checkResults.push({case:sc.name,reconciliations:'passed'});
}
restore();wb.recalculate();
val(inp,`D${rows.pricePilot}`,null);wb.recalculate();
assert(Math.abs(cell(unit,'D22')-40.518)<1e-8,'A blank unselected pilot price must not block native');
val(inp,'D4',4);wb.recalculate();
assert.equal(cell(inp,`D${rows.price}`),'missing input','Selected missing price must be exposed');
restore();val(inp,`D${rows.unitsDecBase}`,0);wb.recalculate();
assert.equal(cell(flow,'F10'),0,'Zero later-period demand must stay zero');
restore();wb.recalculate();
assert(Math.abs(cell(unit,'D22')-40.518)<1e-8);assert(Math.abs(cell(unit,'E22')-27.618)<1e-8);
assert(Math.abs(cell(ov,'D16')+29120)<1e-8);assert(Math.abs(cell(ov,'E18')+40860)<1e-8);
assert(Math.abs(cell(ov,'D13')+758.56)<1e-8);assert(Math.abs(cell(ov,'E13')+4522.92)<1e-8);
sens.getRange(`C8:K${7+captures.length}`).values=captures.map(r=>[r.case,r.product,r.unit_contribution,r.december_operating_before_draw,r.december_after_founder_coverage,r.cash_dec31,r.cash_after_delivery_reserve,r.receivable,r.delivery_reserve]);
sens.getRange(`E8:K${7+captures.length}`).setNumberFormat(money);
let sr=10+captures.length;
header(sens,sr,['Annual thought experiment','USD99 old','USD249 revised']);
const annualRows={price:sr+1,refund:sr+2,fee:sr+3,reserve:sr+4,cac:sr+5,cm:sr+6,break8000:sr+7,break28500:sr+8};
const annualValues={price:[99,249],refund:[.05,.08],fee:[.15,.15],reserve:[12,96],cac:[20,40]};
for(const[k,r]of Object.entries(annualRows))val(sens,`C${r}`,({price:'Annual price',refund:'Refund fraction',fee:'Platform fraction',reserve:'Full future variable service reserve',cac:'Acquisition per buyer',cm:'Residual before fixed obligations',break8000:'Sales for USD8000 before omitted obligations',break28500:'Sales for USD28500 before omitted obligations'})[k]);
for(const[k,v]of Object.entries(annualValues)){sens.getRange(`D${annualRows[k]}:E${annualRows[k]}`).values=[v];sens.getRange(`D${annualRows[k]}:E${annualRows[k]}`).format.font.color='#0000FF';}
for(const p of ['D','E']){
 formula(sens,`${p}${annualRows.cm}`,`=${p}${annualRows.price}*(1-${p}${annualRows.refund})*(1-${p}${annualRows.fee})-${p}${annualRows.reserve}-${p}${annualRows.cac}`);
 formula(sens,`${p}${annualRows.break8000}`,`=IF(${p}${annualRows.cm}<=0,"n.a.",ROUNDUP(8000/${p}${annualRows.cm},0))`);
 formula(sens,`${p}${annualRows.break28500}`,`=IF(${p}${annualRows.cm}<=0,"n.a.",ROUNDUP(28500/${p}${annualRows.cm},0))`);
}
sens.getRange(`D${sr+2}:E${sr+3}`).setNumberFormat(pct);
note(sens,sr+10,'Annual scenarios are not sales forecasts. Future fixed costs are unspecified and must also be funded.');
note(sens,sr+11,'USD12/year variable reserve is the old optimistic assumption, not supported delivery economics.');
const repeatRow=sr+14;header(sens,repeatRow,['Possible one repeat','Work return C2','Active trip C3']);
for(const [i,p]of [0,.2,.4].entries()){
 const r=repeatRow+1+i;val(sens,`C${r}`,p);sens.getRange(`C${r}`).setNumberFormat(pct);
 for(const c of ['D','E'])formula(sens,`${c}${r}`,`='Unit economics'!${c}22*(1+C${r})`);
}
note(sens,repeatRow+5,'Speculative expected contribution per first customer. Same CAC on repeat. Not LTV or a cash forecast.');

wb.recalculate();
val(sens,`E${annualRows.reserve}`,160);wb.recalculate();
assert.equal(cell(sens,`E${annualRows.break8000}`),'n.a.');
assert.equal(cell(sens,`E${annualRows.break28500}`),'n.a.');
val(sens,`E${annualRows.reserve}`,249*(1-.08)*(1-.15)-40);wb.recalculate();
assert.equal(cell(sens,`E${annualRows.break8000}`),'n.a.');
val(sens,`E${annualRows.reserve}`,96);wb.recalculate();
assert(Math.abs(cell(sens,`D${annualRows.cm}`)-47.9425)<1e-8);
assert.equal(cell(sens,`D${annualRows.break8000}`),167);assert.equal(cell(sens,`D${annualRows.break28500}`),595);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'Formula error scan'});
await fs.writeFile(path.join(support,'formula-checks.ndjson'),errors.ndjson);
const inspection=await wb.inspect({kind:'table',range:'Overview!C7:E28',include:'values,formulas',tableMaxRows:22,tableMaxCols:3});
await fs.writeFile(path.join(support,'overview-checks.ndjson'),inspection.ndjson);
function csv(rows){const q=v=>{if(v==null)return '';const s=typeof v==='number'?String(Math.round(v*1e8)/1e8):String(v);return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;};const keys=Object.keys(rows[0]);return [keys.map(q).join(','),...rows.map(r=>keys.map(k=>q(r[k])).join(','))].join('\n')+'\n';}
const inputExport=inputRecords.map(r=>({input:r.key,label:r.label,work_return:cell(inp,`D${r.row}`),active_trip:cell(inp,`E${r.row}`),basis:r.notes,workbook_row:r.row}));
inputExport.push(...Object.entries(source).map(([k,v])=>({input:'source_'+k,label:'Payment rail source',work_return:'',active_trip:'',basis:v,workbook_row:''})));
await fs.writeFile(path.join(out,'commercial-inputs.csv'),csv(inputExport));
const unitExport=Object.entries(ur).map(([k,r])=>({metric:labels[k],work_return:cell(unit,`D${r}`),active_trip:cell(unit,`E${r}`),basis:'Active base assumptions; USD unless count or ratio'}));
unitExport.push({metric:'Pilot contribution per buyer before fixed overhead',work_return:cell(ov,'D27'),active_trip:cell(ov,'E27'),basis:'Separate one-time pilot offer; no native demand transfer'});
await fs.writeFile(path.join(out,'commercial-unit-economics.csv'),csv(unitExport));
const cashExport=[];
for(const p of ['D','E'])for(const [mi,c]of months.entries())for(const[k,o]of Object.entries(fr))cashExport.push({product:p==='D'?'Work return':'Active trip',month:['2026-10','2026-11','2026-12','2027-01','2027-02'][mi],metric:fl[k],value:cell(flow,`${c}${start[p]+o}`),case:'Native base lag 2',basis:mi<3?'Assumed operations':'Runoff only; future fixed costs and draw unspecified'});
await fs.writeFile(path.join(out,'commercial-cash-flow.csv'),csv(cashExport));
const extra=[];
for(const [col,label]of [['D','Annual old USD99'],['E','Annual revised USD249']])extra.push({case:label,product:'Thought experiment',unit_contribution:cell(sens,`${col}${annualRows.cm}`),december_operating_before_draw:'',december_after_founder_coverage:'',cash_dec31:'',cash_after_delivery_reserve:'',receivable:'',delivery_reserve:cell(sens,`${col}${annualRows.reserve}`),gross_buyers:'',max_cac_deadline:'',notes:'Not forecast. Future fixed obligations unspecified; reserve is full variable service.'});
for(const p of [0,.2,.4])for(const[c,label]of [['D','Work return'],['E','Active trip']])extra.push({case:'One-repeat probability '+p,product:label,unit_contribution:cell(unit,`${c}22`)*(1+p),december_operating_before_draw:'',december_after_founder_coverage:'',cash_dec31:'',cash_after_delivery_reserve:'',receivable:'',delivery_reserve:'',gross_buyers:'',max_cac_deadline:'',notes:'Speculative at most one additional purchase, same CAC, outside Q4; not LTV.'});
await fs.writeFile(path.join(out,'commercial-sensitivity.csv'),csv([...captures.map(x=>({...x,notes:'Captured 2026-09-12; same build recalculated; not live until regenerated.'})),...extra]));
await fs.writeFile(path.join(support,'model-checks.json'),JSON.stringify({as_of:'2026-09-12',checks:checkResults,central:snapshot('Native base lag 2'),legacy:{residual:cell(sens,`D${annualRows.cm}`),buyers8000:cell(sens,`D${annualRows.break8000}`),buyers28500:cell(sens,`D${annualRows.break28500}`)},engine:'Artifact Tool recalculation; Microsoft Excel UI not tested',limitations:['Input validation supports duration 1–2 and calendar payout lag 0–2 only.','No outside-period fixed cost reserve; annual full fixed obligation unspecified.','Pilot same-month payout is an early-sale favorable approximation.']},null,2));
for(const [name,range,tag]of [['Overview','C2:H36'],['Inputs','C2:G36'],['Unit economics','C2:H40'],['Cash flow','C2:H33'],['Sensitivity','C2:K24'],['Cash flow','C39:H72','cash-flow-active'],['Sensitivity',`C${sr}:H${repeatRow+5}`,'annual-repeat']]){
 const preview=await wb.render({sheetName:name,range,scale:1,format:'png'});await fs.writeFile(path.join(support,(tag??name.toLowerCase().replaceAll(' ','-'))+'-preview.png'),new Uint8Array(await preview.arrayBuffer()));
}
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(path.join(out,'Commercial-Model.xlsx'));
const reopened=await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(out,'Commercial-Model.xlsx')));reopened.recalculate();
assert(Math.abs(reopened.worksheets.getItem('Overview').getRange('D18').values[0][0]+29120)<1e-7);
assert(Math.abs(reopened.worksheets.getItem('Overview').getRange('E18').values[0][0]+40860)<1e-7);
await fs.rename(path.join(out,'Commercial-Model.xlsx.inspect.ndjson'),path.join(support,'export-inspection.ndjson'));
console.log(JSON.stringify({output:path.join(out,'Commercial-Model.xlsx'),base:snapshot('Native base lag 2'),sensitivity_cases:scenarios.length,reopened_checks:'passed'}));
