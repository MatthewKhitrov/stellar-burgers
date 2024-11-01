const chooseBuns = 'Выберите булки';
const chooseFilling = 'Выберите начинку';
const buns = 'Булки';
const filleng = 'Начинки';
const sauces = 'Соусы';
const ingredientDetails = 'Детали ингредиента';
const exampleIngredient = 'Катлета из марсианского Бобра Летуна';
const addButton = 'Добавить';

describe('Тестирование бургерной', () => {
  // Выполнение перхватов запросов перед посещением страницы
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'ingredients'}`);
  });

  // Тестирование открытия страницы
  beforeEach('Открытие главной страницы', () => {
    cy.visit('/');
  });

  // Тестирование добавления ингридиентов в конструктор
  describe('Тестирование добавления ингредиентов в конструктор', () => {
    it('Добавление булок в конструктор', () => {
      cy.get('div').contains(chooseBuns).should('exist');
      cy.get('h3').contains(buns).next('ul').contains(addButton).click();
      cy.get('div').contains(chooseBuns).should('not.exist');
    });
    it('Добавление соусов в конструктор', () => {
      cy.get('div').contains(chooseFilling).should('exist');
      cy.get('h3').contains(sauces).next('ul').contains(addButton).click();
      cy.get('div').contains(chooseFilling).should('not.exist');
    });
    it('Добавление начинок в конструктор', () => {
      cy.get('div').contains(chooseFilling).should('exist');
      cy.get('h3').contains(filleng).next('ul').contains(addButton).click();
      cy.get('div').contains(chooseFilling).should('not.exist');
    });
  });

  // Тестирование открытия и закрытия модального окна
  describe('Тестирование открытия/закрытия модального окна', () => {
    beforeEach('открытие модального окна', () => {
      cy.contains(exampleIngredient).click();
    });
    it('Закрытие модального окна по крестику', () => {
      cy.contains(ingredientDetails).should('exist');
      cy.get(`[data-test='modal-close']`).click();
      cy.contains(ingredientDetails).should('not.exist');
    });
    it('Закрытие модального окна по оверлею', () => {
      cy.contains(ingredientDetails).should('exist');
      cy.get(`body`).type('{esc}');
      cy.contains(ingredientDetails).should('not.exist');
    });
  });
});

// Тестирование создания заказа
describe('Тестирование сбор заказа', () => {
  beforeEach('Авторизация пользователя', () => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as(`${'user'}`);
    // Перехват обращения к API
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as(`${'order'}`);
  });

  // Сборка бургерва, оформление, проверка открытия модалки заказа
  it('Сбор бургера и оформление заказа', () => {
    //Сбор бургера
    cy.visit('/');
    cy.get('h3').contains(buns).next('ul').contains(addButton).click();
    cy.get('h3').contains(filleng).next('ul').contains(addButton).click();
    cy.get('h3').contains(sauces).next('ul').contains(addButton).click();

    // Клик по кнопке оформить
    cy.contains('Оформить заказ').click();

    //Проверка открытия модального окна
    cy.contains('1').should('exist');

    //Проверка верный ли код
    cy.wait('@order').its('response.statusCode').should('eq', 200);

    // Закрытие модалки
    cy.get(`[data-test='modal-close']`).click();

    // Проверка пустой ли конструктор
    cy.get('div').contains(chooseBuns).should('exist');
    cy.get('div').contains(chooseFilling).should('exist');
  });
});
