import { LitElement, html, css } from 'https://unpkg.com/lit?module';

class XWeather extends LitElement {
	static get properties() {
		return {
			endpoint: { type: String },
			city: { type: String },
			weather: { type: Object }
		}
	}

	constructor() {
		super();
		this.city = 'Boston';
		this.weather = {};
		this.endpoint = new URL('../api/weather', import.meta.url);
	}

	updated(changedProperties) {
		changedProperties.forEach((old, propName) => {
			if (propName === 'city') {
				this.getWeather(this[propName]);
			}
		});
	}

	async getWeather(city) {
		const weather = await fetch(`${this.endpoint}?city=${city}`).then(res => res.json());
		this.weather = weather?.weather[0];
	}

	render() {
		return html`
			Current weather in ${this.city}: ${this.weather.description},

			<br>
			Do you want to book a trip to ${this.city}?
			<a href="${this.city}-visitors-center">Visit ${this.city}</a>
		`
	}
}

customElements.define('x-weather', XWeather);
