// dependencies / things imported
import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-colors';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement

// which has the magic life-cycles and developer experience below added
export class maincard extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'main-card';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
          display: block;
          border: 1px solid var(--simple-colors-default-theme-accent-6);
          min-width: 1375px;
          min-height: 155px;
          border-radius: 20px;
          padding: 20px;
          width: 5em;
          background-color: var(--simple-colors-default-theme-accent-2);
          box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
      }

      .post-main {
        background-color: var(--simple-colors-default-theme-accent-2);
        box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
        border: solid 1px var(--simple-colors-default-theme-accent-3);
        border-radius: 19px 19px 19px 19px;
        margin-bottom: 15px;
        margin-left: 15px;
        margin-top: 15px;
        height: 99%;
        width: 1350px;
      }

      .post-title {
        background-color: var(--simple-colors-default-theme-accent-3);
        border: solid 10px var(--simple-colors-default-theme-accent-2);
        border-radius: 19px;
        margin-left: 170px;
        padding-top: 15px;
        padding-bottom: 15px;
        height: 75px;
        width: 1155px;
      }

      .post-body {
        background-color: var(--simple-colors-default-theme-accent-3);
        border: solid 10px var(--simple-colors-default-theme-accent-2);
        border-radius: 19px;
        margin-top: 15px;
        margin-left: 25px;
        margin-bottom: 15px;
        height: 215px;
        width: 1300px;
      }

      /* .replybox {
        display: block;
        background-color: var(--simple-colors-default-theme-accent-2);
        box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
        border-radius: 19px 19px 19px 19px;
        height: 75px;
        width: 1275px;
      } */

      simple-icon-lite {
        --simple-icon-height: 100px;
        --simple-icon-width: 100px;
        color: white;
        transform: translate(-50%, -190%);
        top: 50%;
        left: 50%;
        z-index: 100;
      }
    `;
  }

  // overlay on div tag - wrap image in div & style div
  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.imgSrc = '';
    this.imgKeyword = 'grey box';
    this.status = 'pending';
    this.answerIcon = false;
    this.icon = '';
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      imgSrc: { type: String, reflect: true, attribute: 'img-src'},
      imgKeyword: { type: String, attribute: 'img-keyword'},
      status: { type: String, reflect: true }, // Correct, incorrect, pending
      answerIcon: { type: Boolean, reflect: true },
      icon: { type: String }
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'status' && this[propName] === 'correct') {
        this.answerIcon = true;
        this.icon = 'check';
      }
      if (propName === 'status' && this[propName] === 'incorrect') {
        this.answerIcon = true;
        this.icon = 'cancel';
      }
      if (propName === 'status' && this[propName] === 'pending') {
        this.answerIcon = false;
      }
    });
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  connectedCallback() {
    super.connectedCallback();
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // eslint-disable-next-line class-methods-use-this
  async createComment(){
    const response = await fetch('/api/submit-comment', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
         thread_uid: "1234",
         user_uid: "jumbo",
         body: "This is a test",
      }) // body data type must match "Content-Type" header
    }).then(res => res.json());
    console.log(response);
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllComments(){
    const response = await fetch('/api/get-comment').then(res => res.json());
    console.log(response)
  }

  // eslint-disable-next-line class-methods-use-this
  async getSpecificComments(){
    const response = await fetch('/api/get-comment?uid=07e76fec-9f18-4b94-b464-df930de006a1').then(res => res.json());
    console.log(response)
  }

  // eslint-disable-next-line class-methods-use-this
  async likeComment(){
    // 07e76fec-9f18-4b94-b464-df930de006a1
    const response = await fetch('/api/like-comment?uid=07e76fec-9f18-4b94-b464-df930de006a1').then(res => res.json());
    console.log(response)
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div id="Nest">
          <div class="post-main">
            <div class="post-title">
            </div>
            <div class="post-body">
              </div>
          </div>
        ${this.answerIcon
          ? html`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`
          : ``}
          <button @click=${this.createComment}> Create Comment</button>
          <button @click=${this.getAllComments}>GET All Comments</button>
          <button @click=${this.getSpecificComments}>GET Specific Comments</button>
          <button @click=${this.likeComment}>Like Comment</button>
      </div>
    `;
  }


  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/FlashCard.haxProperties.json`, import.meta.url).href;
  }
}
customElements.define(maincard.tag, maincard);
