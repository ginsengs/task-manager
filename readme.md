# Разбор требований

## Таск-трекер

#### 1. Таск-трекер должен быть отдельным дашбордом и доступен всем сотрудникам компании UberPopug Inc.
- **Акторы:** - Пользователь
- **Команды** - ??
- **Данные**: - ??
- **События** - ??

#### 2. Авторизация в таск-трекере должна выполняться через общий сервис авторизации UberPopug Inc (у нас там инновационная система авторизации на основе формы клюва).
- **Акторы:** - Пользователь
- **Команды** - Вход в систему
- **Данные**: - ID пользователя; Форма клюва
- **События** - Пользователь авторизован

#### 3. В таск-трекере должны быть только задачи. Проектов, скоупов и спринтов нет, потому что они не умещаются в голове попуга.
???

#### 4. Новые таски может создавать кто угодно (администратор, начальник, разработчик, менеджер и любая другая роль). У задачи должны быть описание, статус (выполнена или нет) и рандомно выбранный попуг (кроме менеджера и администратора), на которого заассайнена задача.
- **Акторы:** - Пользователь
- **Команды** - Создать задачу
- **Данные**: - Описание; Статус; Ответсвенный; 
- **События** - Задача создана


#### 5. Менеджеры или администраторы должны иметь кнопку «заассайнить задачи», которая возьмёт все открытые задачи и рандомно заассайнит каждую на любого из сотрудников (кроме менеджера и администратора) . Не успел закрыть задачу до реассайна — сорян, делай следующую.
- **Акторы:** - Менеджеры или администраторы
- **Команды** - Заассайнить задачи»
- **Данные**: - ??
- **События** - Задача заасайнена

#### 6. Каждый сотрудник должен иметь возможность видеть в отдельном месте список заассайненных на него задач + отметить задачу выполненной.
- **Акторы:** - Пользователь
- **Команды** - Изменить статус задачи
- **Данные**: - Список заасайненных задач
- **События** - Статус задачи изменен

## Аккаунтинг: кто сколько денег заработал

#### 1. Аккаунтинг должен быть в отдельном дашборде и доступным только для администраторов и бухгалтеров.
- **Акторы:** - Администратор; Бухгалтер
- **Команды** - ??
- **Данные**: - ??
- **События** - ??

#### 2. Авторизация в дешборде аккаунтинга должна выполняться через общий сервис аутентификации UberPopug Inc.
- **Акторы:** - Пользователь
- **Команды** - Вход в систему
- **Данные**: - ID пользователя; Форма клюва
- **События** - Пользователь авторизован

## 3. У каждого из сотрудников должен быть свой счёт, который показывает, сколько за сегодня он получил денег. У счёта должен быть аудитлог того, за что были списаны или начислены деньги, с подробным описанием каждой из задач.
- **Акторы:** - Пользователь
- **Команды** - ??
- **Данные**: - Список транзакций;
- **События** - ??


---

![chains](./docs/chains.svg)

---

![services](./docs/services.svg)

![data model](./docs/data-model.svg)


#### CUD Events
Выписать все CUD события и какие данные нужны для этих событий, которые необходимы для работы системы. Отобразить кто из сервисов является продьюсером, а кто консьюмером CUD событий.

**Auth Domain (Producer)**
`account.created` { id; role_id; } - Consumers: Tasks Domain, Accounting Domain;
`account.updated` { id; role_id; } - Consumers: Tasks Domain, Accounting Domain;

**Task Domain (Producer)**
`task.created` { id; status; price; assignee_id; } - Consumers: Accounting Domain; Analytics Domain
`task.updated` { id; status; price; assignee_id; } - Consumers: Accounting Domain; Analytics Domain

**Account Domain (Producer)**
`finance_account.transaction.created` { id; task_id; finance_account_id; } - Consumers: Analytics



