const checkBoxContainer = document.querySelector('.checkbox-list-container');

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
        checkBoxContainer.innerHTML += `<div class="checkbox">
                                          <label>
                                            <input type="checkbox" value="">
                                            <span>${tab.title}</span>
                                          </label>
                                        </div>
                                      `;
      })
    }
  )
}
