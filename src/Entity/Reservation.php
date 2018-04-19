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
     * @ORM\Column(type="integer")
     */
    private $screening_id;

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

    public function getReservationNumber(): ?string
    {
        return $this->reservation_number;
    }

    public function setReservationNumber(string $reservation_number): self
    {
        $this->reservation_number = $reservation_number;

        return $this;
    }

    public function getScreeningId(): ?int
    {
        return $this->screening_id;
    }

    public function setScreeningId(int $screening_id): self
    {
        $this->screening_id = $screening_id;

        return $this;
    }
}
