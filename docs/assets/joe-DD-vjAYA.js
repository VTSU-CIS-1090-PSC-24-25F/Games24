import{t as s,b as n,s as m}from"./index-CaIg6CAk.js";import{W as x}from"./screen-jNpdIWPy.js";let T="Fruit Basket",b={"background-color":"teal","background-size":"cover"};var e=0;const f=300;let u,t=m();t.image="🧺";t.x=x/2;t.y=30;const c=["🥝","🍓","🍍","🥭","🍉"],a=m(),r=m();a.y=470;r.y=470;y();function h(o,i){const l=o.x-i.x,g=o.y-i.y;return Math.sqrt(l*l+g*g)}function y(){a.image=c[Math.floor(Math.random()*c.length)],a.x=Math.random()*x}function d(){r.image=c[Math.floor(Math.random()*c.length)],r.x=Math.random()*x}function k(o,i){if(o>60){s.title="Game over!";return}u=o,s.title="",s.score="Score: "+e+" Time: "+u,n.right&&(t.x+=f*i),n.right&&n.space&&(t.x+=f*i+1),n.left&&(t.x-=f*i),n.left&&n.space&&(t.x-=f*i-1),t.x<30&&(t.x=770),t.x>770&&(t.x=30),a.y=a.y-o*.15,r.y=r.y-o*.1,a.y<=15&&(y(),a.y=470,e=e-5),r.y<=15&&(d(),r.y=470,e=e-5),h(t,a)<30&&(y(),a.y=470,e=e+10),h(t,r)<30&&(d(),r.y=470,e=e+10)}export{b as background,k as frame,T as name};