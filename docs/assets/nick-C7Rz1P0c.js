import{t as f,b as l,s as n}from"./index-DY6icI3c.js";import{W as r}from"./screen-jNpdIWPy.js";let p="Soccer weave",Y=!0;const E={"background-color":"skyblue","background-image":"linear-gradient(#424299, skyblue)","border-bottom":"70px solid green"},a=80,X=500,m=900,s=-3e3;let e=n();e.image="🧍‍♂️";e.x=100;e.y=a;e.vY=0;e.vX=0;let v=n();v.image="⚽";v.x=600;v.y=200;v.vX=950;v.vY=.9;let i=n();i.image="⚽";i.x=500;i.y=350;i.vX=800;i.vY=40;let c=0;function S(t,o){Y&&(f.score="Score: "+c,l.right?e.vX=X:l.left?e.vX=-X:e.vX=0,l.up&&e.y==a&&(e.vY=m),l.down&&e.y==a&&(e.vY=CROUCH_SPEED),e.y+=e.vY*o,e.y+=e.vY*o,e.x+=e.vX*o,e.y>a?e.vY=e.vY+s*o:(e.vY=0,e.y=a),e.x<0&&(e.x=0),e.x>r&&(e.x=r),e.vX==0?e.image="🧍‍♂️":(e.y>a?e.image="🏃‍♂️":Math.round(t*10)%2==0?e.image="🚶":e.image="🏃‍♂️",e.flipH=e.vX>0),i&&(v.y+=v.vY*o,v.x+=v.vX*o,v.vY=v.vY+s*o,v.rotation+=Math.sign(v.vX)*250*o,v.x>r?(v.vX=v.vX*-1,v.x=r):v.x<0&&(c++,v.vX=v.vX*-1,v.x=0),v.y<=a&&(v.vY=v.vY*-.92,v.y=a)),i&&(i.y+=i.vY*o,i.x+=i.vX*o,i.vY=i.vY+s*o,i.rotation+=Math.sign(i.vX)*300*o,i.x>r?(i.vX=i.vX*-1,i.x=r):i.x<0&&(i.vX=i.vX*-1,i.x=0),i.y<=a&&(i.vY=i.vY*-.92,i.y=a)),(g(e,v)<30||g(e,i)<30)&&(f.title="Game Over!",Y=!1))}function g(t,o){let x=t.x-o.x,y=t.y-o.y;return Math.sqrt(x*x+y*y)}f.score="Score: 0";export{E as background,S as frame,p as name};