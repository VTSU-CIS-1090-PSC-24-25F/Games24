import{t as b,b as u,s as h,d as p}from"./index-DCSMr4ef.js";import{W as d}from"./screen-jNpdIWPy.js";let I="EPIC FISHING !!!!",S={"background-color":"lightblue","background-size":"cover","border-bottom":"350px solid #78a2f6"};const g=200;let i=h();i.image="🧎‍♀️";let l=h();l.image="🛶";l.x=d/2;i.x=l.x;l.y=370;i.y=372;const m=["🐟","🐠","🦀","🦈","🐡"];let f=[],r=5;c();let s=[],H=-2,a=0;function v(){let t=h();t.image="|",t.xScale=.3,t.x=l.x,t.y=320,s.push(t)}function c(){for(;f.length<r;){let t=h();t.image=m[Math.floor(Math.random()*m.length)],t.x=Math.random()*d+5,t.y=Math.random()*300+25,t.vX=50,f.push(t)}}function X(t,n){const e=t.x-n.x,o=t.y-n.y;return Math.sqrt(e*e+o*o)}function k(t,n){b.score="Number of Fish Caught: "+a;for(let e of f)e.x-=e.vX*n,e.x>775?(e.x=775,e.vX=e.vX*-1,e.flipH=!1):e.x<25&&(e.x=25,e.vX=e.vX*-1,e.flipH=!0);u.space||(u.right&&(l.x+=g*n,i.x=l.x,l.flipH=!0,i.flipH=!0),u.left&&(l.x-=g*n,i.x=l.x,l.flipH=!1,i.flipH=!1)),l.x>775||i.x>775?(l.x=775,i.x=l.x):(l.x<25||i.x<25)&&(l.x=25,i.x=l.x),u.space&&v(),f.length==0&&c();for(let e of s){e.y+=H;for(let o=f.length-1;o>=0;o--){let x=f[o];if(X(e,x)<30&&x!=null){f.splice(o,1),p(x),x=null,a++,c();break}f=f.filter(y=>y!=null)}}for(let e=0;e<s.length;e++)s[e].y<0&&(p(s[e]),s[e]=null);s=s.filter(e=>e!=null),a==5?r=7:a==10?r=10:a==20?r=15:a>30&&(r=20)}export{S as background,k as frame,I as name};
