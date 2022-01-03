let dataDiv = document.getElementById('data')
let photoImg = document.getElementById('photo')
let scoreP = document.getElementById('score')
let consoleText = document.getElementById('console')
let selectSectionElem = document.getElementById('sections')
let namefield = document.getElementById('fname')

let dataStore = []
let members = []
let currMember = []
let random = -1

score = 0

urls = [
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621972604806%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973478269%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973617765%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621973936894%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974251030%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974382945%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS',
    'https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621974562831%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS'
]
let currURL = urls[0]

function clearPage(){
    document.getElementById('fname').value = ''
    dataDiv.innerHTML = ''
    consoleText.innerText = 'Console: '
}

function clearScore(){
    score = 0
    scoreP.innerText = `Score: ${score}`
}

function reset(){
    clearPage()
    clearScore()
    namefield.disabled = false
    
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

function nextPerson(members) {
    if (members.length == 0){
        consoleText.innerHTML = 'Console: Game Over'
        namefield.disabled = true
        photoImg.src = ''
    } else {
        // dataStore = data
        // members = dataStore.theMembers
        random = Math.floor(Math.random() * members.length)
        currMember = members[random]

        // skip people with no photo
        while (!currMember.largejpegphoto){
            members.splice(random, 1)
            random = Math.floor(Math.random() * members.length)   
            currMember = members[random]
        }
        // dataDiv.innerHTML += `<p> ${random} </p>`
        // dataDiv.innerHTML += `<p> ${currMember.cn} </p>`
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
    if(this.value == currMember.givenname || this.value == currMember.nickname){
        consoleText.innerHTML = 'Console: Good job!'
        //increase score
        score += 1
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
})

document.getElementById('fname').addEventListener("keypress", function(evt){
    if (evt.key === 'Enter'){
        evt.preventDefault()
        consoleText.innerHTML = 'Console: oops, that was ' + currMember.givenname
        if (currMember.nickname) {
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