const cases={
  photo:{
    chinese:"你能帮我把照片发给老师吗？麻烦你了。",
    pinyin:"Nǐ néng bāng wǒ bǎ zhàopiàn fā gěi lǎoshī ma? Máfan nǐ le.",
    context:"A student is asking a classmate to send a photo. The classmate has not answered yet.",
    ai:"Could you send the photo to the teacher? Thanks for sending it.",
    note:"Look up the phrase at the end of the message. Does your source give one meaning or several? What does the situation add?",
    lookup:"麻烦",
    example:"Could you send the photo to the teacher for me? Sorry to trouble you.",
    audience:"Classmate; a request that has not yet been accepted"
  },
  teacher:{
    chinese:"老师，今天辛苦了。",
    pinyin:"Lǎoshī, jīntiān xīnkǔ le.",
    context:"After a long workshop, a student speaks to the teacher who stayed back to help.",
    ai:"You must be tired today, teacher.",
    note:"Check the expression in a dictionary. How could you tell whether this student is thanking the teacher or commenting on their tiredness?",
    lookup:"辛苦",
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
 $("lookup-term").textContent=c.lookup;
 $("lookup-finding").value="";
 $("credibility-check").value="";
 $("extension-response").value="";
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
 if(!buildResponse()){
   $("model-note").textContent="Finish your source check and explanation before viewing the example.";
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
 const credibility=$("credibility-check").value.trim();
 const independent=$("lookup-finding").value.trim();
 const extension=$("extension-response").value.trim();
 if(!revision||!reason||!evidence||!credibility||!independent){
   $("error").textContent="Add a credibility question, a source check (or its limit), your translation, an evidence choice and a reason.";
   $("result").hidden=true;return "";
 }
 const c=cases[$("case-select").value];
 $("error").textContent="";
 return "Translation Evidence Lab — "+$("case-select").selectedOptions[0].text+"\nOriginal: "+c.chinese+"\nSuggested translation (teacher simulation): "+c.ai+"\nBefore trusting Source A I would check: "+credibility+"\nSource checked and finding: "+independent+"\nMy revision: "+revision+"\nMost useful evidence: "+evidence+"\nMy reason: "+reason+"\nConfidence: "+($("confidence").value||"Not selected")+(extension?"\nOptional extension: "+extension:"");
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
