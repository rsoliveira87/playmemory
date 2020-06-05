class PlayMemory {

    constructor() {
        // variáveis globais
        this.flippers = document.querySelectorAll( '.flipper' );
        this.totalPoints = this.flippers.length / 2;
        this.points = 0;
        this.plays = 0;
        this.isCompare = false;

        console.log(this.totalPoints)
    }

    /**
     * Método inicializador da classe
     *
     * @memberof PlayMemory
     * @method onInit
     */
    onInit() {
        this.startButtonAction();
        this.addClickAction();
    }

    /**
     * Método que adiciona evento de clique nos cards
     *
     * @memberof PlayMemory
     * @method addClickAction
     */
    addClickAction() {
        const self = this;
        let compare = [];

        for( const flipper of self.flippers ) {
            flipper.onclick = e => {
                e.preventDefault();

                if( !flipper.classList.contains( 'flip' ) && !self.isCompare ) {
                    flipper.classList.add( 'flip' );

                    compare.push( flipper );

                    if( compare.length === 2 ) {
                        self.isCompare = true;
                        self.compareCards( compare );
                        compare = [];
                    }
                }
            };
        }
    }

    /**
     * Método que ordena os cards randomicamente
     *
     * @memberof PlayMemory
     * @method sortCardsRandom
     */
    sortCardsRandom() {
        const self = this;

        for( const flipper of self.flippers ) {
            const random = Math.floor( Math.random() * self.flippers.length );

            flipper.style.order = random;
        }
    }

    /**
     * Método que vira os cards após 5 segundos
     *
     * @memberof PlayMemory
     * @method removeFlip
     */
    removeFlip() {
        const self = this;

        setTimeout( () => {
            for( const flipper of self.flippers ) 
                flipper.classList.remove( 'flip' );

        }, 5000 );
    }

    /**
     * Método que compara os dois cards
     *
     * @memberof PlayMemory
     * @method compareCards
     * @param {Object} flippers - array com o escopo dos dois cards clicados
     */
    compareCards( flippers ) {
        const first = flippers[0], second = flippers[1], self = this;

        if( first.getAttribute( 'data-name' ) === second.getAttribute( 'data-name' ) ) {
            setTimeout( () => {
                first.classList.add( 'hit' );
                second.classList.add( 'hit' );
                self.isCompare = false;
                self.finishGame();
            }, 1000 );
            
            self.points++;

            document.querySelector( '.flip-container .text .hits' ).innerText = self.points;
        } else {
            setTimeout( () => {
                first.classList.remove( 'flip' );
                second.classList.remove( 'flip' );
                self.isCompare = false;
            }, 1000 );
        }
        
        self.plays++;

        document.querySelector( '.flip-container .text .plays' ).innerText = self.plays;
    }

    showCards( limit ) {
        const self = this;

        self.flippers.forEach( ( item, index ) => {
            if( index  >= limit )
                item.classList.add( 'hidden' );
        } );

        self.flippers = document.querySelectorAll( '.flipper:not(.hidden)' );
        self.totalPoints = self.flippers.length / 2;
    }

    startButtonAction() {
        const startButton = document.querySelector( '.btn.start' );
        const difficulty = document.querySelector( 'select.difficulty' );
        const startContainer = document.querySelector( '.flip-container.start' );
        const playContainer = document.querySelector( '.flip-container.play' );
        const infoContainer = document.querySelector( '.flip-container.info' );
        const self = this;

        startButton.onclick = () => {
            startContainer.classList.add( 'hidden' );
            playContainer.classList.remove( 'hidden' );
            infoContainer.classList.remove( 'hidden' );

            self.sortCardsRandom();
            self.removeFlip();

            switch( difficulty.value ) {
                case 'easy':
                    self.showCards( 12 );
                    break;

                case 'intermediate':
                    self.showCards( 24 );
                    break;

                default:
                    break;
            }
        };
    }

    finishGame() {
        const self = this;
        const finishContainer = document.querySelector( '.flip-container.finish' );
        const playContainer = document.querySelector( '.flip-container.play' );

        if( self.points === self.totalPoints ) {
            setTimeout( () => {
                playContainer.classList.add( 'hidden' );
                finishContainer.classList.remove( 'hidden' );
            }, 1000 );
        }
    }
    
}

// Instância da classe
const playMemory = new PlayMemory;

playMemory.onInit();
