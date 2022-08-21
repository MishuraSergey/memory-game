import '../css/style.scss'


(() => {

	const MENU_BUTTONS = document.querySelectorAll('[data-diff]');
	const MENU_EL = document.querySelector('.menu');
	const GAME_EL = document.querySelector('.game');


	class Game {
		constructor(width, height) {
			this.icons = ['fa-bell', 'fa-star', 'fa-brain', 'fa-bone', 'fa-book', 'fa-clock', 'fa-droplet', 'fa-gear', 'fa-lock', 'fa-sailboat', 'fa-tree', 'fa-video', 'fa-pen', 'fa-key', 'fa-anchor', 'fa-basketball', 'fa-eye', 'fa-crown', 'fa-umbrella', 'fa-wrench', 'fa-spider', 'fa-pizza-slice', 'fa-rocket', 'fa-lemon', 'fa-lightbulb', 'fa-moon', 'fa-music', 'fa-fish', 'fa-ghost', 'fa-house', 'fa-carrot', 'fa-cloud', 'fa-bolt'];
			this.boardWidth = width;
			this.boardHeight = height;
			this.numberOfTiles = this.boardWidth * this.boardHeight;
			this.layout = [];
			this.status = false;
			this.score = 0;
			this.count = 0;
			this.time = 60;
			this.timer = null;
			this.chosen = null;
			this.memorized = null;
			this.app = document.querySelector('.game');
			this.countElement = document.querySelector('.count');
			this.timeElement = document.querySelector('.time');
		}

		init() {
			this.app.classList.add(`h${this.boardHeight}`);

			MENU_EL.style.display = 'none';
			GAME_EL.style.display = 'grid';

			for (let i = 0; i < this.numberOfTiles / 2; i++) {
				this.getRandomIconFromList();
			}

			for (let i = 0; i < this.numberOfTiles; i++) {
				const TILE = document.createElement('button');
				TILE.classList.add('tile');
				TILE.innerHTML = this.getRandomIconFromLayout();
				this.app.appendChild(TILE);
				TILE.addEventListener('click', this.tileClick.bind(this));
			}
			this.setTimer();
		}

		setTimer(){
			this.timer = setInterval(() => {
				if (this.time === 0) {
					this.gameOver(false);
				}
				this.time--;
				this.timeElement.style.width = (this.time/60*100).toString()+'%';
			}, 1000);
		}

		getRandomIconFromList() {
			const RANDOM = Math.floor(Math.random() * this.icons.length);
			const RANDOM_ICON = this.icons[RANDOM];
			this.icons.splice(RANDOM, 1);
			for (let i = 0; i < 2; i++) {
				this.layout.push(RANDOM_ICON);
			}
		}

		getRandomIconFromLayout() {
			const RANDOM = Math.floor(Math.random() * this.layout.length);
			const RANDOM_ICON = this.layout[RANDOM];
			this.layout.splice(RANDOM, 1);
			return `<i class="fa-solid ${RANDOM_ICON}"></i>`;
		}

		updateCount(){
			this.count++;
			return this.countElement.innerText = this.count;
		}

		gameOver(result) {
			clearInterval(this.timer);
			result ? alert(`Victory! Your Score: ${this.count}`) : alert(`Fail! Your Score: ${this.count}`)
			return this.reset();
		}

		reset(){
			MENU_EL.style.display = 'flex';
			GAME_EL.style.display = 'none';
			this.countElement.innerText = 0;
			this.timeElement.style.width = '100%';
			return this.app.innerHTML = '';
		}

		tileClick(e) {
			const tile = e.target;
			if (tile.classList.contains('shown')) {
				return false;
			}
			if (!this.status) {
				this.memorized = this.chosen;
				this.chosen = tile;
				tile.classList.add('shown');
				if (this.memorized && this.chosen) {
					this.status = true;
					setTimeout(() => {
						this.updateCount();
						if (this.chosen.children[0].classList[1] === this.memorized.children[0].classList[1]) {
							[this.chosen, this.memorized].forEach(el => {
								el.classList.add('locked');
								this.chosen = this.memorized = null;
								this.score++;
								if (this.score === this.numberOfTiles) {
									this.gameOver(true);
								}
							})
						} else {
							[this.chosen, this.memorized].forEach(el => {
								el.classList.remove('shown');
								this.chosen = this.memorized = null;
							})
						}
						this.status = false;
					}, 500)
				}
			}
		}

	}


	MENU_BUTTONS.forEach(btn=>{
		btn.addEventListener('click', ()=>{
			const GAME = new Game(4,btn.dataset.diff);
			GAME.init();
		})
	})


})();












