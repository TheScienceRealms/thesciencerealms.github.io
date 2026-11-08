const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../chemquest.html';const sh=n=>p.screenshot({path:__dirname+'/t3-'+n+'.png',fullPage:true});
// shifter
await p.goto(f+'#shifter');await p.waitForTimeout(400);await p.click('[data-act=sbp][data-k="1"]');await p.click('[data-act=slp][data-k="1"]');await sh('shift0');
for(let i=0;i<6;i++){await p.click('[data-act=scheck]');await p.locator('[data-act=sshape]').first().click();await p.locator('[data-act=sangle]').first().click();if(i===0)await sh('shift1');await p.click('#nx')}
console.log('shifter',!!(await p.$('.big')));
// escape
await p.goto(f+'#escape');await p.waitForTimeout(300);
for(let i=0;i<30;i++){if(await p.$('.big'))break;await p.locator('[data-act=epick]').first().click();if(i===2)await sh('esc');await p.click('#nx')}
console.log('escape',!!(await p.$('.big')));
// blitz
await p.goto(f+'#blitz');await p.waitForTimeout(300);await sh('blitz');
for(let i=0;i<25;i++){if(await p.$('.big'))break;const bp=await p.$('[data-act=bpick]:not([disabled])');if(bp){await bp.click();continue}const bb=await p.$('[data-act=bbonus]:not([disabled])');if(bb){await bb.click();continue}await p.click('#nx')}
console.log('blitz',!!(await p.$('.big')));
// dipole
await p.goto(f+'#dipole');await p.waitForTimeout(300);
for(let i=0;i<40;i++){if(await p.$('[data-act=ssel]'))break;await p.locator('[data-act=dpick]').first().click();if(i===1)await sh('dip');await p.click('#nx')}
for(let i=0;i<10;i++){const s=await p.$('[data-act=ssel]');if(!s)break;await s.click();await p.locator('[data-act=sbin]').nth(i%3).click()}
await sh('sort');await p.click('[data-act=scheck2]');await p.click('[data-act=sdone]');
console.log('dipole',!!(await p.$('.big')));
// quiz + section A
for(const h of ['quiz-1-5','quiz-as2']){await p.goto(f+'#'+h);await p.waitForTimeout(300);for(let i=0;i<20;i++){if(await p.$('.big'))break;const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o)await o.click();await p.click('#nx')}console.log(h,!!(await p.$('.big')))}
// msm
await p.goto(f+'#prac-msm-ch4');await p.waitForTimeout(300);await sh('msm');
for(let j=0;j<10;j++){if(!(await p.$('.tilebtn'))||!(await p.$('.gap:not(.filled)')))break;await p.locator('.tilebtn').first().click();await p.locator('.gap:not(.filled)').first().click()}
await p.click('[data-act=pgcheck]');await p.click('[data-act=pnext]');await p.fill('#ans','Methane is tetrahedral 109.5 with four bonding pairs which repel equally. Water is bent 104.5 with two lone pairs; lone pairs repel more.');await p.click('[data-act=wmark]');await p.click('[data-act=wdone]');
console.log('msm',!!(await p.$('.big')));
await p.goto(f+'#notes-2-11');await p.waitForTimeout(200);await sh('n211');
await p.goto(f+'#elemental-frontier');await p.waitForTimeout(200);await sh('w1');
console.log(errs);await b.close()})();
