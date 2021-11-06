const activeTabsDiv = document.querySelector('.active-tabs');
const savedTabsDiv = document.querySelector('.saved-tabs');
const addButton = document.getElementById('add-btn');

chrome.storage.sync.get("color", ({ color }) => {
  console.log('Inside chrome function')
  initiate();
});

let openTabList = [];

async function initiate() {
  await chrome.tabs.query({}, function(allTabs) {
      openTabList = Array.from(allTabs);
      console.log('openTabList: ', openTabList);

      openTabList.forEach((tab, index) => {
        activeTabsDiv.innerHTML += `<div class="checkbox">
                                      <input type="checkbox" value="" id="checkbox-${index}">
                                      <span>
                                        <a href="${tab.url}" target="_blank">
                                          ${tab.title}
                                        </a>
                                      </span>
                                    </div>
                                    `;
      })
    }
  )
}

window.onload = function() {
  for(let i=0; i<localStorage.length; i++) {
    const tabTitle = localStorage.key(i);
    const url = localStorage[tabTitle];

    savedTabsDiv.innerHTML += `<div class="checkbox">
                                    <input type="checkbox" value="">
                                    <span>
                                      <a href="${url}" target="_blank">
                                        ${tabTitle}
                                      </a>
                                    </span>
                                  </div>
                                `;

  }
}

addButton.addEventListener('click', () => {
  let saveCount = 0;
  for(let i=0; i<openTabList.length; i++) {
    const checkbox = document.getElementById(`checkbox-${i}`);
    if(checkbox.checked) {
      console.log(`${i} checked`);

      localStorage.setItem(openTabList[i].title, openTabList[i].url);

      savedTabsDiv.innerHTML += `<div class="checkbox">
                                    <input type="checkbox" value="">
                                    <span>
                                      <a href="${openTabList[i].url}" target="_blank">
                                        ${openTabList[i].title}
                                      </a>
                                    </span>
                                  </div>
                                `;
      saveCount++;
    }
  }

  if(saveCount > 0) {
    alert('Saved Successfully!!!');
  }
})