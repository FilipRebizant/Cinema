<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Screening;
use App\Form\ReservationType;
use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/reservation")
 */
class ReservationController extends Controller
{
    /**
     * @Route("/", name="reservation_index", methods="GET")
     */
    public function index(ReservationRepository $reservationRepository): Response
    {
        return $this->render('reservation/index.html.twig', ['reservations' => $reservationRepository->findAll()]);
    }

    /**
     * @Route("/new", name="reservation_new", methods="POST")
     */
    public function new(Request $request): JsonResponse
    {
        
        $screening = $this->getDoctrine()
                    ->getRepository(Reservation::class)->findOneBy(['reservationNumber' => 'DESC'], [
                        'reservationNumber' => 'DESC'
                    ]); // a tu trzeba pisac chyba jakies customowe zapytanie bo inaczej sie nie dobierzesz do ostatniego wsadzonego nr. rezerwacji
        
        $screeningId = $request->get('screeningId'); // tego brakuje
        $seats = $request->get('seats');
        $screening = $this->getDoctrine()
                    ->getRepository(Screening::class)
                    ->find($screeningId);
        
        

        foreach($seats as $seat)
        {
            $reservation = new Reservation();
            $reservation->setScreening($screening);
            $reservation->setSeat($seat['seat']);
            $reservation->setRow($seat['row']);
            $reservation->setReservationNumber('TRZEBA WYGRZEBC OSTATNIE WSADZONE ID');
            
            $em->persist($reservation);
            $this->getDoctrine()->getManager()->flush();
        }
        die;
        #TODO: ogarnąć requesta

//        $reservation = new Reservation();
        
//        $form = $this->createForm(ReservationType::class, $reservation);
//        $form->handleRequest($request);


//        if ($form->isSubmitted() && $form->isValid()) {
//            $em = $this->getDoctrine()->getManager();
//            $em->persist($reservation);
//            $em->flush();

        return new JsonResponse(['info' => 'Pomyślnie wykonano rezerwację'], 200);
//            return $this->redirectToRoute('reservation_index');
//        }

//        return $this->render('reservation/new.html.twig', [
//            'reservation' => $reservation,
//            'form' => $form->createView(),
//        ]);


    }

    /**
     * @Route("/{id}", name="reservation_show", methods="GET")
     */
    public function show(Reservation $reservation): Response
    {
        return $this->render('reservation/show.html.twig', ['reservation' => $reservation]);
    }

    /**
     * @Route("/{id}/edit", name="reservation_edit", methods="GET|POST")
     */
    public function edit(Request $request, Reservation $reservation): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('reservation_edit', ['id' => $reservation->getId()]);
        }

        return $this->render('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="reservation_delete", methods="DELETE")
     */
    public function delete(Request $request, Reservation $reservation): Response
    {
        if ($this->isCsrfTokenValid('delete'.$reservation->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($reservation);
            $em->flush();
        }

        return $this->redirectToRoute('reservation_index');
    }
}
