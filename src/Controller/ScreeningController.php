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

        $screening = $this->getDoctrine()
            ->getRepository(Screening::class)->findBy([], ['id'=> 'DESC'], 1);
        $screening = $screening ?  $screening[0]->getId() + 1 : 1;

        if ($form->isSubmitted() && $form->isValid()) {

            $rScreening = $request->get('screening');
            $date = $rScreening['start_date']['date']['year']. '-'
                . $rScreening['start_date']['date']['month']. '-'
                . $rScreening['start_date']['date']['day'];


            $date = date_create($date);
            $date = date_format($date, 'Y-m-d');

            $stmt = $connection->prepare('begin '
                . 'INSERT_SCREENING(:hall_id, :start_date, :price, :scr_id); '
                . 'end;');
            $stmt->bindValue(':hall_id', $rScreening['hall']);
            $stmt->bindValue(':start_date', $date);
            $stmt->bindValue(':price', $rScreening['price']);
            $stmt->bindValue(':scr_id', '');
            $stmt->execute();

            $secondStmt = $connection->prepare('begin '
                . 'INSERT_SCREENING_MOVIE(:screening_id, :movie_id); '
                . 'end;');

            $secondStmt->bindValue('screening_id', $screening);
            $secondStmt->bindValue('movie_id', $rScreening['movies'][0]);
            $secondStmt->execute();

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
        $id = $screening->getId();

        if ($form->isSubmitted() && $form->isValid()) {
            $rScreening = $request->get('screening');
            $date = $rScreening->getStartDate();
            $date = date_format( $date, 'Y-m-d H:i:s');
            $stmt = $connection->prepare('begin '
                . 'UPDATE_SCREENING(:scr_id,:hll_id, :start_dat, :pric); '
                . 'end;');
            $stmt->bindValue(':scr_id', $rScreening->getId());
            $stmt->bindValue(':hll_id', $rScreening->getHall()->getId());
            $stmt->bindValue(':start_dat', $date);
            $stmt->bindValue(':pric', $rScreening->getPrice());
            $stmt->execute();

            $secondStmt = $connection->prepare('begin '
                . 'UPDATE_SCREENING_MOVIE(:scr_id, :mvie_id); '
                . 'end;');

            $secondStmt->bindValue('scr_id', $id);
            $secondStmt->bindValue('mvie_id', $rScreening->getMovies()[0]->getId());
            $secondStmt->execute();

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
