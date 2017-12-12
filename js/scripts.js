const PREMIER_STATUS = "Premier movie";
const OLD_STATUS = "Old movie";
const MORNING_TIME = "Morning";
const AFTERNOON_TIME = "Afternoon";
const NIGHT_TIME = "Night";
var movies = [];
var idMoviesController = 0;
var idUserController = 0;
var user;
function User(userFirstName, userLastName, userEmail, userAge, userId ){
  this.userFirstName = userFirstName;
  this.userLastName = userLastName;
  this.userEmail = userEmail;
  this.userAge = userAge;
  this.userId = userId;
}
function Movie(movieName, times, regularPrice, status, movieId){
  this.movieName = movieName;
  this.times = times;
  this.regularPrice = regularPrice;
  this.status = status;
  this.movieId = movieId;
}

User.prototype.fullName = function() {
  return this.userFirstName + " " + this.userLastName;
}

function calculatePrice(age, time, price, movieStatus){
  if(age < '10' || age > '50'){
    price -= price*0.2;
  }
  if(movieStatus === OLD_STATUS){
    price -= price*0.25;
  }
  if(time === MORNING_TIME || time ===  AFTERNOON_TIME){
    price -= price*0.1;
  }
  return price;
}
var movie1 = new Movie('Coco', ['10am', '2pm', '8pm'], 100, PREMIER_STATUS, idMoviesController+1);
//idMoviesController++;
var movie2 = new Movie('Ferdinand', ['10am', '2pm', '8pm'], 200, OLD_STATUS, idMoviesController+2);
//idMoviesController++;
var movie3 = new Movie('Starwars : The last Jedi', ['10am', '2pm', '8pm'], 300, PREMIER_STATUS, idMoviesController+3);
//idMoviesController++;
var movie4 = new Movie('Daddys home 2', ['10am', '2pm', '8pm'], 400, OLD_STATUS, idMoviesController+4);
//idMoviesController++;
var movie5 = new Movie('Incredibles 2', ['10am', '2pm', '8pm'], 500, PREMIER_STATUS, idMoviesController+5);
//idMoviesController++;
movies.push(movie1);
movies.push(movie2);
movies.push(movie3);
movies.push(movie4);
movies.push(movie5);


function checkMovie(movies, idMovie) {
  for(i=0; i<movies.length; i++){
    if(movies[i].movieId.toString()===idMovie.toString()){
      return movies[i];
    }
  }
  return -1;
}

//Frontend
$(function(){
  $('#userRegisterForm').submit(function(event){
    event.preventDefault();
    movies.forEach(function(movie){
      $('#moviesContent').append('<tr><td>'+movie.movieName+'</td><td>'+movie.times.toString()+'</td><td>'+movie.status+'</td><td><button type="button" id='+movie.movieId+' class="btn btn-info seclectMovie" data-toggle="modal" data-target="#yourReciept">Select</button></td></tr>');
    });
    user = new User($('#firstName').val(), $('#lastName').val(), $('#email').val(), $('#age').val(),idUserController);
    idUserController++;
    $('#greetingsTitle').text("Hi "+user.fullName()+", you can purchase your ticket here");
    $('#registerContent').toggle();
    $('#ticketManagement').toggle();
    $('.seclectMovie').click(function(event){
      event.preventDefault();
      var movieSlected = checkMovie(movies, $(this).attr("id"));
      if(movieSlected !== -1){
        $('#yourReciept').modal('toggle');
        $('#userNameReciept').text("Costumer name: "+user.fullName());
        $('#movieNameReciept').text("Movie name: "+movieSlected.movieName);
        $('#priceRecieve').text("Price: $"+parseFloat(calculatePrice(user.userAge, AFTERNOON_TIME, movieSlected.regularPrice, movieSlected.status),2));
      };
    });
  });

})
