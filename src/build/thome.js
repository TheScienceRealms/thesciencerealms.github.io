const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [n,f] of [['new','../quiztoplasm.html'],['old','old19.html']]){
 for(const [w,h] of [[1000,1000],[390,844]]){const p=await b.newPage({viewport:{width:w,height:h}});
 await p.goto('file://'+__dirname+'/'+f.replace('.bak','.bak'),{waitUntil:'load'}).catch(e=>console.log(e.message));await p.waitForTimeout(600);
 await p.screenshot({path:__dirname+`/h-${n}-${w}.png`});await p.close()}}
await b.close()})();
