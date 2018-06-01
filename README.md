# Kino


#Wymagania:
Node

Composer

Yarn (opcjonalnie)

#Opis instalacji:

1. Pobrać repozytorium
2. W katalogu projektu uruchomić konsolę i wpisać polecenia:

    npm install
  
    composer install

3. Wpisać nazwę użytkownika, hasło i nazwę bazy danych(Cinema) w pliku .env oraz zaimportować plik cinema.sql do bazy danych 



4. W konsoli uruchomić polecenie:  

    php bin/console server:run
    
5. Aplikacja powinna być dostępna pod adresem: 

    http://127.0.0.1:8000


6. Panel administracyjny dostępny jest pod adresem:

    http://localhost:8000/login

    login: admin

    hasło: qwerty


Uwaga: Repertuar kina działa przez 7 dni od dzisiejszej daty systemowej, 7 dni przed i po od daty seansu nie wyświtli nam się nic w repertuarze na stronie głównej.
  