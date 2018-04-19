<?php

namespace App\Entity;

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
     * @ORM\Column(type="smallint")
     */
    private $seat;

    /**
     * @ORM\Column(type="smallint")
     */
    private $row;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $reservation_number;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Screening", inversedBy="reservations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $screeningId;

    

    public function getId()
    {
        return $this->id;
    }

    public function getSeat(): ?int
    {
        return $this->seat;
    }

    public function setSeat(int $seat): self
    {
        $this->seat = $seat;

        return $this;
    }

    public function getRow(): ?int
    {
        return $this->row;
    }

    public function setRow(int $row): self
    {
        $this->row = $row;

        return $this;
    }

    public function getReservationNumber(): ?int
    {
        return $this->reservation_number;
    }

    public function setReservationNumber(int $reservation_number): self
    {
        $this->reservation_number = $reservation_number;

        return $this;
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

    

}
