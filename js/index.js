var list = document.getElementById('BOTS');
var nsfwButtons = [];

if (window.XMLHttpRequest) {
  var xhttp = new XMLHttpRequest();
} else {
  var xhttp = new ActiveXObject('Microsoft.XMLHTTP');
}

function escapeHTML(text) {
  return text.replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
}

function fixLink(link) {
  if (/cdn\.discordapp\.com/.test(link)) return link + "?size=128";
  return link.replace(/https:\/\//i, 'http://');
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

xhttp.onreadystatechange = function() {
  var data = shuffle(JSON.parse(xhttp.responseText));
  for (i = 0; i < data.length; i++) {
    var row = document.createElement('div');
    var avatar = document.createElement('img');
    var title = document.createElement('h2');
    var description = document.createElement('p');
    var invite = document.createElement('a');
    avatar.className = 'BOT-AVATAR';

    avatar.src = fixLink(data[i].avatar);
    title.innerHTML = data[i].name;
    description.innerHTML = data[i].long_description;
    invite.className = 'BTN';
    invite.innerHTML = 'Invite this bot';
    invite.href = data[i].link;

    row.appendChild(avatar);

    if (data[i].nsfw) {
      var nsfw = document.createElement('blink');
      nsfw.innerHTML = 'Warning! This bot is NSFW.';
      nsfw.className = 'NSFW-1';
      nsfwButtons.push(nsfw);
      row.appendChild(nsfw);
    }

    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(invite);

    if (data[i].github && data[i].github.owner && data[i].github.repo) {
      var svn = document.createElement('a');
      svn.className = 'BTN';
      svn.innerHTML = 'View on GitHub';
      svn.href = 'http://github.com/' + data[i].github.owner + '/' + data[i].github.repo;
      row.appendChild(svn);
    }

    row.appendChild(document.createElement('hr'));
    list.appendChild(row);
  }
}

setInterval(function() {
  for (i = 0; i < nsfwButtons.length; i++) {
    nsfwButtons[i].className = 'NSFW-1';
  }
  setTimeout(function() {
    for (i = 0; i < nsfwButtons.length; i++) {
      nsfwButtons[i].className = 'NSFW-2';
    }
  }, 500);
}, 1000);

xhttp.open('GET', 'bots.json');
xhttp.send();
