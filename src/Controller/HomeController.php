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
        $moviesRepository = $this->getDoctrine()->getRepository(Movie::class);
        $newMovies = $moviesRepository->findBy(array(), array('id' => 'DESC'), 3);
        $movieSchedule = $moviesRepository->getSchedule(); //Wszystkie filmy przez 7 dni
        $tempMovies = [];
        $screenings = [];

        /** @var Movie $movie */
        foreach ($movieSchedule as $movie) {
            /** @var Screening $screening */
            foreach ($movie->getScreenings() as $screening) {

                if (array_key_exists($screening->getStartDate()->format('Y-m-d'), $screenings)) {
                    if (!in_array($movie, $screenings[$screening->getStartDate()->format('Y-m-d')])) {
                        $screenings[$screening->getStartDate()->format('Y-m-d')][] = $movie;
                    }
                } else {
                    $screenings[$screening->getStartDate()->format('Y-m-d')][] = $movie;
                }
                array_push($tempMovies, $movie);
            }

        }
        return $this->render('home/index.html.twig', [
            'screenings' => $screenings,
            'newMovies' => $newMovies,
        ]);
    }
}
