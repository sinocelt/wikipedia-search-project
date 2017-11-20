$(document).ready(function () {
  $("form").on("submit",function(someevent) {
    someevent.preventDefault();
    //make the data sent through the form readable for ajax or a server to read
    var properData = ($("form").serialize());
    //we don't want "ourData" in the string so remove it
    var justWhatWeNeed = properData.replace("ourData=","");

    //using Wikipedia's API. Based on its documentation, it says among other things headers must be  headers: { 'Api-User-Agent': 'Example/1.0' },
    $.ajax( {
      //create the search url based on user input
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + justWhatWeNeed+ "&limit=20&format=json",
      dataType: 'jsonp',
      type: 'POST',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(json) {
        //create a variable ourHTML which will contain the HTML of all the content we want to display from a search
        var ourHTML = "";
        //there are 20 elements in it now, but we could easily change the &limit=20 part to some other number
        var lengthOfJSON = json[1].length;

        //go through the JSON file we requested. The JSON file will be an array of length 4.
        //The first index will contain what we searched for. We will ignore this index
        //The second index will contain 20 related titles of what we searched for with the first element being what we searched for
        //the third index will contain a description of its corresponding title.
        //The 4th index will contain the URL of the corresponding title

        //for example, if we searched for "Japan", we would get a JSON file located at the URL https://en.wikipedia.org/w/api.php?action=opensearch&search=Japan&limit=20&format=json
        //for the json array, json[1][0] is "Japan"
        //json[2][0] is 'Japan (Japanese: 日本 Nippon [ɲip̚poɴ] or Nihon [ɲihoɴ]; formally 日本国  Nippon-koku or Nihon-koku, meaning "State of Japan") is a sovereign island nation in East Asia.'
        //json[3][0] is 'https://en.wikipedia.org/wiki/Japan'
        //it will be similar for the rest of the 19 elements

        //go through the JSON file, getting the 20 titles and their corresponding descriptions and URLs
        for(var x = 0; x<lengthOfJSON; x++) {
          ourHTML += "<div class='well'>" + "<strong>" + json[1][x] + "</strong>" + "<br>" + json[2][x] + "<br>" + "<a href=" +"'" + json[3][x]  +  "'" + " target='_blank'>" + json[3][x] + "</a></div>";
        }
        //for the div with element "changeIt" change the inner HTML to ourHTML
        document.getElementById("changeIt").innerHTML = ourHTML;
        //make our content aligned center
        $("#changeIt").css("text-align", "center");
        $("#ourLabel").text("Search Wikipedia again: ");
      } //end of success function
    }); //end of ajax
  }); //end of $("form").on("submit",function(someevent) {
}); //end of $(document).ready
