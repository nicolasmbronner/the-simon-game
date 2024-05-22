const buttonColours = [ "green", "red", "yellow", "blue" ];
let   gamePattern = [ ],
      userClickedPattern = [ ],
      started = false,
      level = 0;

$( document ).on( "keypress", function ( ) {
    if ( !started ) {
        started = true;
        $( '#level-title' ).text( "Level " + level );
        nextSequence( );
    }
} );

$( ".btn" ).on( "click", function( ) {
    let userChosenColour = $( this ).attr( "id" );
    userClickedPattern.push( userChosenColour );

    playSound ( userChosenColour );
    animatePress( userChosenColour );

    checkAnswer( userClickedPattern.length - 1 );
} );

function checkAnswer( currentLevel ) {
    if ( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ] ) {

        if ( userClickedPattern.length === gamePattern.length ) {
            setTimeout( function( ) {
                nextSequence( );
            }, 1000 );
        }

    } else { // GAME OVER

        playSound( "wrong" );

        $( 'body' ).addClass( 'game-over' );
        setTimeout( function( ) {
            $( 'body' ).removeClass( 'game-over' );
        }, 200 );

        $( '#level-title' ).text( "Game Over, Press Any Button" );
        startOver( );
    }
}

function nextSequence( ) {
    userClickedPattern = [ ];
    level++;
    $( "#level-title" ).text( "Level " + level );

    let randomNumber = Math.floor( Math.random( ) * 4 ),
        randomChosenColour = buttonColours[ randomNumber ];

    gamePattern.push( randomChosenColour );
    $( "#" + randomChosenColour ).fadeOut( 100 ).fadeIn( 100 );

    playSound( randomChosenColour );
}

function playSound( name ) {
    let sfx = new Audio( './sounds/' + name + ".mp3" );
    sfx.play( );
}

function animatePress( currentColour ) {
    $( "#" + currentColour ).addClass( "pressed" );
    setTimeout( function( ) {
        $( "#" + currentColour ).removeClass( "pressed" );
    }, 100 );
}

function startOver( ) {
    level = 0;
    gamePattern = [ ];
    started = false;
}