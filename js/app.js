

// Class for Card

var Card = function(value, suit) {
    this.value = value;
    this.suit = suit;
    this.visible = false;
};

Card.prototype.getValue = function() {
    console.log(this.value);
  
};

Card.prototype.getSuit = function(){
   console.log(this.suit);
};

// Class for Deck


var Deck = function() {
    this.array = [];
    //Create Deck
    for(var suit = 0; suit <= 3; suit++){
        for(var value = 1; value<=13; value++){
            this.array.push([suit, value]);
        }
    }
}


//Fisher-Yates shuffle

Deck.prototype.shuffle = function() {
    //console.log(this.deck);
    var m = this.array.length, t, i;
    
    while (m) {

        i = Math.floor(Math.random() * m--);

        t = this.array[m];
        this.array[m] = this.array[i];
        this.array[i] = t;
    }
     return this.array;
}


var deck1 = new Deck();

console.log(deck1.shuffle());


// Method to build deck

// Method to shuffle deck


var userCard = new Card('2', 'diamonds');

/*



   	Ace   = 1,
    Two   = 2,
    Three = 3,
    Four  = 4,
    Five  = 5,
    Six   = 6,
    Seven = 7,
    Eight = 8,
    Nine  = 9,
    Ten   = 10,
    Jack  = 11,
    Queen = 12,
    King  = 13,




    Club    = 1,
    Diamond = 2,
    Heart   = 3,
    Spades  = 4


    */