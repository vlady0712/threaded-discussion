import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-colors';

import './da-penguins-comment.js';
import sjcl from 'sjcl';
import 'jwt-auth-component';
export class DaPenguinsThread extends LitElement {
  static get tag() {
    return 'da-penguins-thread';
  }
  
  static get styles() {
    return css`

      host {
        font-family: 'Open Sans', sans-serif;
        font-size: 22px;
        color: black;

        --accent-color-white: #F4EDF4;
      }

      #Nest {
        margin: 10px;
      }

      .command-center {
        padding: 10px;
        border: 1px solid #571C5E;
        margin: 10px;
        width: fit-content;
        border-radius: 5px;
      }

      .create-comment {
        background-color: #DAB9DE;
        color: #571C5E;
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
        box-shadow: 0px 0px 2px #6100EE;
      }

      .submit-button:disabled {
        background-color: lightgrey !important;
        color: darkgrey !important;
        pointer-events: none;
      }

      .submit-button {
        background-color: #571C5E;
        color: #F4EDF4;
      }

      .new-comment-pane-visible {
        visibility: visible;
        background-color: #F4EDF4;
        padding: 20px;
        border: 1px solid #571C5E;
        margin: 20px 10px;
        width: fit-content;
        border-radius: 5px;
        font-family: 'Open Sans', sans-serif;
      }

      .new-comment-pane-visible .comment-prompt {
        margin: 0px;
        color: #571C5E;
      }

      .new-comment-pane-visible .submit-body {
        border: solid 1px #571C5E;
        border-radius: 5px;
        background-color: whitesmoke;
        resize: none;
        outline: none;
        width: 400px;
        height: 125px;
        font-family: 'Open Sans', sans-serif;
        color: #571C5E;
        padding: 10px;
        margin: 10px 0px;
      }

      .submit-body:hover,
      .submit-body:focus,
      .submit-body:active {
        box-shadow: 0px 0px 2px darkslategrey
      }

      .new-comment-pane-hidden {
        visibility: hidden;
        height: 0px;
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
        body: commentBody,
        is_reply: false
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
    const response = await fetch(`/api/get-comment?uid=${targetUID}`, {headers: {
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

    const submittedTime = new Date(comment.submitted_time).toLocaleString();

    let editedTime = '';
    if(isEdited){
      editedTime = new Date(comment.edited_time).toLocaleString();
    }

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

    const commentBody = this.shadowRoot.querySelector(".submit-body");
    if (commentBody.value.trim() !== ''){
      const newComment = await this.createComment(commentBody.value);
      commentBody.value = '';
      this.commentList = await this.getAllComments();
    }
    this.hideNewCommentPane();
  }

  validateSubmitButton(){
    console.log("NEW INPUT");
    const submitButton = this.shadowRoot.querySelector(".submit-button");
    const commentBody = this.shadowRoot.querySelector(".submit-body");
    if (commentBody.value.trim() == ''){
      console.log(commentBody.value);
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  showCommentPane(){
    this.shadowRoot.querySelector('.new-comment-pane-hidden').classList.add('new-comment-pane-visible');
    this.shadowRoot.querySelector('.new-comment-pane-visible').classList.remove('new-comment-pane-hidden');
  }

  hideNewCommentPane(){
    this.shadowRoot.querySelector('.new-comment-pane-visible').classList.add('new-comment-pane-hidden');
    this.shadowRoot.querySelector('.new-comment-pane-hidden').classList.remove('new-comment-pane-visible');

  }

  cancelComment(){
    this.hideNewCommentPane();
    this.shadowRoot.querySelector('.submit-body').value = "";
    this.validateSubmitButton();
  }

  querySpecificComment(){
    const uid = prompt("Enter the comment's UID here and view it's return in the console: ", "UID");
    console.log(this.getSpecificComment(uid));
  }

  render() {
    if (!this.threadEnabled) {
      // TODO: add different cases for various thread permissions
      return html`
        <div class="center" id="Nest">
          <h2>Login to See the Comments!</h2>
          <jwt-auth authendpoint="/api/auth/"></jwt-auth>
        </div>
      `;
    }
    return html`
      <div class="entire-thread">

        <div class="command-center">
          <button class="create-comment" @click=${this.showCommentPane}> New Comment </button>
          <button class="create-comment" @click=${this.createUser}> Create User </button>
          <button class="create-comment" @click=${this.getAllComments}> Get All Comments </button>
          <button class="create-comment" @click=${this.querySpecificComment}> Get Specific Comment </button>
        </div>

        <div class="new-comment-pane-hidden">
          <p class="comment-prompt">
            Have Something to Say? Leave a Comment Below!
          </p>
          <textarea class="submit-body" @input=${this.validateSubmitButton} ></textarea>
          <div class="comment-pane-buttons">
            <button class="create-comment" @click=${this.cancelComment}>Cancel</button>
            <button class="create-comment submit-button" @click="${this.initiateCreateComment}" disabled>Submit</button>
          </div>
        </div>
        <div>
          ${this.commentList.map(commentArray => commentArray.map(comment => html` ${this.renderComment(comment)} `) )}
        </div>
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
customElements.define(DaPenguinsThread.tag, DaPenguinsThread);
