class PlayMemory {

    constructor() {
        // variáveis globaix
        this.flippers = document.querySelectorAll( '.flipper' );
        this.totalPoints = this.flippers.length / 2;
        this.points = 0;
    }

    /**
     * Método inicializador da classe
     *
     * @memberof PlayMemory
     * @method onInit
     */
    onInit() {
        this.sortCardsRandom();
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

        for( const flipper of self.flippers ) {
            flipper.onclick = () => {
                flipper.classList.add( 'flip' );
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
    
}

// Instância da classe
const playMemory = new PlayMemory;

playMemory.onInit();
