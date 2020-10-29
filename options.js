
window.addEventListener('load', async () => {
    chrome.storage.local.get({ pictureRemove: true }, function(data){
        document.getElementById('heroSentence').children[0].checked = data.pictureRemove
    })
})


document.getElementById('heroSentence').addEventListener('change', async function(e) {
    chrome.storage.local.set({ pictureRemove: e.target.checked }, function() {
    })
})