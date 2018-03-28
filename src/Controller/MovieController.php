<?php

namespace App\Controller;

use App\Entity\Movie;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MovieController extends Controller
{
    /**
     * @Route("/movie", name="movie")
     */
    public function index()
    {
        $moviesList = [
            'Movie1' => [
                'name' => 'nazwa',
                'rating' => 'ocena',
            ]
        ];

        $moviesList = $this->getDoctrine()->getRepository(Movie::class)->findAll();
        return $this->render('movie/index.html.twig', [
            'moviesList' => $moviesList,
        ]);
    }
}
