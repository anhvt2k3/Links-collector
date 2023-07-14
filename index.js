const save_btn = document.getElementById('submit-btn')
const input_zone = document.getElementById('input-zone')
const save_tab = document.getElementById('saveTab-btn')
const list = document.getElementById('lead-list')
const reset_btn = document.getElementById('reset')
let myLead

printList()

save_tab.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0]
        const url = currentTab.url
        console.log("Current tab URL: " + url)
        collector(url)
      });
})

save_btn.addEventListener('click', function () {
    collector(input_zone.value)
})

reset_btn.addEventListener('click', function () {
    resetList()
})

function collector(link) {
    getList()
    if (link) myLead.push(link)
    storeList()
    printList()
    input_zone.value = ''
}
function getList()
{
    myLead = localStorage.getItem('myLead')
    myLead = JSON.parse(myLead)
    console.log(myLead)
    if (!myLead) myLead = []
}
function storeList()
{
    myLead = JSON.stringify(myLead)
    localStorage.setItem('myLead',myLead)
}
function printList()
{
    console.log(list)
    getList()
    let items = ''
    for (let i=0; i<myLead.length; i++)
        items += `
            <li class="lead-el"> 
            <a href="${myLead[i]}">${myLead[i]}
            </li>
        `
    list.innerHTML = items
    // console.log(list.textContent)
}
function resetList()
{
    getList()
    myLead = []
    storeList()
    printList()
}