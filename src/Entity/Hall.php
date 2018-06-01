<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\HallRepository")
 */
class Hall
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $number_of_seats_v;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $number_of_seats_h;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $hall_number;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Screening", mappedBy="hall", orphanRemoval=true)
     */
    private $screenings;

    

    public function __construct()
    {
        $this->screenings = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Collection|Screening[]
     */
    public function getScreenings(): Collection
    {
        return $this->screenings;
    }

    public function getNumberOfSeatsV(): ?int
    {
        return $this->number_of_seats_v;
    }

    public function setNumberOfSeatsV(?int $number_of_seats_v): self
    {
        $this->number_of_seats_v = $number_of_seats_v;

        return $this;
    }

    public function getNumberOfSeatsH(): ?int
    {
        return $this->number_of_seats_h;
    }

    public function setNumberOfSeatsH(?int $number_of_seats_h): self
    {
        $this->number_of_seats_h = $number_of_seats_h;

        return $this;
    }

    public function getHallNumber(): ?int
    {
        return $this->hall_number;
    }

    public function setHallNumber(int $hall_number): self
    {
        $this->hall_number = $hall_number;

        return $this;
    }

    public function addScreening(Screening $screening): self
    {
        if (!$this->screenings->contains($screening)) {
            $this->screenings[] = $screening;
            $screening->setHall($this);
        }

        return $this;
    }

    public function removeScreening(Screening $screening): self
    {
        if ($this->screenings->contains($screening)) {
            $this->screenings->removeElement($screening);
            // set the owning side to null (unless already changed)
            if ($screening->getHall() === $this) {
                $screening->setHall(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->hall_number;
    }
}
