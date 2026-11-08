const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/../quiztoplasm.html#sim-enzyme');await p.waitForTimeout(800);
for(let i=0;i<3;i++){await p.locator('#sim [data-act="eq"]').first().click({timeout:3000});
console.log('after eq',await p.$$eval('#sim [data-act="eqn"]',d=>d.length), await p.textContent('#sim .qtext'));
await p.click('#sim [data-act="eqn"]',{timeout:3000});await p.waitForTimeout(100);
console.log('after eqn',await p.$$eval('#sim [data-act="eq"]',d=>d.map(x=>x.disabled).join()), await p.textContent('#sim .qtext'));}
await b.close()})();
