<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MovieRepository")
 */
class MovieOLD
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Screening", mappedBy="movie_id")
     */
    private $screening;

    public function __construct()
    {
        $this->screening = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Screening[]
     */
    public function getScreening(): Collection
    {
        return $this->screening;
    }

    public function addScreening(Screening $screening): self
    {
        if (!$this->screening->contains($screening)) {
            $this->screening[] = $screening;
            $screening->setMovieId($this);
        }

        return $this;
    }

    public function removeScreening(Screening $screening): self
    {
        if ($this->screening->contains($screening)) {
            $this->screening->removeElement($screening);
            // set the owning side to null (unless already changed)
            if ($screening->getMovieId() === $this) {
                $screening->setMovieId(null);
            }
        }

        return $this;
    }
}
