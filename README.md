Telegram Dating Bot
=========
Nederlands onder / Русский снизу / Українська нижче
=========

For the idea of developing this bot was taken from the project Leonardo Dai Winchik.

This bot is created for introductory purposes only.


Settings
=========
The settings file is located in the folder src/config/config.json.

* `token`: Your Telegram bot token.
* `dataURL`: Link to your database.
* `min`: Minimum deviation from the user's age. For example, if the user is 17, it will give out profiles of users from 14 to 17 years old.
* `max`: Maximum deviation from the user's age. For example, if the user is 17, it will give out profiles of users from 17 to 21 years old.


Project installation and startup
=========
Setting up a bot requires basic knowledge of the command line, which is bash or similar in Linux/Mac and cmd.exe in Windows.

1. Install [nodejs](https://nodejs.org). Install node version 18 or higher.
2. Clone this repository, or download it in zip or any other format.
3. Type the command `npm i` in the terminal.
4. Get a token for Telegram bot (you can get it from [BotFather](https://t.me/BotFather)) and specify it in the settings file.
   - Prevent other users from adding the bot to groups. To do this, go to the bot's settings, select the `Allow Groups?` option and choose `Turn groups off`.
   - If you already have this bot running, or are using it for other purposes, then do not use it. It may cause various kinds of errors. Create a new one.
5. Get the link for your database(you can generate it [here](https://www.mongodb.com)) and specify it in the settings file.
6. Run the bot: `npm start`.

Done! Now you have a Telegram dating bot at your disposal.


Nederlands
=========

Het idee voor de ontwikkeling van deze bot is ontleend aan het project Leonardo Dai Winchik.

Deze bot is alleen gemaakt voor inleidende doeleinden.


Instellingen
=========
Het instellingenbestand staat in de map src/config/config.json.

* `token`: Jouw Telegram bot token.
* `dataURL`: Link naar je database.
* `min`: Minimale afwijking van de leeftijd van de gebruiker. Als de gebruiker bijvoorbeeld 17 is, worden profielen van gebruikers tussen 14 en 17 jaar weergegeven.
* `max`: Maximale afwijking van de leeftijd van de gebruiker. Als de gebruiker bijvoorbeeld 17 is, worden profielen van gebruikers tussen 17 en 21 jaar weergegeven.


Project installeren en opstarten
=========
Het opzetten van een bot vereist basiskennis van de commandoregel, wat bash of iets dergelijks is in Linux/Mac en cmd.exe in Windows.

1. Installeer [nodejs](https://nodejs.org). Installeer node versie 18 of hoger.
2. Kloon deze repository of download hem in zip of ander formaat.
3. Typ het commando `npm i` in de terminal.
4. Verkrijg een token voor Telegram bot (je kunt het krijgen van [BotFather](https://t.me/BotFather)) en geef het op in het instellingenbestand.
   - Voorkom dat andere gebruikers de bot toevoegen aan groepen. Ga hiervoor naar de instellingen van de bot, selecteer de optie `Groepen toestaan?` en kies `Groepen uitschakelen`.
   - Als je deze bot al hebt draaien of voor andere doeleinden gebruikt, gebruik hem dan niet. Het kan verschillende soorten fouten veroorzaken. Maak een nieuwe.
5. Verkrijg de link voor uw database (u kunt deze [hier](https://www.mongodb.com) genereren) en geef deze op in het instellingenbestand.
6. Start de bot: `npm start`.

Gedaan! Nu heb je een Telegram dating bot tot je beschikking.


Русский
=========

За идею разработки данного бота был взят проект Леонардо Дай Винчик.

Данный бот создан исключительно в ознакомительных целях.


Настройки
=========
Файл с настройками находится в папке src/config/config.json.

* `token`: Токен вашего телеграм бота.
* `dataURL`: Ссылка на вашу базу данных.
* `min`: Минимальное отклонение от возраста пользователя. К примеру, если пользователю 17, то ему будет выдавать анкеты пользователей от 14 до 17 лет.
* `max`: Максимальное отклонение от возраста пользователя. К примеру, если пользователю 17, то ему будет выдавать анкеты пользователей от 17 до 21 года.


Установка и запуск проекта
=========
Настройка бота требует базовых знаний о командной строке, которая представляет собой bash или аналогичное приложение в Linux/Mac и cmd.exe в Windows.

1. Установите [nodejs](https://nodejs.org). Устанавливайте версию node не ниже 18.
2. Клонируйте этот репозиторий, или скачайте его в формате zip или любом другом.
3. Пропишите в терминал команду `npm i`.
4. Получите токен для Telegram бота(взять его можно у [BotFather](https://t.me/BotFather)) и укажите в файле настроек.
   - Запретите другим пользователям добавлять бота в группы. Для этого перейдите в настройки бота, выберите параметр `Allow Groups?` и выберите `Turn groups off`.
   - Если у вас уже запущен этот бот, либо же он используется для других целей, то не используйте его. Это может привести к различного рода ошибкам. Создайте нового.
5. Получите ссылку для вашей базы данных(сгенерировать её можно [здесь](https://www.mongodb.com)) и укажите в файле настроек.
6. Запустите бота: `npm start`.

Готово! Теперь в вашем распоряжении Telegram бот для знакомств.


Українська
=========

За ідею розробки цього бота був взят проект Леонардо Дай Вінчік.

Даний бот був створений лише в ознайомчих цілях.


Налаштування
=========
Файл з налаштуваннями знаходиться у папці src/config/config.json.

* `token`: Токен вашого телеграм бота.
* `dataURL`: Посилання на вашу базу даних.
* `min`: Мінімальне відхилення від віку користувача. Наприклад, якщо користувачу 17, то йому видаватиме анкети користувачів від 14 до 17 років.
* `max`: Максимальне відхилення від віку користувача. Наприклад, якщо користувачу 17, то йому видаватиме анкети користувачів від 17 до 21 років.


Встановлення та запуск проекту
=========
Налаштування бота вимагає базових знань про командний рядок, що являє собою bash або аналогічний застосунок у Linux/Mac і cmd.exe у Windows.

1. Встановіть [nodejs](https://nodejs.org). Встановлюйте версію node не нижче 18.
2. Клонуйте цей репозиторій, або скачайте його у форматі zip чи будь-якому іншому.
3. Пропишіть у термінал команду `npm i`.
4. Отримайте токен для Telegram-бота (узяти його можна у [BotFather](https://t.me/BotFather)) і вкажіть у файлі налаштувань.
   - Забороніть іншим користувачам додавати бота в групи. Для цього перейдіть у налаштування бота, виберіть параметр `Allow Groups?` і виберіть `Turn groups off`.
   - Якщо у вас уже запущений цей бот, або ж він використовується для інших цілей, то не використовуйте його. Це може призвести до різного роду помилок. Створіть нового.
5. Отримайте посилання для вашої бази даних (згенерувати його можна [тут](https://www.mongodb.com)) і вкажіть у файлі налаштувань.
6. Запустіть бота: `npm start`.

Готово! Тепер у вашому розпорядженні Telegram-бот для знайомств.


Feedback
=========
[Telegram](https://t.me/jason_kings_tg)<br>
[Discord](https://discordapp.com/users/608684992335446064)<br>


Documentation
=========
[fs](https://github.com/npm/security-holder)<br>
[mongoose](https://www.mongodb.com/docs/atlas/)<br>
[node-fetch](https://github.com/node-fetch/node-fetch)<br>
[telegraf](https://telegraf.js.org/)<br>
[telegraf-session-mongodb](https://www.npmjs.com/package/telegraf-session-mongodb)