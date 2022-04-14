// dependencies / things imported
import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors/simple-colors.js';
import sjcl from 'sjcl';
import 'jwt-auth-component';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement

// which has the magic life-cycles and developer experience below added
export class maincard extends SimpleColors {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'main-card';
  }

  // CSS - specific to Lit
  static get styles() {
    return [...super.styles ,css`
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
          
          /* font info */
          font-family: 'Open Sans', sans-serif;
          color: black;
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
        display: flex;
        background-color: var(--simple-colors-default-theme-accent-3);
        border: solid 10px var(--simple-colors-default-theme-accent-2);
        border-radius: 19px;
        margin-left: 15px;
        margin-top: 15px;
        padding-top: 15px;
        padding-bottom: 15px;
        width: 1300px;
      }

      .post-body {
        background-color: var(--simple-colors-default-theme-accent-3);
        border: solid 10px var(--simple-colors-default-theme-accent-2);
        border-radius: 19px;
        margin-top: 15px;
        margin-left: 15px;
        margin-bottom: 15px;
        height: 215px;
        width: 1300px;
      }

      .profile-pic {
        display: inline-flex;
        background-color: var(--simple-colors-default-theme-accent-7);
        border-radius: 50px;
        margin-left: 15px;
        height: 75px;
        width: 75px;
        vertical-align: center;
      }

      .title-content {
        display: block;
        margin-left: 15px;
        width: 1175px;
      }

      .header{
        display: block;
        margin-left: 15px;
        height: auto;
        width: 97%;
      }

      .username {
        display: block;
        margin-left: 15px;
        margin-top: 10px;
        height: auto;
        width: 40%;
      }
      /* .replybox {
        display: block;
        background-color: var(--simple-colors-default-theme-accent-2);
        box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
        border-radius: 19px 19px 19px 19px;
        height: 75px;
        width: 1275px;
      } */
/* 
      simple-icon-lite {
        --simple-icon-height: 100px;
        --simple-icon-width: 100px;
        color: white;
        transform: translate(-50%, -190%);
        top: 50%;
        left: 50%;
        z-index: 100;
      } */
    `];
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
    this.threadPermissions = null;
    this.threadEnabled = false;
    // Gets the ID NEEDED FOR GETTING COMMENTS
    this.threadID = this.getThreadID();
    // handles authentication events from jwt-auth
    this.addEventListener('auth-success', (e) => {
      console.log("auth-event received!");
      this.threadEnabled = true;
    })
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      imgSrc: { type: String, reflect: true, attribute: 'img-src'},
      imgKeyword: { type: String, attribute: 'img-keyword'},
      status: { type: String, reflect: true }, // Correct, incorrect, pending
      answerIcon: { type: Boolean, reflect: true },
      icon: { type: String },
      threadEnabled: {type: Boolean},
      threadPermissions: {type: String},
      threadID: {type: String}
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
    if (this.threadPermissions == null){
      this.fetchThreadData();
    }
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  async fetchThreadData() {
    // throwing error bc not in db
    const apiOrigin = window.location.origin;
    const apiURL = new URL ("/api/get-thread/", apiOrigin);
    apiURL.searchParams.append("uid", this.threadID);
    await fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      this.threadPermissions = data.permissions;
    })
  }

  // eslint-disable-next-line class-methods-use-this
  getThreadID() {
    // the thread id is the current page hash
    if (window.location.host === "localhost:3000"){
      return '1234'
    }
    const currentPage = window.location.href;
    const hashBits = sjcl.hash.sha256.hash(currentPage);
    return sjcl.codec.hex.fromBits(hashBits);
  }

  // eslint-disable-next-line class-methods-use-this
  async createComment(){
    const response = await fetch('/api/submit-comment', {
      method: 'POST',
      body: JSON.stringify({
        thread_uid: "1234",
        user_uid: "jumbo",
        body: "This is a test",
     })
    }).then(res => res.json());
    console.log(response);
  }

  // eslint-disable-next-line class-methods-use-this
  async createUser(){
    const response = await fetch('/api/create-user', {
      method: 'POST',
      body: JSON.stringify({
        name: "Jimmy",
         is_admin: false,
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

  // eslint-disable-next-line class-methods-use-this
  async deleteComment(){
    const response = await fetch('/api/delete-comment?uid=16a2761a-bbab-4707-9c3f-5f5b43f2cf18').then(res => res.json());
    console.log(response)
  }

  // HTML - specific to Lit
  render() {
    if (!this.threadEnabled) {
      // TODO: add different cases for various thread permissions
      return html`
        <div class="center" id="Nest">
          <h2>Log in to see the comments!</h2>
          <jwt-auth authendpoint="/api/auth/"></jwt-auth>
        </div>
      `
    } return html`
      ${this.getComment({user_uid: "jim1234", likes: 69420, body: "Does I works?"}, "b")}
    
      <div>
        ${this.displayItems.map(
          item => html`
          ${this.getComment(item)}
          `
        )}
      </div>
    `;
    
  }

  getComment(comment, thread) {
    return html`
    <div id="Nest">
          <div class="post-main">
            <div class="post-title">
              <div class="profile-pic">
              </div>
              <div class="title-content">
                <div class="header">
                  <h1> ${comment.user_uid} </h1>
                </div>
                <div class="username">
                  <simple-icon-lite icon="favorite"> </simple-icon-lite>
                  <p>${comment.likes}</p>
                </div>
              </div>
            </div>
            <div class="post-body">
            ${comment.body}
            </div>
          </div>
        ${this.answerIcon
          ? html`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`
          : ``}
          <button @click=${this.createComment}> Create Comment</button>
          <button @click=${this.getAllComments}>GET All Comments</button>
          <button @click=${this.getSpecificComments}>GET Specific Comments</button>
          <button @click=${this.likeComment}>Like Comment</button>
          <button @click=${this.deleteComment}>Delete Comment</button>
          <button @click=${this.createUser}>Create User</button>
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
