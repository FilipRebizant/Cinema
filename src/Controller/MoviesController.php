<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Entity\Movie;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Flex\Response;


class MoviesController extends Controller
{
    /**
     * @Route("/movies", name="movies")
     */
    public function index()
    {
        $moviesList = $this->getDoctrine()->getRepository(Movie::class)->findAll();

        return $this->render('movies/index.html.twig', [
            'moviesList' => $moviesList,
        ]);

    }

    /**
     * @Route("/addMovie", name="addMovie")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function create()
    {
        return $this->render('movies/addMovie.html.twig');
    }

    /**
     * @Route("/storeMovie", name="storeMovie")
     * @return JsonResponse
     */
    public function store()
    {
        $entityManager = $this->getDoctrine()->getManager();

        $movie = new Movie();
        $movie->setName('Film3');

        $entityManager->persist($movie);

        $entityManager->flush();

        return new JsonResponse([
            'info' => 'Zapisano film'
            ], 200);
    }

    /**
     * @Route("/movie/{id}", name="showMovie")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function show($id)
    {
        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);

        return $this->render('movies/show.html.twig', ['movie' => $movie]);
    }

}
