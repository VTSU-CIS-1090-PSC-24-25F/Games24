import{b as r,s as n,t as Y}from"./index-CaIg6CAk.js";import{W as f}from"./screen-jNpdIWPy.js";let E="Violent Night",b={"background-color":"#add8e6","background-size":"cover","border-bottom":"70px solid white"};const a=80,y=500,g=900,s=-2500;function m(l,t){let x=l.x-t.x,X=l.y-t.y;return Math.sqrt(x*x+X*X)}let e=n();e.image="🧍‍♂️";e.x=100;e.y=a;e.vY=0;e.vX=0;let i=n();i.image="🎅";i.x=400;i.y=250;i.vY=0;i.vX=400;let v=n();v.image="🦌";v.x=750;v.y=350;v.vY=0;v.vX=300;let o=!0;function c(){e.image="🎁",Y.title="GAME OVER",Y.color="red",o=!1}function h(l,t){r.right&&o?e.vX=y:r.left&&o?e.vX=-y:e.vX=0,r.up&&e.y==a&&o&&(e.vY=g),e.y+=e.vY*t,e.x+=e.vX*t,e.y>a?e.vY=e.vY+s*t:(e.vY=0,e.y=a),e.x<0&&(e.x=0),e.x>f&&(e.x=f),e.vX==0?e.image="🧍‍♂️":Math.round(l*10)%2==0?e.image="🚶‍♂️":e.image="🏃‍♂️",e.flipH=e.vX>0,i&&(i.y+=i.vY*t,i.x+=i.vX*t,i.vY=i.vY+s*t,i.rotation+=Math.sign(i.vX)*200*t,i.y<=a&&(i.vY=i.vY*-.9,i.y=a),i.x>f?(i.vX=i.vX*-1,i.x=f):i.x<0&&(i.vX=i.vX*-1,i.x=0),m(i,e)<40&&c(),v&&(v.y+=v.vY*t,v.x+=v.vX*t,v.vY=v.vY+s*t,v.y<=a&&(v.vY=v.vY*-.9,v.y=a),v.x>f?(v.vX=i.vX*-1,v.x=f):v.x<0&&(v.vX=v.vX*-1,v.x=0),v.flipH=v.vX>0,m(v,e)<40&&c()),o==!1&&(e.image="🎁"))}export{b as background,h as frame,E as name};