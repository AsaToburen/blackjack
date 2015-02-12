
var Suit = function(name, abbr, char) {
  this.name = name;
  this.abbr = abbr;
  this.char = char;
};
 
var suits = {
  0: new Suit('Clubs', 'C', '&clubs;'),
  1: new Suit('Diamonds', 'D', '&diams;'),
  2: new Suit('Hearts', 'H', '&hearts;'),
  3: new Suit('Spades', 'S', '&spades;')
};

// Class for Card

var Card = function(suit, value) {
  this.suit = suit;
  this.value = value;
  this.visible = false;
};

Card.prototype.getValue = function() {
  return (this.value > 10) ? 10 : this.value;
};

Card.prototype.getName = function() {
    if (this.value > 1 && this.value <= 10) {
      return this.value;
    } else {
      switch (this.value) {
        case 1:
          return 'A';
        case 11:
          return 'J';
        case 12:
          return 'Q';
        case 13:
          return 'K';
      }
    }
};

Card.prototype.getSuit = function() {
  return suits[this.suit];
};

Card.prototype.display = function() {
    return $('<div class="card ' + suits[this.suit].name + '">' +
              '<span class="rank">' + this.getName() + '</span>' +
              '<span class="suit">' + suits[this.suit].char + '</span>' +
              '</div>').data('card', this);
};
 
Card.prototype.toggleVisibility = function() {
    this.visible = !this.visible;
    return this.display();
};

// Class for Deck

var Deck = function() {
    this.resetDeck = [];
    this.array = [];
    this.shuffled = 0;
};

// Method to build deck

Deck.prototype.build = function() {
    this.array = [];
    for(var suit = 0; suit <= 3; suit++){
        for(var value = 1; value<=13; value++){
            this.array.push(new Card(suit, value));
        }
    }
};

// Method to shuffle deck
//Fisher-Yates shuffle

Deck.prototype.shuffle = function() {
    var m = this.array.length, t, i;
    
    while (m) {

        i = Math.floor(Math.random() * m--);

        t = this.array[m];
        this.array[m] = this.array[i];
        this.array[i] = t;
        this.shuffled = 1;
    }
    return this.array;
};


Deck.prototype.reset = function() {
  this.array = this.resetDeck;
  this.shuffled = 0;
};

Deck.prototype.deal = function() {
  return this.array.shift();
};

var Hand = function(container) {
  this.cards = [];
  this.status = "";
  this.container = container;
};

Hand.prototype.value = function() {
  var value = 0;
  var aces = 0;
  for (var i = 0; i < this.cards.length; i++) {
    if (this.cards[i].getValue() === 1) {
        aces++;
    }
      value += this.cards[i].getValue();
    }
    if(aces && value <= 12) {
        value += 10;
    }
    return value;
};

Hand.prototype.recieveCard = function(card) {
    this.cards.push(card);
};

Hand.prototype.check = function() {
  var userArea = document.getElementById(this.container); 
    if(this.value() > 21) {
      $("#dealerHand div:last").attr('id', 'card-show');
      this.status = 'bust';
      userArea.style.backgroundColor = "#d03111";
    } else if (this.value() === 21 ) {
      $("#dealerHand div:last").attr('id', 'card-show');
      this.status = 'Twenty One!!'; 
      userArea.style.backgroundColor = "#3cbf77";
    } else {
      this.status = "none";
    }
};

Hand.prototype.display = function(destination) {
  for(var x = 0; x<this.cards.length; x++) {
      $( this.cards[x].display()).appendTo('#' + destination );
  }
  if(destination === 'dealerHand') {
    $("#dealerHand div:last").attr('id', 'card-hidden');
  }
};

var deckOne;
var userHand = new Hand('userHand');
var dealerHand = new Hand('dealerHand');


$('#build').on('click', function() {
  deckOne = new Deck();
  deckOne.build();
  $('#deck').css('background-color', '#d03111');
});

$('#shuffle').on('click', function() {
  if(deckOne !== undefined) {
    deckOne.shuffle();
    $('#deck').css('background-color', '#3cbf77');
  }
});


$('#deal').on('click', function() {

  if(deckOne !== undefined && deckOne.shuffled !== 0) {
     
    for (var i = 1; i <= 2; i++) { 
      userHand.recieveCard(deckOne.deal());
      dealerHand.recieveCard(deckOne.deal());
    }

    userHand.display('userHand');   
    dealerHand.display('dealerHand');
        
       console.log("User Value: " + userHand.value());
       console.log("Dealer Value: " + dealerHand.value());    
  }
    userHand.check(); 
    dealerHand.check();
});

$('#hit').on('click', function(){
    
  if(userHand.value() < 21 ){ 

    var hitCard = deckOne.deal(); 
    userHand.recieveCard(hitCard);
    $('#userHand').append(hitCard.display());
    console.log("User Value: " + userHand.value());
    console.log("Dealer Value: " + dealerHand.value());
    console.log(userHand.check());
    userHand.check();
  }
});

// Stand-button event listener 

$('#stand').on('click', function() {
  
  $("#dealerHand div:last").attr('id', 'card-show');
  
  userHand.check();
  dealerHand.check();
  
    if( dealerHand.value() > userHand.value()) {
      $('#dealerHand').css('background-color', "#3cbf77");
    } else if(userHand.value() > dealerHand.value() && dealerHand.value >= 17) {
      $('#userHand').css('background-color', "#3cbf77"); 
    } else if(dealerHand.value() > userHand.value()) {
      $('#dealerHand').css('background-color', "#3cbf77"); 
    } else if (userHand.value() < 21 && dealerHand.value() < userHand.value() ) {
     
      while (dealerHand.value() < 17) {
        var hitCard = deckOne.deal();  
        dealerHand.recieveCard(hitCard);
        hitCard.display();
        dealerHand.check(); 
      } 
    } else {
         $('#dealerHand').css('background-color', "#4f7cac"); 
         $('#userHand').css('background-color', "#4f7cac"); 
    }
        console.log("User Value: " + userHand.value());
        console.log("Dealer Value: " + dealerHand.value());
});



