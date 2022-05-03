import { html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors/simple-colors.js';
import 'jwt-auth-component';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/rpg-character/rpg-character.js';

export class DaPenguinsComment extends SimpleColors {
  static get tag() {
    return 'da-penguins-comment';
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;

          /* font info */
          font-family: 'Open Sans', sans-serif;
          color: black;

          /* Dimensions variables */
          --comment-width: 500px;
          --comment-height: calc(var(--comment-width) / 2.3);
          width: var(--comment-width);

          /* Color Scheming */
          --accent-color-dark: #6A8A93;
          --accent-color-med: #889BA3;
          --accent-color-light-1: #aababc;
          --accent-color-light-2: #E8E2DE;
          --accent-color-light-3: var(--simple-colors-default-theme-accent-3);
          --accent-color-white: var(--simple-colors-default-theme-accent-2);
        }

        .post-main {
          width: var(--comment-width);
          height: var(--comment-height);
          font-family: 'Open Sans', sans-serif;
          border: 1px solid var(--simple-colors-default-theme-accent-6);
          border-radius: 20px;
          padding: 10px;
          margin: 20px;
          background-color: var(--simple-colors-default-theme-accent-2);
          box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
        }

        .post-title {
          display: flex;
          background-color: var(--simple-colors-default-theme-accent-3);
          border: solid 1px var(--simple-colors-default-theme-accent-2);
          border-radius: 10px;
          padding-top: 10px;
          padding-bottom: 10px;
          width: var(--comment-width);
          height: calc(var(--comment-height) / 3);
        }

        .profile-pic {
          display: inline-flex;
          background-color: var(--simple-colors-default-theme-accent-7);
          border-radius: 50px;
          margin-left: 15px;
          margin-bottom: auto;
          height: 50px;
          width: 50px;
          vertical-align: center;
        }

        .title-content {
          display: block;
          margin-left: 20px;
          width: calc(var(--comment-width) * 0.8);
          line-height: 1.5;
        }

        .username {
          display: block;
          font-size: 20px;
          font-weight: bold;
        }

        .title-info {
          display: block;
          font-size: 12px;
        }

        .post-body {
          background-color: var(--simple-colors-default-theme-accent-3);
          border: solid 1px var(--simple-colors-default-theme-accent-2);
          border-radius: 10px;
          margin-top: 10px;
          width: var(--comment-width);
          height: calc(var(--comment-height) / 3);
          font-size: 14px;
        }

        .post-body-content {
          border: 1px solid transparent;
          border-radius: 10px;
          background-color: transparent;
          resize: none;
          outline: 0px;
          overflow: visible;
          width: calc(var(--comment-width) - 20px);
          height: calc((var(--comment-height)/ 3) - 15px);
          font-family: "Open Sans", sans-serif;
          color: rgb(0, 0, 0);
          padding: 5px;
          line-height: 1.5;
        }

        .edit-post-body {
          box-shadow: 0px 0px 5px var(--accent-color-light-2);
          background-color: var(--simple-colors-default-theme-accent-4);
        }

        .edit-post-blur > *:not(.edit-post-body, .edit-options-visible) {
          filter: blur(2px);
        }

        .comment-buttons-visible {
          visibility: visible;
          width: fit-content;
        }

        .comment-buttons-hidden {
          visibility: hidden;
          height: 0px;
        }

        .style-comment {
          background-color: var(--accent-color-light-1);
          color: var(--accent-color-light-2);
          text-align: right;
          border: none;
          border-radius: 10px;
          padding: 8px;
          font-size: 14px;
          margin: 4px 2px;
          cursor: pointer;
        }


        .style-comment:hover,
        .style-comment:focus,
        .style-comment:active {
          box-shadow: 0px 0px 2px var(--accent-color-dark);
        }

        .submit-button:disabled {
          background-color: var(--accent-color-dark) !important;
          color: var(--accent-color-light-1) !important;
          pointer-events: none;
        }

        .submit-button {
          background-color: var(--accent-color-dark);
          color: var(--accent-color-light-2);
        }

        .submit-button:hover,
        .submit-button:focus,
        .submit-button:active {
          box-shadow: 0px 0px 2px var(--accent-color-light-1);
        }

        .edit-options-hidden {
          visibility: hidden;
          height: 0px;
        }

        .edit-options-visible {
          visibility: visible;
          margin-top: 6px;
          width: fit-content;
        }

        .reply-pane-hidden {
          visibility: hidden;
          height: 0px;
        }

        .reply-pane-visible {
          visibility: visible;
          background-color: var(--simple-colors-default-theme-accent-2);
          box-shadow: 0 0 5px var(--simple-colors-default-theme-accent-7);
          border-radius: 20px;
          width: calc(var(--comment-width) - 10px);
          height: calc(var(--comment-height)/ 2);
          padding: 10px;
          margin: 0px 30px;
          font-family: "Open Sans", sans-serif;
        }

        .reply-pane-visible .style-comment {
          padding: 8px 6px;
          margin: 2px;
        }

        .reply-prompt {
          margin: 0px;
          color: var(--accent-color-dark);
          font-size: 14px;
        }

        .reply-body {
          border: solid 1px #cfccc5;
          border-radius: 5px;
          background-color: whitesmoke;
          resize: none;
          outline: 0px;
          width: 97%;
          height: 36px;
          font-family: "Open Sans", sans-serif;
          color: rgb(0, 0, 0);
          padding: 5px;
          margin-top: 6px;
          font-size: 12px;
        }

        .rpg {
          display: block;
        }

        .like-button {
          background-color: var(--simple-colors-default-theme-accent-4);
          border: solid 1px var(--accent-color-light-1);
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
        }

        .like-button:hover,
        .like-button:focus,
        .like-button:active {
          filter: invert(0.5);
          filter: opacity(0.3);
        }

      `,
    ];
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

    // Gets the ID NEEDED FOR GETTING COMMENTS
    this.threadID = null;

    this.UID = null;
    this.userUID = null;
    this.submittedTime = null;
    this.body = null;
    this.editedTime = null;
    this.isEdited = false;
    this.isReply = false;
    this.replyTo = null;
    this.likes = 0;
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      ...super.properties,
      imgSrc: { type: String, reflect: true, attribute: 'img-src' },
      imgKeyword: { type: String, attribute: 'img-keyword' },
      status: { type: String, reflect: true }, // Correct, incorrect, pending
      answerIcon: { type: Boolean, reflect: true },
      icon: { type: String },
      threadPermissions: { type: String },
      threadID: { type: String },

      UID: { type: String },
      userUID: { type: String },
      username: { type: String },
      submittedTime: { type: String },
      body: { type: String },
      editedTime: { type: String },
      isEdited: { type: Boolean },
      isReply: { type: Boolean },
      replyTo: { type: String },
      likes: { type: Number },
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
      // if (propName === 'likes' && this[propName] !== oldValue) {
      //   console.log(await this.getSpecificComment(this.UID));
      //   // this.likes = this.getSpecificComment(this.UID).likes;
      // }
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

  // eslint-disable-next-line class-methods-use-this
  async createComment(commentBody) {
    const response = await fetch('/api/submit-comment', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
      body: JSON.stringify({
        thread_uid: this.threadID,
        body: commentBody,
        is_reply: false,
      }),
    }).then(res => res.json());
    console.log(response);
    return response;
  }

  async createReply(replyBody) {
    const response = await fetch('/api/submit-comment', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
      body: JSON.stringify({
        thread_uid: this.threadID,
        body: replyBody,
        is_reply: true,
        reply_to: this.UID,
      }),
    }).then(res => res.json());

    console.log(response);
    console.log('specific comment: ');
    console.log(await this.getAllComments());
    return response;
  }

  async getAllComments() {
    const response = await fetch(`/api/get-comment?threadId=${this.threadID}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
    }).then(res => res.json());
    console.log(response);
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async getSpecificComment(targetUID) {
    const response = await fetch(`/api/get-comment?uid=${targetUID}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
    }).then(res => res.json());
    console.log(response);
  }

  async likeComment() {
    this.likes += 1;
    const response = await fetch(`/api/like-comment?uid=${this.UID}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
    }).then(res => res.json());
    console.log(response);
  }

  async deleteComment() {
    const response = await fetch(`/api/delete-comment?uid=${this.UID}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
    }).then(res => res.json());
    console.log(response);
    return response;
  }

  async handleDelete() {
    const deleteResponse = await this.deleteComment();
    console.log('response to delete', deleteResponse);

    const deleteEvent = new CustomEvent('comment-deleted', {
      bubbles: true,
      composed: true,
      detail: {
        commentId: this.UID,
      },
    });
    this.dispatchEvent(deleteEvent);
  }

  async editComment(newBody) {
    const response = await fetch('/api/edit-comment', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`,
      },
      body: JSON.stringify({
        uid: this.UID,
        body: newBody,
      }),
    }).then(res => res.json());
    console.log(response);
  }

  showEditingPane() {
    this.shadowRoot.querySelector('.post-body-content').readOnly = false;

    this.shadowRoot.querySelector('.edit-options-hidden').classList.add('edit-options-visible');
    this.shadowRoot.querySelector('.edit-options-visible').classList.remove('edit-options-hidden');
    
    this.shadowRoot.querySelector('.comment-buttons-visible').classList.add('comment-buttons-hidden');
    this.shadowRoot.querySelector('.comment-buttons-hidden').classList.remove('comment-buttons-visible');

    this.shadowRoot.querySelector('.post-body').classList.add('edit-post-body');
    this.shadowRoot.querySelector('.post-main').classList.add('edit-post-blur');
  }

  hideEditingPane() {
    this.shadowRoot.querySelector('.post-body-content').readOnly = true;

    this.shadowRoot.querySelector('.edit-options-visible').classList.add('edit-options-hidden');
    this.shadowRoot.querySelector('.edit-options-hidden').classList.remove('edit-options-visible');

    this.shadowRoot.querySelector('.comment-buttons-hidden').classList.add('comment-buttons-visible');
    this.shadowRoot.querySelector('.comment-buttons-visible').classList.remove('comment-buttons-hidden');

    this.shadowRoot.querySelector('.post-body').classList.remove('edit-post-body');
    this.shadowRoot.querySelector('.post-main').classList.remove('edit-post-blur');
  }

  cancelEdit() {
    this.hideEditingPane();
    this.shadowRoot.querySelector('.post-body-content').value = this.body;
    this.validateEditButton();
  }

  submitEdit() {
    const newBody = this.shadowRoot
      .querySelector('.post-body-content')
      .value.trim();
    if (newBody != '') {
      this.body = newBody;
      this.editComment(newBody);
      this.hideEditingPane();
    }
    this.getSpecificComment(this.UID);
  }

  validateEditButton() {
    const submitButton = this.shadowRoot.querySelector('#submit-edit');
    const commentBody = this.shadowRoot.querySelector('.post-body-content');
    if (commentBody.value.trim() == '') {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  showReplyPane() {
    this.shadowRoot
      .querySelector('.reply-pane-hidden')
      .classList.add('reply-pane-visible');
    this.shadowRoot
      .querySelector('.reply-pane-visible')
      .classList.remove('reply-pane-hidden');
  }

  hideReplyPane() {
    this.shadowRoot
      .querySelector('.reply-pane-visible')
      .classList.add('reply-pane-hidden');
    this.shadowRoot
      .querySelector('.reply-pane-hidden')
      .classList.remove('reply-pane-visible');
    this.validateReplyButton();
  }

  cancelReply() {
    this.hideReplyPane();
    this.shadowRoot.querySelector('.reply-body').value = '';
  }

  initiateCreateReply() {
    const replyBody = this.shadowRoot.querySelector('.reply-body').value.trim();
    if (replyBody != '') {
      this.createReply(replyBody);
      console.log('Where reply submission would occur');
      this.hideReplyPane();
    }
    console.log(`reply: ${replyBody}`);
    this.shadowRoot.querySelector('.reply-body').value = '';
    const replyEvent = new CustomEvent('reply-created', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(replyEvent);
  }

  validateReplyButton() {
    const replyButton = this.shadowRoot.querySelector('#submit-reply');
    const replyBody = this.shadowRoot.querySelector('.reply-body');
    if (replyBody.value.trim() == '') {
      replyButton.disabled = true;
    } else {
      replyButton.disabled = false;
    }
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="post-main">
        <div class="post-title">
          <div class="profile-pic">
           <rpg-character class="rpg" seed=${this.username} width="75" height="75" ></rpg-character>
          </div>
          <div class="title-content">
            <div class="username">${this.username ? this.username : 'Anonymous'}</div>
            <div class="title-info">
              <button class="like-button" @click=${this.likeComment}> <simple-icon-lite icon="favorite"></simple-icon-lite> ${this.likes}</button> 
              <br>
              ${this.submittedTime}; ${this.isEdited ? html`<i>edited: ${this.editedTime}</i>` : ''}
            </div>
          </div>
        </div>
        <div class="post-body">
          <textarea class="post-body-content" readonly @input=${this.validateEditButton}> ${this.body}</textarea >
        </div>
        <div class="comment-buttons-visible">
          <button class="style-comment" @click=${this.showEditingPane}> <simple-icon-lite icon="image:edit"></simple-icon-lite> Edit</button>
          ${!this.isReply ? html` <button class="style-comment" @click=${this.showReplyPane}> <simple-icon-lite icon="reply"></simple-icon-lite> Reply</button>` : html``}
          <button class="style-comment delete-button" @click=${this.handleDelete}><simple-icon-lite icon="delete"></simple-icon-lite> Delete</button>
        </div>
        <div class="edit-options-hidden">
          <button class="style-comment" @click=${this.cancelEdit}> Cancel </button>
          <button id="submit-edit" class="style-comment submit-button" @click=${this.submitEdit} disabled > Submit </button>
        </div>
      </div>
      <div class="reply-pane-hidden">
        <p class="reply-prompt">Add a Reply:</p>
        <textarea class="reply-body" @input=${this.validateReplyButton} placeholder="What Do You Think?" ></textarea>
        <div class="reply-pane-buttons">
          <button class="style-comment" @click=${this.cancelReply}> Cancel </button>
          <button id="submit-reply" class="style-comment submit-button" @click="${this.initiateCreateReply}" disabled > Reply </button>
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
customElements.define(DaPenguinsComment.tag, DaPenguinsComment);
