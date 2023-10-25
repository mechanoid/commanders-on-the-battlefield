export class CommandersOnTheBattleField extends HTMLElement {
  connectedCallback() {
    console.log('connected');

  }
}

customElements.define('cotb-game-area', CommandersOnTheBattleField)
