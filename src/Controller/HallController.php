<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Form\HallType;
use App\Repository\HallRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Driver\Connection;

/**
 * @Route("/hall")
 */
class HallController extends Controller
{
    /**
     * @Route("/", name="hall_index", methods="GET")
     */
    public function index(HallRepository $hallRepository): Response
    {
        return $this->render('hall/index.html.twig', ['halls' => $hallRepository->findAll()]);
    }

    /**
     * @Route("/new", name="hall_new", methods="GET|POST")
     */
    public function new(Request $request, Connection $connection): Response
    {
        $hall = new Hall();
        $form = $this->createForm(HallType::class, $hall);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $rHall = $request->get('hall');
            $stmt = $connection->prepare('begin '
                . 'INSERT_HALL(:v, :h, :nb); '
                . 'end;');
            $stmt->bindValue(':v', $rHall['number_of_seats_v']);
            $stmt->bindValue(':h', $rHall['number_of_seats_h']);
            $stmt->bindValue(':nb', $rHall['hall_number']);
            $stmt->execute();
            return $this->redirectToRoute('hall_index');
        }

        return $this->render('hall/new.html.twig', [
            'hall' => $hall,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="hall_show", methods="GET")
     */
    public function show(Hall $hall, Connection $connection): Response
    {
//        dump($hall);
//        die;
//        $stmt - $connection->prepare($prepareString)->execute()
//      ?  $var = [$hall->getId()];
//        $sql = "declare
//        a hall%ROWTYPE;
//        begin
//        SELECT_HALL_BY_ID(4, a);
//        end;";
//        $stmt = $connection->exec($sql);
//        dump($stmt);
//        die;
////        $stmt->bindValue("name", $name);
//        $res = $stmt->fetchAll();
//        dump($res);
//        die;
//        $users = $connection->exec('SELECT * from hall');
//        echo '<pre>';
//        print_r($users);
//        die;
        return $this->render('hall/show.html.twig', ['hall' => $hall]);
    }

    /**
     * @Route("/{id}/edit", name="hall_edit", methods="GET|POST")
     */
    public function edit(Request $request, Hall $hall, Connection $connection): Response
    {
        $form = $this->createForm(HallType::class, $hall);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $rHall = $request->get('hall');
            $stmt = $connection->prepare('begin '
                . 'UPDATE_HALL(:id, :v, :h, :nb); '
                . 'end;');
            $stmt->bindValue(':id', $rHall->getId());
            $stmt->bindValue(':v', $rHall->getNumberOfSeatsV());
            $stmt->bindValue(':h', $rHall->getNumberOfSeatsH());
            $stmt->bindValue(':nb', $rHall->getHallNumber());
            $stmt->execute();
            return $this->redirectToRoute('hall_index');
//            return $this->redirectToRoute('hall_edit', ['id' => $hall->getId()]);
        }

        return $this->render('hall/edit.html.twig', [
            'hall' => $hall,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="hall_delete", methods="DELETE")
     */
    public function delete(Request $request, Hall $hall, Connection $connection): Response
    {

        if ($this->isCsrfTokenValid('delete'.$hall->getId(), $request->request->get('_token'))) {

            $rHall = $request->get('hall');
            $stmt = $connection->prepare('begin '
                . 'DELETE_HALL(:id); '
                . 'end;');
            $stmt->bindValue(':id', $rHall->getId());
            $stmt->execute();
        }
        return $this->redirectToRoute('hall_index');
    }
}
