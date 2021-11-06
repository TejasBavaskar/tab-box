const activeTabsDiv = document.querySelector('.active-tabs');
const savedTabsDiv = document.querySelector('.saved-tabs');
const addButton = document.getElementById('add-btn');
const removeButton = document.getElementById('remove-btn');

let openTabList = [];

chrome.storage.sync.get("color", ({ color }) => {
  initiate();
});

async function initiate() {
  await chrome.tabs.query({}, function(allTabs) {
      openTabList = Array.from(allTabs);

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

    savedTabsDiv.innerHTML += `<div class="checkbox parent-checkbox">
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
      localStorage.setItem(openTabList[i].title, openTabList[i].url);

      savedTabsDiv.innerHTML += `<div class="checkbox parent-checkbox">
                                    <input type="checkbox" value="">
                                    <span>
                                      <a href="${openTabList[i].url}" target="_blank">
                                        ${openTabList[i].title}
                                      </a>
                                    </span>
                                  </div>
                                `;
      saveCount++;
      checkbox.checked = false;
    }
  }

  if(saveCount > 0) {
    alert('Saved Successfully!!!');
  }
})

removeButton.addEventListener('click', () => {
  const parentCheckboxList = document.querySelectorAll('.parent-checkbox');
  const total = parentCheckboxList.length;

  if(total === 0) {
    alert('No items to remove.');
  } else {
    let checkedCount = 0;

    for(let i=0; i<total; i++) {
      if(parentCheckboxList[i].children[0].checked) {
        checkedCount++;
        const title = parentCheckboxList[i].children[1].innerText;
        localStorage.removeItem(title);
        parentCheckboxList[i].remove();
      }
    }

    if(checkedCount === 0) {
      alert('Please select at least 1 item.');
    } else {
      alert('Removed successfully!!!');
    }
  }
})