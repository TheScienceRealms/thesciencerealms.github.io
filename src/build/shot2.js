const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:900}});p.on('pageerror',e=>errs.push(e.message));
const f='file://'+__dirname+'/../quiztoplasm.html';
await p.goto(f+'#slide-lab');await p.waitForTimeout(500);await p.screenshot({path:__dirname+'/l-home.png'});
await p.click('.card');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/l-colour.png'});
await p.click('[data-k="exam"]');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/l-exam.png'});
await p.click('.back');await p.click('.card:nth-child(3)');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/l-cell.png'});
console.log(errs);await b.close()})();
