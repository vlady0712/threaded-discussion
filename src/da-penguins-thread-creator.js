import {LitElement, html, css} from 'lit';
import 'jwt-auth-component';
import '@lrnwebcomponents/simple-colors';

class ThreadCreator extends LitElement {
  static get styles() {
          return css`
            :host {
                font-family: 'Open Sans', sans-serif;
                font-size: 18px;
                color: black;
                --accent-color-dark: #6A8A93;
                --accent-color-med: #889BA3;
                --accent-color-light-1: #aababc;
                --accent-color-light-2: #E8E2DE;
                --accent-color-light-3: var(--simple-colors-default-theme-accent-3);
                --accent-color-white: var(--simple-colors-default-theme-accent-2);
            }

            .create-thread {
                background-color: var(--accent-color-light-1);
                color: var(--accent-color-light-2);
                text-align: center;
                border: none;
                border-radius: 10px;
                padding: 15px 20px;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }

            .create-thread:hover,
            .create-thread:focus,
            .create-thread:active {
                box-shadow: 0px 0px 2px var(--accent-color-dark);
            }

          `
  }

  static get properties() {
      return {
        isEnabled: {type: Boolean}

      }
    
  }

  constructor() {
    super();
    if (window.localStorage.getItem('comment-jwt')){
        this.isEnabled = true;
    } else {
        this.isEnabled = false;
    }

    this.addEventListener('auth-success', this.authsucks);
  }

  async createNewThread() {
    console.log("Create new thread")
    try{
        const createResponse = await fetch('/api/create-thread', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('comment-jwt')}`
            },
            method: 'PUT',
            body: JSON.stringify({
                permissions: this.shadowRoot.querySelector("#permissionField").value,
                domain: window.location.href
            })
        }).then(
            (res) => {
                if (res.ok){ return res.json(); }
                return null;
        }).then(
            (res) => {
                console.log(res.uid);
                this.showNewThread(res.uid)
                return res
            }
        )
    } catch(err) {
        console.log(err)
    }
  }

  showNewThread(threadUid) {
      const newThreadEvent = new CustomEvent('thread-created', {
          bubbles: true,
          composed: true,
          detail: {
              uid: threadUid
          }
      });
      this.dispatchEvent(newThreadEvent);
  }

  async authsucks() {
    this.threadEnabled = true;
  }


  render() {
      if (this.isEnabled){
        return html`
            <p><strong>New thread for: </strong> ${window.location.href}</p>
            <select id="permissionField" name="permissions">
                <option value="777">Full Public Access</option>
                <option value="774">Read Only Public Access</option>
                <option value="770">Full Internal Access</option>
                <option value="744">Read Only Internal and Public Access</option>
                <option value="740">Read Only Internal Access</option>
            </select>
            <button class="create-thread" @click=${this.createNewThread}>Create Thread</button>
        `
      } 
        return html`
        <div class="center" id="Auth">
            <h2>Please login to proceed:</h2>
            <jwt-auth authendpoint="/api/auth/"></jwt-auth>
        </div>
        `;
      
    
  }
}
customElements.define('thread-creator', ThreadCreator);