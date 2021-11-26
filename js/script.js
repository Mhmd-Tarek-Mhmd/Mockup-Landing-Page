const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let countStarted = false;

window.onscroll = () => {
  /**
   * Skills section Logic
   */
  if (window.scrollY >= $("#skills").offsetTop) {
    $$("#skills .progress-bar span").forEach(
      (ele) => (ele.style.width = ele.dataset.percentage)
    );
  }

  /**
   * Stats section Logic
   */
  if (window.scrollY >= $("#stats").offsetTop) {
    $$("#stats .card h3").forEach((ele) => {
      const num = ele.dataset.num;
      if (!countStarted) {
        const numCounter = setInterval(() => {
          ele.textContent++;
          ele.textContent == num && clearInterval(numCounter);
        }, 1000 / num);
      }
    });

    countStarted = true;
  }
};

/**
 * Nav area Logic
 */
const node = $('nav a[aria-expanded="false"]');
const menu = $("nav .other-links");

menu.addEventListener("focus", showMenu);
$("nav .mega-menu a[href='#discount']").addEventListener("blur", hideMenu);
$("nav .mega-menu").addEventListener(
  "keydown",
  (e) => e.keyCode == 27 && hideMenu()
);

function showMenu() {
  $("nav .mega-menu").classList.add("focus-show");
  $$("nav .mega-menu a").forEach((ele) => (ele.tabIndex = 0));
  node.ariaExpanded = true;
}
function hideMenu() {
  $("nav .mega-menu").classList.remove("focus-show");
  $$("nav .mega-menu a").forEach((ele) => (ele.tabIndex = -1));
  node.ariaExpanded = false;
}

/**
 * Event section Logic
 */
(function () {
  const eventDate = new Date("May 1, 2027 23:59:59").getTime();
  const updateUI = (eleClassName, prop) =>
    ($(eleClassName).textContent = prop < 10 ? `0${prop}` : prop);

  const millsecsInSec = 1000;
  const millsecsInMin = millsecsInSec * 60;
  const millsecsInHr = millsecsInMin * 60;
  const millsecsInDay = millsecsInHr * 24;

  const downCounter = setInterval(() => {
    const date = new Date().getTime();
    const remainingTime = eventDate - date;

    const days = Math.floor(remainingTime / millsecsInDay);
    const hours = Math.floor((remainingTime % millsecsInDay) / millsecsInHr);
    const minutes = Math.floor((remainingTime % millsecsInHr) / millsecsInMin);
    const seconds = Math.floor((remainingTime % millsecsInMin) / millsecsInSec);

    updateUI(".events .counter .days span:first-child", days);
    updateUI(".events .counter .hours span:first-child", hours);
    updateUI(".events .counter .minutes span:first-child", minutes);
    updateUI(".events .counter .seconds span:first-child", seconds);

    remainingTime < 0 && clearInterval(downCounter);
  }, 1000);
})();
