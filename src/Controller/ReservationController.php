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
use Doctrine\DBAL\Driver\Connection;

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
     * @Route("/new", name="reservation_new", methods="GET|POST")
     */
    public function new(Request $request, Connection $connection): JsonResponse
    {
        $screeningId = $request->get('screeningId');
        $reservation = $this->getDoctrine()
                    ->getRepository(Reservation::class)->findBy([], ['id'=> 'DESC'], 1);
        $reservationNumber = $reservation ?  $reservation[0]->getReservationNumber() + 1 : 1;

        $seats = $request->get('seats');
        $firstName = $request->get('firstname');
        $surname = $request->get('surname');

        foreach($seats as $seat)
        {
            $stmt = $connection->prepare('begin '
                . 'INSERT_RESERVATION(:seat, :row_, :reservation_number, :firstName, :surname, :screening_id); '
                . 'end;');

            $stmt->bindValue(':seat', intval($seat['seat']));
            $stmt->bindValue(':row_', $seat['row']);
            $stmt->bindValue(':reservation_number', $reservationNumber);
            $stmt->bindValue(':firstName', $firstName);
            $stmt->bindValue(':surname', $surname);
            $stmt->bindValue(':screening_id', $screeningId);
            $stmt->execute();

        }

        return new JsonResponse(['info' => 'Pomyślnie zarezerwowano miejsca'], 200);
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
    public function edit(Request $request, Reservation $reservation, Connection $connection): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $rReservation = $request->get('reservation');

            $stmt = $connection->prepare('begin '
                . 'UPDATE_RESERVATION(:res_id, :scr_id, :seats, :rw,:res_number,:fn,:sn); '
                . 'end;');
            $stmt->bindValue(':res_id', $rReservation->getId());
            $stmt->bindValue(':scr_id', $rReservation->getScreening()->getId());
            $stmt->bindValue(':seats', $rReservation->getSeat());
            $stmt->bindValue(':rw', $rReservation->getRow());
            $stmt->bindValue(':res_number', $rReservation->getReservationNumber());
            $stmt->bindValue(':fn', $rReservation->getFirstname());
            $stmt->bindValue(':sn', $rReservation->getSurname());
            $stmt->execute();

            return $this->redirectToRoute('reservation_index');
        }

        return $this->render('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="reservation_delete", methods="DELETE")
     */
    public function delete(Request $request, Reservation $reservation, Connection $connection): Response
    {
        if ($this->isCsrfTokenValid('delete' . $reservation->getId(), $request->request->get('_token'))) {
            $rReservation = $request->get('reservation');
            $stmt = $connection->prepare('begin '
                . 'DELETE_RESERVATION(:id); '
                . 'end;');
            $stmt->bindValue(':id', $rReservation->getId());
            $stmt->execute();
        }

        return $this->redirectToRoute('reservation_index');
    }
}
