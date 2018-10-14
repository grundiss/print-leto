import * as React from "react";
import cx from "classnames";
import {
  CREATE_TOYS_DETECTIVE,
  CREATE_TOYS_COMEDY,
  CREATE_TOYS_FANTASY,
  CREATE_FURNITURE_DETECTIVE,
  CREATE_FURNITURE_COMEDY,
  CREATE_SOUVENIRS_DETECTIVE,
  CREATE_SOUVENIRS_COMEDY,
  CREATE_SECRET_DEVICES_DETECTIVE,
  CREATE_SECRET_DEVICES_COMEDY,
  CREATE_SECRET_FANTASY,
  SELLS_FLOWERS_DETECTIVE,
  SELLS_FLOWERS_COMEDY,
  SELLS_BOOKS_DETECTIVE,
  SELLS_HOUSING_DETECTIVE,
  SELLS_HOUSING_COMEDY,
  SELLS_SECRET_DETECTIVE,
  SERVICE_MONEY_DETECTIVE,
  SERVICE_KNOWLEDGE_DETECTIVE,
  SERVICES_POWER_DETECTIVE,
  SERVICE_ALL_DETECTIVE,
} from "./example.data";
import Modal from "./modal";

import style from "./example.css";

const companyTypes = [
  { name: "Производит", id: "creates" },
  { name: "Продает", id: "sells" },
  { name: "Оказывает услуги", id: "services" },
];

const companyBusiness = [
  { name: "Игрушки", relatesTo: "creates", id: "toys" },
  { name: "Мебель", relatesTo: "creates", id: "furniture" },
  { name: "Сувениры", relatesTo: "creates", id: "souvenirs" },
  { name: "Секретные девайсы", relatesTo: "creates", id: "secretDevices" },

  { name: "Цветы", relatesTo: "sells", id: "flowers" },
  { name: "Книги", relatesTo: "sells", id: "books" },
  { name: "Тазики & Ведра", relatesTo: "sells", id: "housing" },
  { name: "Не скажу, секрет", relatesTo: "sells", id: "secret" },

  { name: "Деньгами", relatesTo: "services", id: "money" },
  { name: "Знаниями", relatesTo: "services", id: "knowledge" },
  { name: "Силой", relatesTo: "services", id: "power" },
  { name: "Всем подряд", relatesTo: "services", id: "all" },
];

const genres = [
  { name: "Детектив", id: "detective" },
  { name: "Комедия", id: "comedy" },
  { name: "Фэнтази", id: "fantasy" },
];

const texts = {
  "creates|toys|detective": CREATE_TOYS_DETECTIVE,
  "creates|toys|comedy": CREATE_TOYS_COMEDY,
  "creates|toys|fantasy": CREATE_TOYS_FANTASY,

  "creates|furniture|detective": CREATE_FURNITURE_DETECTIVE,
  "creates|furniture|comedy": CREATE_FURNITURE_COMEDY,
  "creates|furniture|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "creates|souvenirs|detective": CREATE_SOUVENIRS_DETECTIVE,
  "creates|souvenirs|comedy": CREATE_SOUVENIRS_COMEDY,
  "creates|souvenirs|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "creates|secretDevices|detective": CREATE_SECRET_DEVICES_DETECTIVE,
  "creates|secretDevices|comedy": CREATE_SECRET_DEVICES_COMEDY,
  "creates|secretDevices|fantasy": CREATE_SECRET_FANTASY,

  "sells|flowers|detective": SELLS_FLOWERS_DETECTIVE,
  "sells|flowers|comedy": SELLS_FLOWERS_COMEDY,
  "sells|flowers|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "sells|books|detective": SELLS_BOOKS_DETECTIVE,
  "sells|books|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "sells|books|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "sells|housing|detective": SELLS_HOUSING_DETECTIVE,
  "sells|housing|comedy": SELLS_HOUSING_COMEDY,
  "sells|housing|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "sells|secret|detective": SELLS_SECRET_DETECTIVE,
  "sells|secret|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "sells|secret|fantasy": /* same as */ CREATE_TOYS_FANTASY,

  "services|money|detective": SERVICE_MONEY_DETECTIVE,
  "services|money|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "services|money|fantasy": /* same as */ CREATE_SECRET_FANTASY,

  "services|knowledge|detective": SERVICE_KNOWLEDGE_DETECTIVE,
  "services|knowledge|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "services|knowledge|fantasy": /* same as */ CREATE_SECRET_FANTASY,

  "services|power|detective": SERVICES_POWER_DETECTIVE,
  "services|power|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "services|power|fantasy": /* same as */ CREATE_SECRET_FANTASY,

  "services|all|detective": SERVICE_ALL_DETECTIVE,
  "services|all|comedy": /* same as */ SELLS_FLOWERS_COMEDY,
  "services|all|fantasy": /* same as */ CREATE_SECRET_FANTASY,
};

export default class Example extends React.Component {
  state = {
    companyTypeId: companyTypes[0].id,
    companyBusinessId: companyBusiness[0].id,
    genreId: genres[0].id,
    modalOpen: false,
  };

  onChangeCompanyType = ({ target: { value } }) => {
    const update = { companyTypeId: value };

    if (companyBusiness.find(({ id }) => id === this.state.companyBusinessId).relatesTo !== value) {
      update.companyBusinessId = companyBusiness.find(({ relatesTo }) => relatesTo === value).id;
    }

    this.setState(update);
  };

  onChangeCompanyBusiness = event => {
    this.setState({ companyBusinessId: event.target.value });
  };

  onChangeGenre = event => {
    this.setState({ genreId: event.target.value });
  };

  onShow = () => {
    this.setState({ modalOpen: true });
  };

  onHide = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { companyTypeId, companyBusinessId, genreId, modalOpen } = this.state;
    const key = `${companyTypeId}|${companyBusinessId}|${genreId}`;
    const textBlocks = texts[key] || texts["creates|toys|detective"];

    return (
      <div>
        <div className={style.soYouAre}>Вы — крутая контора, которая...</div>
        <div className={style.cols}>
          <div className={style.col}>
            {companyTypes.map(({ name, id }) => (
              <label
                key={id}
                className={cx(style.label, { [style.selected]: id === companyTypeId })}
              >
                <input
                  type="radio"
                  name="companyType"
                  value={id}
                  onChange={this.onChangeCompanyType}
                  checked={id === companyTypeId}
                />
                <div className={style.caption}>{name}</div>
              </label>
            ))}
          </div>
          <div className={style.col}>
            {companyBusiness
              .filter(({ relatesTo }) => relatesTo === companyTypeId)
              .map(({ name, id }) => (
                <label
                  key={id}
                  className={cx(style.label, { [style.selected]: id === companyBusinessId })}
                >
                  <input
                    type="radio"
                    name="companyBusiness"
                    value={id}
                    onChange={this.onChangeCompanyBusiness}
                    checked={id === companyBusinessId}
                  />
                  <div className={style.caption}>{name}</div>
                </label>
              ))}
          </div>
          <div className={style.col}>
            {genres.map(({ name, id }) => (
              <label key={id} className={cx(style.label, { [style.selected]: id === genreId })}>
                <input
                  type="radio"
                  name="genre"
                  value={id}
                  onChange={this.onChangeGenre}
                  checked={id === genreId}
                />
                <div className={style.caption}>{name}</div>
              </label>
            ))}
          </div>
        </div>
        <div className={style.go}>
          <button onClick={this.onShow} className={style.goButton}>Показать</button>
        </div>
        {modalOpen && (
          <Modal onRequestClose={this.onHide}>
            {textBlocks.map((block, i) => <p key={i}>{block}</p>)}
          </Modal>
        )}
      </div>
    );
  }
}
