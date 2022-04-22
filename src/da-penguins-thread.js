/* eslint-disable eqeqeq */
// dependencies / things imported
import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-colors';

import './da-penguins-comment.js';
import sjcl from 'sjcl';
import 'jwt-auth-component';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement

// which has the magic life-cycles and developer experience below added
export class DaPenguinsThread extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'da-penguins-thread';
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      /* :host {
        display: block;
        width: 320px;
        height: 265px;
      }

      img {
        display: flex;
        margin: 25px auto auto;
        height: 200px;
        width: 275px;
        border: 5px solid white;
        border-radius: 19px;
        box-shadow: 0 0 10px black;
      }

      .backgroundbox {
        display: flex;
        background-color: var(--simple-colors-default-theme-accent-4);
        border-radius: 19px 19px 0 0;
        height: 265px;
        width: 320px;
      }

      .overlay {
        position: relative;
      }

      .overlay::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border: 1px;
        border-radius: 19px 19px 0px 0px;
      }

      simple-icon-lite {
        --simple-icon-height: 100px;
        --simple-icon-width: 100px;
        color: white;
        transform: translate(-50%, -190%);
        top: 50%;
        left: 50%;
        z-index: 100;
      }

      :host([status='pending']) .overlay::before {
        display: flex;
        background: transparent;
      }

      :host([status='correct']) .overlay::before {
        display: flex;
        background: green;
        filter: opacity(0.65);
      }

      :host([status='incorrect']) .overlay::before {
        display: flex;
        background: red;
        filter: opacity(0.65);
      } */

      host {
        font-family: 'Open Sans', sans-serif;
        font-size: 22px;
        color: black;

        --accent-color-white: #EFF4ED;
      }

      #Nest {
        margin: 10px;
      }

      .command-center {
        padding: 10px;
        border: 1px solid #184C34;
        margin: 10px;
        width: fit-content;
        border-radius: 5px;
      }

      .create-comment {
        background-color: #CAD1C9;
        color: #184C34;
        text-align: center;
        border: none;
        border-radius: 10px;
        padding: 15px 20px;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }

      .create-comment:hover,
      .create-comment:focus,
      .create-comment:active {
        box-shadow: 0px 0px 2px #0EBD60;
      }

      .disabled-button{
        background-color: lightgrey !important;
        color: darkgrey !important;
        pointer-events: none;
      }
      
    `;
  }

  // overlay on div tag - wrap image in div & style div
  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.threadID = this.getThreadID();
    this.threadEnabled = false;
    this.threadPermissions = null;
    this.commentList = [];

    // Auth wall
    this.addEventListener('auth-success', this.authsucks);
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      threadID: { type: String },
      threadEnabled: { type: Boolean },
      threadPermissions: { type: String },
      commentList: { type: Array },
    };
  }

  // BACKEND TIE-INS (auth and threading)
  async authsucks() {
    this.commentList = await this.getAllComments();
    this.threadEnabled = true;
  }

  // TODO: If this hashes the current page, how will we have multiple threads on a page (as requested for comp?)
  // eslint-disable-next-line class-methods-use-this
  getThreadID() {
    // the thread id is the current page hash
    if (window.location.host === 'localhost:3000') {
      return '1234';
    }
    const currentPage = window.location.href;
    const hashBits = sjcl.hash.sha256.hash(currentPage);
    return sjcl.codec.hex.fromBits(hashBits);
  }

  async fetchThreadData() {
    // throwing error bc not in db
    const apiOrigin = window.location.origin;
    const apiURL = new URL('/api/get-thread/', apiOrigin);
    apiURL.searchParams.append('uid', this.threadID);
    await fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        this.threadPermissions = data.permissions;
      });
  }

  // CALLBACK FUNCTIONS

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
    if (this.threadPermissions == null) {
      this.fetchThreadData();
    }
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // API CALLS

  // eslint-disable-next-line class-methods-use-this
  async createUser(){
    const response = await fetch('/api/create-user', {
      method: 'POST',
      body: JSON.stringify({
        name: "Jimmy",
         is_admin: false,
      }),
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`
      }
    }).then(res => res.json());
    console.log(response);
  }

  // eslint-disable-next-line class-methods-use-this
  async createComment(commentBody){
    const response = await fetch('/api/submit-comment', {
      method: 'POST',
      headers: { Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}` },
      body: JSON.stringify({
        thread_uid: this.threadID,
        body: commentBody
     })
    }).then(res => res.json());
    console.log(response);
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllComments() {
    // TODO: make query into URL object
    const response = await fetch(`/api/get-comment?threadId=${this.threadID}`, {headers: {
      Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`
    }}).then(res => res.json());
    console.log(response);
    return response;
  }

  // TODO: Maybe use for chaining replies to a comment? (can be thru comment.js or thread.js)
  // eslint-disable-next-line class-methods-use-this
  async getSpecificComment(targetUID){
    const response = await fetch(`/api/get-comment?uid=1d89ffaf-f8b2-4bc4-b71e-ddbc19827b66`, {headers: {
      Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`
    }}).then(res => res.json());
    console.log(targetUID ," ", response);
    return response;
  }

// eslint-disable-next-line class-methods-use-this
  renderComment(comment) {
    console.log("comment", comment);
    console.log("uid: ", comment.uid);
    console.log("all comments: ", this.commentList);
    
    const isEdited = comment.is_edited != '0';
    const isReply= comment.is_reply != '0';

    // UNDER CONSTRUCTION

    const submittedTime = new Date(comment.submitted_time).toLocaleString();

    let editedTime = '';

    if(isEdited){
      editedTime = new Date(comment.edited_time).toLocaleString();
    }

    // END UNDER CONSTRUCTION

    if(comment.is_deleted == '0'){
      return html`
        <da-penguins-comment
          UID=${comment.uid}
          userUID=${comment.user_uid}
          username=${comment.name}
          submittedTime=${submittedTime}
          body=${comment.body}
          editedTime=${editedTime}
          ?isEdited=${isEdited}
          ?isReply=${isReply}
          replyTo=${comment.reply_to}
          likes=${comment.likes}
          threadID=${this.threadID}
        ></da-penguins-comment>
      `;
    }
    return html``;
  }

  // eslint-disable-next-line class-methods-use-this
  async initiateCreateComment(){
    /*
    const newComment = prompt("Care to add something to the discussion?\nType your comment below:", "");
    if(newComment == null || newComment.trim() == ""){
      console.log("nothing to see here");
    } else {
      this.createComment(newComment);
    }
    */

    // TODO: Once createComment() is working, set this up to create a new comment
    const commentBody = this.shadowRoot.querySelector(".submit-body");
    if (commentBody.value !== ''){
      const newComment = await this.createComment(commentBody.value);
      commentBody.value = '';
      this.commentList = await this.getAllComments();
    }
  }

  validateSubmitButton(){
    console.log("NEW INPUT")
    const submitButton = this.shadowRoot.querySelector(".submit-button");
    const commentBody = this.shadowRoot.querySelector(".submit-body");
    if (commentBody.value == ''){
      console.log(commentBody.value)
      submitButton.disabled = true;
      submitButton.classList.add('disabled-button');
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('disabled-button');
    }
  }

  render() {
    if (!this.threadEnabled) {
      // TODO: add different cases for various thread permissions
      return html`
        <div class="center" id="Nest">
          <h2>Log in to see the comments!</h2>
          <jwt-auth authendpoint="/api/auth/"></jwt-auth>
        </div>
      `;
    }
    return html`
      <div class="command-center">
        <button class="create-comment" @click=${this.initiateCreateComment}>New Comment</button>
        <button class="create-comment" @click=${this.createUser}>Create User</button>
        <button class="create-comment" @click=${this.getAllComments}>GET All Comments</button>
        <button class="create-comment" @click=${this.getSpecificComment}> GET Specific Comment </button>
      </div>
      <div>
        ${this.commentList.map(commentArray => commentArray.map(comment => html` ${this.renderComment(comment)} `))}
      </div>
      <div class="submit-prompt">Have something to say? Leave a comment below!</div>
      <textarea class="submit-body" @input=${this.validateSubmitButton}></textarea>
      <button class= "create-comment submit-button disabled-button" @click="${this.initiateCreateComment}" disabled>Submit</button>
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
customElements.define(DaPenguinsThread.tag, DaPenguinsThread);
