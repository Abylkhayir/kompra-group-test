# Kompra Group Test

Тестовое задание на позицию Angular-разработчика в Kompra Group.

## 📦 Стек

- Angular 17
- TypeScript
- RxJS
- Standalone components
- Reactive Forms
- SCSS
- Unit tests (Jasmine/Karma)

## 🚀 Запуск проекта

npm install
ng serve


Авторизация
Простая форма логина:

Валидация: логин на кириллице, пароль ≥ 3 символов

Тестовые данные:

Логин: admin

Пароль: admin

🧪 Юнит-тесты
bash
Копировать
Редактировать
ng test
Покрытие: базовая проверка формы и логики авторизации

Структура
bash
Копировать
Редактировать
src/
  ├── app/
  │   ├── authorization/        # Standalone компонент авторизации
  │   ├── pages/                # Основные страницы
  │   └── shared/               # Сервисы и валидаторы
