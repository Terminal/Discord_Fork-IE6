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
  return 'http://api.discordapps.dev' + link
}

function replaceText(text) {
  return text.replace(/[^\x00-\x7F]/g, '?');
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
  var data = shuffle(JSON.parse(xhttp.responseText).data);
  for (i = 0; i < data.length; i++) {
    try {
      var bot = data[i];

      if (!bot.contents[0]) continue;

      var row = document.createElement('div');
      var avatar = document.createElement('img');
      var title = document.createElement('h2');
      var description = document.createElement('p');
      var invite = document.createElement('a');
      avatar.className = 'BOT-AVATAR';
      row.className = 'ROW';

      avatar.src = fixLink(bot.cachedImages.avatar);
      title.innerHTML = replaceText(bot.contents[0].name);
      description.innerHTML = replaceText(bot.contents[0].description);
      invite.className = 'BTN';
      invite.innerHTML = 'Invite this bot';
      invite.href = bot.invite;

      row.appendChild(avatar);

      if (bot.nsfw) {
        var nsfw = document.createElement('blink');
        nsfw.innerHTML = 'Warning! This bot is NSFW.';
        nsfw.className = 'NSFW-1';
        nsfwButtons.push(nsfw);
        row.appendChild(nsfw);
      }

      row.appendChild(title);
      row.appendChild(description);
      row.appendChild(invite);

      if (bot.github && bot.github.owner && bot.github.repo) {
        var svn = document.createElement('a');
        svn.className = 'BTN';
        svn.innerHTML = 'View on Microsoft GitHub Pro 1998';
        svn.href = 'http://github.com/' + bot.github.owner + '/' + bot.github.repo;
        row.appendChild(svn);
      }

      row.appendChild(document.createElement('hr'));
      list.appendChild(row);
    } catch(e) {
      continue;
    }
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
