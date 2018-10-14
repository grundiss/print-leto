import * as React from "react";
import ReactDOM from "react-dom";

import css from './modal.css';

export default class Modal extends React.Component {
  paranja = null;
  container = null;
  state = { mounted: false };

  componentDidMount() {
    this.paranja = document.createElement("div");
    this.paranja.className = css.paranja;
    this.paranja.addEventListener('click', this.props.onRequestClose);

    document.body.appendChild(this.paranja);

    this.container = document.createElement("div");
    this.container.className = css.container;

    document.body.appendChild(this.container);

    document.body.classList.add(css.bodyLocker);

    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.paranja.remove();
    this.container.remove();

    document.body.classList.remove(css.bodyLocker);
  }

  render() {
    if (!this.state.mounted) {
      return null;
    }

    console.log(this);

    return ReactDOM.createPortal(
      <div>
        <div onClick={this.props.onRequestClose} className={css.closer}>&times;</div>
        {this.props.children}
      </div>,
      this.container
    );
  }
}
