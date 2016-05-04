class Emitter {

	constructor() {

		var eventTarget = document.createDocumentFragment();

		[
			"addEventListener",
			"dispatchEvent",
			"removeEventListener"
		].forEach((method) => {
			this[method] = eventTarget[method].bind(eventTarget);
		});
	}

}

export default Emitter;