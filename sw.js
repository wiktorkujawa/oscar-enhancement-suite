const confirmTabs = [];

const addConfirmTabs = (tab) => {
  console.log("Tab Created", tab);
  if (
    tab.pendingUrl?.includes("form/createcustomedpdf") ||
    tab.url?.includes("form/createcustomedpdf")
  ) {
    confirmTabs.push(tab);
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          return document.scripts[0].text;
        },
      },
      (cb) => {
        console.log("What is this cb?", cb);
      }
    );
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab update", tabId, changeInfo, tab);
  function getTitle() {
    console.log("Title?", document.title);
    return "Test";
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: getTitle,
    },
    (cb) => {
      console.log("CB From update", cb);
    }
  );
  if (
    tab.pendingUrl?.includes("form/createcustomedpdf") ||
    tab.url?.includes("form/createcustomedpdf")
  ) {
    chrome.tabs.update(tabId, { autoDiscardable: false });
    confirmTabs.push(tab);
  }
});

chrome.tabs.onCreated.addListener(addConfirmTabs);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(chrome);
  console.log(
    chrome.windows.getAll().then((results) => {
      console.log(results);
    })
  );

  chrome.tabs.query({}, function (tabs) {
    console.log(tabs);

    const confirmTab = tabs.find(
      (tab) =>
        tab.pendingUrl?.includes("form/createcustomedpdf") ||
        tab.url?.includes("form/createcustomedpdf")
    );
    const tabId = confirmTab?.id;
    console.log("Confirm Tab", confirmTab);

    function getTitle() {
      console.log("Title?", document.title);
      return document.title;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: getTitle,
      },
      (cb) => {
        console.log("What is this cb?", cb);
      }
    );
  });
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") sendResponse({ farewell: confirmTabs });
});
