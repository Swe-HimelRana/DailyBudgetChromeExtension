contextMenuItem = {
    "id": 'budgetContextMenu',
    "title": 'Add Money',
    "contexts": ['selection']
}
// Checking is integer or not
function isInt(value){
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}
function basicNotification(title, message, amount){
    return {
        type: "basic",
        title: title,
        message: message + ' Amount:' + amount + '$',
        iconUrl: "../../icons/icon48.png"

    }
}
// Creating context menu
chrome.contextMenus.create(contextMenuItem);
// Context Menu functionality
chrome.contextMenus.onClicked.addListener(function(clickedData){
    if (clickedData.menuItemId == "budgetContextMenu" && clickedData.selectionText){
        if (isInt(clickedData.selectionText)){
            chrome.storage.sync.get('total', function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += budget.total
                }
                newTotal += parseInt(clickedData.selectionText)
                chrome.storage.sync.set({'total': newTotal})
                chrome.notifications.create(basicNotification('New Spending', 'New Spending Added!', clickedData.selectionText))
            })
        }
    }         
    
})


// Showing badge
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (typeof changes.total !== "undefined"){
        chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString() + " $"})
    }
})