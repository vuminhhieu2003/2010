'use strict';
const $=s=>document.querySelector(s);
let photos=[],letters={},current=0;
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let motionOff=motionQuery.matches;
const chapters=[
[1,6,'Những ngày đầu trong album','Mở lại những tấm ảnh cũ, thấy những nụ cười vẫn gần như mới hôm qua.','Có những điều cứ nhìn lại là thấy thương.'],
[7,17,'Thế giới vừa một vòng tay','Rồi trong những khung hình, có thêm những bàn tay nhỏ, chiếc mũ nhỏ và những nét tinh nghịch đầu tiên.','Từ một vòng tay, mở ra bao nhiêu ngày vui.'],
[18,32,'Tuổi thơ, nhiều màu lắm','Một que kem, một chiếc kính đỏ, một dáng đứng ngộ nghĩnh. Từng chút một, những ngày bé xíu thành kỷ niệm.','Lớn thêm một chút. Đáng yêu thêm thật nhiều.'],
[33,44,'Cùng nhau lớn lên','Những bàn tay nắm nhau, những lần đi chơi và những tấm hình đông vui hơn. Nhím và Núi lớn dần trong câu chuyện của nhà mình.','Mong hai em cứ lớn lên với thật nhiều tiếng cười.'],
[45,62,'Thêm những ngày bên nhau','Những chuyến đi, một sinh nhật, những góc ngồi quen và những tấm ảnh gần đây hơn. Cuốn album vẫn tiếp tục đầy lên.','Hôm nay là kỷ niệm đẹp của một ngày mai.'],
[63,74,'Gia đình mình','Những tấm ảnh có nhà mình bên nhau, nhìn lại lúc nào cũng thấy thương.','Mong nhà mình có thêm thật nhiều ngày vui bên nhau.']
];
function el(tag,cls,text){const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x}
function setMotion(){document.body.classList.toggle('motion-off',motionOff);document.documentElement.style.scrollBehavior=motionOff?'auto':'';$('#motionToggle').textContent=motionOff?'Bật chuyển động':'Tắt chuyển động';$('#motionToggle').setAttribute('aria-pressed',String(motionOff))}
setMotion();$('#motionToggle').onclick=()=>{motionOff=!motionOff;setMotion()};motionQuery.addEventListener('change',e=>{motionOff=e.matches;setMotion()});
async function init(){try{const responses=await Promise.all([fetch('photos.json?v=6'),fetch('letters.json?v=5')]);if(responses.some(r=>!r.ok))throw Error();[photos,letters]=await Promise.all(responses.map(r=>r.json()));const holder=$('#chapters');holder.replaceChildren();chapters.forEach((c,i)=>{const sec=el('section','chapter');sec.hidden=true;sec.id='chapter-'+(i+1);const head=el('div','chapter-title');head.append(el('span','chapter-number',String(i+1).padStart(2,'0')));const copy=el('div');copy.append(el('h3','',c[2]),el('p','',c[3]));head.append(copy);sec.append(head);const grid=el('div','photo-grid');photos.slice(c[0]-1,c[1]).forEach(p=>{const fig=el('figure','photo');const b=el('button','photo-open');b.type='button';b.setAttribute('aria-label','Xem ảnh lớn: '+p.caption);const stage=el('span','photo-stage');const img=el('img');img.src=p.src;img.alt=p.caption;img.width=p.width;img.height=p.height;img.loading='lazy';img.decoding='async';stage.append(img);const meta=el('span','photo-meta','XEM ẢNH LỚN ↗');b.append(stage,meta);b.onclick=()=>showPhoto(p.number-1);fig.append(b,el('figcaption','',p.caption));grid.append(fig)});sec.append(grid,el('p','chapter-end',c[4]));holder.append(sec)}); }catch(e){$('#chapters').textContent='Album chưa tải được. Bà và dì thử tải lại trang nhé.';document.querySelectorAll('[data-letter]').forEach(b=>b.disabled=true)}}
function renderPhoto(){const p=photos[current];$('#largePhoto').src=p.src;$('#largePhoto').alt=p.caption;$('#photoCaption').textContent=p.caption;$('#prev').disabled=current===0;$('#next').disabled=current===photos.length-1;}
function showPhoto(i){if(!photos.length)return;current=i;renderPhoto();$('#viewer').showModal();document.body.style.overflow='hidden'}
$('#closeViewer').onclick=()=>$('#viewer').close();$('#viewer').addEventListener('close',()=>{document.body.style.overflow=''});$('#prev').onclick=()=>{if(current>0){current--;renderPhoto()}};$('#next').onclick=()=>{if(current<photos.length-1){current++;renderPhoto()}};
document.addEventListener('keydown',e=>{if(!$('#viewer').open)return;if(e.key==='ArrowRight'){e.preventDefault();$('#next').click()}if(e.key==='ArrowLeft'){e.preventDefault();$('#prev').click()}});
document.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{if(!letters[b.dataset.letter])return;$('#letterTitle').textContent=b.dataset.letter==='di'?'Dì Lành ơi,':'Bà ngoại ơi,';$('#letterBody').innerHTML=letters[b.dataset.letter];$('#letterDialog').showModal();$('#letterDialog').scrollTop=0;document.body.style.overflow='hidden'});$('#closeLetter').onclick=()=>$('#letterDialog').close();$('#letterDialog').addEventListener('close',()=>document.body.style.overflow='');
const wishes=['Chúc bà ăn ngon, ngủ ngon, ngày nào cũng có chuyện vui.','Chúc dì Lành luôn xinh đẹp, được yêu thương và có nhiều thời gian cho mình.','Mong Nhím và Núi ngoan ngoãn, học vui và lớn lên thật hạnh phúc.','Mong sớm được về ăn cơm bà nấu, cùng cả nhà chụp thêm một tấm ảnh.','20/10 thật vui nhé bà và dì. Cháu thương cả hai nhiều lắm!'];let wishIndex=0;
$('#wish').onclick=()=>{$('#wishText').textContent=wishes[wishIndex++%wishes.length];flowerShower(false)};
window.addEventListener('scroll',()=>{const h=document.documentElement;$('.progress').style.width=(h.scrollHeight>h.clientHeight?100*h.scrollTop/(h.scrollHeight-h.clientHeight):0)+'%'},{passive:true});init().then(setupPages);

const pageNames=['Trang đầu','Lời mở đầu','Cuốn album','01 · Những ngày đầu','02 · Vòng tay nhỏ','03 · Tuổi thơ','04 · Cùng lớn lên','05 · Gần đây hơn','06 · Gia đình mình','Hai lá thư','Lời chúc'];
let bookPages=[],pageIndex=0;
function setupPages(){
 const album=$('#album'),intro=$('.section-heading');
 album.before(intro);intro.id='album-intro';
 document.querySelectorAll('.chapter').forEach(ch=>album.before(ch));
 album.remove();
 bookPages=[$('.cover'),$('#gift'),intro,...document.querySelectorAll('.chapter'),$('#letters'),$('#future')];
 bookPages.forEach(p=>{p.classList.add('book-page');p.setAttribute('tabindex','-1')});
 $('#openGift').onclick=()=>{goPage(1);flowerShower(true)};
 $('#pageNext').onclick=()=>goPage(pageIndex===bookPages.length-1?0:pageIndex+1);
 $('#pageBack').onclick=()=>goPage(pageIndex-1);
 const initialPage=pageFromHash(location.hash);
 history.replaceState({page:initialPage},'',location.pathname+location.search+location.hash);
 window.addEventListener('popstate',e=>goPage(e.state?.page??pageFromHash(location.hash),false));
 window.addEventListener('hashchange',()=>goPage(pageFromHash(location.hash),false));
 goPage(initialPage,false);
}
function goPage(index,push=true){
 if(index<0||index>=bookPages.length)return;
 pageIndex=index;bookPages.forEach((p,i)=>p.hidden=i!==index);
 $('#pageControls').hidden=index===0;
 $('#nextLabel').textContent=index===bookPages.length-1?'Về trang đầu':'Trang tiếp';
 $('#pageNext').setAttribute('aria-label',index===bookPages.length-1?'Về trang đầu':'Trang tiếp: '+(pageNames[index+1]||''));
 document.body.classList.toggle('cover-only',index===0);
 window.scrollTo({top:0,left:0,behavior:'instant'});
 bookPages[index].focus({preventScroll:true});
 if(push)history.pushState({page:index},'',location.pathname+location.search+'#trang-'+(index+1));
}
function flowerShower(falling){
 const sky=$('#flowerSky');sky.replaceChildren();
 const blooms=falling?['🌹']:['🌹','🌷','🌸','🌺','🌼','🌻','💐'];
 for(let i=0;i<(falling?48:110);i++){
  const flower=el('span','celebration-flower'+(falling?' falling':' rising'),blooms[i%blooms.length]);
  flower.style.setProperty('--x',(Math.random()*100)+'vw');
  flower.style.setProperty('--drift',(Math.random()*160-80)+'px');
  flower.style.setProperty('--spin',(Math.random()*100-50)+'deg');
  flower.style.setProperty('--delay',(Math.random()*2.2)+'s');
  flower.style.setProperty('--duration',(4+Math.random()*2)+'s');
  flower.style.fontSize=(24+Math.random()*32)+'px';
  if(motionOff){flower.classList.add('still');flower.style.top=(Math.random()*88)+'vh'}
  sky.append(flower);
 }
 setTimeout(()=>sky.replaceChildren(),8500);
}

function pageFromHash(hash){
 const match=/^#trang-(\d+)$/.exec(hash);
 const index=match?Number(match[1])-1:0;
 return Number.isSafeInteger(index)&&index>=0&&index<bookPages.length?index:0;
}
