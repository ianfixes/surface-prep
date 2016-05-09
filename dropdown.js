
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function handleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function makeDropdown(inElement, choices, selectedChoice) {

  var makeChoice = function (label, href) {
    var a = document.createElement("a")
    a.href = href;
    a.innerHTML = label;
    return a;
  }

  // create content
  var dropDnContent = document.createElement("div");
  dropDnContent.className = "dropdown-content";
  dropDnContent.id = "myDropdown";

  for (var c in choices) {
    dropDnContent.appendChild(makeChoice(c, "?" + c));
  }

  // button
  var btn = document.createElement("button");
  btn.className = "dropbtn";
  btn.innerHTML = selectedChoice;
  btn.onclick = handleDropdown;

  // container
  var dropDn = document.createElement("div")
  dropDn.className = "dropdown";
  dropDn.appendChild(document.createTextNode("Preparing the surface of "));
  dropDn.appendChild(btn);
  dropDn.appendChild(dropDnContent);

  inElement.appendChild(dropDn);

  /*

<div class="dropdown">
  Preparing the surface of <button onclick="handleDropdown()" class="dropbtn"><script type="text/javascript">document.write(material);</script></button>
  <div id="myDropdown" class="dropdown-content">
    <a href="?">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>

  */
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
