**Задание 1. Выполнил первые 2 уровня (Проектирование, Планирование изменений).**

Компоненты приложения до выполнения задания: 

AddPlacePopup - использует PopupWithForm
App - основной компонент приложения
ProtectedRoute - редиректит на signin
Card - карточка доступен текущему пользователю CurrentUserContext
EditAvatarPopup - использует PopupWithForm доступен текущему пользователю CurrentUserContext
EditProfilePopup - использует PopupWithForm
Footer - шапка основной страницы
Header - подвал основной страницы
ImagePopup - всплывающее окно с изображением
InfoTooltip - сообщение об успешной/неуспешной регистрации
Login - форма логина
Main - основная страница доступен текущему пользователю CurrentUserContext
PopupWithForm - всплывающее окно "сохранить"
ProtectedRoute - редиректит на регистрацию
Register - регистрация


Функциональность Mesto:

1) Загрузка фотографий
2) Удаление фотографий
3) Сбор и учёт лайков под фото
4) Создание профиля и его редактирование

Варианты фреймворков:

1) Module Federation позволяет независимым приложениям использовать общий код во время выполнения. Команды, которые разрабатывают разные микрофронтенды, смогут получить доступ к коду друг друга до развёртывания.
Module Federation основан на функции lazy loading. Она позволяет приложению загружать фрагменты кода по требованию. Это сокращает время первоначальной загрузки и помогает оптимизировать использование ресурсов.
2) Single SPA позволяет интегрировать микрофронтенды, созданные на различных JavaScript-фреймворках, в одно приложение, обеспечивая их независимость при совместной работе
Lazy loading (ленивая загрузка) — приложение загружает фрагменты кода по требованию. Это улучшает время первоначальной загрузки и производительность.
Независимая развёртываемость — каждый микрофронтенд можно развернуть независимо. Так проще поддерживать большие приложения, над которыми работают несколько команд.

Для выполнения задания выбран фреймворк Module Federation так как весь код написан на React, предпосылок для разделения на разные фреймворки нет (по условиям задания).

Выполнение задания

1. На первом шаге я ознакомился с компонентами и разделил их по каталогам в frontend/src/components:

/frontend/src/components/auth - Компоненты отвечающие за авторизацию
/frontend/src/components/photos - Функционал работы с фотографиями/картинками (основной функционал приложения)
/frontend/src/components/profile - Профиль пользователя

Разделив js-код следующим образом я поправил ссылки и запустил сборку. Работает успешно, в браузере js код разложен по каталогам.

2. На втором шаге я перешел к созданию модулей по Module Federation в каталоге frontend-modules:

/frontend-moduled/auth-microfrontend - Микрофронтенд авторизации
/frontend-moduled/photos-microfrontend - Микрофронтенд фотографий
/frontend-moduled/profile-microfrontend - Микрофронтенд профиля пользователя
/frontend-moduled/host - основной микрофронтенд

Компоненты вынес в exposes для каждого микрофронтенда. В host добавил в App.jsx добавил ссылки на компоненты.

**Задание 2. Микросервисы** 

Разбивку монолита на микросервисы выполнил в файле arch_template_task2.drawio

https://app.diagrams.net/#HLaborant90%2Fsprint_1%2Fmain%2Farch_template_task2.drawio#%7B%22pageId%22%3A%227j0TXYk0JpZNQkAnFjsh%22%7D

Сценарий создания заказа

1. Поиск товара для заказа. Пользователь выбирает/ищет товар по наименованию: Запрос из микрофронтенда заказы к микросервису поиска. Микросервис поиска обращается к микросервису товаров.
2. Ответ микросервиса поиска с данными товара
3. Создание заказа. Пользователь указывает наименование товара, количество товара. Отправляется запрос на создание заказа к микросервису заказов.
4. Ответ с идентификатором заказа
5. Подтверждение заказа. Пользователь подтверждает заказ (инициируется оплата заказа)
6. Оплата заказа. Запрос в платежный сервис с данными заказа (идентификатор пользователя, идентификатор заказа, сумма). Микросервис платежей фиксирует в базе данные заказа.
7. Микросервис платежей инициирует платеж отправляя запрос во внешнюю систему (платёжный сервис).
8. Предоставить статус платежа — платёжный сервис принял запрос на проведение оплаты, подтвердил возможность проведения платежа со счёта клиента, назначил идентификатор для этой транзакции и установил статус.
9. Подтверждение платежа — микросервис платежей уведомляет платёжный сервис о подтверждении операции, отправляя ID транзакции.
10. Микросервис платежей запрашивает статус платежа — микросервис платежей отправляет запрос в платёжный сервис для получения текущего статуса обработки транзакции по ID.
11. Микросервис платежей со статусом оплаты заказа
12. Нотификация изменения статуса заказа - отправка события нотификации с данными заказа

Техническая реализация - допустим, что в компании существует несколько команд Java разработчиков, поэтому основной стек ориентируем на Java. В качестве БД выберем Postgresql.

Микросервисы:

1. Авторизация - авторизация пользователя в системе, проверка токена безопасности
2. Профиль пользователя - редактирование профиля пользователя
3. Аукционы - создание и обновление данных аукциона
4. Услуги - создание и редактирование услуг
5. Заявки на аппеляции - создание и редактирование заявок на аппеляции
6. Техподдержка - создание и редактирование заявок на техподдержку
7. Отчётность - сервис генерации отчётов (обращается напрямую к БД, в качестве движка отчётов можно использовать JasperServer)
8. Сервис нотификаций - отправка нотификаций
9. Заказы - создание заказа, редатирование заказа, подтверждение заказа, размещение заказа. сохранение заказа
10. Товары - поиск товаров, добавление, редактирование товаров
11. Поиск - поиск товаров и услуг
12. Платежи - инициирует и обрабатывает платежную операцию

Микрофронтенды:

1. Регистрация пользователя - регистрация пользователя
2. Профиль пользователя - редатирование профиля пользователя
3. Аукционы - создание аукциона, подача заявки на аукцион
4. Услуги - размещение услуг
5. Заказы - размещение заказа