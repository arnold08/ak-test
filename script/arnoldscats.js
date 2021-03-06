//Parse the URL into a variable
var url = "http://agl-developer-test.azurewebsites.net/people.json";


//Define the function to extract the alphabetical order of cat names using the magic of Lodash
function extractPetNames(data, gender)
{
    var filteredGender = _.filter(data, {gender: gender});
    var arrayedPets = _.flatMap(filteredGender, 'pets');
    var unsortedCats = _.filter(arrayedPets, {type: "Cat"});
    var sortedCats = _.sortBy(unsortedCats, "name")
    return _.map(sortedCats, "name");
}

//Define the function to show cat names in bullet points
function showNames(names, elementSelector)
{
    _.forEach(names, function(name)
    {
        //Make a bullet point
        var petList = document.createElement("li");
        //Get a name
        var petName = document.createTextNode(name);
        //Put the name against the bullet point
        petList.appendChild(petName);

        //Find the gender headings
        var genderHeading = document.getElementById(elementSelector);
        //List the list under the correct heading
        genderHeading.appendChild(petList);
    });
}

//Define the function to write the cat names under the correct heading
function processJSON(data)
{
    showNames(extractPetNames(data, "Male"), "maleOwners");
    showNames(extractPetNames(data, "Female"), "femaleOwners");
}

//Define the function to get JSON and put the whole thing together
function getJSON(url, callback)
{
    $.getJSON(url,callback);
}

//DO
getJSON(url, function(data)
{
    processJSON(data)
});
