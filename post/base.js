import{initializeApp as e}from"https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";import{getAnalytics as t}from"https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";import{getDatabase as n,ref as i,push as a,onValue as s,remove as l}from"https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";import{getAuth as r}from"https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";let firebaseConfig={apiKey:"AIzaSyCVtqF1IvbVmWrTy3RjaAAlV4yUDJxjY90",authDomain:"comments-3c6ef.firebaseapp.com",databaseURL:"https://comments-3c6ef-default-rtdb.europe-west1.firebasedatabase.app",projectId:"comments-3c6ef",storageBucket:"comments-3c6ef.appspot.com",messagingSenderId:"737962777342",appId:"1:737962777342:web:99a2908257a5ff3e86a3af",measurementId:"G-KXW6PLYEZY"},app=e(firebaseConfig),analytics=t(app),database=n(),auth=r();function login(){let e=document.getElementById("username-input").value,t=document.getElementById("password-input").value;if("pirate"===e&&"123"===t){localStorage.setItem("loggedIn","true"),localStorage.setItem("username",e);let t=document.getElementById("login-form");t.parentNode.removeChild(t),createCommentForm(e)}else alert("Неверное имя пользователя или пароль!")}function checkLoginStatus(){let e=localStorage.getItem("loggedIn"),t=localStorage.getItem("username");if("true"===e&&t){let e=document.getElementById("login-form");e.parentNode.removeChild(e),createCommentForm(t)}}function clearLocalStorage(){localStorage.clear(),location.reload()}class ClearButton{constructor(){this.button=document.createElement("button"),this.button.innerHTML='<span class="mdi mdi-logout"></span>',this.button.classList.add("clear-button"),this.button.addEventListener("click",clearLocalStorage)}addToBody(){document.body.insertBefore(this.button,document.body.firstChild)}}function createCommentForm(e){let t=document.createElement("div");t.classList.add("post-it"),t.innerHTML='\n    <div class="controls">\n      <button class="show-add-img"><span class="mdi mdi-image"></span></button>\n       <button id="align-right-btn""><span class="mdi mdi-format-align-right"></span>\n</button>\n        <button id="align-center-btn""><span class="mdi mdi-format-align-center"></span>\n</button>\n      <div class="add-img">\n        <input type="text" id="image-url-input" placeholder="Ссылка на изображение">\n        <input type="number" id="image-width-input" placeholder="Ширина (в px)">\n        <input type="number" id="image-height-input" placeholder="Высота (в px)">\n        <button id="preview-comment-btn" class="add-comment-btn">Готово</button>\n      </div>\n    </div>\n    <div class="post-section"> \n      <textarea rows="2" name="text" id="comment-input" placeholder="Напиши что-нибудь" style="width: 100%; overflow-wrap: break-word;"></textarea>\n      <button id="add-comment-btn" class="add-comment-btn"><span class="mdi mdi-send-variant"></span></button>\n    </div>\n  ';let n=document.querySelector(".main");n?n.appendChild(t):document.body.appendChild(t),document.getElementById("align-right-btn").addEventListener("click",alignTextRight),document.getElementById("align-center-btn").addEventListener("click",alignTextCenter),document.getElementById("preview-comment-btn").addEventListener("click",previewImageComment),document.getElementById("add-comment-btn").addEventListener("click",addComment.bind(null,e));let a=t.querySelector(".show-add-img"),i=t.querySelector(".show-add-img");a.addEventListener("click",(function(){i.classList.toggle("active")}))}function alignTextRight(){let e=document.getElementById("comment-input"),t=`[right]${e.value.substring(e.selectionStart,e.selectionEnd)}[/right]`,n=e.value.substring(0,e.selectionStart),a=e.value.substring(e.selectionEnd);e.value=n+t+a}function alignTextCenter(){let e=document.getElementById("comment-input"),t=`[center]${e.value.substring(e.selectionStart,e.selectionEnd)}[/center]`,n=e.value.substring(0,e.selectionStart),a=e.value.substring(e.selectionEnd);e.value=n+t+a}function addComment(e){let t=document.getElementById("comment-input").value;if(0===t.trim().length)return void alert("Комментарий не может быть пустым.");let n=/\[img=(.*?)\s+w=(\d+)\s+h=(\d+)\]/;if(t.match(n)){let s=t.replace(n,'<img src="$1" width="$2" height="$3" alt="Image">'),o=i(database,"comments");a(o,{username:e,comment:s})}else{let n=i(database,"comments");a(n,{username:e,comment:t})}document.getElementById("comment-input").value=""}function formatComment(e){return e.includes("[right]")&&e.includes("[/right]")?e.replace(/\[right\](.*?)\[\/right\]/g,'<div style="text-align: right;">$1</div>'):e}function deleteComment(e){if(confirm("Вы уверены, что хотите удалить этот комментарий?")){let t=i(database,`comments/${e}`);l(t)}}function displayDeleteButtons(){let e=document.getElementById("login-form"),t=document.querySelectorAll(".delete-button");if(!e&&0===t.length){document.getElementById("comments-container").querySelectorAll(".comment").forEach((e=>{let t=document.createElement("button");t.innerHTML='<span class="mdi mdi-close"></span>',t.classList.add("delete-button"),t.addEventListener("click",(()=>{deleteComment(e.getAttribute("data-comment-key"))}));let n=e.querySelector(".cmt");n?n.parentNode.insertBefore(t,n):e.prepend(t)}))}}function displayComments(){let e=i(database,"comments");s(e,(e=>{let t=document.getElementById("comments-container");t.innerHTML="",e.forEach((e=>{let n=e.val(),a=n.username,i=n.comment,s=e.key,o=document.createElement("div");if(i.includes("[right]")&&i.includes("[/right]")&&(i=i.replace(/\[right\](.*?)\[\/right\]/g,'<div style="text-align: right;">$1</div>')),i.includes("[center]")&&i.includes("[/center]")&&(i=i.replace(/\[center\](.*?)\[\/center\]/g,'<div style="text-align: center;">$1</div>')),i.includes("[img=")&&i.includes("]")&&(i=i.replace(/\[img=(.*?)\]/g,'<img src="$1" alt="Image">')),i.length>500){let e=i.substring(0,500),t=i.substring(500);o.innerHTML=`\n          <img src="/post/img/ava.webp" alt="Avatar" style="width: 40px;height: 40px;border-radius: 50%;margin-right: 5px;float: left;">\n          <span class="username" style="clear: right;display: block;">${a}</span>\n          <div class="cmt"><span>${e}<span class="remaining-text" style="display:none">${t}</span></span><span class="show-more-button"> <span class="dots">...</span><span class="sh">Показать еще</span></span></div>\n        `}else o.innerHTML=`\n          <img src="https://desu.shikimori.one/system/users/x160/1383110.png?1708959443" alt="Avatar" style="width: 40px;height: 40px;border-radius: 50%;margin-right: 5px;float: left;">\n          <span class="username" style="clear: right;display: block;">${a}</span>\n          <div class="cmt">${i}</div>\n        `;o.classList.add("comment"),o.setAttribute("data-comment-key",s),t.appendChild(o)})),document.querySelectorAll(".show-more-button").forEach((e=>{e.addEventListener("click",(function(){this.parentElement.querySelector(".remaining-text").style.display="inline",this.style.display="none"}))})),setInterval(displayDeleteButtons,1e3)}))}function previewImageComment(){let e=`[img=${document.getElementById("image-url-input").value} w=${document.getElementById("image-width-input").value} h=${document.getElementById("image-height-input").value}]`;document.getElementById("comment-input").value=e}window.onload=function(){if(!document.getElementById("login-form")){(new ClearButton).addToBody()}},document.addEventListener("DOMContentLoaded",(function(){checkLoginStatus(),document.getElementById("login-btn").addEventListener("click",login)})),displayComments(),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("login-btn").addEventListener("click",login)}));
