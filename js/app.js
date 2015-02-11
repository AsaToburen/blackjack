
var dealerHand = document.getElementById('dealerHand');
var userHand = document.getElementById('userHand');

//From Gist

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

  //  switch (this.suit) {
  //    case 0: 
  //        return suits[0];
  //    case 1: 
  //        return suits[1];
  //    case 2: 
  //        return suits[2];
  //    case 3:
  //        return suits[3]
  };

// Class for Deck

var Deck = function() {
    this.array = [];
}

// Method to build deck
Deck.prototype.build = function() {
    for(var suit = 0; suit <= 3; suit++){
        for(var value = 1; value<=13; value++){
            this.array.push([suit, value]);
        }
    }
    return this.array;
}

// Method to shuffle deck
//Fisher-Yates shuffle

Deck.prototype.shuffle = function() {
    var m = this.array.length, t, i;
    
    while (m) {

        i = Math.floor(Math.random() * m--);

        t = this.array[m];
        this.array[m] = this.array[i];
        this.array[i] = t;
    }
     return this.array;
}

///// From GIST 

Card.prototype.display = function() {
    if (this.visible) {
      return $('<div class="card ' + suits[this.suit].name + '">' +
                 '<span class="rank">' + this.getName() + '</span>' +
                 '<span class="suit">' + suits[this.suit].char + '</span>' +
               '</div>').data('card', this);
    } else {
      return $('<div class="card back ' + suits[this.suit].name + '">' +
                 '<span class="rank">' + this.getName() + '</span>' +
                 '<span class="suit">' + suits[this.suit].char + '</span>' +
               '</div>').data('card', this);
    }
  };
 
  Card.prototype.toggleVisibility = function() {
    this.visible = !this.visible;
    return this.display();
  };

// deal

var deal = function() {
    var deckOne = new Deck();
        deckOne.build();
        deckOne.shuffle();
    userCard1 = deckOne.array.shift();
    dealerCard1 = deckOne.array.shift();
    userCard2 = deckOne.array.shift();
    dealerCard2 = deckOne.array.shift();
};
    

deal();

var userCardOne = new Card(userCard1[0], userCard1[1]);
var userCardTwo = new Card(userCard2[0], userCard2[1]);
var dealerCardOne = new Card(dealerCard1[0], dealerCard1[1]);
var dealerCardTwo = new Card(dealerCard2[0], dealerCard2[1]);

console.log(userCardOne, userCardTwo, dealerCardOne, dealerCardTwo);
console.log(suits[userCardOne.suit].char);

console.dir(userCardOne.toggleVisibility());




