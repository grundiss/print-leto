import * as React from "react";
import MaskedInput from "react-maskedinput";
import cx from "classnames";
import Icon from "client/components/icon";

import style from "./form.css";

export default class Form extends React.Component {
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {
      name: false,
      phone: false,
      email: false,
    },
    loading: false,
    success: "unknown",
  };

  onChangeName = ({ target: { value } }) => {
    this.setState({ name: value, errors: { ...this.state.errors, name: false } });
  };

  onChangePhone = ({ target: { value } }) => {
    this.setState({ phone: value, errors: { ...this.state.errors, phone: false } });
  };

  onChangeEmail = ({ target: { value } }) => {
    this.setState({ email: value, errors: { ...this.state.errors, email: false } });
  };

  onSubmit = ({ target: { name: contactMethod } }) => {
    const { name, phone, email } = this.state;
    const errors = {};

    if (!name) {
      errors.name = true;
    }

    if (contactMethod === "call-me" && phone.replace(/[^\d]/g, "").length < 10) {
      errors.phone = true;
    } else if (contactMethod === "email-me" && !/^.+@.+$/.test(email)) {
      errors.email = true;
    }

    if (Object.keys(errors).length) {
      this.setState({ errors });

      return;
    }

    this.setState({ loading: true });

    fetch("/order", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name, phone, email, contactMethod }),
    })
      .then(response => {
        return response.json();
      })
      .then(({ success }) => {
        this.setState({ success, loading: false });
      })
      .catch(() => {
        this.setState({ success: false, loading: false });
      });
  };

  render() {
    return (
      <div>
        <table className={style.form}>
          <tbody>
            <tr>
              <th className={style.label}>Имя</th>
              <td>
                <input
                  type="text"
                  className={cx(style.input, { [style.inputError]: this.state.errors.name })}
                  onChange={this.onChangeName}
                  value={this.state.name}
                />
              </td>
            </tr>
            <tr>
              <th className={style.label}>Телефон</th>
              <td>
                <MaskedInput
                  className={cx(style.input, { [style.inputError]: this.state.errors.phone })}
                  mask="+7 (111) 111-11-11"
                  onChange={this.onChangePhone}
                  value={this.state.phone}
                />
              </td>
            </tr>
            <tr>
              <th className={style.label}>email</th>
              <td>
                <input
                  type="text"
                  className={cx(style.input, { [style.inputError]: this.state.errors.email })}
                  onChange={this.onChangeEmail}
                  value={this.state.email}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.goBlock}>
          {((loading, success) => {
            if (loading) {
              return "Обработка...";
            }

            if (success === true) {
              return "Заявка отправлена! Скоро наш менеджер свяжется с вами";
            }

            return (
              <React.Fragment>
                {!success && (
                  <div>
                    Что-то пошло не так :(<br />Пожалуйста, попробуйте позже
                  </div>
                )}
                <button className={style.button} name="call-me" onClick={this.onSubmit}>
                  <Icon name="phone" /> Позвоните мне
                </button>{" "}
                <button className={style.button} name="email-me" onClick={this.onSubmit}>
                  <Icon name="envelope" /> Напишите мне
                </button>
              </React.Fragment>
            );
          })(this.state.loading, this.state.success)}
        </div>
      </div>
    );
  }
}
