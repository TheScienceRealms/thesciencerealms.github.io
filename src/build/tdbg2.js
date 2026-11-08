const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('CON',m.text()));
await p.goto('file://'+__dirname+'/../quiztoplasm.html#sim-food');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>({wrap:document.querySelector('#simwrap')&&document.querySelector('#simwrap').hidden,sim:(document.querySelector('#sim')||{}).innerHTML?.slice(0,200),hash:location.hash})));
await b.close()})();
