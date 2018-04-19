<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Screening;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class ReservationController extends Controller
{
    /**
     * @Route("/reservation", name="reservation")
     */
    public function index()
    {
        return $this->render('reservation/index.html.twig', [
            'controller_name' => 'ReservationController',
        ]);
    }

    /**
     * @Route("/storeReservation", name="storeReservation")
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $seats = $request->get('seats');
        $entityManager = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Reservation::class);
//        $screeningRepository = $this->getDoctrine()->getRepository(Screening::class);
        $lastReservationNumber = $repository->findLastReservationNumber();
        $reservationNumber = ++$lastReservationNumber;
//        $screening = new Screening();
        var_dump($_GET['id']);

        foreach ($seats as $seat) {
            $reservation = new Reservation();
            $reservation->setRow($seat['row']);
            $reservation->setSeat($seat['seat']);
            $reservation->setReservationNumber($reservationNumber);

            $reservation->setScreeningId(2); #TODO Dodać relacje do seansów

            $entityManager->persist($reservation);
        }

        $entityManager->flush();

        return new JsonResponse([
            'info' => 'Pomyślnie zarezerwowano seans',
        ], 200);
    }


}
