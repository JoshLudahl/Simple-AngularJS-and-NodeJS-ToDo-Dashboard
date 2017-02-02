$(function() {
  //create an array of preset colors (colors selected from https://flatuicolors.com/)
  var palette = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7'];

  //Button clicked, animate the 'backgroundColor' (jquery UI)
  $( "#btnQuote" ).click(generateQuote);

function generateQuote() {
    //Get a random number which is used to select an index from the color palette
    var index = Math.floor(Math.random() * palette.length);

    //Get quotes
    //First, create a JSON array of quotes and authors

    var quotes = [
      {
        "quote":"The purpose of art is washing the dust of daily life off our souls.",
        "author":"Pablo Picasso"
      },
      {
        "quote":"An empty canvas is a living wonder... far lovelier than certain pictures.",
        "author":"Wassily Kandinsky"
      },
      {
        "quote":"If you would create something, you must be something.",
        "author":"Johann Wolfgang von Goethe"
      },
      {
        "quote":"If art, all art, is concerned with truth, then a society in denial will not find much use for it.",
        "author":"JEANETTE WINTERSON"
      },
      {
        "quote":"Art is a marriage of the conscious and the unconscious.",
        "author":"JEAN COCTEAU"
      },
      {
        "quote":"A painter should begin every canvas with a wash of black, because all things in nature are dark except where exposed by the light.",
        "author":"Leonardo da Vinci"
      },
      {
        "quote":"The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.",
        "author":"Albert Einstein, The World As I See It "
      },
      {
        "quote":"Art enables us to find ourselves and lose ourselves at the same time.",
        "author":"Thomas Merton"
      },
    ];

    //get a random number again, but for the quotes
    var value = Math.floor(Math.random() * quotes.length);

    //change the html to the new quote
    $(".quote-text").html(quotes[value].quote);
    $(".author-text").html(quotes[value].author);

    //Change the twitter link
    var str = "https://twitter.com/intent/tweet?hashtags=quotes&text=";
    $(".tweet").attr("href", str + quotes[value].quote + " " + quotes[value].author);

    //window.setInterval(generateQuote, 1000*30);

    }
    complexFunction1();

    function complexFunction1() {
      generateQuote();

      setTimeout( complexFunction1, 1000*60 );
    }
});
