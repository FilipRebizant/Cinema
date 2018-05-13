<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TicketRepository")
 */
class Ticket
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $seat;

    /**
     * @ORM\Column(type="integer")
     */
    private $row;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Reservation", inversedBy="tickets")
     * @ORM\JoinColumn(nullable=false)
     */
    private $reservation;

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

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(?Reservation $reservation): self
    {
        $this->reservation = $reservation;

        return $this;
    }
    
    public function __toString()
    {
        return (string) $this->id;
    }
}
