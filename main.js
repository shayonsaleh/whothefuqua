let dataDiv = document.getElementById('data')
let photoImg = document.getElementById('photo')
let scoreP = document.getElementById('score')
let consoleText = document.getElementById('console')
let selectSectionElem = document.getElementById('sections')
let namefield = document.getElementById('fname')
let fullNameBoxElem = document.getElementById('fullNameBox')
let fnameLabelElem = document.getElementById('fnameLabel')

let dataStore = []
let members = []
let currMember = []
let random = -1
let fullNameMode = false

score = 0

urls = [
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621972604806%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973478269%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973617765%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973936894%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974251030%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974382945%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974562831%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1654007623656%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659471228132%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659473120001%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659531766226%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659531911058%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659532016476%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1659532115082%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS'
]
let currURL = urls[0]

function clearPage(){
    document.getElementById('fname').value = ''
    dataDiv.innerHTML = ''
    consoleText.innerText = 'Console: New Game!'
}

function clearScore(){
    score = 0
    scoreP.innerText = `Score: ${score}`
}

function reset(){
    clearPage()
    clearScore()
    namefield.disabled = false
    dataDiv.hidden = true

    fetch(currURL)
    .then(res => res.json())
    .then(data => {
        dataStore = data
        members = data.theMembers
        // members = data.theMembers.slice(1,2)
        nextPerson(members)
    })
}

document.addEventListener("DOMContentLoaded", function(){
    reset()
})

function isNameMatching(member, input){
    if (!fullNameMode){
        return input == currMember.givenname || input == currMember.nickname
    } 
    return input == currMember.cn
}

function nextPerson(members) {
    if (members.length == 0){
        consoleText.innerHTML = 'Console: Game Over'
        namefield.disabled = true
        photoImg.src = ''
    } else {
        random = Math.floor(Math.random() * members.length)
        currMember = members[random]
        console.log(currMember)

        // skip people with no photo
        while (!currMember.largejpegphoto){
            members.splice(random, 1)
            random = Math.floor(Math.random() * members.length)   
            currMember = members[random]
        }

        // dataDiv.innerHTML += `<p> ${random} </p>`
        dataDiv.innerHTML += `<p> ${currMember.cn} </p>`
        dataDiv.innerHTML += `<p> ${currMember.givenname} </p>`
        // dataDiv.innerHTML += `<p> ${currMember.gradyear} </p>`
        if(currMember.largejpegphoto){
            // dataDiv.innerHTML += `<p> ${"http://" + currMember.largejpegphoto.substring(2)} </p>`
            photoImg.src = "http://" + currMember.largejpegphoto.substring(2)
        }
        // dataDiv.innerHTML += `<p> ${currMember.middlename} </p>`
        dataDiv.innerHTML += `<p> ${currMember.nickname} </p>`
        // dataDiv.innerHTML += `<p> ${currMember.sn} </p>`
    }
}

document.getElementById('fname').addEventListener("keyup", function(evt){
    if(isNameMatching(currMember, this.value)){
        consoleText.innerHTML = 'Console: Good job!'
        //increase score
        if(fullNameMode) {
            score += 2
        } else {
            score += 1
        }
        scoreP.innerHTML = `Score: ${score}`
        
        //clear page
        this.value = ''
        dataDiv.innerHTML = ''

        //delete correct person
        console.log(members)
        members.splice(random, 1)
        console.log(members.length)

        //pick next person
        nextPerson(members)
        // dataDiv.innerHTML += `<p> ${currMember.middlename} </p>`
        // dataDiv.innerHTML += `<p> ${currMember.nickname} </p>`
        // dataDiv.innerHTML += `<p> ${currMember.sn} </p>`
    }
    if(this.value == 'debug'){
        dataDiv.hidden = false
    }
})

document.getElementById('fname').addEventListener("keypress", function(evt){
    if (evt.key === 'Enter'){
        evt.preventDefault()
        let nameStr = fullNameMode ? currMember.cn : (currMember.givenname || currMember.nickname)
        consoleText.innerHTML = 'Console: oops, that was ' + nameStr
        if (!fullNameMode && currMember.nickname && currMember.nickname != currMember.givenname) {
            consoleText.innerHTML += ' (Also goes by ' + currMember.nickname + ')'
        }
        //clear page
        this.value = ''
        dataDiv.innerHTML = ''

        //delete correct person
        members.splice(random, 1)

        //pick next person
        nextPerson(members)
    }
})

selectSectionElem.addEventListener('change', (evt) => {
    console.log(evt)
    currURL = urls[evt.target.selectedIndex]
    reset()
})

fullNameBoxElem.addEventListener('change', (evt) => {
    fullNameMode = fullNameBoxElem.checked
    fnameLabelElem.innerHTML = fullNameMode ? 
        'Full Name (Press <kbd>Enter</kbd> to Skip):' : 
        'First Name (Press <kbd>Enter</kbd> to Skip):'
    reset()
})