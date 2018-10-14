import React from "react";
import Page from "client/layout/page";
import Example from "client/components/example";
import Icon from "client/components/icon";
import Form from 'client/components/form';

import style from "./styles.css";

export default () => (
  <Page>
    <div className={style.firstScreen}>
      <div className={style.firstScreenInner}>
        <p>Чем старше фирма, тем гуще логотипы.</p>
        <p>На пледах, полотенцах, кружках и майках вы уже отметились.</p>
        <p>Продуктовые корзины – два раза.</p>
        <p>Самое время прийти к нам.</p>
        <p>
          Корпоративные новеллы, мемуары, записки, дневники, памфлеты, повести, поэмы, рассказы и
          даже романы.
        </p>
        <p>Детективы, триллеры, эпосы, оды, баллады, трагедии, эпиграммы, комедии.</p>
      </div>
    </div>
    <div className={style.secondScreen}>
      <div className={style.secondScreenInner}>
        <p>Шикарная подарочная обложка и захватывающее содержание.</p>
        <p>И это только ваше и ничье больше.</p>
        <p>Индивидуальность 80 LVL.</p>
        <p>Мы работаем высоко технологичными гусиными перьями и нано чернилами.</p>
        <p>
          Повод любой - Новый год или ДР фирмы, День десантника или 8 марта, Мы сделаем книгу нужной
          тематики и жанра.
        </p>
      </div>
    </div>
    <div className={style.thirdScreen} id="gifts">
      <div className={style.thirdScreenInner}>
        <p className={style.center}>
          Как это работает<br />&darr;
        </p>
        <Example />
      </div>
    </div>
    <div className={style.fourthScreen}>
      <div className={style.fourthScreenInner}>
        <div className={style.whiteScreenHeader}>Интересно. Рассказывайте подробно</div>
        <div className={style.fourthScreenCols}>
          <div className={style.fourthScreenCol}>
            <p className={style.fourthScreenColHeader}>
              <Icon name="lightbulb-o" />{" "}
              <span className={style.fourthScreenColHeaderSpan}>Что хотите вы</span>
            </p>
            <p>
              Вы хотите такую штуку. Позвоните или напишите нам. Мы предлагаем выбрать жанр, объем ,
              сюжетную линию. Это может быть знакомый сюжет или что-то новое.
            </p>
            <p>Надо – упакуем, в коробочки с ленточками и бантиками.</p>
          </div>
          <div className={style.fourthScreenCol}>
            <p className={style.fourthScreenColHeader}>
              <Icon name="pencil" />{" "}
              <span className={style.fourthScreenColHeaderSpan}>Что делаем мы</span>
            </p>
            <p>Мы приходим к вам и беседуем обо всем, что надо для сюжета</p>
            <p>Нет времени лясы точить – пришлем бриф.</p>
            <p>
              Наши авторы сочиняют интересную вещицу, с вашими именами, героями, проблемами и
              радостями, успехами и забавными происшествиями. Согласовываем текст и печатаем тираж
              нужного формата и количества. Иллюстрации сделаем, обложка – гвозди можно забивать.
            </p>
          </div>
          <div className={style.fourthScreenCol}>
            <p className={style.fourthScreenColHeader}>
              <Icon name="check" />{" "}
              <span className={style.fourthScreenColHeaderSpan}>Что получится</span>
            </p>
            <p>
              Ваши сотрудники, партнеры, коллеги, дети коллег или дети партнеров, конкуренты, кто
              угодно получают забавный, необычный подарок. Такого ни у кого нет, только у вас. Это
              не просто подарок, это инвестиция. Через 20 лет продаете фолиант на аукционе Кристи и
              покупаете остров в Индийском океане.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={style.fifthScreen} id="options">
      <div className={style.fifthScreenInner}>
        <p>
          Примеры обложек: Три картинки и под ними подпись Яркая, твердая, стильная, любая обложка.
        </p>
        <p>Приклеенная насмерть.</p>
      </div>
    </div>
    <div className={style.sixthScreen}>
      <div className={style.sixthScreenInner}>
        <div className={style.whiteScreenHeader}>На нас работают лучшие авторы</div>
        <div className={style.sixthScreenMediaBg}>
        <img src="/assets/bulgakov.jpg" style={{position: 'absolute', top: 0, left: 0, width: 300, transform: 'rotate(20deg)'}}/>
        <img src="/assets/conan-doil.jpg" style={{position: 'absolute', top: -10, left: 370, width: 300, transform: 'rotate(-10deg)'}}/>
        <img src="/assets/cristi.jpg" style={{position: 'absolute', top: 10, left: 640, width: 300, transform: 'rotate(15deg)'}}/>
        <img src="/assets/gardner.jpg" style={{position: 'absolute', top: -20, left: 950, width: 250, transform: 'rotate(-20deg)', zIndex: 2}}/>
        <img src="/assets/gogol.jpg" style={{position: 'absolute', top: 210, left: 60, width: 400, transform: 'rotate(-15deg)'}}/>
        <img src="/assets/ilf-petrov.jpg" style={{position: 'absolute', top: 275, left: 400, width: 400, transform: 'rotate(5deg)'}}/>
        <img src="/assets/pushkin.jpg" style={{position: 'absolute', top: 220, left: 800, width: 400, transform: 'rotate(-10deg)', zIndex: 1}}/>
        </div>
        <div className={style.sixthScreenCaption}>
        Саша Пушкин, Антоша Чехов, Миша Булгаков, Эрик Гарднер Женя
        Петров и Илюша Ильф, Агаша Кристи, Коля Гоголь, Артик Конан-Дойль и др.
        </div>
      </div>
    </div>
    <div className={style.seventhScreen} id="price">
      <div className={style.seventhScreenInner}>Цены Сроки</div>
    </div>
    <div className={style.eighthScreen} id="contact">
      <div className={style.eighthScreenInner}>
        <div className={style.whiteScreenHeader}>Хочу</div>
        <Form/>
      </div>
    </div>
    <div className={style.ninthScreen}>
      <div className={style.ninthScreenInner}>
        <p>
          Британские ученые выяснили: Если на Новый год всем сотрудникам подарить по книге «Как
          экономить бюджет», шеф перестанет пить, курить, похудеет на 10 кг и поднимет всем
          зарплату.
        </p>
        <p>Контакты</p>
      </div>
    </div>
  </Page>
);
