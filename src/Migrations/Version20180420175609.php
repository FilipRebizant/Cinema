<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180420175609 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE screening_movie (screening_id INT NOT NULL, movie_id INT NOT NULL, INDEX IDX_E9AE8DE370F5295D (screening_id), INDEX IDX_E9AE8DE38F93B6FC (movie_id), PRIMARY KEY(screening_id, movie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE screening_movie ADD CONSTRAINT FK_E9AE8DE370F5295D FOREIGN KEY (screening_id) REFERENCES screening (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE screening_movie ADD CONSTRAINT FK_E9AE8DE38F93B6FC FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE hall CHANGE number_of_seats_v number_of_seats_v INT DEFAULT NULL, CHANGE number_of_seats_h number_of_seats_h INT DEFAULT NULL, CHANGE hall_number hall_number INT NOT NULL');
        $this->addSql('ALTER TABLE movie ADD age INT NOT NULL, ADD description LONGTEXT NOT NULL, ADD url LONGTEXT DEFAULT NULL, CHANGE name title VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE reservation CHANGE screening_id screening_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849558BB4E1DB FOREIGN KEY (screening_id_id) REFERENCES screening (id)');
        $this->addSql('CREATE INDEX IDX_42C849558BB4E1DB ON reservation (screening_id_id)');
        $this->addSql('ALTER TABLE screening DROP FOREIGN KEY FK_B708297D10684CB');
        $this->addSql('DROP INDEX IDX_B708297D10684CB ON screening');
        $this->addSql('ALTER TABLE screening CHANGE movie_id_id hall_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE screening ADD CONSTRAINT FK_B708297DE54EF918 FOREIGN KEY (hall_id_id) REFERENCES hall (id)');
        $this->addSql('CREATE INDEX IDX_B708297DE54EF918 ON screening (hall_id_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE screening_movie');
        $this->addSql('ALTER TABLE hall CHANGE number_of_seats_v number_of_seats_v SMALLINT DEFAULT NULL, CHANGE number_of_seats_h number_of_seats_h SMALLINT DEFAULT NULL, CHANGE hall_number hall_number SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE movie DROP age, DROP description, DROP url, CHANGE title name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C849558BB4E1DB');
        $this->addSql('DROP INDEX IDX_42C849558BB4E1DB ON reservation');
        $this->addSql('ALTER TABLE reservation CHANGE screening_id_id screening_id INT NOT NULL');
        $this->addSql('ALTER TABLE screening DROP FOREIGN KEY FK_B708297DE54EF918');
        $this->addSql('DROP INDEX IDX_B708297DE54EF918 ON screening');
        $this->addSql('ALTER TABLE screening CHANGE hall_id_id movie_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE screening ADD CONSTRAINT FK_B708297D10684CB FOREIGN KEY (movie_id_id) REFERENCES movie (id)');
        $this->addSql('CREATE INDEX IDX_B708297D10684CB ON screening (movie_id_id)');
    }
}
