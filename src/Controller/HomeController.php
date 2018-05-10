<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Entity\Movie;
use App\Entity\Screening;
use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function index()
    {

        $movies = $this->getDoctrine()->getRepository(Movie::class)->findAll();
        $screenings = $this->getDoctrine()->getRepository(Screening::class)->findAll();

        return $this->render('home/index.html.twig', [
            'screenings' => $screenings,
            'movies' => $movies
        ]);
    }
}
