import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const base=process.cwd();
const output=resolve(base,'part-b/assets/audit');
mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1120,height:900},deviceScaleFactor:1});
async function open(rel){
 await page.goto(pathToFileURL(resolve(base,rel)).href,{waitUntil:'load'});
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>{ const el=document.activeElement; if(el instanceof HTMLElement)el.blur(); });
}
async function capture(path,locator){
 await locator.scrollIntoViewIfNeeded();
 await page.evaluate(()=>{ const el=document.activeElement; if(el instanceof HTMLElement)el.blur(); });
 await locator.screenshot({path:resolve(output,path),animations:'disabled',timeout:15000});
}
try{
 await open('citizenship.html');
 const originalExample=page.locator('.worked-example .scenario-list');
 const originalChallenge=page.locator('#challenge-title').locator('xpath=ancestor::section[1]');
 await capture('01-before-choice.png',originalChallenge,515);
 await capture('02-before-pinyin.png',originalExample,520);
 await page.locator('input[name="translation-choice"]').first().check().catch(async()=>{await page.locator('#choice-one').check();});
 await capture('04-before-reflection.png',originalChallenge,540);
 await open('part-b/citizenship.html');
 await capture('01-after-choice.png',page.locator('#practice'),515);
 await page.locator('#retro-pinyin').check();
 await capture('02-after-pinyin.png',page.locator('#example'),520);
 await page.locator('#retro-reason').fill('I chose this translation because it fits who is speaking and what has happened.');
 await capture('04-after-reflection.png',page.locator('#reflection'),540);
}finally{
 await browser.close();
}
