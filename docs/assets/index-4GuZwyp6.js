const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./abbie-Cf-1xV7f.js","./screen-jNpdIWPy.js","./aiden-D1Tv6zNz.js","./alex-hxx7CAaZ.js","./anabelle-PIS-PFqd.js","./bug-CWMdwbED.js","./centipede-CdQtjJzB.js","./cj-lL5TrNpw.js","./ethan-DxUSH6-g.js","./joe-BFP0Eynt.js","./justin-DplpAJeB.js","./liam-CR9ajRKF.js","./nate-TV1aAyox.js","./nick-DYx0mBvO.js","./nikolai-DNkbrt5o.js","./puck-DFvxJa6M.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}})();const T="modulepreload",D=function(e,t){return new URL(e,t).href},y={},n=function(t,c,a){let r=Promise.resolve();if(c&&c.length>0){const i=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));r=Promise.allSettled(c.map(l=>{if(l=D(l,a),l in y)return;y[l]=!0;const d=l.endsWith(".css"),P=d?'[rel="stylesheet"]':"";if(!!a)for(let f=i.length-1;f>=0;f--){const _=i[f];if(_.href===l&&(!d||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${P}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":T,d||(u.as="script"),u.crossOrigin="",u.href=l,p&&u.setAttribute("nonce",p),document.head.appendChild(u),d)return new Promise((f,_)=>{u.addEventListener("load",f),u.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return r.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return t().catch(o)})},A=(e,t,c)=>{const a=e[t];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((r,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==c?". Note that variables only represent file names one level deep.":""))))})};let m={up:!1,down:!1,left:!1,right:!1,space:!1,enter:!1};document.onkeyup=document.onkeydown=function(e){let t=e.type=="keydown";switch(e.key){case"ArrowUp":e.preventDefault(),m.up=t;break;case"ArrowDown":e.preventDefault(),m.down=t;break;case"ArrowLeft":e.preventDefault(),m.left=t;break;case"ArrowRight":e.preventDefault(),m.right=t;break;case" ":e.preventDefault(),m.space=t;break;case"Enter":e.preventDefault(),m.enter=t;break}};let E=[],L=document.querySelector("#screen");function k(){let e={image:"",x:0,y:0,flipH:!1,flipV:!1,xScale:1,yScale:1,rotation:0},t=document.createElement("div");return t.className="sprite",e._div=t,L.appendChild(t),E.push(e),e}function I(e){E=E.filter(t=>t!=e),L.removeChild(e._div)}function O(){for(let e of E){let t=e._div;t.innerText=e.image,t.style.color=e.color,t.style.left=e.x-t.clientWidth/2+"px",t.style.bottom=e.y-t.clientHeight/2+"px",t.style.transform=`rotate(${e.rotation}deg) scale(${e.xScale*(e.flipH?-1:1)},${e.yScale*(e.flipV?-1:1)})`}}let h=document.querySelector("#screen > h1"),v=document.querySelector("#screen > h2"),g={title:"",score:"",color:"black"};function R(){h.innerHTML=g.title,v.innerHTML=g.score,h.style.color=g.color,v.style.color=g.color}window.addEventListener("hashchange",e=>{var t;(t=window.location.hash)!=null&&t.substring(1)&&window.location.reload()});var b;const w=(b=window.location.hash)==null?void 0:b.substring(1);w&&A(Object.assign({"./games/abbie.js":()=>n(()=>import("./abbie-Cf-1xV7f.js"),__vite__mapDeps([0,1]),import.meta.url),"./games/adam.js":()=>n(()=>import("./adam-DOkEUmLH.js"),[],import.meta.url),"./games/aiden.js":()=>n(()=>import("./aiden-D1Tv6zNz.js"),__vite__mapDeps([2,1]),import.meta.url),"./games/alex.js":()=>n(()=>import("./alex-hxx7CAaZ.js"),__vite__mapDeps([3,1]),import.meta.url),"./games/anabelle.js":()=>n(()=>import("./anabelle-PIS-PFqd.js"),__vite__mapDeps([4,1]),import.meta.url),"./games/bug.js":()=>n(()=>import("./bug-CWMdwbED.js"),__vite__mapDeps([5,1]),import.meta.url),"./games/centipede.js":()=>n(()=>import("./centipede-CdQtjJzB.js"),__vite__mapDeps([6,1]),import.meta.url),"./games/cj.js":()=>n(()=>import("./cj-lL5TrNpw.js"),__vite__mapDeps([7,1]),import.meta.url),"./games/ethan.js":()=>n(()=>import("./ethan-DxUSH6-g.js"),__vite__mapDeps([8,1]),import.meta.url),"./games/joe.js":()=>n(()=>import("./joe-BFP0Eynt.js"),__vite__mapDeps([9,1]),import.meta.url),"./games/justin.js":()=>n(()=>import("./justin-DplpAJeB.js"),__vite__mapDeps([10,1]),import.meta.url),"./games/liam.js":()=>n(()=>import("./liam-CR9ajRKF.js"),__vite__mapDeps([11,1]),import.meta.url),"./games/nate.js":()=>n(()=>import("./nate-TV1aAyox.js"),__vite__mapDeps([12,1]),import.meta.url),"./games/nick.js":()=>n(()=>import("./nick-DYx0mBvO.js"),__vite__mapDeps([13,1]),import.meta.url),"./games/nikolai.js":()=>n(()=>import("./nikolai-DNkbrt5o.js"),__vite__mapDeps([14,1]),import.meta.url),"./games/puck.js":()=>n(()=>import("./puck-DFvxJa6M.js"),__vite__mapDeps([15,1]),import.meta.url)}),`./games/${w}.js`,3).then(e=>{const t=document.querySelector("#background"),c=document.querySelector("#name");c.innerHTML=e.name;const a=new Date().getTime();let r=a;requestAnimationFrame(o);function o(){const i=new Date().getTime(),s=(i-r)/1e3,p=(i-a)/1e3;r=i,e.frame(p,s),O();for(const l in e.background)t.style[l]=e.background[l];R(),requestAnimationFrame(o)}});export{m as b,I as d,k as s,g as t};
