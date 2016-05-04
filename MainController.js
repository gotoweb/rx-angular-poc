import Emitter from './Emitter.js';

const log = (str) => {
	var el = angular.element('<span>' + str + '<br/></span>');
	document.querySelector('#logger').appendChild(el[0]);
	console.log(str);
}

class MainController {
	constructor($scope, rx) {

		this.evDataSource = new Emitter();
		this.evType = new Emitter();
		this.evSheet = new Emitter();

		this.ctx = {}

		var srcDataSource = Rx.Observable.fromEvent(this.evDataSource, 'update');
		var srcType = Rx.Observable.fromEvent(this.evType, 'select');
		var srcSheet = Rx.Observable.fromEvent(this.evSheet, 'load');

		var srcCombined = Rx.Observable.combineLatest(srcDataSource, srcType);
		var srcFirst = srcCombined.first();
		var srcTypeAfterCombined = srcType.skip(1).skipUntil(srcSheet);

		srcCombined
		.safeApply($scope, () => {
			this.tmp = angular.copy(this.ctx);
			this.ctx.counter = 0;
		})
		.subscribe(() => {
			log('bind fields');
		});

		srcFirst
		.safeApply($scope, () => {
			this.isSheetLoaded = true;
		})
		.subscribe(() => {
			log('draw sheet srcFirst');
			this.evSheet.dispatchEvent(new Event('load'));
		});

		srcTypeAfterCombined
		.safeApply($scope, () => {
			this.applyCounter();
		})
		.subscribe(() => {
			log('draw sheet srcTypeAfterCombined');
		});

	}

	selDataSource() {
		// log('selDataSource');

		setTimeout(() => {
			this.evDataSource.dispatchEvent(new Event('update'));
		}, 20);
	}

	selType() {
		// log('selType');

		this.evType.dispatchEvent(new Event('select'));
	}

	updateCounter() {
		this.ctx.counter++;
	}

	applyCounter() {
		this.ctx = this.tmp;
	}
}

export default MainController;