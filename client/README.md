## **Тестовое задание для стажёра Frontend (осенняя волна 2026\)**

### **Система бронирования переговорных комнат**

## Запуск проекта

Требуется Node.js версии 20 или выше.

### 1. Сервер (Backend)

    cd server
    npm install
    npm run dev

Сервер запустится на http://localhost:3000.

### 2. Клиент (Frontend)

    cd client
    npm install
    npm run dev

Приложение откроется на http://localhost:5173.

### 3. Запуск тестов

    cd client
    npm test

## Архитектура

Проект организован по методологии FSD в упрощенном виде (без слоя widgets):

- src/pages — маршруты и экраны приложения (rooms, room, booking, NotFoundPage)
- src/features — пользовательские сценарии (book-room, booking-cancel, room-filters, room-schedule и др.)
- src/entities — модели данных и API сущностей (room, booking, office, user)
- src/shared — переиспользуемые UI-компоненты, хуки и базовый клиент apiFetch
- tests — вынесенные в отдельную папку юнит-тесты

## Стек технологий

- React 19 + TypeScript — основной интерфейс
- Vite — сборка
- React Router — маршрутизация между страницами
- Material UI, MUI Date Pickers — готовые базовые компоненты и календарь
- date-fns — форматирование и валидация дат со слотом на русском языке
- WebSocket — обновление расписания в реальном времени
- Vitest + React Testing Library — юнит тестирование компонентов и хуков

## Тесты

Тесты расположены в папке client/tests/:

- timeMask.test.tsx — проверка маски ввода времени и автоподстановки двоеточия
- dateLimits.test.ts — проверка ограничения календаря на выбор дат в пределах 30 дней
- scheduleError.test.tsx — проверка экрана ошибки расписания и вызова повторной загрузки
- bookingCard.test.tsx — проверка отображения карточки встречи и скрытия кнопки отмены для прошедших броней

Дополнительные задания не реализовывались
