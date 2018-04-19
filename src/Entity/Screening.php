<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ScreeningRepository")
 */
class Screening
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="time_immutable")
     */
    private $hour;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Movie", inversedBy="screening")
     * @ORM\JoinColumn(nullable=false)
     */
    private $movie_id;

    public function getId()
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHour(): ?\DateTimeImmutable
    {
        return $this->hour;
    }

    public function setHour(\DateTimeImmutable $hour): self
    {
        $this->hour = $hour;

        return $this;
    }

    public function getMovieId(): ?Movie
    {
        return $this->movie_id;
    }

    public function setMovieId(?Movie $movie_id): self
    {
        $this->movie_id = $movie_id;

        return $this;
    }
}
