<?php

namespace App\Controller;

use App\Entity\Screening;
use App\Form\ScreeningType;
use App\Repository\ScreeningRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Driver\Connection;

/**
 * @Route("/screening")
 */
class ScreeningController extends Controller
{
    /**
     * @Route("/", name="screening_index", methods="GET")
     */
    public function index(ScreeningRepository $screeningRepository): Response
    {
        return $this->render('screening/index.html.twig', ['screenings' => $screeningRepository->findAll()]);
    }

    /**
     * @Route("/new", name="screening_new", methods="GET|POST")
     */
    public function new(Request $request, Connection $connection): Response
    {
        $screening = new Screening();
        $form = $this->createForm(ScreeningType::class, $screening);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $rScreening = $request->get('screening');
            

            $date = $rScreening['start_date']['date']['year']. '-'
                . $rScreening['start_date']['date']['month']. '-'
                . $rScreening['start_date']['date']['day'];


            $date = date_create($date);
            $date = date_format($date, 'Y-m-d');
//            dump($date);
//            die();
            $stmt = $connection->prepare('begin '
                . 'INSERT_SCREENING(:hall_id, :start_date, :price);'
                . 'end;');
            $stmt->bindValue(':hall_id', $rScreening['hall']);
            $stmt->bindValue(':start_date', $date);
            $stmt->bindValue(':price', $rScreening['price']);
            $r = $stmt->execute();

//            dump($r);
//            die();
//            $secondStmt = $connection->prepare('begin '
//                . 'INSERT_SCREENING_MOVIE(:screening_id, :movie_id); '
//                . 'end;');
            
//            $secondStmt->bindValue('screening_id', 1);
//            $secondStmt->bindValue('movie_id', $rScreening['movies'][0]);
//            $secondStmt->execute();
//            dump($rScreening['movies'][0]);
//            die();

            return $this->redirectToRoute('screening_index');
        }
        
        return $this->render('screening/new.html.twig', [
            'screening' => $screening,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="screening_show", methods="GET")
     */
    public function show(Screening $screening): Response
    {
        return $this->render('screening/show.html.twig', ['screening' => $screening]);
    }

    /**
     * @Route("/{id}/edit", name="screening_edit", methods="GET|POST")
     */
    public function edit(Request $request, Screening $screening, Connection $connection): Response
    {
        $form = $this->createForm(ScreeningType::class, $screening);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $rReservation = $request->get('screening');
//            dump($rReservation);
//            die();
            $stmt = $connection->prepare('begin '
                . 'UPDATE_SCREENING(:res_id, :scr_id, :seats, :rw,:res_number,:fn,:sn); '
                . 'end;');
            $stmt->bindValue(':res_id', $rReservation->getId());
            $stmt->bindValue(':scr_id', $rReservation->getScreening()->getId());
            $stmt->bindValue(':seats', $rReservation->getSeat());
            $stmt->bindValue(':rw', $rReservation->getRow());
            $stmt->bindValue(':res_number', $rReservation->getReservationNumber());
            $stmt->bindValue(':fn', $rReservation->getFirstname());
            $stmt->bindValue(':sn', $rReservation->getSurname());
            $stmt->execute();

            return $this->redirectToRoute('screening_index');
        }

        return $this->render('screening/edit.html.twig', [
            'screening' => $screening,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="screening_delete", methods="DELETE")
     */
    public function delete(Request $request, Screening $screening, Connection $connection): Response
    {
        if ($this->isCsrfTokenValid('delete'.$screening->getId(), $request->request->get('_token'))) {
            $rScreening = $request->get('screening');
            $stmt = $connection->prepare('begin '
                . 'DELETE_SCREENING(:id); '
                . 'end;');
            $stmt->bindValue(':id', $rScreening->getId());
            $stmt->execute();
        }

        return $this->redirectToRoute('screening_index');
    }


    /**
     * @Route("/getReservations/{id}", name="reservations_get", methods="GET|POST")
     */
    public function getReservations($id)
    {
        $screeningRepository = $this->getDoctrine()->getRepository(Screening::class);
        $screening = $screeningRepository->find($id);

        $reservations = $screening->getReservations();
        $arr = array();

        foreach ($reservations as $key => $reservation) {
            array_push($arr, array(
                'row'=> $reservation->getRow(),
                'seat' => $reservation->getSeat()
            ));
        }

        return new JsonResponse([
            'current_reservations' => ($arr)
        ], 200);
    }

}
