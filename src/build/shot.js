const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../quiztoplasm.html';
await p.goto(f);await p.waitForTimeout(1500);await p.screenshot({path:__dirname+'/hub.png',fullPage:true});
await p.goto(f+'#slide-run');await p.waitForTimeout(500);await p.click('.unit');await p.waitForTimeout(700);await p.screenshot({path:__dirname+'/run.png'});
await p.goto(f+'#slide-lab');await p.waitForTimeout(500);await p.click('.card');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/lab.png',fullPage:true});
const m=await b.newPage({viewport:{width:390,height:800}});await m.emulateMedia({colorScheme:'dark'});await m.goto(f);await m.waitForTimeout(1200);await m.screenshot({path:__dirname+'/mobile.png'});
console.log(errs);await b.close()})();
