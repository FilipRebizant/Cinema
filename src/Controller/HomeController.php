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
//        echo '<pre>';
//        print_r($connection->);
//        die;
//        $connection->
        $users = $connection->exec('begin
        create_table_hall();
        end;');
        die;
//        echo '<pre>';
//        print_r($users);
//        die;
////        $db = $this->get('doctrine.dbal.oracle_connection');
////        echo '<pre>';
////        print_r($db);
////        die;
////        $conn->f
//        $moviesRepository = $this->getDoctrine()->getRepository(Movie::class);
//        $movieSchedule = $moviesRepository->getQuery();
//        echo '<pre>';
//        print_r($movieSchedule);
//        die;
////        die('here');
//        $moviesRepository = $this->getDoctrine()->getRepository(Movie::class);
//        $screeningRepository = $this->getDoctrine()->getRepository(Screening::class);
//        $screenings = $screeningRepository->findAll();
//        $movies = $moviesRepository->findAll();
//        $newMovies = $moviesRepository->findBy(array(), array('id' => 'DESC'), 3);
//        $currentScreenings = $screeningRepository->getScreeningSchedule();
//        $previousDate = null;
//        $schedule = [];
//
//
//
//        $movieSchedule = $moviesRepository->getSchedule();
//
//
//
//        foreach($currentScreenings as $screening)
//        {
//            if($screening['day'] == $previousDate)
//            {
//                 $schedule[$previousDate][] = $screening[0];
//                 continue;
//            }
//            $schedule[$screening['day']][] = $screening[0];
//            $previousDate = $screening['day'];
//        }
       

        return $this->render('home/index.html.twig', [
//            'screenings' => $screenings,
//            'movies' => $movies,
//            'newMovies' => $newMovies,
//            'currentScreenings'=> $schedule,
//            'moviesSchedule' => $movieSchedule
        ]);
    }
}
