<?php

namespace App\Entity;

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
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $number_of_seats_v;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $number_of_seats_h;

    /**
     * @ORM\Column(type="smallint")
     */
    private $hall_number;

    public function getId()
    {
        return $this->id;
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
}
