 function getPics() {
     for (var i = 1; i < 152; i++) {
         $("#pokepic").append("<img id='" + i + "' src='http://pokeapi.co/media/img/" + i + ".png'>");
     }
 }

 $(document).ready(function() {

     getPics();

     $('img').click(function() {

         $("#emptyPokedex").html("");

         console.log(this.id);

         var picnum = this.id;

         $.get("http://pokeapi.co/api/v1/pokemon/" + this.id + "/", function(res) {
             $("#emptyPokedex").append("<h2>" + res.name + "</h2>");

             console.log(this);
             $("#emptyPokedex").append("<img id='" + picnum + "' src='http://pokeapi.co/media/img/" + picnum + ".png'>");

             var html_str = "";
             html_str += "<h4>Types</h4>";
             html_str += "<ul>";
             for (var i = 0; i < res.types.length; i++) {
                 html_str += "<li>" + res.types[i].name + "</li>";
             }
             html_str += "</ul>";
             $("#emptyPokedex").append(html_str);

             html_str = "";
             html_str += "<h4>Height</h4>";
             html_str += res.height;
             $("#emptyPokedex").append(html_str);


             html_str = "";
             html_str += "<h4>Weight</h4>";
             html_str += res.weight;
             $("#emptyPokedex").append(html_str);

         }, "json");

     });

 });