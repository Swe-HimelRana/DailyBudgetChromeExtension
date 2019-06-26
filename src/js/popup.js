$(function () {
    function basicNotification(title, message){
        return {
            type: "basic",
            title: title,
            message: message,
            iconUrl: "../../icons/icon48.png"

        }
    }
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        // Very first time variable is undefined
        if (typeof budget.total === "undefined"){
            chrome.storage.sync.set({'total': 0})
            budget.total == 0;
            $("#totalspand").text(budget.total + '$')
        }
        // very first time no limit
        if (typeof budget.limit === "undefined"){
            chrome.storage.sync.set({'limit': 0})
            budget.limit == 0;
            $("#spandlimit").text(budget.limit + '$')
        }
        
        $("#totalspand").text(budget.total + '$')
        $("#limitnow").text(budget.limit + '$')
        $("#totalnow").text(budget.total + '$')
        $("#spandlimit").text(budget.limit + '$')
    })
    $("#addspanding").click(function () {
        chrome.storage.sync.get(['total','limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += budget.total
            }
            newTotal += parseInt($("#addmoney").val())
            chrome.storage.sync.set({ 'total': newTotal })
            chrome.notifications.create(basicNotification('Money add', 'Your new cost '+ $("#addmoney").val() + '$ added successfully! '))
            
            $("#addmoney").text('')
            $("#totalspand").text(newTotal + '$')
            if (newTotal >= budget.limit){
                $("#totalnow").text('0$')
                chrome.notifications.create(basicNotification('Limit Reached', 'Your cost is '+ newTotal + '$ over daily limt '+ budget.limit + '$'))
            }
        })
    })
    $("#resetlimit").click(function () {
        chrome.storage.sync.set({ 'limit': 0 })
        $("#limitnow").text('0$')
        chrome.notifications.create(basicNotification('Limit Reset', 'Your daily budget limit has been reset!'))
    })
    $("#resettotal").click(function () {
        chrome.storage.sync.set({ 'total': 0 })
        $("#totalnow").text('0$')
        chrome.notifications.create(basicNotification('Limit Total', 'Todays Cost has been Reset'))
    })
    $("#savelimit").click(function(){
        chrome.storage.sync.set({'limit': parseInt($("#maxspand").val())})
        $("#limitnow").text($("#maxspand").val() + '$')
        $("#maxspand").text('')
        chrome.notifications.create(basicNotification('Limit', 'Your new total limit set successfully!'))
    })

})