const fs=require('fs');const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1000}});
const sets=JSON.parse(process.argv[2]);
for(let i=0;i<sets.length;i++){fs.writeFileSync(__dirname+'/sheet.html','<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(3,1fr);gap:6px">'+sets[i].map(n=>'<div style="height:980px;overflow:hidden"><img src="'+n+'.png" style="width:100%"></div>').join('')+'</body>');
 await p.goto('file://'+__dirname+'/sheet.html');await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/sheet'+i+'.png',fullPage:true})}await b.close()})();
