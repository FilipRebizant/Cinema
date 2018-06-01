-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 01 Cze 2018, 15:01
-- Wersja serwera: 10.1.31-MariaDB
-- Wersja PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `cinema`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fosuser`
--

CREATE TABLE `fosuser` (
  `id` int(11) NOT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username_canonical` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_canonical` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `confirmation_token` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_requested_at` datetime DEFAULT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `fosuser`
--

INSERT INTO `fosuser` (`id`, `username`, `username_canonical`, `email`, `email_canonical`, `enabled`, `salt`, `password`, `last_login`, `confirmation_token`, `password_requested_at`, `roles`) VALUES
(2, 'admin', 'admin', 'test@example.com', 'test@example.com', 1, NULL, '$2y$13$22YHHeR7G8zO5PDISPraMe1DdYUfWHw2GHSxL2sHM.Men7Oicrv52', '2018-06-01 14:48:04', NULL, NULL, 'a:1:{i:0;s:16:\"ROLE_SUPER_ADMIN\";}'),
(3, 'asdasd', 'asdasd', 'artugam@gmail.com', 'artugam@gmail.com', 1, NULL, '$2y$13$hCW/Bcg7f5yoVuDcb4jCRe6QQEe0VD3NAR64888U/F3Omqz3gpjW2', '2018-05-20 18:07:10', 'GwKuzLFnEqMd6gM543WaT4QWAMWr3p9l5VkgagwK58U', '2018-05-20 18:10:03', 'a:0:{}');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `hall`
--

CREATE TABLE `hall` (
  `id` int(11) NOT NULL,
  `number_of_seats_v` int(11) DEFAULT NULL,
  `number_of_seats_h` int(11) DEFAULT NULL,
  `hall_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `hall`
--

INSERT INTO `hall` (`id`, `number_of_seats_v`, `number_of_seats_h`, `hall_number`) VALUES
(1, 10, 9, '1'),
(2, 15, 15, '2'),
(3, 10, 10, '3'),
(4, 15, 15, '4');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `migration_versions`
--

INSERT INTO `migration_versions` (`version`) VALUES
('20180328173034'),
('20180411175616'),
('20180419111613'),
('20180419163333'),
('20180420175609'),
('20180420181057'),
('20180422093304'),
('20180511114512'),
('20180511160543'),
('20180513202152'),
('20180516164933'),
('20180517123319'),
('20180518152359'),
('20180520161913'),
('20180521104712'),
('20180521105153'),
('20180527170314'),
('20180529184853'),
('20180529191736');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_date` date DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `movie`
--

INSERT INTO `movie` (`id`, `title`, `age`, `description`, `category`, `release_date`, `grade`, `time`, `image`) VALUES
(1, 'Baby driver', 21, 'Utalentowanego młodego kierowcę (Ansel Elgort), który zarabia na życie udziałem w napadach, przez życie prowadzi muzyka. To ona pomaga mu być najlepszym w tym, co robi.\r\n\r\nPełny opis\r\n\r\nKiedy poznaje dziewczynę swych marzeń (Lily James), postanawia porzucić przestępczą przeszłość i zacząć żyć normalnie. Zmuszony przez bossa mafijnego (Kevin Spacey), dla którego pracuje, do udziału w z góry skazanym na niepowodzenie skoku, ryzykuje utratą wszystkiego, co dla niego najważniejsze – miłości, wolności i muzyki.\r\n\r\nW filmie zobaczymy laureatów Oscara Kevina Spacey, Jamiego Foxxa oraz Ansela Elgorta i Lily James. Za scenariusz i reżyserię odpowiada Edgar Wright, twórca scenariusza i reżyser „To już jest koniec”.', 'Dramat', '2018-05-06', 1, '01:15:00', '29c46a08e896e1ce32ac5c2963e9cd15.jpeg'),
(3, 'Deadpool 2', 21, 'Oszpecony w wyniku śmiertelnie groźnego ataku bydła podkuchenny ze stołówki zakładowej (Wade Wilson) nie cofnie się przed niczym, by spełnić największe marzenie swego życia – chce zostać wybrany najseksowniejszym barmanem miejscowej sieci barów mlecznych i udowodnić, że jeszcze się taki nie narodził, który mógłby mu nadmuchać w kakao.\r\n\r\nWalczy przy tym o odzyskanie utraconego poczucia smaku i skradzionego kondensatora strumienia, stawiając czoło wojownikom ninja, japońskim gangsterom spod znaku yakuzy i sforze agresywnych seksualnie czworonogów. Przemierzając kulę ziemską, odkrywa siłę rodziny, przyjaźni i pikantny smak przygody, a przy okazji zdobywa pożądany puchar dla Najlepszego Kochanka Świata.', 'Komedia', '2019-04-05', 10, '02:19:00', '221df0b99d01a26df841064e1b54435a.jpeg'),
(4, 'Han Solo: Gwiezdne wojny', 17, 'W „Han Solo. Gwiezdne wojny - historie” poznasz nieznane wcześniej przygody najsłynniejszego przemytnika w galaktyce! W czeluściach mrocznego i groźnego przestępczego półświatka, Han Solo zaprzyjaźnia się ze swoim przyszłym drugim pilotem Chewbaccą i poznaje hazardzistę Calrissiana. Tak rodzi się legenda jednego z najbardziej kultowych bohaterów w historii kina, znanego z późniejszej sagi Gwiezdne wojny.\r\n\r\nW filmie udział biorą: Alden Ehrenreich, Woody Harrelson, Emilia Clarke, Donald Glover, Thandie Newton, Phoebe Waller-Bridge i Paul Bettany.\r\n \r\nZa reżyserię „Han Solo. Gwiezdne wojny - historie” odpowiada Ron Howard, a producentami są Kathleen Kennedy, Allison Shearmur i Simon Emanuel. Producenci wykonawczy to: Lawrence Kasdan, Jason McGatlin, Phil Lord i Christopher Miller. Scenariusz napisali Lawrence & Jonathan Kasdan. Film „Han Solo. Gwiezdne wojny - historie” wchodzi do polskich kin 25 maja 2018 r.', 'Dramat', '2018-02-07', 1, '01:51:00', '3529b0044a523e107b5e43fdef9cc327.jpeg'),
(5, 'Avengers: Wojna bez granic', 12, 'Avengers: Wojna bez granic to wydarzenie w historii kina bez precedensu. Spektakularne starcie na śmierć i życie, przygotowywane od dekady i obejmujące cały świat bohaterów Marvel Studios.\r\n\r\nAvengersi ramię w ramię z innymi superbohaterami muszą być gotowi poświęcić wszystko, jeśli chcą pokonać potężnego Thanosa, zanim jego plan zniszczenia obróci wszechświat w ruiny. Film wyreżyserowali Anthony i Joe Russo, na podstawie scenariusza Markusa & Stephena McFeely’ów, a wyprodukował Kevin Feige. Producentami wykonawczymi są Louis D’Esposito, Victoria Alonso, Michael Grillo i Stan Lee.', 'Dramat', '2017-12-12', 9, '01:01:00', 'bfb542673e7f66bf4ebb5d69d3369ac1.jpeg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `screening_id` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `row` int(11) NOT NULL,
  `reservation_number` int(11) NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `reservation`
--

INSERT INTO `reservation` (`id`, `screening_id`, `seat`, `row`, `reservation_number`, `firstname`, `surname`) VALUES
(6, 2, 7, 13, 1, 'Filip', 'Rebizant'),
(7, 2, 8, 13, 1, 'Filip', 'Rebizant'),
(8, 1, 4, 6, 2, 'Filip', 'Rebizant'),
(9, 1, 5, 6, 2, 'Filip', 'Rebizant'),
(10, 1, 4, 8, 3, 'Filip', 'Rebizant'),
(11, 1, 5, 8, 3, 'Filip', 'Rebizant'),
(12, 1, 3, 10, 4, 'Filip', 'Rebizant'),
(13, 1, 4, 10, 4, 'Filip', 'Rebizant'),
(14, 1, 4, 9, 5, 'Filip', 'Rebizant'),
(15, 1, 3, 9, 5, 'Filip', 'Rebizant'),
(16, 1, 4, 7, 6, 'Filip', 'Rebizant'),
(17, 1, 5, 7, 6, 'Filip', 'Rebizant'),
(18, 1, 3, 7, 6, 'Filip', 'Rebizant'),
(19, 1, 6, 7, 7, 'Filip', 'Rebizant'),
(20, 1, 7, 7, 7, 'Filip', 'Rebizant'),
(21, 1, 7, 6, 8, 'Filip', 'Rebizant'),
(22, 1, 6, 6, 9, 'Filip', 'Rebizant'),
(24, 1, 6, 9, 11, 'Filip', 'Rebizant'),
(25, 1, 7, 9, 11, 'Filip', 'Rebizant'),
(26, 1, 9, 7, 12, 'Filip', 'Rebizant'),
(27, 1, 6, 8, 13, 'Filip', 'Rebizant'),
(28, 1, 5, 3, 14, 'Filip', 'Rebizant');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `screening`
--

CREATE TABLE `screening` (
  `id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `screening`
--

INSERT INTO `screening` (`id`, `hall_id`, `start_date`, `price`) VALUES
(1, 1, '2018-06-06 15:30:00', 15),
(2, 2, '2018-06-07 20:30:00', 15),
(4, 1, '2018-06-07 20:30:00', 15),
(6, 1, '2018-06-07 15:30:00', 12),
(7, 2, '2018-06-06 17:30:00', 16);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `screening_movie`
--

CREATE TABLE `screening_movie` (
  `screening_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `screening_movie`
--

INSERT INTO `screening_movie` (`screening_id`, `movie_id`) VALUES
(1, 1),
(2, 1),
(4, 3),
(6, 4),
(7, 5);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `fosuser`
--
ALTER TABLE `fosuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9E0D886492FC23A8` (`username_canonical`),
  ADD UNIQUE KEY `UNIQ_9E0D8864A0D96FBF` (`email_canonical`),
  ADD UNIQUE KEY `UNIQ_9E0D8864C05FB297` (`confirmation_token`);

--
-- Indeksy dla tabeli `hall`
--
ALTER TABLE `hall`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indeksy dla tabeli `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_42C8495570F5295D` (`screening_id`);

--
-- Indeksy dla tabeli `screening`
--
ALTER TABLE `screening`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B708297D52AFCFD6` (`hall_id`);

--
-- Indeksy dla tabeli `screening_movie`
--
ALTER TABLE `screening_movie`
  ADD PRIMARY KEY (`screening_id`,`movie_id`),
  ADD KEY `IDX_E9AE8DE370F5295D` (`screening_id`),
  ADD KEY `IDX_E9AE8DE38F93B6FC` (`movie_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `fosuser`
--
ALTER TABLE `fosuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `hall`
--
ALTER TABLE `hall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT dla tabeli `screening`
--
ALTER TABLE `screening`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_42C8495570F5295D` FOREIGN KEY (`screening_id`) REFERENCES `screening` (`id`);

--
-- Ograniczenia dla tabeli `screening`
--
ALTER TABLE `screening`
  ADD CONSTRAINT `FK_B708297D52AFCFD6` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`id`);

--
-- Ograniczenia dla tabeli `screening_movie`
--
ALTER TABLE `screening_movie`
  ADD CONSTRAINT `FK_E9AE8DE370F5295D` FOREIGN KEY (`screening_id`) REFERENCES `screening` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_E9AE8DE38F93B6FC` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
