import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

function start() {
    turn(60);
  }
  
  function slow() {
    turn(300);
  }
  
  async function turn(duration) {
    await turnFlap('1', duration);
    await turnFlap('12', duration);
    await turnFlap('123', duration);
    await turnFlap('1234', duration);
    await turnFlap('12345', duration);
    await turnFlap('123456', duration);
    await turnFlap('1234567', duration);
    await turnFlap('12345678', duration);
    await turnFlap('123456789', duration);
    await turnFlap('1234567890', duration);
  }
  
  async function turnFlap(nextMsg, duration) {
  
    // 全体、上半分、下半分のフラップを取得
    const  flap = document.querySelector('#flap');
    const  flapT = document.querySelector('.flap.top');
    const  flapB = document.querySelector('.flap.bottom');
    
    // 前半z-indexなど調整
    flapT.innerHTML = nextMsg;
    flap.style.zIndex = 11;
    flapB.style.zIndex = 12;
    flapT.style.zIndex = 10;
    flapT.style.display = 'block';
    flapB.style.display = 'block';
    // 前半90度回転
    let animation = flap.animate([
      { transform: 'rotateX(-90deg)' }
    ],
    {
      duration: duration
    });
    await animation.finished;
    
    // 後半z-indexなど調整
    flap.style.transform = 'rotateX(90deg)';
    flap.innerHTML = nextMsg;
    flap.style.zIndex = 11;
    flapB.style.zIndex = 10;
    flapT.style.zIndex = 12;
    // 後半90度回転
    animation = flap.animate([
      { transform: 'rotateX(0deg)' }
    ],
    {
      duration: duration,
      fill: 'forwards'
    });
    await animation.finished;
    animation.commitStyles();
    animation.cancel();
    
    // 次の回転のために下半分を書き換えておく
    flapB.innerHTML = flap.innerHTML;
    
    // 上半分、下半分は非表示
    flapB.style.display = 'none';
    flapT.style.display = 'none';
  }