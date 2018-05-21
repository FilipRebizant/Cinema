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
        $screeningRepository = $this->getDoctrine()->getRepository(Screening::class);
        $screenings = $screeningRepository->findAll();
        $movies = $moviesRepository->findAll();
        $newMovies = $moviesRepository->findBy(array(), array('id' => 'DESC'), 3);
//        die;
//        /4$currentScreenings = $screeningRepository->findBy(array(), array('start_date' => 'DESC'), 5);

//        $screns = $screeningRepository->find(13);
//        dump($screns);
//        die;
//        echo count($screns->getMovies());
//        die;

        

//        $currentScreenings = $screeningRepository->getScreeningSchedule();

        $currentScreenings = $screeningRepository->getScreeningSchedule();


        return $this->render('home/index.html.twig', [
            'screenings' => $screenings,
            'movies' => $movies,
            'newMovies' => $newMovies,
//            'currentScreenings'=> $currentScreenings,
        ]);
    }
}
