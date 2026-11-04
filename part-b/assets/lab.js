const cases={
  photo:{
    chinese:"你能帮我把照片发给老师吗？麻烦你了。",
    pinyin:"Nǐ néng bāng wǒ bǎ zhàopiàn fā gěi lǎoshī ma? Máfan nǐ le.",
    context:"A student is asking a classmate to send a photo. The classmate has not answered yet.",
    ai:"Could you send the photo to the teacher? Thanks for helping.",
    note:"麻烦你了 can acknowledge that you are asking someone for a favour. The best English wording depends on whether help is requested or already given.",
    example:"Could you send the photo to the teacher for me? Sorry to trouble you.",
    audience:"Classmate; a request that has not yet been accepted"
  },
  teacher:{
    chinese:"老师，今天辛苦了。",
    pinyin:"Lǎoshī, jīntiān xīnkǔ le.",
    context:"After a long workshop, a student speaks to the teacher who stayed back to help.",
    ai:"Teacher, you have worked hard today.",
    note:"辛苦了 often acknowledges someone's effort. A natural English version may express appreciation rather than describe the effort literally.",
    example:"Thanks for all your help today.",
    audience:"Teacher; appreciative message after help"
  }
};
const $=id=>document.getElementById(id);
function loadCase(){
 const c=cases[$("case-select").value];
 $("chinese").textContent=c.chinese;
 $("pinyin").textContent=c.pinyin;
 $("context").textContent=c.context;
 $("ai-candidate").textContent=c.ai;
 $("language-note").textContent=c.note;
 $("audience").textContent=c.audience;
 $("revision").value="";
 $("reason").value="";
 $("evidence-select").value="";
 $("confidence").value="";
 $("result").hidden=true;
 $("model-note").hidden=true;
 $("error").textContent="";
 $("notice").textContent="Choose a source and explain how you would revise the suggestion.";
}
$("case-select").addEventListener("change",loadCase);
$("pinyin-toggle").addEventListener("change",e=>{
 $("pinyin").hidden=!e.target.checked;
});
$("reveal-model").addEventListener("click",()=>{
 if(!$("revision").value.trim()){
   $("model-note").textContent="Try writing your own translation first, then compare it with a teacher example.";
   $("model-note").hidden=false;return;
 }
 const c=cases[$("case-select").value];
 $("model-note").textContent="One defensible version: “"+c.example+"” Explain why this fits the audience and the context. Other versions can also work with good evidence.";
 $("model-note").hidden=false;
});
function buildResponse(){
 const revision=$("revision").value.trim();
 const reason=$("reason").value.trim();
 const evidence=$("evidence-select").value;
 if(!revision||!reason||!evidence){
   $("error").textContent="Complete your revision, the evidence choice, and your reason first.";
   $("result").hidden=true;return "";
 }
 const c=cases[$("case-select").value];
 $("error").textContent="";
 return "Translation Evidence Lab — "+$("case-select").selectedOptions[0].text+"\nOriginal: "+c.chinese+"\nAI suggestion: "+c.ai+"\nMy revision: "+revision+"\nMost useful evidence: "+evidence+"\nMy reason: "+reason+"\nConfidence: "+($("confidence").value||"Not selected")+"\nChecked against: teacher-created classroom examples; original message and context.";
}
$("build").addEventListener("click",()=>{
 const output=buildResponse();if(!output)return;
 $("result").textContent=output;$("result").hidden=false;
 $("notice").textContent="Your response is ready. Copy it into your teacher-approved submission space or print it.";
 $("result").focus();
});
$("copy").addEventListener("click",async()=>{
 const output=buildResponse();if(!output)return;
 $("result").textContent=output;$("result").hidden=false;
 try{
   await navigator.clipboard.writeText(output);
   $("notice").textContent="Copied. Paste into the space your teacher has approved.";
 }catch(e){
   $("notice").textContent="Copy was blocked by this browser. Select the response below and copy it manually.";
   const range=document.createRange();range.selectNodeContents($("result"));
   const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
 }
});
$("print").addEventListener("click",()=>{
 const output=buildResponse();if(!output)return;
 $("result").textContent=output;$("result").hidden=false;window.print();
});
loadCase();
