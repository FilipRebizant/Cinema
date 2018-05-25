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
        $currentScreenings = $screeningRepository->getScreeningSchedule();
        $previousDate = null;
        $schedule = [];
      
        foreach($currentScreenings as $screening)
        {
            if($screening['day'] == $previousDate)
            {
                 $schedule[$previousDate][] = $screening[0];
                 continue;
            }
            $schedule[$screening['day']][] = $screening[0];
            $previousDate = $screening['day'];
        }
       

        return $this->render('home/index.html.twig', [
            'screenings' => $screenings,
            'movies' => $movies,
            'newMovies' => $newMovies,
            'currentScreenings'=> $schedule,
        ]);
    }
}
