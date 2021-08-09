
function selectRace(){
  let race = document.getElementById('race')
  localStorage.setItem("race", race.value)
  displayCharacterPool()
}
function selectColor(){
  let race = document.getElementById('color')
  localStorage.setItem("color", color.value)
  displayCharacterPool()
}
function selectGrade(){
  let grade = document.getElementById('grade')
  localStorage.setItem("grade", grade.value)
  displayCharacterPool()
}
function resetQuery(){
  localStorage.setItem("race", "All")
  localStorage.setItem("grade", "All")
  localStorage.setItem("color", "All")
}

function readJson(){
  resetQuery()
  let text = undefined;
  fetch("./characters.json")
  .then(response => {
     return response.json();
  })
  .then(data => {
    localStorage.setItem("characters", JSON.stringify(data))
  });
  displayCharacterPool()
}

function filterAttributes(characters, attribute, key){
  if (attribute == "All"){} // do nothing
  else{
    for (let character in characters){
      if (characters[character][key] != attribute){
        delete characters[character]
      }
    }
  }
  return characters
}
function getCharacterPool(){
  let race = localStorage.getItem("race")
  let grade = localStorage.getItem("grade")
  let color = localStorage.getItem("color")
  let characters = JSON.parse(localStorage.getItem("characters"))
  // get valid race
  let validCharacters = {}
  if (race == "All"){
    for (let race in characters) {
      for (let character in characters[race]) {
        validCharacters[character] = characters[race][character]
      }
    }
  } else {
    for (let character in characters[race]) {
      validCharacters[character] = characters[race][character]
    }
  }
  // get valid characters grade and color
  validCharacters = filterAttributes(validCharacters, grade, 'Rarity')
  localStorage.setItem('validCharacters', JSON.stringify(validCharacters))
  return filterAttributes(validCharacters, color, 'Color')
}

function displayCharacterPool(){
  let valid = getCharacterPool()
  let display = document.getElementById('characterDisplay')
  display.innerHTML = ""

  for (let key in valid){
    let card = document.createElement("div")
    card.className = "card charCard"

    let img = document.createElement("img")
    img.classList.add('image')
    img.src = valid[key]["Image"]
    img.width = 100
    img.height = 100

    let name = document.createElement("p")
    name.classList.add('nameTag')

    name.innerHTML = key

    card.appendChild(img)
    card.appendChild(name)
    display.appendChild(card)

    if("Combined Move" in valid[key]){ setComb(valid[key]["Combined Move"])}
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById('img01');
    var char_name = document.getElementById("char_name");
    // var unique = document.getElementById("char_unique");
    card.onclick = function(){
      modal.style.display = "block";
      modalImg.src = img.src;
      char_name.innerHTML = key;

      setUnique("unique_1", valid[key]["Unique"])
      "Unique 2" in valid[key] ? setUnique("unique_2", valid[key]["Unique 2"]) : document.getElementById("unique_2").style.display = "none";

      setSkill("skill_1", valid[key]["Skill 1"])
      setSkill("skill_2", valid[key]["Skill 2"])
      "Skill 3" in valid[key] ? setSkill("skill_3", valid[key]["Skill 3"]) : document.getElementById("skill_3").style.display = "none";
      "Skill 4" in valid[key] ? setSkill("skill_4", valid[key]["Skill 4"]) : document.getElementById("skill_4").style.display = "none";

      if("Ultimate" in valid[key]){setUlt("ult_1", valid[key]["Ultimate"])}
      "Ultimate 2" in valid[key] ? setUlt("ult_2", valid[key]["Ultimate 2"]) : document.getElementById("ult_2").style.display = "none"
      "Combined Move" in valid[key] ? setUlt("comb", valid[key]["Combined Move"]) : document.getElementById("comb").style.display = "none"

    }

    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    modal.onclick = function() {
      modal.style.display = "none";
    }
    display.appendChild(card)
  }

}

function setSkill(skill_num, skill){
  document.getElementById(skill_num).style.display = ''
  let name = document.getElementById(skill_num + "_name");
  let img = document.getElementById(skill_num + "_img");
  let bronze = document.getElementById(skill_num + "_bronze");
  let silver = document.getElementById(skill_num + "_silver");
  let gold = document.getElementById(skill_num + "_gold");
  let bronze_effect = document.getElementById(skill_num + "_bronze_effect");
  let silver_effect = document.getElementById(skill_num + "_silver_effect");
  let gold_effect = document.getElementById(skill_num + "_gold_effect");

  name.innerHTML = skill["Name"]
  img.src = skill['Image']
  bronze.innerHTML = skill['Bronze']
  silver.innerHTML = skill['Silver']
  gold.innerHTML = skill['Gold']

  set_effect_img(bronze_effect, skill['Bronze Type'])
  set_effect_img(silver_effect, skill['Silver Type'])
  set_effect_img(gold_effect, skill['Gold Type'])
}

function set_effect_img(img, name){
  if (name == "Attack") {img.src = "https://rerollcdn.com/SDSGC/ui/skill_damage.png"}
  else if (name == "Debuff") {img.src = "https://rerollcdn.com/SDSGC/ui/skill_debuff.png"}
  else if (name == "Buff") {img.src = "https://rerollcdn.com/SDSGC/ui/skill_buff.png"}
  else {img.src = "https://rerollcdn.com/SDSGC/ui/skill_recovery.png"}
}

function setUlt(ult_num, ult){
  console.log(ult_num);
  document.getElementById(ult_num).style.display = ''
  let name = document.getElementById(ult_num + "_name");
  let img = document.getElementById(ult_num + "_img");
  let effect = document.getElementById(ult_num + "_effect");

  name.innerHTML = "Ultimate: " + ult["Name"]
  img.src = ult['Image']
  effect.innerHTML = ult['Effect']
}

function setUnique(unique_num, unique){
  document.getElementById(unique_num).style.display = ''
  let name = document.getElementById(unique_num + "_name");
  let img = document.getElementById(unique_num + "_img");
  let effect = document.getElementById(unique_num + "_effect");

  name.innerHTML = unique["Name"]
  img.src = unique['Image']
  effect.innerHTML = unique['Effect']
}

function setComb(move){
  null;
}
