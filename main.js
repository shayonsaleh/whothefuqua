let dataDiv = document.getElementById('data')
let photoImg = document.getElementById('photo')
let scoreP = document.getElementById('score')
let consoleText = document.getElementById('console')

let dataStore = []
let members = []
let currMember = []
let random = -1

score = 0

fetch('https://go.fuqua.duke.edu/angularws/rest/fuqua/directory/department/dn/gid%3D1621972604806%2Cou%3DFuquaGroups%2Co%3DFuqua%2Cc%3DUS')
.then(res => res.json())
.then(data => {
    dataStore = data
    members = data.theMembers
    nextPerson(data.theMembers)
})

function nextPerson(members) {
    // dataStore = data
    // members = dataStore.theMembers
    random = Math.floor(Math.random() * members.length)
    // console.log(members)    
    currMember = members[random]
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
    console.log(members[random])
}

document.getElementById('fname').addEventListener("keyup", function(evt){
    if(this.value == currMember.givenname || this.value == currMember.nickname){
        // console.log('good job!')
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
    console.log(this.value)
})

document.getElementById('fname').addEventListener("keypress", function(evt){
    if (evt.key === 'Enter'){
        evt.preventDefault()
        // console.log('oops, that was ' + currMember.givenname)
        consoleText.innerHTML = 'Console: oops, that was ' + currMember.givenname
        if (currMember.nickname) {
            consoleText.innerHTML += ' (Also goes by ' + currMember.nickname + ')'
        }
        //clear page
        this.value = ''
        dataDiv.innerHTML = ''

        //delete correct person
        // console.log(members)
        members.splice(random, 1)
        // // console.log(members.length)

        // //pick next person
        nextPerson(members)
    }
})