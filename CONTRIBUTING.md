# 🎵 Contributing to SongBridge

### 🛠 Начальная настройка
1. Сделайте форк репозитория
2. Клонируйте ваш форк:
    ```sh
   git clone https://github.com/AlexSavr/SongBridge.git
    ```
3. Настройте окружение:
    ```
    cd SongBridge
    cp .env.example .env
    docker-compose up -d
    ```


### 🧑‍💻 Процесс разработки

- Backend (NestJS) ``/api``
- Frontend (Next.js) ``/client``
- Database: PostgreSQL (*миграции в* ``/api/src/migrations``)

### 🐛 Сообщение об ошибках
Укажите:
- Окружение (*ОС, версия Docker*)
- Шаги воспроизведения
- Ожидаемое и фактическое поведение
- Скриншоты (если касается интерфейса)

### 🚀 Создание PR
1. Синхронизируйте форк с основным репозиторием
2. Создайте описательный PR с:
3. Целью изменений
4. Скриншотами (*если есть*)
5. Связанными issues (*например "Closes #123"*)


_____

> *"When words fail, music speaks."*  
> — [Hans Christian Andersen](https://en.wikipedia.org/wiki/Hans_Christian_Andersen) 