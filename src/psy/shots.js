const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const f='file://'+__dirname+'/../psycheverse.html';
const p=await b.newPage({viewport:{width:1100,height:1000}});
await p.goto(f);await p.waitForTimeout(1200);await p.screenshot({path:__dirname+'/v-hub.png'});
await p.goto(f+'#essay-condition');await p.waitForTimeout(300);await p.evaluate(()=>document.querySelector('.plan').scrollIntoView());await p.screenshot({path:__dirname+'/v-plan.png'});
await p.goto(f+'#build-pd-rel');await p.locator('.kitbtn').nth(0).click();await p.locator('.kitbtn').nth(2).click();await p.click('[data-act="pcheck"]');await p.screenshot({path:__dirname+'/v-build.png'});
await p.goto(f+'#sort-deb-mother');await p.locator('.pool .chipm').first().click();await p.locator('.bin').first().click();await p.locator('.pool .chipm').first().click();await p.screenshot({path:__dirname+'/v-sort.png'});
const m=await b.newPage({viewport:{width:390,height:844}});await m.goto(f);await m.waitForTimeout(1000);await m.screenshot({path:__dirname+'/v-mobile.png'});
await b.close()})();
