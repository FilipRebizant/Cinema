<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Entity\Movie;
use App\Entity\Screening;
use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\DBAL\Driver\Connection;

class HomeController extends Controller
{
    /**
     * @Route("/home", name="home")
     */
    public function index(Connection $connection)
    {
        $moviesRepository = $this->getDoctrine()->getRepository(Movie::class);
        $screeningRepository = $this->getDoctrine()->getRepository(Screening::class);
        $screenings = $screeningRepository->findAll();
        $movies = $moviesRepository->findAll();
        $newMovies = $moviesRepository->findBy(array(), array('id' => 'DESC'), 3);
        $currentScreenings = $screeningRepository->findAll();
        $previousDate = null;
        $movieSchedule = $moviesRepository->findAll();
        return $this->render('home/index.html.twig', [
            'screenings' => $screenings,
            'movies' => $movies,
            'newMovies' => $newMovies,
            'currentScreenings'=> $currentScreenings,
            'moviesSchedule' => $movieSchedule
        ]);
    }
}
