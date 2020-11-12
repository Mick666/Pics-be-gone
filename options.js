const defaultOptionObj = { pictureRemove: true, metadata: true }
let options

window.addEventListener('load', async () => {
    options = await getOptions()
    console.log(options)
    document.getElementById('heroSentence').children[0].checked = options.pictureRemove
    document.getElementById('metadata').children[0].checked = options.metadata
})


document.getElementById('heroSentence').addEventListener('change', async function(e) {
    options.pictureRemove = e.target.checked
    chrome.storage.local.set({ options: options })
})

document.getElementById('metadata').addEventListener('change', async function(e) {
    options.metadata = e.target.checked
    chrome.storage.local.set({ options: options })
})

function getOptions() {
    return new Promise(options => {
        chrome.storage.local.get({ options: defaultOptionObj }, function (data) {
            options(data.options)
        })
    })
}