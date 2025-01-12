// ==UserScript==
// @name        Humble Downloader w/ ignore list - for downloads at GameDevMarket
// @namespace   Violentmonkey Scripts
// @match       https://www.gamedevmarket.net/user/external/purchases
// @grant       none
// @version     1.0
// @author      rupel
// @description 12/18/2024, 10:13:30 PM
// ==/UserScript==

console.log("HELLO GAMEDEVMONKEY!");


const _assetContainers = document.querySelectorAll('.flex.flex-col.md\\:flex-row.w-full.border-1.border-gray-300.my-2.px-4.py-2');
const _ignore = `
  `;
let _links = []


async function download() {
    console.log("Starting to download ...");
    ignored_files = _ignore.trim().split('\n').map(file => file.trim()); // Trim whole file and each filename

      for(const container of _assetContainers) {
        console.log('Container: ', container)
        button = container.querySelector('input[name="submit"][value="Download"]');
        filename = container.querySelector('a.dark\\:hover\\:text-primary-teal').href.split('/').pop();

        const form = container.querySelector('form[action="/user/products/download"]');
        const formData = new FormData(form);
        // await getFormUrl(container);
        if(!ignored_files.includes(filename)) {
          button.click();
          await new Promise(resolve => setTimeout(resolve, 5000)); // Delay between downloads
      } else {
        console.log("Ignore ", filename);
      }
    }

    downloadTxt();
}

const observer = new MutationObserver(() => {
    if(_assetContainers.length > 0) {
        console.log("Found downloads", _assetContainers);
        observer.disconnect();
        download();
    } else {
      console.log('No downloads found yet.');
    }
});

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });


