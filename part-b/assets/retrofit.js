const scenarios={
thanks:{chinese:"老师，辛苦了。",pinyin:"Lǎoshī, xīnkǔ le.",context:"You speak to your teacher after a lesson.",options:["You've worked hard, teacher.","Thanks for all your hard work.","You must be tired.","I would rewrite this in my own words."]},
question:{chinese:"不好意思，请问洗手间在哪里？",pinyin:"Bù hǎoyìsi, qǐngwèn xǐshǒujiān zài nǎlǐ?",context:"You politely stop an unfamiliar teacher to ask for directions.",options:["I'm embarrassed. Where is the bathroom?","Excuse me, where is the bathroom?","I'm sorry I arrived late.","I would rewrite this in my own words."]}
};
const find=(id)=>document.getElementById(id);
const selectCase=()=>{
const c=scenarios[find("retro-case").value];find("retro-chinese").textContent=c.chinese;
find("retro-phrase-pinyin").textContent=c.pinyin;find("retro-context").textContent=c.context;
find("retro-options").replaceChildren();
c.options.forEach((choice,i)=>{const wrapper=document.createElement("label");wrapper.className="retro-choice";const inp=document.createElement("input");inp.type="radio";inp.name="retro-choice";inp.value=choice;const txt=document.createElement("span");txt.textContent=choice;wrapper.append(inp,txt);find("retro-options").append(wrapper);});
find("retro-reason").value="";find("retro-result").hidden=true;find("retro-error").textContent="";find("retro-status").textContent="Choose a version and explain your reason.";
};
find("retro-case").addEventListener("change",selectCase);
find("retro-pinyin").addEventListener("change",e=>document.querySelectorAll(".retro-pronunciation").forEach(el=>el.hidden=!e.target.checked));
const response=()=>{const c=scenarios[find("retro-case").value];const selected=document.querySelector('input[name="retro-choice"]:checked');const reason=find("retro-reason").value.trim();
if(!selected||!reason){find("retro-error").textContent="Choose a translation and give a reason first.";find("retro-result").hidden=true;return null;}
find("retro-error").textContent="";
return "Can AI Translate This? — Retrofitted classroom activity\nOriginal Chinese: "+c.chinese+"\nMy choice: "+selected.value+"\nReason: "+reason+"\nSituation: "+c.context;
};
find("retro-prepare").addEventListener("click",()=>{const r=response();if(!r)return;find("retro-result").textContent=r;find("retro-result").hidden=false;find("retro-result").focus();find("retro-status").textContent="Response prepared. Copy or print it for teacher feedback.";});
find("retro-copy").addEventListener("click",async()=>{const r=response();if(!r)return;find("retro-result").textContent=r;find("retro-result").hidden=false;try{await navigator.clipboard.writeText(r);find("retro-status").textContent="Copied. Paste into a teacher-approved space.";}catch(e){find("retro-status").textContent="Copy blocked by browser. Select the prepared text to copy manually.";const range=document.createRange();range.selectNodeContents(find("retro-result"));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);}});
find("retro-print").addEventListener("click",()=>{const r=response();if(!r)return;find("retro-result").textContent=r;find("retro-result").hidden=false;window.print();});
selectCase();