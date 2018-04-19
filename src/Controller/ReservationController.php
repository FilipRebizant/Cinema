<?php

namespace App\Controller;

use App\Entity\Reservation;
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

        foreach ($seats as $seat) {
            $reservation = new Reservation();
            $reservation->setRow($seat['row']);
            $reservation->setSeat($seat['seat']);
            $reservation->setReservationNumber(2);
            $reservation->setScreeningId(2);
            $entityManager->persist($reservation);
        }

        $entityManager->flush();

        return new JsonResponse([
            'info' => 'Pomyślnie zarezerwowano seans',
        ], 200);
    }


}
