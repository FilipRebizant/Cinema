<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\OneToMany(targetEntity="App\Entity\Reservation", mappedBy="screening")
     */
    private $reservations;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Movie", inversedBy="screenings")
     */
    private $movies;

    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Hall", inversedBy="screenings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $hall_id;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->movies = new ArrayCollection();
    }

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

    

    /**
     * @return Collection|Reservation[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setScreening($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->contains($reservation)) {
            $this->reservations->removeElement($reservation);
            // set the owning side to null (unless already changed)
            if ($reservation->getScreening() === $this) {
                $reservation->setScreening(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Movie[]
     */
    public function getMovies(): Collection
    {
        return $this->movies;
    }

    public function addMovie(Movie $movie): self
    {
        if (!$this->movies->contains($movie)) {
            $this->movies[] = $movie;
        }

        return $this;
    }

    public function removeMovie(Movie $movie): self
    {
        if ($this->movies->contains($movie)) {
            $this->movies->removeElement($movie);
        }

        return $this;
    }

    public function getHallId(): ?Hall
    {
        return $this->hall_id;
    }

    public function setHallId(?Hall $hall_id): self
    {
        $this->hall_id = $hall_id;

        return $this;
    }

    
}
