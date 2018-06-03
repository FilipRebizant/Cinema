<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReservationRepository")
 */
class Reservation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Screening", inversedBy="reservations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $screening;
    
    /**
     * @ORM\Column(type="integer")
     */
    private $reservationNumber;

    /**
     * @ORM\Column(type="integer")
     */
    private $seat;

    /**
     * @ORM\Column(type="integer")
     */
    private $row_;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $surname;

    

    

    
    public function getId()
    {
        return $this->id;
    }

     
    public function getScreening(): ?Screening
    {
        return $this->screening;
    }

    public function setScreening(?Screening $screening): self
    {
        $this->screening = $screening;

        return $this;
    }

    
    public function __toString()
    {
        return (string) $this->id;
    }

    public function getSeat()
    {
        return $this->seat;
    }

    public function getRow()
    {
        return $this->row_;
    }

    public function getReservationNumber(): ?int
    {
        return $this->reservationNumber;
    }

    public function setReservationNumber(int $reservationNumber): self
    {
        $this->reservationNumber = $reservationNumber;

        return $this;
    }

    public function setSeat(int $seat): self
    {
        $this->seat = $seat;

        return $this;
    }

    public function setRow(int $row): self
    {
        $this->row_ = $row;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(?string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    
}
