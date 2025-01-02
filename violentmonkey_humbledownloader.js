// ==UserScript==
// @name        Humble Downloader w/ ignore list
// @namespace   Violentmonkey Scripts
// @match       https://www.humblebundle.com/downloads*
// @grant       none
// @version     1.0
// @author      rupel
// @description 12/18/2024, 10:13:30 PM
// ==/UserScript==

console.log("HELLO VIOLENTMONKEY!");

var _buttons = [ ]
var _links = [ ]
const _ignore = `
  2point5dcharacterpieces_worldwar2.zip
  animationsselect_thunder.zip
  animationsselect_water.zip
  cursedkingdoms_bosspack.zip
  evfxblast.zip
  evfxsanctuary.zip
  evfxslash.zip
  `;


async function download() {
    console.log("Starting to download ...");

    while (_links.length > 0) {
      let link = _links.pop();
      const filename = link.href.split('/').pop().split('?')[0];
      ignored_files = _ignore.trim().split('\n').map(file => file.trim()); // Trim whole file and each filename

      if(!ignored_files.includes(filename)) {
        console.log("Attempt download ", filename, " ", link.href);
        window.open(link.href, "_blank");

        await new Promise(resolve => setTimeout(resolve, 30000)); // Delay between downloads
        let bigDlConfirmation = document.querySelector('.button-link.js-download')?.find(link => link.textContent.trim() === "Download anyway");

        if(bigDlConfirmation) {
          console.log("Extra confirmation found: ", bigDlConfirmation);
          bigDlConfirmation.click();
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for big download warning popup
        }
      } else {
        console.log("IGNORE ", filename);
      }
      console.log("Remaining: ", _links.map(link => link.href));
    }
}

const observer = new MutationObserver(() => {
    if(_buttons.length <= 0) {
      _buttons = document.querySelectorAll('.download a');
      _buttons.forEach(link => {
          if (link) {
              _links.push(link)
              // Highlight link
              link.style.backgroundColor = 'yellow';
          } else {
              console.log('No link found.');
          }
      });
    } else {
      console.log("Found download links", _links);
      observer.disconnect();
      download();
    }
});

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });

