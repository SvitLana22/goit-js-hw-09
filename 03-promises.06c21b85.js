const e={startBtn:document.querySelector("[data-start]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]"),dateTimePicker:document.querySelector("#datetime-picker")};let t=null;e.startBtn.setAttribute("disabled",!0);const n={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(n){t=n[0],t>Date.now()?(e.startBtn.removeAttribute("disabled"),t=n[0].getTime()):Notify.failure("Please choose a date in the future",{position:"center-center",clickToClose:!0})}};flatpickr(e.dateTimePicker,n);let o=null;e.startBtn.addEventListener("click",(function(){o=setInterval((()=>{!function(){const t=new Date,n=new Date(e.dateTimePicker.value)-t;if(n<0)return;{const{days:t,hours:o,minutes:a,seconds:r}=function(e){const t=1e3,n=60*t,o=60*n,a=24*o,r=Math.floor(e/a),s=Math.floor(e%a/o),c=Math.floor(e%a%o/n),d=Math.floor(e%a%o%n/t);return{days:r,hours:s,minutes:c,seconds:d}}(n);e.days.textContent=`${t}`,e.hours.textContent=`${o}`,e.minutes.textContent=`${a}`,e.seconds.textContent=`${r}`}}()}),1e3),e.dateTimePicker.disabled=!0,e.startBtn.disabled=!0}));
//# sourceMappingURL=03-promises.06c21b85.js.map