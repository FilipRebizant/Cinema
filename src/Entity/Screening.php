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
    private $start_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $end_date;

   
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reservation", mappedBy="screening")
     */
    private $reservations;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Movie", inversedBy="screenings")
     */
    private $movies;

    
     /**
     * @ORM\Column(type="integer")
     */
    private $price;
    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Hall", inversedBy="screenings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $hall;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->movies = new ArrayCollection();
//        $this->hall = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->start_date = $startDate;

        return $this;
    }
    
    public function getPrice(): ? int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->end_date = $endDate;

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

    public function getHall(): ? Hall
    {
        return $this->hall;
    }
    
    

    public function setHall(?Hall $hall): self
    {
        $this->hall = $hall;

        return $this;
    }
    
    public function __toString()
    {
        return (string) $this->id;
    }
}
