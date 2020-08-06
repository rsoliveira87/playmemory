class PlayMemory {

    constructor() {
        // variáveis globais
        this.flippers = [];
        this.totalPoints = 0;
        this.points = 0;
        this.plays = 0;
        this.isCompare = false;
        this.animals = ['bear','bee','bird','butterfly','cat','chicken','cow','dog','dolphin','duck','elephant','fish','frog','horse','lion','owl','panda','parrot','penguin','pig','rabbit','sheep','turtle','whale'];
    }

    /**
     * Método inicializador da classe
     *
     * @memberof PlayMemory
     * @method onInit
     */
    onInit() {
        this.startButtonAction();
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
        const self = this, hits = document.querySelectorAll( '.flipper.hit' ) || [];

        for( const hit of hits )
            hit.classList.remove( 'hit' );

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

            document.querySelector( '.play-container .text .hits' ).innerText = self.points;
        } else {
            setTimeout( () => {
                first.classList.remove( 'flip' );
                second.classList.remove( 'flip' );
                self.isCompare = false;
            }, 1000 );
        }
        
        self.plays++;

        document.querySelector( '.play-container .text .plays' ).innerText = self.plays;
    }

    getPlayMarkup( limit ) {
        const self = this;
        let i = 0, markup = '';

        if( limit !== 24 ) {
            for ( let index = self.animals.length - 1; index > 0; index-- ) {
                const j = Math.floor( Math.random() * ( index + 1 ) );
                [self.animals[index], self.animals[j]] = [self.animals[j], self.animals[index]];
            }
        }

        for( let index = 0; index < 2; index++  ) {
            for( ; i < limit; i++ ) {
                markup += `
                            <a href="#" class="flipper flip" data-name="${self.animals[i]}">
                                <div class="card front">
                                    <i class="icons ${self.animals[i]}"></i>
                                </div>
                                <div class="card back">
                                    <i class="icons question-mark"></i>
                                </div>
                            </a>
                        `;
            }
            i = 0;
        }

        return markup;
    }
    
    startButtonAction() {
        const startButton = document.querySelector( '.btn.start' );
        const difficulty = document.querySelector( 'select.difficulty' );
        const startContainer = document.querySelector( '.play-container.start' );
        const playContainer = document.querySelector( '.play-container.play' );
        const infoContainer = document.querySelector( '.play-container.info' );
        const self = this;
        
        startButton.onclick = () => {
            startContainer.classList.add( 'hidden' );
            playContainer.classList.remove( 'hidden' );
            infoContainer.classList.remove( 'hidden' );
            
            playContainer.innerHTML = self.getPlayMarkup( +difficulty.value );
            
            self.flippers = document.querySelectorAll( '.flipper' );
            self.totalPoints = self.flippers.length / 2;
        
            self.sortCardsRandom();
            self.addClickAction();
            self.removeFlip();
        };
    }

    finishGame() {
        const self = this;
        const finishContainer = document.querySelector( '.play-container.finish' );
        const playContainer = document.querySelector( '.play-container.play' );
        const restartButton = document.querySelector( '.play-container .btn.restart' );

        if( self.points === self.totalPoints ) {
            setTimeout( () => {
                playContainer.classList.add( 'hidden' );
                finishContainer.classList.remove( 'hidden' );
            }, 1000 );
        }

        restartButton.onclick = () => {
            self.points = 0;
            self.plays = 0;

            document.querySelector( '.play-container .text .hits' ).innerText = self.points;
            document.querySelector( '.play-container .text .plays' ).innerText = self.plays;

            finishContainer.classList.add( 'hidden' );
            playContainer.classList.remove( 'hidden' );

            self.removeFlip();
            self.sortCardsRandom();
        };
    }
    
}

// Instância da classe
const playMemory = new PlayMemory;

playMemory.onInit();
